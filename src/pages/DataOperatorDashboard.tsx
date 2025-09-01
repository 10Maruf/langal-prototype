import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    UserCheck,
    MapPin,
    Sprout,
    CloudSun,
    Shield,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Database,
    Home,
    ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileVerification from "@/components/data-operator/ProfileVerification";
import CropVerification from "@/components/data-operator/CropVerification";
import DashboardStats from "@/components/data-operator/DashboardStats";
import RegisterFarmer from "@/components/data-operator/RegisterFarmer";
import FieldDataCollection from "@/components/data-operator/FieldDataCollection";

const DataOperatorDashboard = () => {
    const [activeTab, setActiveTab] = useState("profile-verification");
    const navigate = useNavigate();

    // Enhanced farmer data with NID verification
    const [farmers, setFarmers] = useState([
        {
            id: 1,
            name: "মোহাম্মদ রহিম",
            nid: "1234567890123",
            phone: "01712345678",
            email: "rahim@example.com",
            address: "গ্রাম: রামপুর, ডাকঘর: কুমিল্লা সদর",
            district: "কুমিল্লা",
            upazila: "কুমিল্লা সদর",
            dateOfBirth: "১৫/০১/১৯৮০",
            fatherName: "আবুল হাসেম",
            motherName: "রহিমা খাতুন",
            occupation: "কৃষক",
            landOwnership: "নিজস্ব ৫ বিঘা",
            registrationDate: "২৫/০৮/২০২৫",
            nidVerificationStatus: "verified" as const,
            profileVerificationStatus: "pending" as const,
            documents: ["এনআইডি কার্ড", "জমির দলিল"],
        },
        {
            id: 2,
            name: "আবুল কাসেম",
            nid: "9876543210987",
            phone: "01812345678",
            email: "kasem@example.com",
            address: "গ্রাম: মিরপুর, ডাকঘর: সিলেট সদর",
            district: "সিলেট",
            upazila: "সিলেট সদর",
            dateOfBirth: "২০/০৩/১৯৭৫",
            fatherName: "মোহাম্মদ আলী",
            motherName: "ফাতেমা খাতুন",
            occupation: "কৃষক",
            landOwnership: "নিজস্ব ৩ বিঘা",
            registrationDate: "২৬/০৮/২০২৫",
            nidVerificationStatus: "verified" as const,
            profileVerificationStatus: "pending" as const,
            documents: ["এনআইডি কার্ড", "জমির দলিল"],
        },
        {
            id: 3,
            name: "রহিমা খাতুন",
            nid: "5678901234567",
            phone: "01912345678",
            email: "rahima@example.com",
            address: "গ্রাম: পাতিকাবাড়ি, ডাকঘর: রংপুর সদর",
            district: "রংপুর",
            upazila: "রংপুর সদর",
            dateOfBirth: "১০/০৬/১৯৮৫",
            fatherName: "আব্দুল করিম",
            motherName: "সালমা বেগম",
            occupation: "কৃষক",
            landOwnership: "নিজস্ব ২ বিঘা",
            registrationDate: "২৭/০৮/২০২৫",
            nidVerificationStatus: "pending" as const,
            profileVerificationStatus: "pending" as const,
            documents: ["এনআইডি কার্ড", "জমির দলিল"],
        },
    ]);

    const [cropVerifications, setCropVerifications] = useState([
        {
            id: 1,
            farmerId: 1,
            farmerName: "মোহাম্মদ রহিম",
            farmerPhone: "01712345678",
            cropType: "ধান",
            landArea: "৫",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: রামপুর",
            district: "ঢাকা",
            upazila: "সাভার",
            union: "বিরুলিয়া",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["ফসলের ছবি ১", "ফসলের ছবি ২"],
            gpsCoordinates: {
                latitude: 23.4607,
                longitude: 91.1809
            },
            submissionDate: "২৫/০৮/২০২৫",
            verificationStatus: "pending" as const,
            verificationNotes: "",
            estimatedYield: "৮০ মণ",
            sowingDate: "১৫/০৭/২০২৫",
            harvestDate: "১৫/১১/২০২৫",
        },
        {
            id: 2,
            farmerId: 2,
            farmerName: "আবুল কাসেম",
            farmerPhone: "01812345678",
            cropType: "গম",
            landArea: "৩",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: মিরপুর",
            district: "সিলেট",
            upazila: "সিলেট সদর",
            union: "খাদিমনগর",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["ফসলের ছবি ১"],
            gpsCoordinates: {
                latitude: 24.8949,
                longitude: 91.8687
            },
            submissionDate: "২৬/০৮/২০২৫",
            verificationStatus: "pending" as const,
            verificationNotes: "",
            estimatedYield: "৪৫ মণ",
            sowingDate: "২০/০৭/২০২৫",
            harvestDate: "২০/১১/২০২৫",
        },
        {
            id: 3,
            farmerId: 3,
            farmerName: "রহিমা খাতুন",
            farmerPhone: "01912345678",
            cropType: "পাট",
            landArea: "২",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: পাতিকাবাড়ি",
            district: "রংপুর",
            upazila: "রংপুর সদর",
            union: "আলমনগর",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["ফসলের ছবি ১", "ফসলের ছবি ২"],
            gpsCoordinates: {
                latitude: 25.7439,
                longitude: 89.2752
            },
            submissionDate: "২৭/০৮/২০২৫",
            verificationStatus: "pending" as const,
            verificationNotes: "",
            estimatedYield: "৩০ মণ",
            sowingDate: "১০/০৭/২০২৫",
            harvestDate: "১০/১১/২০২৫",
        },
        {
            id: 4,
            farmerId: 4,
            farmerName: "কামাল উদ্দিন",
            farmerPhone: "01634567890",
            cropType: "ভুট্টা",
            landArea: "৪",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: নয়াপাড়া",
            district: "ঢাকা",
            upazila: "সাভার",
            union: "আশুলিয়া",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["ফসলের ছবি ১", "ফসলের ছবি ২"],
            gpsCoordinates: {
                latitude: 23.4607,
                longitude: 91.1809
            },
            submissionDate: "২৮/০৮/২০২৫",
            verificationStatus: "verified" as const,
            verificationNotes: "যাচাই সম্পন্ন",
            estimatedYield: "৯০ মণ",
            sowingDate: "১০/০৭/২০২৫",
            harvestDate: "১০/১২/২০২৫",
        },
        {
            id: 5,
            farmerId: 5,
            farmerName: "জামিল আহমেদ",
            farmerPhone: "01756789012",
            cropType: "আলু",
            landArea: "১.৫",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: বাগানবাড়ি",
            district: "রংপুর",
            upazila: "রংপুর সদর",
            union: "তাজহাট",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["ফসলের ছবি ১"],
            gpsCoordinates: {
                latitude: 25.7439,
                longitude: 89.2752
            },
            submissionDate: "৩০/০৮/২০২৫",
            verificationStatus: "pending" as const,
            verificationNotes: "",
            estimatedYield: "৪০ মণ",
            sowingDate: "০৫/০৮/২০২৫",
            harvestDate: "০৫/১২/২০২৫",
        },
        {
            id: 6,
            farmerId: 6,
            farmerName: "নাসির উদ্দিন",
            farmerPhone: "01834567890",
            cropType: "পেঁয়াজ",
            landArea: "২.৫",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: কৃষ্ণনগর",
            district: "সিলেট",
            upazila: "সিলেট সদর",
            union: "খাদিমনগর",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["ফসলের ছবি ১", "ফসলের ছবি ২"],
            gpsCoordinates: {
                latitude: 24.8949,
                longitude: 91.8687
            },
            submissionDate: "০১/০৯/২০২৫",
            verificationStatus: "verified" as const,
            verificationNotes: "যাচাই সম্পন্ন",
            estimatedYield: "৬০ মণ",
            sowingDate: "১৫/০৮/২০২৫",
            harvestDate: "১৫/১২/২০২৫",
        },
        {
            id: 7,
            farmerId: 7,
            farmerName: "শাহিনুর রহমান",
            farmerPhone: "01745678901",
            cropType: "টমেটো",
            landArea: "১",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: শিববাড়ি",
            district: "ঢাকা",
            upazila: "সাভার",
            union: "বিরুলিয়া",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["ফসলের ছবি ১"],
            gpsCoordinates: {
                latitude: 23.4607,
                longitude: 91.1809
            },
            submissionDate: "০২/০৯/২০২৫",
            verificationStatus: "pending" as const,
            verificationNotes: "",
            estimatedYield: "২৫ মণ",
            sowingDate: "২০/০৮/২০২৫",
            harvestDate: "২০/১২/২০২৫",
        },
        {
            id: 8,
            farmerId: 8,
            farmerName: "রফিকুল ইসলাম",
            farmerPhone: "01656789012",
            cropType: "কাঁচামরিচ",
            landArea: "০.৫",
            landAreaUnit: "বিঘা" as const,
            location: "গ্রাম: পূর্বপাড়া",
            district: "রংপুর",
            upazila: "রংপুর সদর",
            union: "তাজহাট",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["ফসলের ছবি ১", "ফসলের ছবি ২"],
            gpsCoordinates: {
                latitude: 25.7439,
                longitude: 89.2752
            },
            submissionDate: "০৩/০৯/২০২৫",
            verificationStatus: "verified" as const,
            verificationNotes: "যাচাই সম্পন্ন",
            estimatedYield: "১৫ মণ",
            sowingDate: "২৫/০৮/২০২৫",
            harvestDate: "২৫/১২/২০২৫",
        },
    ]);

    const handleStatusUpdate = (farmerId: number, status: "verified" | "rejected") => {
        setFarmers(prev =>
            prev.map(farmer =>
                farmer.id === farmerId
                    ? { ...farmer, profileVerificationStatus: status as any }
                    : farmer
            )
        );
    };

    const handleEditFarmer = (updatedFarmer: typeof farmers[0]) => {
        setFarmers(prev =>
            prev.map(farmer =>
                farmer.id === updatedFarmer.id ? updatedFarmer : farmer
            )
        );
    };

    const handleCropStatusUpdate = (cropId: number, status: "verified" | "rejected", notes?: string) => {
        setCropVerifications(prev =>
            prev.map(crop =>
                crop.id === cropId
                    ? { ...crop, verificationStatus: status as any, verificationNotes: notes || "" }
                    : crop
            )
        );
    };

    const handleAddCrop = (newCrop: Omit<typeof cropVerifications[0], 'id'>) => {
        const id = Math.max(...cropVerifications.map(c => c.id)) + 1;
        setCropVerifications(prev => [...prev, { ...newCrop, id }]);
    };

    const handleUpdateCrop = (cropId: number, updatedData: Partial<typeof cropVerifications[0]>) => {
        setCropVerifications(prev =>
            prev.map(crop =>
                crop.id === cropId ? { ...crop, ...updatedData } : crop
            )
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "verified":
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />অনুমোদিত</Badge>;
            case "rejected":
                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />বাতিল</Badge>;
            case "pending":
            default:
                return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />অপেক্ষমান</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Database className="h-8 w-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">ডাটা অপারেটর প্যানেল</h1>
                                    <p className="text-sm text-gray-600">সরকারি তথ্য ব্যবস্থাপনা</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate('/login')}
                            variant="outline"
                            className="flex items-center space-x-2"
                        >
                            <Home className="h-4 w-4" />
                            <span>হোম পেজে ফিরুন</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Statistics */}
                <DashboardStats farmers={farmers} cropVerifications={cropVerifications} />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile-verification" className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            <span className="hidden sm:inline">প্রফাইল যাচাই</span>
                        </TabsTrigger>
                        <TabsTrigger value="crop-verification" className="flex items-center gap-2">
                            <Sprout className="h-4 w-4" />
                            <span className="hidden sm:inline">ফসল যাচাই</span>
                        </TabsTrigger>
                        <TabsTrigger value="field-data" className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            <span className="hidden sm:inline">ফিল্ড ডেটা</span>
                        </TabsTrigger>
                        <TabsTrigger value="location-data" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="hidden sm:inline">আবহাওয়া তথ্য</span>
                        </TabsTrigger>
                    </TabsList>          {/* কৃষকের প্রফাইল ভেরিফাই */}
                    <TabsContent value="profile-verification" className="space-y-4">
                        <ProfileVerification
                            farmers={farmers}
                            onStatusUpdate={handleStatusUpdate}
                            onEditFarmer={handleEditFarmer}
                        />
                    </TabsContent>

                    {/* ফসল ও জমির পরিমান ভেরিফাই */}
                    <TabsContent value="crop-verification" className="space-y-4">
                        <CropVerification
                            cropVerifications={cropVerifications}
                            onStatusUpdate={handleCropStatusUpdate}
                            onAddCrop={handleAddCrop}
                            onUpdateCrop={handleUpdateCrop}
                        />
                    </TabsContent>

                    {/* ফিল্ড ডেটা সংগ্রহ */}
                    <TabsContent value="field-data" className="space-y-4">
                        <FieldDataCollection />
                    </TabsContent>

                    {/* লোকেশন অনুসারে তথ্য */}
                    <TabsContent value="location-data" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CloudSun className="h-5 w-5" />
                                    অঞ্চলভিত্তিক মাটি ও আবহাওয়া তথ্য
                                </CardTitle>
                                <CardDescription>
                                    বিভিন্ন অঞ্চলের মাটির গুণাগুণ ও আবহাওয়া তথ্য আপডেট করুন
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">জেলা</label>
                                            <select className="w-full p-2 border rounded-lg">
                                                <option>ঢাকা</option>
                                                <option>চট্টগ্রাম</option>
                                                <option>সিলেট</option>
                                                <option>কুমিল্লা</option>
                                                <option>রংপুর</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">উপজেলা</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-lg"
                                                placeholder="উপজেলার নাম"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">মাটির pH</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full p-2 border rounded-lg"
                                                placeholder="6.5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">গড় তাপমাত্রা (°C)</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded-lg"
                                                placeholder="25"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">বৃষ্টিপাত (মিমি)</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded-lg"
                                                placeholder="150"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">মাটির ধরন</label>
                                        <select className="w-full p-2 border rounded-lg">
                                            <option>দোআঁশ মাটি</option>
                                            <option>বেলে মাটি</option>
                                            <option>এঁটেল মাটি</option>
                                            <option>পলি মাটি</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">সার সুপারিশ</label>
                                        <textarea
                                            className="w-full p-2 border rounded-lg h-20"
                                            placeholder="এই অঞ্চলের জন্য সার সুপারিশ লিখুন"
                                        ></textarea>
                                    </div>

                                    <Button className="bg-green-600 hover:bg-green-700">তথ্য আপডেট করুন</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DataOperatorDashboard;
