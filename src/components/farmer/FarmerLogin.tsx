import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Phone, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

type LoginStep = 'phone' | 'otp';

interface FarmerLoginProps {
    onBackToMainLogin: () => void;
}

const FarmerLogin = ({ onBackToMainLogin }: FarmerLoginProps) => {
    const [currentStep, setCurrentStep] = useState<LoginStep>('phone');
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone) {
            toast({
                title: "ত্রুটি",
                description: "মোবাইল নম্বর দিন",
                variant: "destructive",
            });
            return;
        }

        // For prototype - accept any phone number
        // if (phone.length < 11) {
        //     toast({
        //         title: "ত্রুটি",
        //         description: "সঠিক মোবাইল নম্বর দিন",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        setIsLoading(true);

        try {
            // For prototype - skip farmer exists check
            // const farmerExists = await checkFarmerExists(phone);

            // if (!farmerExists) {
            //     toast({
            //         title: "ত্রুটি",
            //         description: "এই নম্বর দিয়ে কোনো কৃষক অ্যাকাউন্ট পাওয়া যায়নি। প্রথমে নিবন্ধন করুন।",
            //         variant: "destructive",
            //     });
            //     return;
            // }

            // Generate and send OTP (dummy)
            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(otpCode);

            await sendOTP(phone, otpCode);

            toast({
                title: "OTP পাঠানো হয়েছে",
                description: `আপনার ${phone} নম্বরে OTP পাঠানো হয়েছে (Prototype Mode)`,
            });

            setOtpSent(true);
            setCurrentStep('otp');
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "OTP পাঠাতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const checkFarmerExists = async (phoneNumber: string): Promise<boolean> => {
        // Simulate API call to check if farmer exists
        // In real implementation, this would check the database
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true; // Assume farmer exists for demo
    };

    const sendOTP = async (phoneNumber: string, otpCode: string): Promise<void> => {
        // Simulate SMS sending
        console.log(`OTP ${otpCode} sent to ${phoneNumber}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp) {
            toast({
                title: "ত্রুটি",
                description: "OTP কোড দিন",
                variant: "destructive",
            });
            return;
        }

        // For prototype - accept any OTP input
        // if (otp !== generatedOtp) {
        //     toast({
        //         title: "ত্রুটি",
        //         description: "ভুল OTP কোড",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        setIsLoading(true);

        try {
            // Login farmer with phone and OTP
            const success = await loginFarmerWithOtp(phone, otp);

            if (success) {
                // Login to AuthContext as farmer
                await login(phone, otp, 'farmer');

                toast({
                    title: "সফল",
                    description: "সফলভাবে লগইন হয়েছে (Prototype Mode)",
                });
                // Redirect to farmer dashboard
                navigate('/farmer-dashboard');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "লগইনে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const loginFarmerWithOtp = async (phoneNumber: string, otpCode: string): Promise<boolean> => {
        // Simulate farmer login with OTP
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In real implementation, verify OTP and authenticate farmer
        return true;
    };

    const handleResendOtp = async () => {
        setIsLoading(true);

        try {
            // Generate new OTP
            const newOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(newOtpCode);

            await sendOTP(phone, newOtpCode);

            toast({
                title: "নতুন OTP পাঠানো হয়েছে",
                description: `আপনার ${phone} নম্বরে নতুন OTP পাঠানো হয়েছে`,
            });
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "OTP পাঠাতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderPhoneForm = () => (
        <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
                <Phone className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                    কৃষক লগইনের জন্য আপনার মোবাইল নম্বর দিন
                    <br />
                    <span className="text-orange-600 font-medium">প্রোটোটাইপ মোড: যেকোনো নম্বর দিলেই হবে</span>
                </AlertDescription>
            </Alert>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="যেকোনো নম্বর (যেমন: 01700000000)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="text-lg"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            OTP পাঠানো হচ্ছে...
                        </>
                    ) : (
                        <>
                            <Phone className="mr-2 h-4 w-4" />
                            OTP পাঠান
                        </>
                    )}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={onBackToMainLogin}
                    className="w-full"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    অন্য ধরনের লগইন
                </Button>
            </form>
        </div>
    );

    const renderOtpForm = () => (
        <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                    আপনার {phone} নম্বরে একটি ৬ ডিজিটের OTP কোড পাঠানো হয়েছে
                    <br />
                    <span className="text-orange-600 font-medium">প্রোটোটাইপ মোড: যেকোনো ৬ ডিজিট দিলেই হবে</span>
                </AlertDescription>
            </Alert>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="otp">OTP কোড *</Label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder="যেকোনো ৬ ডিজিট (যেমন: 123456)"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                        className="text-center text-2xl tracking-widest"
                    />
                    <div className="text-sm text-gray-600 text-center space-x-2">
                        <span>OTP পাননি?</span>
                        <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto"
                            onClick={handleResendOtp}
                            disabled={isLoading}
                        >
                            আবার পাঠান
                        </Button>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            লগইন হচ্ছে...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            লগইন করুন
                        </>
                    )}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('phone')}
                    className="w-full"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    নম্বর পরিবর্তন করুন
                </Button>
            </form>
        </div>
    );

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-xl text-green-600">কৃষক লগইন</CardTitle>
                <CardDescription>
                    {currentStep === 'phone'
                        ? 'মোবাইল নম্বর দিয়ে লগইন করুন'
                        : 'OTP যাচাই করুন'
                    }
                </CardDescription>
            </CardHeader>

            <CardContent>
                {currentStep === 'phone' && renderPhoneForm()}
                {currentStep === 'otp' && renderOtpForm()}
            </CardContent>
        </Card>
    );
};

export default FarmerLogin;
