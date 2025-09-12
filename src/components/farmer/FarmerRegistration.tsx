import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload, Camera, IdCard, Phone, Calendar, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InitialData {
    phone: string;
    nidNumber: string;
    krishiCardNumber: string;
    documentType: 'nid' | 'krishi';
    dateOfBirth: string;
}

interface DocumentData {
    frontImage: File | null;
    backImage: File | null;
}

interface ParsedData {
    fullName: string;
    address: string;
    dateOfBirth: string;
    nidNumber: string;
    fatherName: string;
    motherName: string;
}

interface FarmerFormData {
    fullName: string;
    fatherName: string;
    motherName: string;
    address: string;
    dateOfBirth: string;
    farmSize: string;
    farmType: string;
    experience: string;
    profilePhoto: File | null;
}

type RegistrationStep = 'initial' | 'documents' | 'form' | 'otp' | 'success';

const FarmerRegistration = () => {
    const [currentStep, setCurrentStep] = useState<RegistrationStep>('initial');
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const [initialData, setInitialData] = useState<InitialData>({
        phone: '',
        nidNumber: '',
        krishiCardNumber: '',
        documentType: 'nid',
        dateOfBirth: ''
    });

    const [documentData, setDocumentData] = useState<DocumentData>({
        frontImage: null,
        backImage: null
    });

    const [parsedData, setParsedData] = useState<ParsedData>({
        fullName: '',
        address: '',
        dateOfBirth: '',
        nidNumber: '',
        fatherName: '',
        motherName: ''
    });

    const [farmerFormData, setFarmerFormData] = useState<FarmerFormData>({
        fullName: '',
        fatherName: '',
        motherName: '',
        address: '',
        dateOfBirth: '',
        farmSize: '',
        farmType: '',
        experience: '',
        profilePhoto: null
    });

    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();
    const frontImageRef = useRef<HTMLInputElement>(null);
    const backImageRef = useRef<HTMLInputElement>(null);
    const profilePhotoRef = useRef<HTMLInputElement>(null);

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!initialData.phone || !initialData.dateOfBirth) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate verification process
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For prototype mode - always success
            toast({
                title: "যাচাইকরণ সফল",
                description: "এখন আপনার কাগজপত্রের ছবি আপলোড করুন (Prototype Mode)",
            });
            setCurrentStep('documents');

        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "যাচাইকরণে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const verifyInitialData = async (data: InitialData): Promise<boolean> => {
        // Simulate API call for verification
        // In real implementation, this would verify with government database
        return true;
    };

    const handleDocumentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!documentData.frontImage || !documentData.backImage) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে কাগজপত্রের উভয় পাশের ছবি আপলোড করুন",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate OCR processing
            await new Promise(resolve => setTimeout(resolve, 3000));

            const parsed = await parseDocumentImages(documentData);
            setParsedData(parsed);

            // Auto-fill form data
            setFarmerFormData(prev => ({
                ...prev,
                fullName: parsed.fullName,
                fatherName: parsed.fatherName,
                motherName: parsed.motherName,
                address: parsed.address,
                dateOfBirth: parsed.dateOfBirth
            }));

            toast({
                title: "তথ্য সংগ্রহ সফল",
                description: "কাগজপত্র থেকে তথ্য সংগ্রহ করা হয়েছে। অতিরিক্ত তথ্য পূরণ করুন",
            });

            setCurrentStep('form');
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "কাগজপত্র পড়তে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const parseDocumentImages = async (documents: DocumentData): Promise<ParsedData> => {
        // Simulate OCR parsing
        // In real implementation, this would use OCR service
        return {
            fullName: "মোহাম্মদ রহিম উদ্দিন",
            address: "গ্রাম: রামপুর, পোস্ট: রামপুর, উপজেলা: সাভার, জেলা: ঢাকা",
            dateOfBirth: initialData.dateOfBirth,
            nidNumber: initialData.documentType === 'nid' ? initialData.nidNumber : '',
            fatherName: "মোহাম্মদ করিম উদ্দিন",
            motherName: "ফাতেমা খাতুন"
        };
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!farmerFormData.fullName || !farmerFormData.farmSize || !farmerFormData.farmType ||
            !farmerFormData.experience || !farmerFormData.profilePhoto) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            // Generate and send OTP
            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(otpCode);

            // Simulate OTP sending
            await sendOTP(initialData.phone, otpCode);

            toast({
                title: "OTP পাঠানো হয়েছে",
                description: `আপনার ${initialData.phone} নম্বরে OTP পাঠানো হয়েছে`,
            });

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

    const sendOTP = async (phone: string, otpCode: string): Promise<void> => {
        // Simulate SMS sending
        console.log(`OTP ${otpCode} sent to ${phone}`);
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
            // Complete registration
            await completeRegistration();

            toast({
                title: "নিবন্ধন সম্পন্ন!",
                description: "আপনার কৃষক অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে (Prototype Mode)",
            });

            setCurrentStep('success');
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "নিবন্ধন সম্পন্ন করতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const completeRegistration = async (): Promise<void> => {
        // Simulate registration completion
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In real implementation, save all data to backend
        const registrationData = {
            ...initialData,
            ...farmerFormData,
            documents: documentData,
            verified: true,
            registrationDate: new Date().toISOString()
        };

        console.log('Registration completed:', registrationData);
    };

    const handleFileChange = (field: 'frontImage' | 'backImage' | 'profilePhoto', file: File | null) => {
        if (field === 'profilePhoto') {
            setFarmerFormData(prev => ({ ...prev, profilePhoto: file }));
        } else {
            setDocumentData(prev => ({ ...prev, [field]: file }));
        }
    };

    const renderStepIndicator = () => {
        const steps = [
            { key: 'initial', label: 'প্রাথমিক তথ্য', icon: Phone },
            { key: 'documents', label: 'কাগজপত্র', icon: IdCard },
            { key: 'form', label: 'বিস্তারিত তথ্য', icon: Camera },
            { key: 'otp', label: 'OTP যাচাই', icon: CheckCircle }
        ];

        const currentStepIndex = steps.findIndex(step => step.key === currentStep);

        return (
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.key} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${isCompleted
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : isCurrent
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'bg-gray-200 border-gray-300 text-gray-500'
                                    }`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`ml-2 text-sm ${isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'
                                    }`}>
                                    {step.label}
                                </span>
                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'
                                        }`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderInitialForm = () => (
        <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50">
                <Phone className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                    কৃষক নিবন্ধনের জন্য আপনার মোবাইল নম্বর এবং পরিচয়পত্রের তথ্য প্রয়োজন
                    <br />
                    <span className="text-orange-600 font-medium">প্রোটোটাইপ মোড: যেকোনো তথ্য দিলেই হবে</span>
                </AlertDescription>
            </Alert>

            <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="যেকোনো নম্বর (যেমন: 01700000000)"
                        value={initialData.phone}
                        onChange={(e) => setInitialData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="documentType">পরিচয়পত্রের ধরণ *</Label>
                    <Select
                        value={initialData.documentType}
                        onValueChange={(value: 'nid' | 'krishi') =>
                            setInitialData(prev => ({ ...prev, documentType: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="পরিচয়পত্রের ধরণ নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nid">জাতীয় পরিচয়পত্র (NID)</SelectItem>
                            <SelectItem value="krishi">কৃষি কার্ড</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {initialData.documentType === 'nid' && (
                    <div className="space-y-2">
                        <Label htmlFor="nidNumber">জাতীয় পরিচয়পত্র নম্বর *</Label>
                        <Input
                            id="nidNumber"
                            type="text"
                            placeholder="১০ বা ১৭ ডিজিটের NID"
                            value={initialData.nidNumber}
                            onChange={(e) => setInitialData(prev => ({ ...prev, nidNumber: e.target.value }))}
                            required
                        />
                    </div>
                )}

                {initialData.documentType === 'krishi' && (
                    <div className="space-y-2">
                        <Label htmlFor="krishiCardNumber">কৃষি কার্ড নম্বর *</Label>
                        <Input
                            id="krishiCardNumber"
                            type="text"
                            placeholder="কৃষি কার্ড নম্বর"
                            value={initialData.krishiCardNumber}
                            onChange={(e) => setInitialData(prev => ({ ...prev, krishiCardNumber: e.target.value }))}
                            required
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">জন্ম তারিখ *</Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        value={initialData.dateOfBirth}
                        onChange={(e) => setInitialData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            যাচাই করা হচ্ছে...
                        </>
                    ) : (
                        <>
                            পরবর্তী ধাপ
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );

    const renderDocumentForm = () => (
        <div className="space-y-6">
            <Alert className="border-orange-200 bg-orange-50">
                <IdCard className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                    আপনার {initialData.documentType === 'nid' ? 'জাতীয় পরিচয়পত্র' : 'কৃষি কার্ড'} এর উভয় পাশের স্পষ্ট ছবি আপলোড করুন
                </AlertDescription>
            </Alert>

            <form onSubmit={handleDocumentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>সামনের দিকের ছবি *</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <IdCard className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => frontImageRef.current?.click()}
                                className="mb-2"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                সামনের ছবি
                            </Button>
                            <input
                                ref={frontImageRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange('frontImage', e.target.files?.[0] || null)}
                            />
                            {documentData.frontImage && (
                                <p className="text-sm text-green-600">{documentData.frontImage.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>পিছনের দিকের ছবি *</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <IdCard className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => backImageRef.current?.click()}
                                className="mb-2"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                পিছনের ছবি
                            </Button>
                            <input
                                ref={backImageRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange('backImage', e.target.files?.[0] || null)}
                            />
                            {documentData.backImage && (
                                <p className="text-sm text-green-600">{documentData.backImage.name}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('initial')}
                        className="flex-1"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        পূর্ববর্তী
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                প্রক্রিয়া করা হচ্ছে...
                            </>
                        ) : (
                            <>
                                তথ্য সংগ্রহ করুন
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderForm = () => (
        <div className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
                <Camera className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                    কাগজপত্র থেকে তথ্য সংগ্রহ করা হয়েছে। অতিরিক্ত তথ্য পূরণ করুন
                </AlertDescription>
            </Alert>

            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">পূর্ণ নাম *</Label>
                        <Input
                            id="fullName"
                            type="text"
                            value={farmerFormData.fullName}
                            onChange={(e) => setFarmerFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            required
                            className="bg-blue-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fatherName">পিতার নাম</Label>
                        <Input
                            id="fatherName"
                            type="text"
                            value={farmerFormData.fatherName}
                            onChange={(e) => setFarmerFormData(prev => ({ ...prev, fatherName: e.target.value }))}
                            className="bg-blue-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="motherName">মাতার নাম</Label>
                        <Input
                            id="motherName"
                            type="text"
                            value={farmerFormData.motherName}
                            onChange={(e) => setFarmerFormData(prev => ({ ...prev, motherName: e.target.value }))}
                            className="bg-blue-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="farmSize">জমির পরিমাণ (একর) *</Label>
                        <Input
                            id="farmSize"
                            type="text"
                            placeholder="যেমন: ২.৫ একর"
                            value={farmerFormData.farmSize}
                            onChange={(e) => setFarmerFormData(prev => ({ ...prev, farmSize: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="farmType">চাষের ধরণ *</Label>
                        <Input
                            id="farmType"
                            type="text"
                            placeholder="যেমন: ধান, সবজি, ফল"
                            value={farmerFormData.farmType}
                            onChange={(e) => setFarmerFormData(prev => ({ ...prev, farmType: e.target.value }))}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">ঠিকানা</Label>
                    <Textarea
                        id="address"
                        value={farmerFormData.address}
                        onChange={(e) => setFarmerFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="bg-blue-50"
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="experience">কৃষিকাজের অভিজ্ঞতা *</Label>
                    <Textarea
                        id="experience"
                        placeholder="আপনার কৃষিকাজের অভিজ্ঞতা বর্ণনা করুন"
                        value={farmerFormData.experience}
                        onChange={(e) => setFarmerFormData(prev => ({ ...prev, experience: e.target.value }))}
                        required
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <Label>প্রোফাইল ছবি *</Label>
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
                        {farmerFormData.profilePhoto && (
                            <p className="text-sm text-green-600">{farmerFormData.profilePhoto.name}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('documents')}
                        className="flex-1"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        পূর্ববর্তী
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                OTP পাঠানো হচ্ছে...
                            </>
                        ) : (
                            <>
                                OTP পাঠান
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderOtpForm = () => (
        <div className="space-y-6">
            <Alert className="border-purple-200 bg-purple-50">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-purple-800">
                    আপনার {initialData.phone} নম্বরে একটি ৬ ডিজিটের OTP কোড পাঠানো হয়েছে
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
                    <p className="text-sm text-gray-600 text-center">
                        OTP পাননি? <Button variant="link" className="p-0">আবার পাঠান</Button>
                    </p>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep('form')}
                        className="flex-1"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        পূর্ববর্তী
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                নিবন্ধন সম্পন্ন করা হচ্ছে...
                            </>
                        ) : (
                            <>
                                নিবন্ধন সম্পন্ন করুন
                                <CheckCircle className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center space-y-6">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-2xl font-bold text-green-600">নিবন্ধন সফল!</h3>
                <p className="text-gray-600">
                    আপনার কৃষক অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখন আপনি মোবাইল নম্বর দিয়ে লগইন করতে পারবেন।
                </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">আপনার লগইন তথ্য:</h4>
                <p className="text-green-700">মোবাইল নম্বর: {initialData.phone}</p>
                <p className="text-sm text-green-600 mt-1">লগইনের সময় OTP ব্যবহার করতে হবে</p>
            </div>

            <Button
                onClick={async () => {
                    await login(initialData.phone, '', 'farmer');
                    navigate('/farmer-dashboard');
                }}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
            >
                ড্যাশবোর্ডে যান
            </Button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">কৃষক নিবন্ধন</CardTitle>
                    <CardDescription>
                        {currentStep === 'success' ? 'নিবন্ধন সম্পন্ন' : 'ধাপে ধাপে নিবন্ধন প্রক্রিয়া'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {currentStep !== 'success' && renderStepIndicator()}

                    {currentStep === 'initial' && renderInitialForm()}
                    {currentStep === 'documents' && renderDocumentForm()}
                    {currentStep === 'form' && renderForm()}
                    {currentStep === 'otp' && renderOtpForm()}
                    {currentStep === 'success' && renderSuccess()}
                </CardContent>
            </Card>
        </div>
    );
};

export default FarmerRegistration;
