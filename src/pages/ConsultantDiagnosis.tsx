import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Camera, Upload, Users, BookOpen, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagnosisRequest {
    id: string;
    farmerName: string;
    location: string;
    crop: string;
    symptoms: string;
    images: string[];
    urgency: "low" | "medium" | "high";
    status: "pending" | "diagnosed" | "completed";
    timestamp: string;
}

interface Disease {
    name: string;
    probability: number;
    treatment: string;
    cost: number;
    type: string;
    guidelines: string[];
    chemicals: Chemical[];
    prevention: string[];
}

interface Chemical {
    name: string;
    dosePerAcre: number;
    unit: string;
    pricePerUnit: number;
    note?: string;
    type: string;
}

const ConsultantDiagnosis = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("requests");
    const [selectedRequest, setSelectedRequest] = useState<DiagnosisRequest | null>(null);
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");

    const [diagnosisRequests, setDiagnosisRequests] = useState<DiagnosisRequest[]>([
        {
            id: "1",
            farmerName: "আব্দুল করিম",
            location: "নোয়াখালী",
            crop: "ধান",
            symptoms: "পাতায় বাদামী দাগ দেখা দিয়েছে। গাছের উপরের অংশ হলুদ হয়ে যাচ্ছে। অনেক পাতা শুকিয়ে যাচ্ছে।",
            images: [],
            urgency: "high",
            status: "pending",
            timestamp: "2024-01-15T10:30:00Z"
        },
        {
            id: "2",
            farmerName: "ফাতেমা খাতুন",
            location: "কুমিল্লা",
            crop: "টমেটো",
            symptoms: "টমেটো গাছের পাতায় কালো দাগ দেখা দিয়েছে। ফলও পচে যাচ্ছে।",
            images: [],
            urgency: "medium",
            status: "pending",
            timestamp: "2024-01-15T09:15:00Z"
        },
        {
            id: "3",
            farmerName: "মোহাম্মদ আলী",
            location: "সিলেট",
            crop: "বেগুন",
            symptoms: "বেগুনের কাণ্ড কেটে দিলে বাদামী রং দেখা যায়। গাছ ঢলে পড়ছে।",
            images: [],
            urgency: "high",
            status: "pending",
            timestamp: "2024-01-15T08:45:00Z"
        }
    ]);

    const diseaseDatabase = {
        "ধান": [
            {
                name: "ব্লাস্ট রোগ",
                probability: 85,
                treatment: "ট্রাইসাইক্লাজল ছত্রাকনাশক প্রয়োগ করুন",
                cost: 800,
                type: "ছত্রাক",
                guidelines: [
                    "আক্রান্ত পাতা ও শিষ কেটে পুড়িয়ে ফেলুন",
                    "ক্ষেতে পানি জমিয়ে রাখুন",
                    "নাইট্রোজেন সার কম দিন"
                ],
                chemicals: [
                    {
                        name: "ট্রাইসাইক্লাজল",
                        dosePerAcre: 400,
                        unit: "গ্রাম",
                        pricePerUnit: 2,
                        type: "ছত্রাকনাশক"
                    }
                ],
                prevention: [
                    "প্রতিরোধী জাত ব্যবহার করুন",
                    "সুষম সার প্রয়োগ করুন",
                    "পরিষ্কার বীজ ব্যবহার করুন"
                ]
            }
        ],
        "টমেটো": [
            {
                name: "লেট ব্লাইট",
                probability: 90,
                treatment: "মেটালাক্সিল + ম্যানকোজেব ছত্রাকনাশক ব্যবহার করুন",
                cost: 600,
                type: "ছত্রাক",
                guidelines: [
                    "আক্রান্ত অংশ কেটে ফেলুন",
                    "গাছের চারপাশে পানি জমতে দেবেন না",
                    "বাতাস চলাচলের ব্যবস্থা করুন"
                ],
                chemicals: [
                    {
                        name: "রিডোমিল গোল্ড",
                        dosePerAcre: 500,
                        unit: "গ্রাম",
                        pricePerUnit: 1.2,
                        type: "ছত্রাকনাশক"
                    }
                ],
                prevention: [
                    "সকালে পানি দিন",
                    "গাছের মধ্যে দূরত্ব ঠিক রাখুন",
                    "প্রতিরোধী জাত লাগান"
                ]
            }
        ]
    };

    const handleDiagnose = (requestId: string) => {
        if (!diagnosis || !treatment) {
            toast({
                title: "অসম্পূর্ণ তথ্য",
                description: "রোগ নির্ণয় ও চিকিৎসা পদ্ধতি লিখুন।",
                variant: "destructive"
            });
            return;
        }

        setDiagnosisRequests(requests =>
            requests.map(request =>
                request.id === requestId
                    ? { ...request, status: "diagnosed" }
                    : request
            )
        );

        toast({
            title: "রোগ নির্ণয় সম্পূর্ণ",
            description: "রোগ নির্ণয় ও চিকিৎসা পরামর্শ কৃষকের কাছে পাঠানো হয়েছে।",
        });

        setSelectedRequest(null);
        setDiagnosis("");
        setTreatment("");
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case "high": return "bg-red-100 text-red-800 border-red-200";
            case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getUrgencyText = (urgency: string) => {
        switch (urgency) {
            case "high": return "জরুরি";
            case "medium": return "মাঝারি";
            case "low": return "সাধারণ";
            default: return "অজানা";
        }
    };

    const tabs = [
        { id: "requests", label: "নির্ণয়ের অনুরোধ", icon: Users },
        { id: "database", label: "রোগের ডাটাবেস", icon: BookOpen },
        { id: "statistics", label: "পরিসংখ্যান", icon: Stethoscope }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="p-4">
                    <h1 className="text-xl font-bold">রোগ নির্ণয় কেন্দ্র</h1>
                    <p className="text-sm text-muted-foreground">কৃষকদের ফসলের রোগ নির্ণয় ও চিকিৎসা পরামর্শ</p>
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
                                {tab.id === "requests" && (
                                    <Badge variant="secondary" className="ml-1">
                                        {diagnosisRequests.filter(r => r.status === "pending").length}
                                    </Badge>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === "requests" && (
                    <div className="space-y-4">
                        {diagnosisRequests.map((request) => (
                            <Card key={request.id} className="relative">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{request.farmerName}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {request.location} • {request.crop}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge className={getUrgencyColor(request.urgency)}>
                                                {getUrgencyText(request.urgency)}
                                            </Badge>
                                            <Badge variant={request.status === "pending" ? "destructive" : "default"}>
                                                {request.status === "pending" ? "অপেক্ষমান" :
                                                    request.status === "diagnosed" ? "নির্ণয় সম্পূর্ণ" : "সম্পূর্ণ"}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">লক্ষণসমূহ:</h4>
                                            <p className="text-sm bg-muted p-3 rounded">{request.symptoms}</p>
                                        </div>

                                        {request.status === "pending" && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium">রোগ নির্ণয়</label>
                                                    <Textarea
                                                        placeholder="রোগের নাম ও বিবরণ লিখুন..."
                                                        value={selectedRequest?.id === request.id ? diagnosis : ""}
                                                        onChange={(e) => {
                                                            setSelectedRequest(request);
                                                            setDiagnosis(e.target.value);
                                                        }}
                                                        rows={3}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium">চিকিৎসা পদ্ধতি</label>
                                                    <Textarea
                                                        placeholder="চিকিৎসার বিস্তারিত পরামর্শ লিখুন..."
                                                        value={selectedRequest?.id === request.id ? treatment : ""}
                                                        onChange={(e) => {
                                                            setSelectedRequest(request);
                                                            setTreatment(e.target.value);
                                                        }}
                                                        rows={4}
                                                    />
                                                </div>

                                                <Button
                                                    onClick={() => handleDiagnose(request.id)}
                                                    className="w-full"
                                                >
                                                    নির্ণয় সম্পূর্ণ করুন
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
                    <div className="space-y-6">
                        {Object.entries(diseaseDatabase).map(([crop, diseases]) => (
                            <div key={crop}>
                                <h3 className="text-lg font-semibold mb-4">{crop} এর রোগসমূহ</h3>
                                <div className="space-y-4">
                                    {diseases.map((disease, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center justify-between">
                                                    <span>{disease.name}</span>
                                                    <Badge variant="outline">{disease.type}</Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-medium mb-2">চিকিৎসা:</h4>
                                                        <p className="text-sm bg-blue-50 p-3 rounded">{disease.treatment}</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium mb-2">নির্দেশনা:</h4>
                                                        <ul className="text-sm space-y-1">
                                                            {disease.guidelines.map((guideline, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                                    {guideline}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium mb-2">প্রতিরোধ:</h4>
                                                        <ul className="text-sm space-y-1">
                                                            {disease.prevention.map((prevention, i) => (
                                                                <li key={i} className="flex items-start gap-2">
                                                                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                                                    {prevention}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium mb-2">প্রয়োজনীয় ওষুধ:</h4>
                                                        <div className="space-y-2">
                                                            {disease.chemicals.map((chemical, i) => (
                                                                <div key={i} className="bg-gray-50 p-3 rounded text-sm">
                                                                    <div className="font-medium">{chemical.name}</div>
                                                                    <div className="text-muted-foreground">
                                                                        মাত্রা: {chemical.dosePerAcre} {chemical.unit}/একর •
                                                                        দাম: ৳{chemical.pricePerUnit}/{chemical.unit}
                                                                    </div>
                                                                </div>
                                                            ))}
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

                {activeTab === "statistics" && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {diagnosisRequests.filter(r => r.status === "pending").length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">অপেক্ষমান নির্ণয়</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {diagnosisRequests.filter(r => r.status === "diagnosed").length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">সম্পূর্ণ নির্ণয়</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {diagnosisRequests.filter(r => r.urgency === "high").length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">জরুরি কেস</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultantDiagnosis;
