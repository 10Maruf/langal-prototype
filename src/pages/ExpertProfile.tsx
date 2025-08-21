import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
    User,
    MapPin,
    Phone,
    Mail,
    GraduationCap,
    Briefcase,
    Edit,
    Save,
    X,
    Award,
    Users,
    MessageSquare,
    TrendingUp,
    Calendar,
    Building,
    FileText,
    Star,
    Clock,
    ArrowLeft
} from "lucide-react";

const ExpertProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        name: "ডঃ মোহাম্মদ রহিম",
        email: "dr.rahim@expert.com",
        phone: "০১৭১২৩৪৫৬৭৮",
        address: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়, ময়মনসিংহ",
        qualification: "পিএইচডি ইন এগ্রিকালচার",
        experience: "১৫ বছর",
        specialization: ["ফসল উৎপাদন", "মাটি ব্যবস্থাপনা", "পোকামাকড় নিয়ন্ত্রণ", "জৈব কৃষি"],
        workplace: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়",
        designation: "অধ্যাপক",
        bio: "আমি ১৫ বছরের অভিজ্ঞতাসম্পন্ন একজন কৃষি বিশেষজ্ঞ। আমার বিশেষত্ব হলো আধুনিক কৃষি প্রযুক্তি ও জৈব কৃষি। আমি কৃষকদের উৎপাদনশীলতা বৃদ্ধিতে সহায়তা করি।",
        awards: [
            { name: "শ্রেষ্ঠ কৃষি বিজ্ঞানী পুরস্কার", year: "২০২৩", organization: "কৃষি মন্ত্রণালয়" },
            { name: "বাংলাদেশ একাডেমি অব সায়েন্স পুরস্কার", year: "২০২১", organization: "বাংলাদেশ একাডেমি অব সায়েন্স" }
        ],
        publications: [
            { title: "আধুনিক ধান চাষ পদ্ধতি", journal: "বাংলাদেশ কৃষি গবেষণা জার্নাল", year: "২০২৪" },
            { title: "জৈব সার ব্যবহারে মাটির উর্বরতা", journal: "কৃষি বিজ্ঞান পত্রিকা", year: "২০২৩" }
        ],
        consultationStats: {
            totalConsultations: 342,
            successfulSolutions: 318,
            averageRating: 4.8,
            totalFarmersHelped: 275,
            thisMonthConsultations: 28
        }
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
        console.log("Expert profile updated:", profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data if needed
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-6 pb-20">
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            ফিরে যান
                        </Button>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">আমার প্রোফাইল</h1>
                    <p className="text-muted-foreground">বিশেষজ্ঞ প্রোফাইল ও তথ্য ব্যবস্থাপনা</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">প্রোফাইল</TabsTrigger>
                        <TabsTrigger value="stats">পরিসংখ্যান</TabsTrigger>
                        <TabsTrigger value="achievements">অর্জন</TabsTrigger>
                        <TabsTrigger value="settings">সেটিংস</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <div className="grid gap-6">
                            {/* Basic Profile Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                                            <AvatarFallback className="text-2xl">
                                                {profileData.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-xl">{profileData.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4" />
                                                {profileData.designation}
                                            </CardDescription>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <Building className="h-4 w-4" />
                                                {profileData.workplace}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        variant={isEditing ? "destructive" : "outline"}
                                        onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                                    >
                                        {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                                        {isEditing ? "বাতিল" : "সম্পাদনা"}
                                    </Button>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">ইমেইল</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="email"
                                                    value={profileData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                />
                                            ) : (
                                                <p className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    {profileData.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">ফোন</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="phone"
                                                    value={profileData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                />
                                            ) : (
                                                <p className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    {profileData.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="qualification">শিক্ষাগত যোগ্যতা</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="qualification"
                                                    value={profileData.qualification}
                                                    onChange={(e) => handleInputChange("qualification", e.target.value)}
                                                />
                                            ) : (
                                                <p className="flex items-center gap-2 text-sm">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    {profileData.qualification}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="experience">অভিজ্ঞতা</Label>
                                            {isEditing ? (
                                                <Input
                                                    id="experience"
                                                    value={profileData.experience}
                                                    onChange={(e) => handleInputChange("experience", e.target.value)}
                                                />
                                            ) : (
                                                <p className="flex items-center gap-2 text-sm">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    {profileData.experience}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">ঠিকানা</Label>
                                        {isEditing ? (
                                            <Input
                                                id="address"
                                                value={profileData.address}
                                                onChange={(e) => handleInputChange("address", e.target.value)}
                                            />
                                        ) : (
                                            <p className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {profileData.address}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>বিশেষত্ব</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.specialization.map((spec, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {spec}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">পরিচিতি</Label>
                                        {isEditing ? (
                                            <Textarea
                                                id="bio"
                                                value={profileData.bio}
                                                onChange={(e) => handleInputChange("bio", e.target.value)}
                                                className="min-h-[100px]"
                                            />
                                        ) : (
                                            <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={handleCancel}>
                                                বাতিল
                                            </Button>
                                            <Button onClick={handleSave}>
                                                <Save className="h-4 w-4 mr-2" />
                                                সংরক্ষণ
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats">
                        <div className="grid gap-6">
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <MessageSquare className="h-8 w-8 text-blue-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-muted-foreground">মোট পরামর্শ</p>
                                                <p className="text-2xl font-bold">{profileData.consultationStats.totalConsultations}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <Users className="h-8 w-8 text-green-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-muted-foreground">সাহায্যপ্রাপ্ত কৃষক</p>
                                                <p className="text-2xl font-bold">{profileData.consultationStats.totalFarmersHelped}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <Star className="h-8 w-8 text-yellow-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-muted-foreground">রেটিং</p>
                                                <p className="text-2xl font-bold">{profileData.consultationStats.averageRating}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <TrendingUp className="h-8 w-8 text-purple-600" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-muted-foreground">সফলতার হার</p>
                                                <p className="text-2xl font-bold">
                                                    {Math.round((profileData.consultationStats.successfulSolutions / profileData.consultationStats.totalConsultations) * 100)}%
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Monthly Performance */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>এই মাসের কর্মক্ষমতা</CardTitle>
                                    <CardDescription>বর্তমান মাসের পরামর্শ ও কার্যক্রম</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">এই মাসের পরামর্শ</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {profileData.consultationStats.thisMonthConsultations}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="text-sm text-muted-foreground">
                                            গত মাসের তুলনায় ১৫% বৃদ্ধি পেয়েছে
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="achievements">
                        <div className="grid gap-6">
                            {/* Awards */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        পুরস্কার ও সম্মাননা
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {profileData.awards.map((award, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-semibold">{award.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{award.organization}</p>
                                                </div>
                                                <Badge variant="outline">{award.year}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Publications */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        গবেষণা প্রকাশনা
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {profileData.publications.map((publication, index) => (
                                            <div key={index} className="p-4 border rounded-lg">
                                                <h3 className="font-semibold">{publication.title}</h3>
                                                <p className="text-sm text-muted-foreground">{publication.journal}</p>
                                                <Badge variant="outline" className="mt-2">{publication.year}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>অ্যাকাউন্ট সেটিংস</CardTitle>
                                <CardDescription>আপনার প্রোফাইল ও গোপনীয়তা সেটিংস</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">সেটিংস অপশন শীঘ্রই যোগ করা হবে</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default ExpertProfile;
