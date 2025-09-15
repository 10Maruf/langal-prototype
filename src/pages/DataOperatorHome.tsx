import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    UserCheck,
    Sprout,
    Users,
    CloudSun,
    BarChart3,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    Home,
    ArrowLeft,
    Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DataOperatorHome = () => {
    const navigate = useNavigate();

    // Dashboard menu items with icons
    const dashboardMenuItems = [
        {
            id: "profile-verification",
            title: "প্রোফাইল যাচাই",
            description: "কৃষকদের প্রোফাইল যাচাই ও অনুমোদন",
            icon: UserCheck,
            bgColor: "bg-blue-500",
            hoverColor: "hover:bg-blue-600",
            count: 12,
            route: "/data-operator/profile-verification"
        },
        {
            id: "crop-verification",
            title: "ফসল যাচাই",
            description: "ফসলের তথ্য যাচাই ও লোকেশন সামারি",
            icon: Sprout,
            bgColor: "bg-green-500",
            hoverColor: "hover:bg-green-600",
            count: 25,
            route: "/data-operator/crop-verification"
        },
        {
            id: "register-farmer",
            title: "কৃষক নিবন্ধন",
            description: "নতুন কৃষক নিবন্ধন করুন",
            icon: Users,
            bgColor: "bg-purple-500",
            hoverColor: "hover:bg-purple-600",
            count: 8,
            route: "/data-operator/register-farmer"
        },
        {
            id: "field-data",
            title: "মাঠ পর্যায়ের তথ্য",
            description: "আবহাওয়া ও কৃষি তথ্য সংগ্রহ",
            icon: CloudSun,
            bgColor: "bg-orange-500",
            hoverColor: "hover:bg-orange-600",
            count: 15,
            route: "/data-operator/field-data"
        },
        {
            id: "reports",
            title: "রিপোর্ট ও বিশ্লেষণ",
            description: "ডেটা রিপোর্ট ও পরিসংখ্যান",
            icon: BarChart3,
            bgColor: "bg-indigo-500",
            hoverColor: "hover:bg-indigo-600",
            count: 7,
            route: "/data-operator/reports"
        },
        {
            id: "statistics",
            title: "পরিসংখ্যান",
            description: "সামগ্রিক পরিসংখ্যান ও ট্রেন্ড",
            icon: TrendingUp,
            bgColor: "bg-teal-500",
            hoverColor: "hover:bg-teal-600",
            count: 20,
            route: "/data-operator/statistics"
        },
        {
            id: "social-feed-reports",
            title: "সোশ্যাল ফিড রিপোর্ট",
            description: "পোস্ট ও কমেন্ট রিপোর্ট পরিচালনা",
            icon: Shield,
            bgColor: "bg-red-500",
            hoverColor: "hover:bg-red-600",
            count: 15,
            route: "/data-operator/social-feed-reports"
        }
    ];

    // Sample stats data
    const statsData = {
        totalFarmers: 45,
        cropVerifications: 25,
        approvedProfiles: 32,
        pendingTasks: 13
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                মূল ড্যাশবোর্ড
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">ডেটা অপারেটর ড্যাশবোর্ড</h1>
                                <p className="text-gray-600">কৃষি তথ্য ব্যবস্থাপনা ও যাচাইকরণ কেন্দ্র</p>
                            </div>
                        </div>
                        <Home className="h-8 w-8 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">মোট কৃষক</p>
                                    <p className="text-3xl font-bold">{statsData.totalFarmers}</p>
                                </div>
                                <Users className="h-12 w-12 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">ফসল যাচাই</p>
                                    <p className="text-3xl font-bold">{statsData.cropVerifications}</p>
                                </div>
                                <Sprout className="h-12 w-12 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">অনুমোদিত প্রোফাইল</p>
                                    <p className="text-3xl font-bold">{statsData.approvedProfiles}</p>
                                </div>
                                <CheckCircle className="h-12 w-12 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100">মুলতুবি কাজ</p>
                                    <p className="text-3xl font-bold">{statsData.pendingTasks}</p>
                                </div>
                                <AlertTriangle className="h-12 w-12 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {dashboardMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Card
                                key={item.id}
                                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-0 shadow-md"
                                onClick={() => navigate(item.route)}
                            >
                                <CardContent className="p-8 text-center">
                                    <div className={`${item.bgColor} ${item.hoverColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                                        <IconComponent className="h-10 w-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge variant="secondary" className="bg-gray-100">
                                            {item.count} টি কাজ
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DataOperatorHome;
