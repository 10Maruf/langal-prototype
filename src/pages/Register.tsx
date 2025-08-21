import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UserType, useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Users, User, UserCheck, Upload, Camera, FileText, MapPin, Phone, Mail, IdCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RegisterData {
    // Common fields
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    nidNumber: string;
    nidPhoto: File | null;
    profilePhoto: File | null;
    address: string;
    
    // Farmer specific
    farmSize?: string;
    farmType?: string;
    experience?: string;
    
    // Expert specific
    qualification?: string;
    specialization?: string;
    experience_years?: string;
    certification?: File | null;
    
    // Customer specific
    businessName?: string;
    businessType?: string;
    tradeLicense?: string;
}

const Register = () => {
    const [activeTab, setActiveTab] = useState<UserType>("farmer");
    const [isLoading, setIsLoading] = useState(false);
    const [registerData, setRegisterData] = useState<RegisterData>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        nidNumber: "",
        nidPhoto: null,
        profilePhoto: null,
        address: "",
    });

    const navigate = useNavigate();
    const { toast } = useToast();
    const { register: registerUser } = useAuth();
    const nidPhotoRef = useRef<HTMLInputElement>(null);
    const profilePhotoRef = useRef<HTMLInputElement>(null);
    const certificationRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        setRegisterData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field: keyof RegisterData, file: File | null) => {
        setRegisterData(prev => ({ ...prev, [field]: file }));
    };

    const validateForm = (): boolean => {
        // Common validation
        if (!registerData.fullName || !registerData.email || !registerData.password || 
            !registerData.confirmPassword || !registerData.phone || !registerData.nidNumber || 
            !registerData.nidPhoto || !registerData.profilePhoto || !registerData.address) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে সব আবশ্যক ক্ষেত্র পূরণ করুন",
                variant: "destructive",
            });
            return false;
        }

        if (registerData.password !== registerData.confirmPassword) {
            toast({
                title: "ত্রুটি",
                description: "পাসওয়ার্ড মিলছে না",
                variant: "destructive",
            });
            return false;
        }

        if (registerData.password.length < 6) {
            toast({
                title: "ত্রুটি",
                description: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                variant: "destructive",
            });
            return false;
        }

        if (registerData.nidNumber.length < 10) {
            toast({
                title: "ত্রুটি",
                description: "সঠিক জাতীয় পরিচয়পত্র নম্বর দিন",
                variant: "destructive",
            });
            return false;
        }

        // Type-specific validation
        if (activeTab === 'farmer') {
            if (!registerData.farmSize || !registerData.farmType || !registerData.experience) {
                toast({
                    title: "ত্রুটি",
                    description: "কৃষকের সব তথ্য পূরণ করুন",
                    variant: "destructive",
                });
                return false;
            }
        }

        if (activeTab === 'expert') {
            if (!registerData.qualification || !registerData.specialization || !registerData.experience_years || !registerData.certification) {
                toast({
                    title: "ত্রুটি",
                    description: "বিশেষজ্ঞের সব তথ্য ও সার্টিফিকেট পূরণ করুন",
                    variant: "destructive",
                });
                return false;
            }
        }

        if (activeTab === 'customer') {
            if (!registerData.businessName || !registerData.businessType || !registerData.tradeLicense) {
                toast({
                    title: "ত্রুটি",
                    description: "ব্যবসায়িক তথ্য পূরণ করুন",
                    variant: "destructive",
                });
                return false;
            }
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Call the register function from AuthContext
            const success = await registerUser(registerData, activeTab);
            
            if (success) {
                toast({
                    title: "সফল!",
                    description: "সফলভাবে নিবন্ধন সম্পন্ন হয়েছে। অনুমোদনের জন্য অপেক্ষা করুন।",
                });

                // Navigate to login page
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getUserTypeIcon = (type: UserType) => {
        switch (type) {
            case 'farmer':
                return <User className="h-5 w-5" />;
            case 'expert':
                return <UserCheck className="h-5 w-5" />;
            case 'customer':
                return <Users className="h-5 w-5" />;
            default:
                return <User className="h-5 w-5" />;
        }
    };

    const getUserTypeLabel = (type: UserType) => {
        switch (type) {
            case 'farmer':
                return 'কৃষক';
            case 'expert':
                return 'কৃষি বিশেষজ্ঞ';
            case 'customer':
                return 'ক্রেতা';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img src="/img/Asset 3.png" alt="logo" className="h-16 w-16 mb-2" />
                        <h1 className="text-2xl font-bold text-primary mb-2">লাঙল</h1>
                        <p className="text-sm text-gray-700 font-medium px-3 py-1 bg-green-50 rounded-md border-l-4 border-green-500">
                            কৃষকের ডিজিটাল হাতিয়ার
                        </p>
                    </div>
                    <CardTitle className="text-xl">নতুন অ্যাকাউন্ট তৈরি করুন</CardTitle>
                    <CardDescription>
                        আপনার ধরণ অনুযায়ী নিবন্ধন করুন
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger 
                                value="farmer" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'farmer' 
                                        ? 'data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-green-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('farmer')}
                                <span className="hidden sm:inline">কৃষক</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="expert" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'expert' 
                                        ? 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:border-blue-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('expert')}
                                <span className="hidden sm:inline">বিশেষজ্ঞ</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="customer" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'customer' 
                                        ? 'data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 data-[state=active]:border-purple-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('customer')}
                                <span className="hidden sm:inline">ক্রেতা</span>
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleRegister} className="space-y-6 mt-6">
                            {/* Common Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">পূর্ণ নাম *</Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="আপনার পূর্ণ নাম"
                                        value={registerData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">ইমেইল *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="আপনার ইমেইল"
                                        value={registerData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="০১৭xxxxxxxx"
                                        value={registerData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nidNumber">জাতীয় পরিচয়পত্র নম্বর *</Label>
                                    <Input
                                        id="nidNumber"
                                        type="text"
                                        placeholder="১০ বা ১৭ ডিজিটের NID"
                                        value={registerData.nidNumber}
                                        onChange={(e) => handleInputChange('nidNumber', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">পাসওয়ার্ড *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="কমপক্ষে ৬ অক্ষর"
                                        value={registerData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন *</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="পাসওয়ার্ড আবার লিখুন"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">ঠিকানা *</Label>
                                <Textarea
                                    id="address"
                                    placeholder="আপনার সম্পূর্ণ ঠিকানা"
                                    value={registerData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Photo Requirements */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>প্রোফাইল ছবি * (সামনের দিকের ছবি)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => profilePhotoRef.current?.click()}
                                            className="mb-2"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            ছবি আপলোড করুন
                                        </Button>
                                        <input
                                            ref={profilePhotoRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                                        />
                                        {registerData.profilePhoto && (
                                            <p className="text-sm text-green-600">{registerData.profilePhoto.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>জাতীয় পরিচয়পত্রের ছবি * (স্পষ্ট ও পড়া যায় এমন)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <IdCard className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => nidPhotoRef.current?.click()}
                                            className="mb-2"
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            NID আপলোড করুন
                                        </Button>
                                        <input
                                            ref={nidPhotoRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileChange('nidPhoto', e.target.files?.[0] || null)}
                                        />
                                        {registerData.nidPhoto && (
                                            <p className="text-sm text-green-600">{registerData.nidPhoto.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Type-specific fields */}
                            <TabsContent value="farmer" className="space-y-4 mt-6">
                                <Alert className="border-green-200 bg-green-50">
                                    <User className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800">
                                        কৃষক হিসেবে নিবন্ধনের জন্য আপনার কৃষি সম্পর্কিত তথ্য প্রয়োজন
                                    </AlertDescription>
                                </Alert>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="farmSize">জমির পরিমাণ (একর) *</Label>
                                        <Input
                                            id="farmSize"
                                            type="text"
                                            placeholder="যেমন: ২.৫ একর"
                                            value={registerData.farmSize || ''}
                                            onChange={(e) => handleInputChange('farmSize', e.target.value)}
                                            className="border-green-200 focus:border-green-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farmType">চাষের ধরণ *</Label>
                                        <Input
                                            id="farmType"
                                            type="text"
                                            placeholder="যেমন: ধান, সবজি, ফল"
                                            value={registerData.farmType || ''}
                                            onChange={(e) => handleInputChange('farmType', e.target.value)}
                                            className="border-green-200 focus:border-green-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="experience">কৃষিকাজের অভিজ্ঞতা *</Label>
                                        <Textarea
                                            id="experience"
                                            placeholder="আপনার কৃষিকাজের অভিজ্ঞতা বর্ণনা করুন"
                                            value={registerData.experience || ''}
                                            onChange={(e) => handleInputChange('experience', e.target.value)}
                                            className="border-green-200 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="expert" className="space-y-4 mt-6">
                                <Alert className="border-blue-200 bg-blue-50">
                                    <UserCheck className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-800">
                                        কৃষি বিশেষজ্ঞ হিসেবে নিবন্ধনের জন্য আপনার শিক্ষাগত যোগ্যতা ও সার্টিফিকেট প্রয়োজন
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="qualification">শিক্ষাগত যোগ্যতা *</Label>
                                        <Input
                                            id="qualification"
                                            type="text"
                                            placeholder="যেমন: কৃষি বিষয়ে স্নাতক/স্নাতকোত্তর"
                                            value={registerData.qualification || ''}
                                            onChange={(e) => handleInputChange('qualification', e.target.value)}
                                            className="border-blue-200 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">বিশেষত্ব *</Label>
                                        <Input
                                            id="specialization"
                                            type="text"
                                            placeholder="যেমন: ফসল উৎপাদন, মাটি বিজ্ঞান"
                                            value={registerData.specialization || ''}
                                            onChange={(e) => handleInputChange('specialization', e.target.value)}
                                            className="border-blue-200 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="experience_years">অভিজ্ঞতা (বছর) *</Label>
                                        <Input
                                            id="experience_years"
                                            type="number"
                                            placeholder="যেমন: ৫"
                                            value={registerData.experience_years || ''}
                                            onChange={(e) => handleInputChange('experience_years', e.target.value)}
                                            className="border-blue-200 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>সার্টিফিকেট/ডিগ্রি *</Label>
                                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center bg-blue-50/30">
                                            <FileText className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => certificationRef.current?.click()}
                                                className="mb-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                সার্টিফিকেট আপলোড
                                            </Button>
                                            <input
                                                ref={certificationRef}
                                                type="file"
                                                accept="image/*,application/pdf"
                                                className="hidden"
                                                onChange={(e) => handleFileChange('certification', e.target.files?.[0] || null)}
                                            />
                                            {registerData.certification && (
                                                <p className="text-sm text-blue-600">{registerData.certification.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4 mt-6">
                                <Alert className="border-purple-200 bg-purple-50">
                                    <Users className="h-4 w-4 text-purple-600" />
                                    <AlertDescription className="text-purple-800">
                                        ক্রেতা হিসেবে নিবন্ধনের জন্য আপনার ব্যবসায়িক তথ্য প্রয়োজন
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessName">ব্যবসার নাম *</Label>
                                        <Input
                                            id="businessName"
                                            type="text"
                                            placeholder="আপনার ব্যবসার নাম"
                                            value={registerData.businessName || ''}
                                            onChange={(e) => handleInputChange('businessName', e.target.value)}
                                            className="border-purple-200 focus:border-purple-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="businessType">ব্যবসার ধরণ *</Label>
                                        <Input
                                            id="businessType"
                                            type="text"
                                            placeholder="যেমন: খুচরা, পাইকারি, রেস্তোরাঁ"
                                            value={registerData.businessType || ''}
                                            onChange={(e) => handleInputChange('businessType', e.target.value)}
                                            className="border-purple-200 focus:border-purple-500"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="tradeLicense">ট্রেড লাইসেন্স নম্বর *</Label>
                                        <Input
                                            id="tradeLicense"
                                            type="text"
                                            placeholder="আপনার ট্রেড লাইসেন্স নম্বর"
                                            value={registerData.tradeLicense || ''}
                                            onChange={(e) => handleInputChange('tradeLicense', e.target.value)}
                                            className="border-purple-200 focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </form>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        onClick={handleRegister}
                        className={`w-full ${
                            activeTab === 'farmer' 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : activeTab === 'expert'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                নিবন্ধন হচ্ছে...
                            </>
                        ) : (
                            <>
                                {getUserTypeIcon(activeTab)}
                                <span className="ml-2">{getUserTypeLabel(activeTab)} হিসেবে নিবন্ধন করুন</span>
                            </>
                        )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-600">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
                            লগইন করুন
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
