import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    User,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Edit,
    Save,
    ShoppingCart,
    TrendingUp,
    Star,
    Camera,
    Settings,
    Shield,
    ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const CustomerProfile = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || "রহিম আহমেদ",
        email: user?.email || "rahim.ahmed@email.com",
        phone: "০১৭১২৩৪৫৬১২",
        address: "ধানমন্ডি, ঢাকা-১২০৫",
        bio: "আমি একজন নিয়মিত ক্রেতা। তাজা ও মানসম্পন্ন কৃষিপণ্য কিনতে পছন্দ করি।",
        joinDate: "জানুয়ারি ২০২৪",
        avatar: ""
    });

    const [stats] = useState({
        totalOrders: 45,
        totalSpent: 25400,
        favoriteVendors: 8,
        reviews: 12,
        rating: 4.7
    });

    const [recentOrders] = useState([
        {
            id: "1",
            item: "অর্গানিক টমেটো",
            vendor: "সালমা আক্তার",
            amount: 300,
            date: "১৫ জানুয়ারি ২০২৪",
            status: "ডেলিভারি সম্পন্ন"
        },
        {
            id: "2",
            item: "তাজা রুই মাছ",
            vendor: "কবির হোসেন",
            amount: 560,
            date: "১৪ জানুয়ারি ২০২৪",
            status: "ডেলিভারি সম্পন্ন"
        },
        {
            id: "3",
            item: "বাড়ির তৈরি দুধ",
            vendor: "রশিদা বেগম",
            amount: 195,
            date: "১৩ জানুয়ারি ২০২৪",
            status: "সম্পন্ন"
        }
    ]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        toast({
            title: "প্রোফাইল আপডেট",
            description: "আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।",
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data if needed
    };

    const handleInputChange = (field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAvatarChange = () => {
        toast({
            title: "ছবি আপলোড",
            description: "ছবি আপলোড ফিচার শীঘ্রই আসছে।",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/customer-dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                ড্যাশবোর্ডে ফিরুন
                            </Link>
                        </Button>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">আমার প্রোফাইল</h1>
                    <p className="text-muted-foreground">আপনার ব্যক্তিগত তথ্য ও অ্যাকাউন্ট সেটিংস</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="relative mx-auto">
                                    <Avatar className="w-24 h-24 mx-auto">
                                        <AvatarImage src={profileData.avatar} />
                                        <AvatarFallback className="text-2xl">
                                            {profileData.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                        onClick={handleAvatarChange}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <h2 className="text-xl font-semibold">{profileData.name}</h2>
                                    <p className="text-muted-foreground">{profileData.email}</p>
                                    <Badge variant="secondary" className="mt-2">
                                        ✓ যাচাইকৃত ক্রেতা
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{profileData.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{profileData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>যোগদান: {profileData.joinDate}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
                                        <p className="text-xs text-muted-foreground">মোট অর্ডার</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">৳{stats.totalSpent.toLocaleString('bn-BD')}</p>
                                        <p className="text-xs text-muted-foreground">মোট খরচ</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="text-lg">পরিসংখ্যান</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm">রেটিং</span>
                                        </div>
                                        <span className="font-semibold">{stats.rating}/৫.০</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">পছন্দের বিক্রেতা</span>
                                        </div>
                                        <span className="font-semibold">{stats.favoriteVendors}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">রিভিউ দিয়েছেন</span>
                                        </div>
                                        <span className="font-semibold">{stats.reviews}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
                                <Button
                                    variant={isEditing ? "default" : "outline"}
                                    size="sm"
                                    onClick={isEditing ? handleSave : handleEdit}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            সেভ করুন
                                        </>
                                    ) : (
                                        <>
                                            <Edit className="h-4 w-4 mr-2" />
                                            এডিট করুন
                                        </>
                                    )}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">নাম</Label>
                                        <Input
                                            id="name"
                                            value={profileData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">ইমেইল</Label>
                                        <Input
                                            id="email"
                                            value={profileData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">ফোন নম্বর</Label>
                                        <Input
                                            id="phone"
                                            value={profileData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">ঠিকানা</Label>
                                        <Input
                                            id="address"
                                            value={profileData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="bio">পরিচিতি</Label>
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            disabled={!isEditing}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="flex gap-2 mt-4">
                                        <Button onClick={handleSave}>
                                            <Save className="h-4 w-4 mr-2" />
                                            সেভ করুন
                                        </Button>
                                        <Button variant="outline" onClick={handleCancel}>
                                            বাতিল
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader>
                                <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium">{order.item}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    বিক্রেতা: {order.vendor} • {order.date}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">৳{order.amount}</p>
                                                <Badge variant="outline" className="text-xs">
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    সব অর্ডার দেখুন
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Account Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    অ্যাকাউন্ট সেটিংস
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Shield className="h-4 w-4 mr-2" />
                                        পাসওয়ার্ড পরিবর্তন করুন
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Mail className="h-4 w-4 mr-2" />
                                        ইমেইল নোটিফিকেশন
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <User className="h-4 w-4 mr-2" />
                                        প্রাইভেসি সেটিংস
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
