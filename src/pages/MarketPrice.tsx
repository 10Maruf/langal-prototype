import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TTSButton } from "@/components/ui/tts-button";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MarketPrice = () => {
    const navigate = useNavigate();

    const marketPrices = [
        {
            id: 1,
            name: "ধান (মোটা)",
            price: "২৮",
            unit: "কেজি",
            change: "+২",
            trend: "up",
            market: "ঢাকা"
        },
        {
            id: 2,
            name: "গম",
            price: "৩৫",
            unit: "কেজি", 
            change: "-১",
            trend: "down",
            market: "চট্টগ্রাম"
        },
        {
            id: 3,
            name: "আলু",
            price: "২০",
            unit: "কেজি",
            change: "০",
            trend: "stable",
            market: "রংপুর"
        },
        {
            id: 4,
            name: "পেঁয়াজ",
            price: "৪৫",
            unit: "কেজি",
            change: "+৫",
            trend: "up",
            market: "ফরিদপুর"
        },
        {
            id: 5,
            name: "রসুন",
            price: "১২০",
            unit: "কেজি",
            change: "-৩",
            trend: "down",
            market: "কুমিল্লা"
        },
        {
            id: 6,
            name: "টমেটো",
            price: "৩৮",
            unit: "কেজি",
            change: "+৮",
            trend: "up",
            market: "যশোর"
        }
    ];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="h-4 w-4 text-green-600" />;
            case "down":
                return <TrendingDown className="h-4 w-4 text-red-600" />;
            default:
                return <Minus className="h-4 w-4 text-gray-600" />;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case "up":
                return "text-green-600 bg-green-50 border-green-200";
            case "down":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

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
                        <h1 className="text-2xl font-bold">আজকের বাজারদর</h1>
                        <p className="text-muted-foreground">{new Date().toLocaleDateString('bn-BD')}</p>
                    </div>
                </div>
                <TTSButton
                    text="আজকের বাজারদর। বিভিন্ন ফসল ও পণ্যের সর্বশেষ মূল্য তালিকা।"
                    size="icon"
                    variant="ghost"
                />
            </div>

            {/* Price Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                                {getTrendIcon(item.trend)}
                            </div>
                            <p className="text-sm text-muted-foreground">বাজার: {item.market}</p>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-primary">৳{item.price}</span>
                                    <span className="text-sm text-muted-foreground ml-1">/{item.unit}</span>
                                </div>
                                <Badge 
                                    variant="outline" 
                                    className={`${getTrendColor(item.trend)} font-semibold`}
                                >
                                    {item.change === "০" ? "অপরিবর্তিত" : `${item.change} টাকা`}
                                </Badge>
                            </div>
                            <div className="mt-3">
                                <TTSButton
                                    text={`${item.name}। মূল্য ৳${item.price} প্রতি ${item.unit}। ${item.market} বাজার।`}
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Info Section */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-blue-800">দাম সম্পর্কে তথ্য</h3>
                        <p className="text-blue-700 text-sm">
                            দামগুলো প্রতিদিন সকাল ১০টায় আপডেট হয়। স্থানীয় বাজারের দামে ভিন্নতা থাকতে পারে।
                        </p>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                            সর্বশেষ আপডেট: আজ সকাল ১০:৩০
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MarketPrice;