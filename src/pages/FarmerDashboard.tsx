import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TTSButton } from "@/components/ui/tts-button";
import {
    TrendingUp,
    Users,
    CloudSun
} from "lucide-react";

// Import dashboard icons
import socialFeedIcon from "@/assets/dashboard-icons/social-feed.png";
import cropSelectionIcon from "@/assets/dashboard-icons/crop-selection.png";
import diagnosisIcon from "@/assets/dashboard-icons/diagnosis.png";
import marketplaceIcon from "@/assets/dashboard-icons/marketplace.png";
import weatherIcon from "@/assets/dashboard-icons/weather.png";
import marketPriceBdIcon from "@/assets/dashboard-icons/market-price-bd.png";
import newsIcon from "@/assets/dashboard-icons/news.png";
import consultationIcon from "@/assets/dashboard-icons/consultation.png";

const FarmerDashboard = () => {
    const navigate = useNavigate();

    // ড্যাশবোর্ড আইকন এবং রুট ম্যাপিং
    const dashboardItems = [
        {
            id: "social",
            title: "কৃষি ফিড",
            description: "কৃষক সম্প্রদায়ের সাথে যোগাযোগ করুন",
            image: socialFeedIcon,
            route: "/social-feed",
            color: "bg-blue-500",
            stats: "২৪৫ নতুন পোস্ট"
        },
        {
            id: "recommendation",
            title: "ফসল নির্বাচন",
            description: "উপযুক্ত ফসল বেছে নিন",
            image: cropSelectionIcon,
            route: "/recommendation",
            color: "bg-green-500",
            stats: "১৫ টি সুপারিশ"
        },
        {
            id: "diagnosis",
            title: "রোগ নির্ণয়",
            description: "ফসলের রোগ শনাক্ত করুন",
            image: diagnosisIcon,
            route: "/diagnosis",
            color: "bg-red-500",
            stats: "AI সহায়তা"
        },
        {
            id: "marketplace",
            title: "বাজার",
            description: "কেনাবেচা করুন",
            image: marketplaceIcon,
            route: "/marketplace",
            color: "bg-purple-500",
            stats: "৮৯ নতুন পণ্য"
        },
        {
            id: "weather",
            title: "আবহাওয়া",
            description: "আবহাওয়ার পূর্বাভাস দেখুন",
            image: weatherIcon,
            route: "/weather-planning",
            color: "bg-orange-500",
            stats: "৭ দিনের পূর্বাভাস"
        },
        {
            id: "news",
            title: "বাজারদর",
            description: "দৈনিক বাজারদর ও মূল্য তালিকা",
            image: marketPriceBdIcon,
            route: "/news-feed",
            color: "bg-cyan-500",
            stats: "আজকের দর"
        },
        {
            id: "agricultural-news",
            title: "কৃষি সংবাদ",
            description: "কৃষি বিষয়ক সংবাদ ও তথ্য",
            image: newsIcon,
            route: "/news-feed", 
            color: "bg-amber-500",
            stats: "নতুন সংবাদ"
        },
        {
            id: "consultation",
            title: "পরামর্শ",
            description: "বিশেষজ্ঞদের পরামর্শ নিন",
            image: consultationIcon,
            route: "/consultation",
            color: "bg-indigo-500",
            stats: "২৪/৭ সেবা"
        }
    ];

    const handleNavigation = (route: string) => {
        navigate(route);
    };

    const quickStats = [
        { label: "আজকের দর", value: "ধান ২৮ টাকা/কেজি", icon: TrendingUp, color: "text-green-600" },
        { label: "সক্রিয় কৃষক", value: "২,৫৪৩ জন", icon: Users, color: "text-blue-600" },
        { label: "আজকের আবহাওয়া", value: "২৮°সে, মেঘলা", icon: CloudSun, color: "text-orange-600" }
    ];

    return (
        <div className="p-4 pb-20 space-y-6">
            {/* স্বাগত বার্তা */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">স্বাগতম, কৃষক ভাই!</h1>
                            <p className="text-green-100">আপনার কৃষি কাজের সহায়তার জন্য আমরা এখানে আছি</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold">{new Date().toLocaleDateString('bn-BD')}</p>
                            <p className="text-green-100 text-sm">আজ</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* দ্রুত তথ্য */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickStats.map((stat, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="font-semibold">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* মূল ড্যাশবোর্ড মেনু */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">মূল মেনু</h2>
                    <TTSButton
                        text="কৃষি সেবা মেনু। এখানে কৃষি ফিড, ফসল নির্বাচন, রোগ নির্ণয়, বাজার, আবহাওয়া, বাজারদর, এবং পরামর্শ সেবা পাবেন।"
                        size="icon"
                        variant="ghost"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dashboardItems.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                                onClick={() => handleNavigation(item.route)}
                            >
                                <CardContent className="p-6 text-center space-y-3">
                                    <div className="mx-auto w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2">
                                        <img 
                                            src={item.image} 
                                            alt={item.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            {item.stats}
                                        </Badge>
                                    </div>

                                    <div className="mt-2">
                                        <TTSButton
                                            text={`${item.title}। ${item.description}। ${item.stats}`}
                                            size="icon"
                                            variant="outline"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* সাহায্য বিভাগ */}
            <Card>
                <CardContent className="p-6">
                    <div className="text-center space-y-3">
                        <h3 className="text-lg font-semibold">সাহায্য প্রয়োজন?</h3>
                        <p className="text-muted-foreground">
                            কোন সমস্যা হলে আমাদের সাথে যোগাযোগ করুন
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Badge variant="outline" className="py-2 px-4">
                                📞 হটলাইন: ১৬১২৩
                            </Badge>
                            <Badge variant="outline" className="py-2 px-4">
                                📱 SMS: ১৬১২৩
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FarmerDashboard;
