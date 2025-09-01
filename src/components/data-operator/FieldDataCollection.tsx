import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    ClipboardList,
    MapPin,
    Camera,
    FileText,
    AlertTriangle,
    CheckCircle,
    Bug,
    Calendar,
    Plus,
    Eye,
    Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FieldReport {
    id: number;
    reportDate: string;
    operatorName: string;
    unionName: string;
    villageName: string;
    farmerName: string;
    farmerPhone: string;
    cropType: string;
    landArea: string;
    cropHealth: "excellent" | "good" | "fair" | "poor" | "critical";
    diseases: string[];
    fertilizers: Array<{ name: string; quantity: string; date: string }>;
    pesticides: Array<{ name: string; quantity: string; date: string }>;
    gpsCoordinates: { latitude: number; longitude: number };
    photos: string[];
    notes: string;
    marketPrice: number;
    status: "draft" | "submitted" | "processed";
}

const FieldDataCollection = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("new-report");
    const [selectedReport, setSelectedReport] = useState<FieldReport | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    // Sample field reports data
    const [fieldReports, setFieldReports] = useState<FieldReport[]>([
        {
            id: 1,
            reportDate: "০১/০৯/২০২৅",
            operatorName: "রাহিম উদ্দিন",
            unionName: "রামপুর ইউনিয়ন",
            villageName: "পূর্ব রামপুর",
            farmerName: "করিম মিয়া",
            farmerPhone: "০১৭১২৩৪৫৬৭৮",
            cropType: "ধান (বোরো)",
            landArea: "৩ বিঘা",
            cropHealth: "good",
            diseases: ["বাদামী গাছফড়িং", "পাতা পোড়া রোগ"],
            fertilizers: [
                { name: "ইউরিয়া", quantity: "৫০ কেজি", date: "১৫/০৮/২০২৫" },
                { name: "TSP", quantity: "২৫ কেজি", date: "১০/০৮/২০২৫" }
            ],
            pesticides: [
                { name: "ইমিডাক্লোপ্রিড", quantity: "২০০ মিলি", date: "২৫/০৮/২০২৫" }
            ],
            gpsCoordinates: { latitude: 23.4607, longitude: 91.1809 },
            photos: ["জমির ছবি ১", "ফসলের ছবি ১", "রোগাক্রান্ত পাতার ছবি"],
            notes: "ফসলের অবস্থা মোটামুটি ভালো। বৃষ্টির কারণে কিছু রোগ দেখা দিয়েছে।",
            marketPrice: 32,
            status: "submitted"
        },
        {
            id: 2,
            reportDate: "৩১/০৮/২০২৫",
            operatorName: "রাহিম উদ্দিন",
            unionName: "রামপুর ইউনিয়ন",
            villageName: "মধ্য রামপুর",
            farmerName: "আব্দুল জব্বার",
            farmerPhone: "০১৮১২৩৪৫৬৭৮",
            cropType: "আলু",
            landArea: "২ বিঘা",
            cropHealth: "excellent",
            diseases: [],
            fertilizers: [
                { name: "কমপ্লেক্স", quantity: "৪০ কেজি", date: "২০/০৮/২০২৫" }
            ],
            pesticides: [],
            gpsCoordinates: { latitude: 23.4612, longitude: 91.1815 },
            photos: ["আলুর ক্ষেত", "আলু গাছের ছবি"],
            notes: "আলুর ফলন খুবই ভালো হবে বলে আশা করা যাচ্ছে।",
            marketPrice: 25,
            status: "processed"
        }
    ]);

    // New report form state
    const [newReport, setNewReport] = useState<Partial<FieldReport>>({
        reportDate: new Date().toLocaleDateString('bn-BD'),
        operatorName: "রাহিম উদ্দিন",
        unionName: "",
        villageName: "",
        farmerName: "",
        farmerPhone: "",
        cropType: "",
        landArea: "",
        cropHealth: "good",
        diseases: [],
        fertilizers: [],
        pesticides: [],
        notes: "",
        marketPrice: 0,
        status: "draft"
    });

    const cropTypes = [
        "ধান (আউশ)", "ধান (আমন)", "ধান (বোরো)", "গম", "ভুট্টা", "পাট",
        "আলু", "মিষ্টি আলু", "পেঁয়াজ", "রসুন", "টমেটো", "বেগুন", "ফুলকপি", "বাঁধাকপি"
    ];

    const commonDiseases = [
        "বাদামী গাছফড়িং", "সাদা গাছফড়িং", "পাতা পোড়া রোগ", "টুংরো ভাইরাস",
        "ব্লাস্ট রোগ", "ব্যাকটেরিয়াল লিফ ব্লাইট", "শীথ ব্লাইট", "মাজরা পোকা"
    ];

    const getHealthBadge = (health: string) => {
        const healthConfig = {
            excellent: { label: "চমৎকার", class: "bg-green-100 text-green-800" },
            good: { label: "ভালো", class: "bg-blue-100 text-blue-800" },
            fair: { label: "মোটামুটি", class: "bg-yellow-100 text-yellow-800" },
            poor: { label: "খারাপ", class: "bg-orange-100 text-orange-800" },
            critical: { label: "সংকটাপন্ন", class: "bg-red-100 text-red-800" }
        };

        const config = healthConfig[health as keyof typeof healthConfig] || healthConfig.good;
        return <Badge className={config.class}>{config.label}</Badge>;
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            draft: { label: "খসড়া", class: "bg-gray-100 text-gray-800" },
            submitted: { label: "জমাদান", class: "bg-blue-100 text-blue-800" },
            processed: { label: "প্রক্রিয়াজাত", class: "bg-green-100 text-green-800" }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
        return <Badge className={config.class}>{config.label}</Badge>;
    };

    const handleSubmitReport = () => {
        if (!newReport.farmerName || !newReport.cropType || !newReport.unionName) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন",
                variant: "destructive",
            });
            return;
        }

        const reportToSubmit = {
            ...newReport,
            id: fieldReports.length + 1,
            status: "submitted" as const,
            gpsCoordinates: { latitude: 23.4607 + Math.random() * 0.01, longitude: 91.1809 + Math.random() * 0.01 },
            photos: ["জমির ছবি", "ফসলের ছবি"]
        } as FieldReport;

        setFieldReports(prev => [reportToSubmit, ...prev]);

        // Reset form
        setNewReport({
            reportDate: new Date().toLocaleDateString('bn-BD'),
            operatorName: "রাহিম উদ্দিন",
            unionName: "",
            villageName: "",
            farmerName: "",
            farmerPhone: "",
            cropType: "",
            landArea: "",
            cropHealth: "good",
            diseases: [],
            fertilizers: [],
            pesticides: [],
            notes: "",
            marketPrice: 0,
            status: "draft"
        });

        toast({
            title: "সফল",
            description: "ফিল্ড রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে",
        });

        setActiveTab("reports");
    };

    const handleViewReport = (report: FieldReport) => {
        setSelectedReport(report);
        setIsViewOpen(true);
    };

    const addFertilizer = () => {
        const fertilizers = newReport.fertilizers || [];
        setNewReport({
            ...newReport,
            fertilizers: [...fertilizers, { name: "", quantity: "", date: "" }]
        });
    };

    const addPesticide = () => {
        const pesticides = newReport.pesticides || [];
        setNewReport({
            ...newReport,
            pesticides: [...pesticides, { name: "", quantity: "", date: "" }]
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    ফিল্ড ডেটা সংগ্রহ ও রিপোর্টিং
                </CardTitle>
                <CardDescription>
                    ইউনিয়ন পর্যায়ে কৃষকদের তথ্য সংগ্রহ করুন এবং সরকারের কাছে রিপোর্ট পাঠান
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="new-report">নতুন রিপোর্ট</TabsTrigger>
                        <TabsTrigger value="reports">রিপোর্ট তালিকা</TabsTrigger>
                    </TabsList>

                    {/* নতুন রিপোর্ট */}
                    <TabsContent value="new-report" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* মৌলিক তথ্য */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">মৌলিক তথ্য</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>ইউনিয়ন</Label>
                                        <Input
                                            value={newReport.unionName || ""}
                                            onChange={(e) => setNewReport({ ...newReport, unionName: e.target.value })}
                                            placeholder="ইউনিয়নের নাম"
                                        />
                                    </div>
                                    <div>
                                        <Label>গ্রাম</Label>
                                        <Input
                                            value={newReport.villageName || ""}
                                            onChange={(e) => setNewReport({ ...newReport, villageName: e.target.value })}
                                            placeholder="গ্রামের নাম"
                                        />
                                    </div>
                                    <div>
                                        <Label>কৃষকের নাম</Label>
                                        <Input
                                            value={newReport.farmerName || ""}
                                            onChange={(e) => setNewReport({ ...newReport, farmerName: e.target.value })}
                                            placeholder="কৃষকের পূর্ণ নাম"
                                        />
                                    </div>
                                    <div>
                                        <Label>কৃষকের ফোন</Label>
                                        <Input
                                            value={newReport.farmerPhone || ""}
                                            onChange={(e) => setNewReport({ ...newReport, farmerPhone: e.target.value })}
                                            placeholder="০১XXXXXXXXX"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* ফসলের তথ্য */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">ফসলের তথ্য</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>ফসলের ধরন</Label>
                                        <Select onValueChange={(value) => setNewReport({ ...newReport, cropType: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="ফসল নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cropTypes.map((crop) => (
                                                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>জমির পরিমাণ</Label>
                                        <Input
                                            value={newReport.landArea || ""}
                                            onChange={(e) => setNewReport({ ...newReport, landArea: e.target.value })}
                                            placeholder="যেমন: ৩ বিঘা"
                                        />
                                    </div>
                                    <div>
                                        <Label>ফসলের স্বাস্থ্য</Label>
                                        <Select
                                            value={newReport.cropHealth || "good"}
                                            onValueChange={(value) => setNewReport({ ...newReport, cropHealth: value as any })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="excellent">চমৎকার</SelectItem>
                                                <SelectItem value="good">ভালো</SelectItem>
                                                <SelectItem value="fair">মোটামুটি</SelectItem>
                                                <SelectItem value="poor">খারাপ</SelectItem>
                                                <SelectItem value="critical">সংকটাপন্ন</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>বাজার দর (কেজি প্রতি টাকা)</Label>
                                        <Input
                                            type="number"
                                            value={newReport.marketPrice || ""}
                                            onChange={(e) => setNewReport({ ...newReport, marketPrice: Number(e.target.value) })}
                                            placeholder="বর্তমান বাজার দর"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* রোগ ও পোকামাকড় */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Bug className="h-4 w-4" />
                                    রোগ ও পোকামাকড়
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {commonDiseases.map((disease) => (
                                        <label key={disease} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={(newReport.diseases || []).includes(disease)}
                                                onChange={(e) => {
                                                    const diseases = newReport.diseases || [];
                                                    if (e.target.checked) {
                                                        setNewReport({ ...newReport, diseases: [...diseases, disease] });
                                                    } else {
                                                        setNewReport({ ...newReport, diseases: diseases.filter(d => d !== disease) });
                                                    }
                                                }}
                                                className="rounded"
                                            />
                                            <span className="text-sm">{disease}</span>
                                        </label>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* সার ও কীটনাশক */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        সার ব্যবহার
                                        <Button size="sm" onClick={addFertilizer}>
                                            <Plus className="h-3 w-3 mr-1" />যোগ করুন
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {(newReport.fertilizers || []).map((fertilizer, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2 p-2 border rounded">
                                            <Input
                                                placeholder="সারের নাম"
                                                value={fertilizer.name}
                                                onChange={(e) => {
                                                    const fertilizers = [...(newReport.fertilizers || [])];
                                                    fertilizers[index] = { ...fertilizer, name: e.target.value };
                                                    setNewReport({ ...newReport, fertilizers });
                                                }}
                                            />
                                            <Input
                                                placeholder="পরিমাণ"
                                                value={fertilizer.quantity}
                                                onChange={(e) => {
                                                    const fertilizers = [...(newReport.fertilizers || [])];
                                                    fertilizers[index] = { ...fertilizer, quantity: e.target.value };
                                                    setNewReport({ ...newReport, fertilizers });
                                                }}
                                            />
                                            <Input
                                                placeholder="তারিখ"
                                                value={fertilizer.date}
                                                onChange={(e) => {
                                                    const fertilizers = [...(newReport.fertilizers || [])];
                                                    fertilizers[index] = { ...fertilizer, date: e.target.value };
                                                    setNewReport({ ...newReport, fertilizers });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center justify-between">
                                        কীটনাশক ব্যবহার
                                        <Button size="sm" onClick={addPesticide}>
                                            <Plus className="h-3 w-3 mr-1" />যোগ করুন
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {(newReport.pesticides || []).map((pesticide, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-2 p-2 border rounded">
                                            <Input
                                                placeholder="কীটনাশকের নাম"
                                                value={pesticide.name}
                                                onChange={(e) => {
                                                    const pesticides = [...(newReport.pesticides || [])];
                                                    pesticides[index] = { ...pesticide, name: e.target.value };
                                                    setNewReport({ ...newReport, pesticides });
                                                }}
                                            />
                                            <Input
                                                placeholder="পরিমাণ"
                                                value={pesticide.quantity}
                                                onChange={(e) => {
                                                    const pesticides = [...(newReport.pesticides || [])];
                                                    pesticides[index] = { ...pesticide, quantity: e.target.value };
                                                    setNewReport({ ...newReport, pesticides });
                                                }}
                                            />
                                            <Input
                                                placeholder="তারিখ"
                                                value={pesticide.date}
                                                onChange={(e) => {
                                                    const pesticides = [...(newReport.pesticides || [])];
                                                    pesticides[index] = { ...pesticide, date: e.target.value };
                                                    setNewReport({ ...newReport, pesticides });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* মন্তব্য ও জমা */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">অতিরিক্ত মন্তব্য</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    value={newReport.notes || ""}
                                    onChange={(e) => setNewReport({ ...newReport, notes: e.target.value })}
                                    placeholder="ফসলের অবস্থা, সমস্যা বা বিশেষ কোনো তথ্য লিখুন..."
                                    className="min-h-[100px]"
                                />
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">
                                        <Camera className="h-4 w-4 mr-2" />
                                        ছবি যোগ করুন
                                    </Button>
                                    <Button onClick={handleSubmitReport} className="bg-green-600 hover:bg-green-700">
                                        <Send className="h-4 w-4 mr-2" />
                                        রিপোর্ট জমা দিন
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* রিপোর্ট তালিকা */}
                    <TabsContent value="reports" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">জমাদানকৃত রিপোর্ট ({fieldReports.length})</h3>
                        </div>

                        <div className="space-y-3">
                            {fieldReports.map((report) => (
                                <Card key={report.id} className="hover:bg-gray-50 cursor-pointer">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-4">
                                                    <h4 className="font-medium">{report.farmerName}</h4>
                                                    <Badge variant="outline">{report.cropType}</Badge>
                                                    {getHealthBadge(report.cropHealth)}
                                                    {getStatusBadge(report.status)}
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {report.villageName}, {report.unionName}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {report.reportDate}
                                                    </span>
                                                    <span>{report.landArea}</span>
                                                </div>
                                                {report.diseases.length > 0 && (
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                                                        <span className="text-orange-600">রোগ: {report.diseases.join(", ")}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewReport(report)}
                                            >
                                                <Eye className="h-3 w-3 mr-1" />
                                                বিস্তারিত
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* বিস্তারিত রিপোর্ট ডায়ালগ */}
                <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>ফিল্ড রিপোর্ট বিস্তারিত</DialogTitle>
                            <DialogDescription>
                                {selectedReport?.farmerName} - {selectedReport?.reportDate}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedReport && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <Label className="font-medium">ইউনিয়ন</Label>
                                        <p className="text-sm">{selectedReport.unionName}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium">গ্রাম</Label>
                                        <p className="text-sm">{selectedReport.villageName}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium">ফসল</Label>
                                        <p className="text-sm">{selectedReport.cropType}</p>
                                    </div>
                                    <div>
                                        <Label className="font-medium">জমির পরিমাণ</Label>
                                        <p className="text-sm">{selectedReport.landArea}</p>
                                    </div>
                                </div>

                                <div>
                                    <Label className="font-medium">ফসলের স্বাস্থ্য</Label>
                                    <div className="mt-1">{getHealthBadge(selectedReport.cropHealth)}</div>
                                </div>

                                {selectedReport.diseases.length > 0 && (
                                    <div>
                                        <Label className="font-medium">চিহ্নিত রোগ</Label>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {selectedReport.diseases.map((disease, index) => (
                                                <Badge key={index} variant="destructive">{disease}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedReport.fertilizers.length > 0 && (
                                        <div>
                                            <Label className="font-medium">ব্যবহৃত সার</Label>
                                            <div className="space-y-1 mt-1">
                                                {selectedReport.fertilizers.map((fertilizer, index) => (
                                                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                                        {fertilizer.name} - {fertilizer.quantity} ({fertilizer.date})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedReport.pesticides.length > 0 && (
                                        <div>
                                            <Label className="font-medium">ব্যবহৃত কীটনাশক</Label>
                                            <div className="space-y-1 mt-1">
                                                {selectedReport.pesticides.map((pesticide, index) => (
                                                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                                        {pesticide.name} - {pesticide.quantity} ({pesticide.date})
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {selectedReport.notes && (
                                    <div>
                                        <Label className="font-medium">মন্তব্য</Label>
                                        <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{selectedReport.notes}</p>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                                        বন্ধ করুন
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default FieldDataCollection;
