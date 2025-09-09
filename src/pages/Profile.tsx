import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    User,
    MapPin,
    Phone,
    Mail,
    Calendar,
    CreditCard,
    Briefcase,
    Edit,
    Camera,
    Save,
    X,
    ArrowLeft,
    Sprout,
    TrendingUp,
    DollarSign,
    Tractor,
    Droplets,
    Package
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "আব্দুল করিম",
        email: "abdul.karim@gmail.com",
        phone: "০১৭১২৩৪৫৬৭৮",
        nid: "১২৩৪৫৬৭৮৯০১২৩",
        address: "গ্রাম: হাসনাবাদ, উপজেলা: সিংগাইর, জেলা: মানিকগঞ্জ",
        dateOfBirth: "১৫/০৮/১৯৮৫",
        occupation: "কৃষক",
        farmSize: "৫ একর",
        crops: "ধান, গম, শাকসবজি",
        experience: "১৫ বছর",
        bio: "আমি একজন অভিজ্ঞ কৃষক। আধুনিক কৃষি প্রযুক্তি ব্যবহার করে ফসল উৎপাদনে আগ্রহী।",
        // কৃষি সংক্রান্ত নতুন তথ্য
        currentCrops: [
            { name: "আমন ধান", season: "২০২৪-২৫", area: "৩ একর", status: "চলমান", expectedHarvest: "ডিসেম্বর ২০২৪" },
            { name: "সরিষা", season: "২০২৪-২৫", area: "১ একর", status: "চলমান", expectedHarvest: "ফেব্রুয়ারি ২০২৫" },
            { name: "শাকসবজি", season: "২০২৪-২৫", area: "১ একর", status: "চলমান", expectedHarvest: "চলমান" }
        ],
        pastCrops: [
            { name: "বোরো ধান", season: "২০২৪", area: "৩ একর", production: "১৮০ মণ", income: "৯০,০০০", cost: "৬০,০০০", profit: "৩০,০০০" },
            { name: "আলু", season: "২০২৩-২৪", area: "২ একর", production: "৪০০ মণ", income: "৮০,০০০", cost: "৫০,০০০", profit: "৩০,০০০" },
            { name: "পেঁয়াজ", season: "২০২৩", area: "১ একর", production: "৮০ মণ", income: "৬০,০০০", cost: "৩৫,০০০", profit: "২৫,০০০" }
        ],
        totalInvestment: "২,৫০,০০০",
        totalIncome: "৪,২০,০০০",
        totalProfit: "১,৭০,০০০",
        machineryOwned: ["ট্রাক্টর", "পাওয়ার টিলার", "সেচ পাম্প", "থ্রেশিং মেশিন"],
        irrigationMethod: "গভীর নলকূপ",
        fertilizers: ["ইউরিয়া", "টিএসপি", "এমওপি", "জিপসাম", "জৈব সার"],
        seedSource: "কৃষি অফিস ও বিএডিসি"
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
        console.log("Profile updated:", profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data if needed
    };

    const handleFinancialAction = (action: string) => {
        console.log(`Financial action: ${action}`);
        // এখানে বিভিন্ন আর্থিক অ্যাকশন হ্যান্ডল করা হবে
        alert(`${action} ফিচার শীঘ্রই যোগ করা হবে!`);
    };

    const handleCropAction = (action: string, cropName?: string) => {
        console.log(`Crop action: ${action}`, cropName);
        // এখানে ফসল সংক্রান্ত অ্যাকশন হ্যান্ডল করা হবে
        alert(`${action} ফিচার শীঘ্রই যোগ করা হবে!`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-6 pb-20">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Back Button */}
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            ফিরে যান
                        </Button>
                    </div>

                    {/* Profile Header */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/img/farmer-avatar.jpg" alt="Profile" />
                                        <AvatarFallback className="text-2xl">
                                            {profileData.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-2xl font-bold">{profileData.name}</h1>
                                    <p className="text-muted-foreground">{profileData.occupation}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                                        <Badge variant="secondary">{profileData.experience} অভিজ্ঞতা</Badge>
                                        <Badge variant="outline">{profileData.farmSize}</Badge>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    {!isEditing ? (
                                        <Button onClick={() => setIsEditing(true)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            সম্পাদনা করুন
                                        </Button>
                                    ) : (
                                        <>
                                            <Button onClick={handleSave}>
                                                <Save className="h-4 w-4 mr-2" />
                                                সংরক্ষণ
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel}>
                                                <X className="h-4 w-4 mr-2" />
                                                বাতিল
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    ব্যক্তিগত তথ্য
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">নাম</Label>
                                    {isEditing ? (
                                        <Input
                                            id="name"
                                            value={profileData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium">{profileData.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">জন্ম তারিখ</Label>
                                    {isEditing ? (
                                        <Input
                                            id="dob"
                                            value={profileData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {profileData.dateOfBirth}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর</Label>
                                    {isEditing ? (
                                        <Input
                                            id="nid"
                                            value={profileData.nid}
                                            onChange={(e) => handleInputChange('nid', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-center">
                                            <CreditCard className="h-4 w-4 mr-2" />
                                            {profileData.nid}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="occupation">পেশা</Label>
                                    {isEditing ? (
                                        <Input
                                            id="occupation"
                                            value={profileData.occupation}
                                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-center">
                                            <Briefcase className="h-4 w-4 mr-2" />
                                            {profileData.occupation}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2" />
                                    যোগাযোগের তথ্য
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">মোবাইল নম্বর</Label>
                                    {isEditing ? (
                                        <Input
                                            id="phone"
                                            value={profileData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-center">
                                            <Phone className="h-4 w-4 mr-2" />
                                            {profileData.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">ইমেইল</Label>
                                    {isEditing ? (
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-center">
                                            <Mail className="h-4 w-4 mr-2" />
                                            {profileData.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">ঠিকানা</Label>
                                    {isEditing ? (
                                        <Textarea
                                            id="address"
                                            value={profileData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            rows={3}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium flex items-start">
                                            <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                                            {profileData.address}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Farm Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>কৃষি তথ্য</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="farmSize">জমির পরিমাণ</Label>
                                    {isEditing ? (
                                        <Input
                                            id="farmSize"
                                            value={profileData.farmSize}
                                            onChange={(e) => handleInputChange('farmSize', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium">{profileData.farmSize}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="crops">ফসলের ধরন</Label>
                                    {isEditing ? (
                                        <Input
                                            id="crops"
                                            value={profileData.crops}
                                            onChange={(e) => handleInputChange('crops', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium">{profileData.crops}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">কৃষি অভিজ্ঞতা</Label>
                                    {isEditing ? (
                                        <Input
                                            id="experience"
                                            value={profileData.experience}
                                            onChange={(e) => handleInputChange('experience', e.target.value)}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium">{profileData.experience}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bio */}
                        <Card>
                            <CardHeader>
                                <CardTitle>আমার সম্পর্কে</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">বিবরণ</Label>
                                    {isEditing ? (
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            rows={4}
                                            placeholder="আপনার সম্পর্কে কিছু লিখুন..."
                                        />
                                    ) : (
                                        <p className="text-sm">{profileData.bio}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* বর্তমান ফসল */}
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center">
                                        <Sprout className="h-5 w-5 mr-2" />
                                        বর্তমান ফসল
                                    </CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                                        onClick={() => handleCropAction('নতুন ফসল যোগ করুন')}
                                    >
                                        <Sprout className="h-4 w-4" />
                                        নতুন ফসল যোগ করুন
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {profileData.currentCrops.map((crop, index) => (
                                        <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/30 transition-all duration-200 shadow-sm hover:shadow-md">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Sprout className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <h4 className="font-semibold text-lg">{crop.name}</h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={crop.status === "চলমান" ? "default" : "secondary"}
                                                        className={crop.status === "চলমান" ? "bg-green-100 text-green-800 border-green-300" : ""}
                                                    >
                                                        {crop.status}
                                                    </Badge>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-blue-100"
                                                        onClick={() => handleCropAction('সম্পাদনা', crop.name)}
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                                <div className="bg-blue-50 p-2 rounded-lg">
                                                    <p className="text-blue-600 font-medium">এলাকা</p>
                                                    <p className="text-blue-800 font-semibold">{crop.area}</p>
                                                </div>
                                                <div className="bg-purple-50 p-2 rounded-lg">
                                                    <p className="text-purple-600 font-medium">মৌসুম</p>
                                                    <p className="text-purple-800 font-semibold">{crop.season}</p>
                                                </div>
                                                <div className="col-span-2 bg-orange-50 p-2 rounded-lg">
                                                    <p className="text-orange-600 font-medium">প্রত্যাশিত ফসল কাটা</p>
                                                    <p className="text-orange-800 font-semibold">{crop.expectedHarvest}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs px-3 py-1 hover:bg-blue-50 hover:border-blue-300 flex items-center gap-1"
                                                    onClick={() => handleCropAction('অগ্রগতি আপডেট', crop.name)}
                                                >
                                                    <TrendingUp className="h-3 w-3" />
                                                    অগ্রগতি আপডেট
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs px-3 py-1 hover:bg-green-50 hover:border-green-300 flex items-center gap-1"
                                                    onClick={() => handleCropAction('খরচ রেকর্ড', crop.name)}
                                                >
                                                    <DollarSign className="h-3 w-3" />
                                                    খরচ রেকর্ড
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs px-3 py-1 hover:bg-purple-50 hover:border-purple-300 flex items-center gap-1"
                                                    onClick={() => handleCropAction('ছবি যোগ করুন', crop.name)}
                                                >
                                                    <Camera className="h-3 w-3" />
                                                    ছবি যোগ করুন
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* আর্থিক হিসাব */}
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="flex items-center">
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        আর্থিক হিসাব (বার্ষিক)
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                            onClick={() => handleFinancialAction('বিস্তারিত দেখুন')}
                                        >
                                            <TrendingUp className="h-3 w-3" />
                                            বিস্তারিত দেখুন
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                                            onClick={() => handleFinancialAction('রিপোর্ট ডাউনলোড')}
                                        >
                                            <Package className="h-3 w-3" />
                                            রিপোর্ট ডাউনলোড
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => handleFinancialAction('মোট বিনিয়োগের বিস্তারিত')}
                                    >
                                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200 shadow-sm group-hover:shadow-md">
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <DollarSign className="h-6 w-6 text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-blue-700 mb-1">মোট বিনিয়োগ</p>
                                            <p className="text-3xl font-bold text-blue-800 mb-2">৳{profileData.totalInvestment}</p>
                                            <p className="text-xs text-blue-600">ক্লিক করে বিস্তারিত দেখুন</p>
                                        </div>
                                    </div>

                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => handleFinancialAction('মোট আয়ের বিস্তারিত')}
                                    >
                                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-200 shadow-sm group-hover:shadow-md">
                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <TrendingUp className="h-6 w-6 text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-green-700 mb-1">মোট আয়</p>
                                            <p className="text-3xl font-bold text-green-800 mb-2">৳{profileData.totalIncome}</p>
                                            <p className="text-xs text-green-600">ক্লিক করে বিস্তারিত দেখুন</p>
                                        </div>
                                    </div>

                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => handleFinancialAction('নিট লাভের বিস্তারিত')}
                                    >
                                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-200 shadow-sm group-hover:shadow-md">
                                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Package className="h-6 w-6 text-white" />
                                            </div>
                                            <p className="text-sm font-medium text-purple-700 mb-1">নিট লাভ</p>
                                            <p className="text-3xl font-bold text-purple-800 mb-2">৳{profileData.totalProfit}</p>
                                            <p className="text-xs text-purple-600">ক্লিক করে বিস্তারিত দেখুন</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                        onClick={() => handleFinancialAction('লাভের চার্ট')}
                                    >
                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-medium">লাভের চার্ট</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-green-50 hover:border-green-300 transition-colors"
                                        onClick={() => handleFinancialAction('খরচ বিশ্লেষণ')}
                                    >
                                        <Package className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium">খরচ বিশ্লেষণ</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                                        onClick={() => handleFinancialAction('মাসিক রিপোর্ট')}
                                    >
                                        <Calendar className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm font-medium">মাসিক রিপোর্ট</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-center gap-2 py-3 px-4 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                                        onClick={() => handleFinancialAction('বাজেট পরিকল্পনা')}
                                    >
                                        <DollarSign className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm font-medium">বাজেট পরিকল্পনা</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* গত বছরের ফসলের রেকর্ড */}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                    গত বছরের ফসলের রেকর্ড
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                        onClick={() => handleCropAction('নতুন রেকর্ড যোগ করুন')}
                                    >
                                        <Edit className="h-3 w-3" />
                                        নতুন রেকর্ড যোগ করুন
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                                        onClick={() => handleCropAction('এক্সপোর্ট করুন')}
                                    >
                                        <Package className="h-3 w-3" />
                                        এক্সপোর্ট করুন
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {profileData.pastCrops.map((crop, index) => (
                                    <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 shadow-sm hover:shadow-md">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <h4 className="font-semibold text-xl text-gray-800">{crop.name}</h4>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">{crop.season}</Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-blue-100"
                                                    onClick={() => handleCropAction('গত ফসলের রেকর্ড সম্পাদনা', crop.name)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <p className="text-blue-600 font-medium text-xs">এলাকা</p>
                                                <p className="font-semibold text-blue-800">{crop.area}</p>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="text-green-600 font-medium text-xs">উৎপাদন</p>
                                                <p className="font-semibold text-green-800">{crop.production}</p>
                                            </div>
                                            <div className="bg-red-50 p-3 rounded-lg">
                                                <p className="text-red-600 font-medium text-xs">খরচ</p>
                                                <p className="font-semibold text-red-700">৳{crop.cost}</p>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded-lg">
                                                <p className="text-emerald-600 font-medium text-xs">আয়</p>
                                                <p className="font-semibold text-emerald-700">৳{crop.income}</p>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded-lg">
                                                <p className="text-purple-600 font-medium text-xs">লাভ</p>
                                                <p className="font-semibold text-purple-700">৳{crop.profit}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* যন্ত্রপাতি ও সরঞ্জাম */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Tractor className="h-5 w-5 mr-2" />
                                    যন্ত্রপাতি ও সরঞ্জাম
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {profileData.machineryOwned.map((machine, index) => (
                                        <div key={index} className="flex items-center">
                                            <Badge variant="secondary" className="mr-2">✓</Badge>
                                            <span className="text-sm">{machine}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* সেচ ও অন্যান্য তথ্য */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Droplets className="h-5 w-5 mr-2" />
                                    সেচ ও অন্যান্য তথ্য
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">সেচের পদ্ধতি</Label>
                                    <p className="text-sm mt-1">{profileData.irrigationMethod}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">ব্যবহৃত সার</Label>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {profileData.fertilizers.map((fertilizer, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {fertilizer}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">বীজের উৎস</Label>
                                    <p className="text-sm mt-1">{profileData.seedSource}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <BottomNav activeTab="profile" onTabChange={() => {}} />
        </div>
    );
};

export default Profile;
