import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Sprout, MapPin, Calendar, DollarSign, Timer, Users, TrendingUp, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CropRecommendation {
    name: string;
    cost: number;
    yield: number;
    price: number;
    duration: number;
    easy: boolean;
    quick: boolean;
    profit: number;
    region: string;
    season: string;
    breakdown: {
        seed: number;
        fert: number;
        labor: number;
        irrigation: number;
        other: number;
    };
    plan: {
        phase: string;
        window: string;
        actions: string[];
    }[];
}

interface FarmerQuery {
    id: string;
    farmerName: string;
    location: string;
    landSize: number;
    currentCrop: string;
    season: string;
    budget: number;
    query: string;
    status: "pending" | "responded" | "completed";
    timestamp: string;
}

const ConsultantCrops = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("recommendations");
    const [location, setLocation] = useState("");
    const [season, setSeason] = useState("");
    const [cropType, setCropType] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [farmerQueries, setFarmerQueries] = useState<FarmerQuery[]>([
        {
            id: "1",
            farmerName: "আব্দুল করিম",
            location: "নোয়াখালী",
            landSize: 3,
            currentCrop: "ধান",
            season: "রবি",
            budget: 50000,
            query: "রবি মৌসুমে ধানের পর কোন ফসল চাষ করলে বেশি লাভ হবে? আমার ৩ বিঘা জমি আছে।",
            status: "pending",
            timestamp: "2024-01-15T10:30:00Z"
        },
        {
            id: "2",
            farmerName: "ফাতেমা খাতুন",
            location: "কুমিল্লা",
            landSize: 2,
            currentCrop: "সবজি",
            season: "খরিফ",
            budget: 30000,
            query: "খরিফ মৌসুমে কোন সবজি চাষ করলে ভাল দাম পাওয়া যাবে?",
            status: "pending",
            timestamp: "2024-01-15T09:15:00Z"
        }
    ]);

    const cropDatabase: Record<string, CropRecommendation[]> = {
        "রবি": [
            {
                name: "বোরো ধান",
                cost: 25000,
                yield: 22,
                price: 30,
                duration: 150,
                easy: true,
                quick: false,
                profit: 41000,
                region: "সর্বত্র",
                season: "রবি",
                breakdown: {
                    seed: 2000,
                    fert: 8000,
                    labor: 10000,
                    irrigation: 3000,
                    other: 2000
                },
                plan: [
                    {
                        phase: "বীজতলা প্রস্তুতি",
                        window: "নভেম্বর-ডিসেম্বর",
                        actions: ["জমি চাষ", "বীজ বপন", "পানি সেচ"]
                    },
                    {
                        phase: "চারা রোপণ",
                        window: "ডিসেম্বর-জানুয়ারি",
                        actions: ["চারা উত্তোলন", "রোপণ", "সার প্রয়োগ"]
                    }
                ]
            },
            {
                name: "গম",
                cost: 15000,
                yield: 15,
                price: 25,
                duration: 110,
                easy: true,
                quick: true,
                profit: 22500,
                region: "উত্তরাঞ্চল",
                season: "রবি",
                breakdown: {
                    seed: 1500,
                    fert: 5000,
                    labor: 6000,
                    irrigation: 1500,
                    other: 1000
                },
                plan: [
                    {
                        phase: "বপন",
                        window: "নভেম্বর-ডিসেম্বর",
                        actions: ["জমি প্রস্তুতি", "বীজ বপন", "সার প্রয়োগ"]
                    }
                ]
            }
        ],
        "খরিফ": [
            {
                name: "আমন ধান",
                cost: 18000,
                yield: 18,
                price: 28,
                duration: 120,
                easy: true,
                quick: false,
                profit: 32400,
                region: "সর্বত্র",
                season: "খরিফ",
                breakdown: {
                    seed: 1500,
                    fert: 6000,
                    labor: 8000,
                    irrigation: 1500,
                    other: 1000
                },
                plan: [
                    {
                        phase: "বীজতলা",
                        window: "জুন-জুলাই",
                        actions: ["বীজতলা প্রস্তুতি", "বীজ বপন"]
                    }
                ]
            }
        ]
    };

    const handleRecommendationSubmit = () => {
        if (!location || !season || !cropType || !recommendation) {
            toast({
                title: "অসম্পূর্ণ তথ্য",
                description: "সকল ক্ষেত্র পূরণ করুন।",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "পরামর্শ প্রেরণ করা হয়েছে",
            description: "আপনার ফসল পরামর্শ সফলভাবে প্রকাশিত হয়েছে।",
        });

        // Reset form
        setLocation("");
        setSeason("");
        setCropType("");
        setRecommendation("");
    };

    const handleQueryResponse = (queryId: string, response: string) => {
        setFarmerQueries(queries =>
            queries.map(query =>
                query.id === queryId
                    ? { ...query, status: "responded" }
                    : query
            )
        );

        toast({
            title: "উত্তর প্রেরণ করা হয়েছে",
            description: "কৃষকের প্রশ্নের উত্তর সফলভাবে পাঠানো হয়েছে।",
        });
    };

    const tabs = [
        { id: "recommendations", label: "ফসল পরামর্শ", icon: Sprout },
        { id: "queries", label: "কৃষকের প্রশ্ন", icon: Users },
        { id: "database", label: "ফসল ডাটাবেস", icon: BookOpen }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="p-4">
                    <h1 className="text-xl font-bold">ফসল পরামর্শ কেন্দ্র</h1>
                    <p className="text-sm text-muted-foreground">কৃষকদের জন্য ফসল পরামর্শ প্রদান করুন</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-4 pt-4">
                <div className="flex gap-2 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <Button
                                key={tab.id}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveTab(tab.id)}
                                className="whitespace-nowrap flex items-center gap-2"
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === "recommendations" && (
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>নতুন ফসল পরামর্শ তৈরি করুন</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">অঞ্চল</label>
                                        <Select value={location} onValueChange={setLocation}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="অঞ্চল নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dhaka">ঢাকা বিভাগ</SelectItem>
                                                <SelectItem value="chittagong">চট্টগ্রাম বিভাগ</SelectItem>
                                                <SelectItem value="rajshahi">রাজশাহী বিভাগ</SelectItem>
                                                <SelectItem value="khulna">খুলনা বিভাগ</SelectItem>
                                                <SelectItem value="sylhet">সিলেট বিভাগ</SelectItem>
                                                <SelectItem value="barisal">বরিশাল বিভাগ</SelectItem>
                                                <SelectItem value="rangpur">রংপুর বিভাগ</SelectItem>
                                                <SelectItem value="mymensingh">ময়মনসিংহ বিভাগ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">মৌসুম</label>
                                        <Select value={season} onValueChange={setSeason}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="মৌসুম নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="রবি">রবি</SelectItem>
                                                <SelectItem value="খরিফ">খরিফ</SelectItem>
                                                <SelectItem value="খরিফ-১">খরিফ-১</SelectItem>
                                                <SelectItem value="খরিফ-২">খরিফ-২</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">ফসলের ধরন</label>
                                    <Select value={cropType} onValueChange={setCropType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="ফসল নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ধান">ধান</SelectItem>
                                            <SelectItem value="গম">গম</SelectItem>
                                            <SelectItem value="ভুট্টা">ভুট্টা</SelectItem>
                                            <SelectItem value="সবজি">সবজি</SelectItem>
                                            <SelectItem value="ডাল">ডাল</SelectItem>
                                            <SelectItem value="তেল">তেল জাতীয়</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">পরামর্শ</label>
                                    <Textarea
                                        placeholder="বিস্তারিত ফসল পরামর্শ লিখুন..."
                                        value={recommendation}
                                        onChange={(e) => setRecommendation(e.target.value)}
                                        rows={6}
                                    />
                                </div>

                                <Button onClick={handleRecommendationSubmit} className="w-full">
                                    পরামর্শ প্রকাশ করুন
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "queries" && (
                    <div className="space-y-4">
                        {farmerQueries.map((query) => (
                            <Card key={query.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{query.farmerName}</CardTitle>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {query.location} • {query.landSize} বিঘা • বাজেট: ৳{query.budget.toLocaleString()}
                                            </p>
                                        </div>
                                        <Badge variant={query.status === "pending" ? "destructive" : "default"}>
                                            {query.status === "pending" ? "অপেক্ষমান" : "উত্তর দেওয়া হয়েছে"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">প্রশ্ন:</h4>
                                            <p className="text-sm bg-muted p-3 rounded">{query.query}</p>
                                        </div>

                                        {query.status === "pending" && (
                                            <div>
                                                <Textarea
                                                    placeholder="এই প্রশ্নের উত্তর লিখুন..."
                                                    rows={4}
                                                />
                                                <Button
                                                    className="mt-2"
                                                    onClick={() => handleQueryResponse(query.id, "Sample response")}
                                                >
                                                    উত্তর পাঠান
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === "database" && (
                    <div className="space-y-4">
                        {Object.entries(cropDatabase).map(([season, crops]) => (
                            <div key={season}>
                                <h3 className="text-lg font-semibold mb-3">{season} মৌসুম</h3>
                                <div className="grid gap-4">
                                    {crops.map((crop, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                                                    <div className="flex gap-2">
                                                        {crop.easy && <Badge variant="secondary">সহজ</Badge>}
                                                        {crop.quick && <Badge variant="outline">দ্রুত</Badge>}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="h-4 w-4 text-green-600" />
                                                        <div>
                                                            <p className="font-medium">খরচ</p>
                                                            <p>৳{crop.cost.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                                        <div>
                                                            <p className="font-medium">ফলন</p>
                                                            <p>{crop.yield} মণ/বিঘা</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Timer className="h-4 w-4 text-orange-600" />
                                                        <div>
                                                            <p className="font-medium">সময়</p>
                                                            <p>{crop.duration} দিন</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="h-4 w-4 text-green-600" />
                                                        <div>
                                                            <p className="font-medium">লাভ</p>
                                                            <p>৳{crop.profit.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultantCrops;
