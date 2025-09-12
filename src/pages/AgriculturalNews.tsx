import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TTSButton } from "@/components/ui/tts-button";
import { Clock, Eye, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AgriculturalNews = () => {
    const navigate = useNavigate();

    const newsItems = [
        {
            id: 1,
            title: "বোরো ধানের বীজ বপনের উপযুক্ত সময়",
            excerpt: "এ বছর বোরো ধানের বীজ বপনের জন্য কৃষি মন্ত্রণালয়ের নির্দেশনা প্রকাশিত হয়েছে।",
            time: "২ ঘন্টা আগে",
            views: "৫৪৩",
            category: "কৃষি পরামর্শ",
            categoryColor: "bg-green-100 text-green-700"
        },
        {
            id: 2,
            title: "নতুন জাতের গমের বীজ বিতরণ শুরু",
            excerpt: "সরকার উচ্চ ফলনশীল গমের নতুন জাত 'বারি গম-৩৪' কৃষকদের মধ্যে বিতরণ শুরু করেছে।",
            time: "৪ ঘন্টা আগে",
            views: "৩২১",
            category: "সরকারি ঘোষণা",
            categoryColor: "bg-blue-100 text-blue-700"
        },
        {
            id: 3,
            title: "কৃষি ভর্তুকির নতুন তালিকা প্রকাশ",
            excerpt: "আগামী মৌসুমে সার ও বীজের উপর ভর্তুকির হার বৃদ্ধি পেয়েছে।",
            time: "৬ ঘন্টা আগে",
            views: "৭৮৯",
            category: "ভর্তুকি",
            categoryColor: "bg-purple-100 text-purple-700"
        },
        {
            id: 4,
            title: "আবহাওয়া সতর্কতা: আগামী সপ্তাহে বৃষ্টির সম্ভাবনা",
            excerpt: "আবহাওয়া অধিদপ্তর জানিয়েছে আগামী সপ্তাহে সারাদেশে মাঝারি থেকে ভারী বৃষ্টি হতে পারে।",
            time: "৮ ঘন্টা আগে",
            views: "৪৫৬",
            category: "আবহাওয়া",
            categoryColor: "bg-orange-100 text-orange-700"
        },
        {
            id: 5,
            title: "জৈব সার উৎপাদনে নতুন প্রযুক্তি",
            excerpt: "কৃষি গবেষণা ইনস্টিটিউট জৈব সার উৎপাদনের উন্নত পদ্ধতি উদ্ভাবন করেছে।",
            time: "১০ ঘন্টা আগে",
            views: "২৩৪",
            category: "গবেষণা",
            categoryColor: "bg-cyan-100 text-cyan-700"
        },
        {
            id: 6,
            title: "কৃষক প্রশিক্ষণ কর্মসূচি চালু",
            excerpt: "সারাদেশে আধুনিক কৃষি প্রযুক্তি বিষয়ে কৃষক প্রশিক্ষণ কর্মসূচি শুরু হয়েছে।",
            time: "১২ ঘন্টা আগে",
            views: "৬৭৮",
            category: "প্রশিক্ষণ",
            categoryColor: "bg-indigo-100 text-indigo-700"
        }
    ];

    return (
        <div className="p-4 pb-20 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">কৃষি সংবাদ</h1>
                        <p className="text-muted-foreground">সর্বশেষ কৃষি সংবাদ ও তথ্য</p>
                    </div>
                </div>
                <TTSButton
                    text="কৃষি সংবাদ। সর্বশেষ কৃষি বিষয়ক সংবাদ ও তথ্য।"
                    size="icon"
                    variant="ghost"
                />
            </div>

            {/* News Grid */}
            <div className="space-y-4">
                {newsItems.map((news) => (
                    <Card key={news.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Badge variant="secondary" className={news.categoryColor}>
                                            {news.category}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg font-bold leading-6 hover:text-primary transition-colors">
                                        {news.title}
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                {news.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{news.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{news.views} দেখা হয়েছে</span>
                                    </div>
                                </div>
                                
                                <TTSButton
                                    text={`${news.title}। ${news.excerpt}`}
                                    size="sm"
                                    variant="outline"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load More Section */}
            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">আরও সংবাদ দেখুন</h3>
                    <p className="text-muted-foreground mb-4">
                        আরও কৃষি সংবাদ ও তথ্যের জন্য আমাদের ওয়েবসাইট ভিজিট করুন
                    </p>
                    <Button variant="outline" className="w-full">
                        আরও সংবাদ লোড করুন
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AgriculturalNews;