import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    CheckCircle,
    XCircle,
    Flag,
    MessageSquare,
    FileText,
    Clock,
    User,
    Calendar,
    AlertTriangle,
    Trash2,
    Eye,
    ArrowLeft
} from "lucide-react";
import { ReportDetail, ReportStats, ReportStatus } from "@/types/social";
import { SocialFeedReportService } from "@/services/socialFeedReportService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SocialFeedReportMng = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<ReportDetail[]>([]);
    const [stats, setStats] = useState<ReportStats>({
        totalReports: 0,
        pendingReports: 0,
        acceptedReports: 0,
        declinedReports: 0,
        postReports: 0,
        commentReports: 0
    });
    const [activeTab, setActiveTab] = useState("pending");
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<ReportDetail | null>(null);
    const [adminNote, setAdminNote] = useState("");
    const { toast } = useToast();

    const reportService = SocialFeedReportService.getInstance();

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        setLoading(true);
        try {
            const allReports = await reportService.getAllReports();
            const reportStats = await reportService.getReportStats();
            setReports(allReports);
            setStats(reportStats);
        } catch (error) {
            console.error('Error loading reports:', error);
            toast({
                title: "ত্রুটি",
                description: "রিপোর্ট লোড করতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptReport = async (reportId: string, deleteContent: boolean = true) => {
        try {
            await reportService.acceptReport(reportId, deleteContent, adminNote);
            await loadReports();
            setSelectedReport(null);
            setAdminNote("");
            toast({
                title: "সফল",
                description: `রিপোর্ট গ্রহণ করা হয়েছে${deleteContent ? ' এবং কন্টেন্ট মুছে ফেলা হয়েছে' : ''}`,
            });
        } catch (error) {
            console.error('Error accepting report:', error);
            toast({
                title: "ত্রুটি",
                description: "রিপোর্ট গ্রহণ করতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        }
    };

    const handleDeclineReport = async (reportId: string) => {
        try {
            await reportService.declineReport(reportId, adminNote);
            await loadReports();
            setSelectedReport(null);
            setAdminNote("");
            toast({
                title: "সফল",
                description: "রিপোর্ট প্রত্যাখ্যান করা হয়েছে",
            });
        } catch (error) {
            console.error('Error declining report:', error);
            toast({
                title: "ত্রুটি",
                description: "রিপোর্ট প্রত্যাখ্যান করতে সমস্যা হয়েছে",
                variant: "destructive",
            });
        }
    };

    const getStatusBadge = (status: ReportStatus) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />অপেক্ষমান</Badge>;
            case "accepted":
                return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />গৃহীত</Badge>;
            case "declined":
                return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />প্রত্যাখ্যাত</Badge>;
            default:
                return <Badge variant="outline">অজানা</Badge>;
        }
    };

    const getReportTypeIcon = (type: string) => {
        return type === "post" ? <FileText className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />;
    };

    const filteredReports = reports.filter(report => {
        if (activeTab === "all") return true;
        return report.status === activeTab;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center">লোড হচ্ছে...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header with Back Button */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/data-operator")}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        ড্যাশবোর্ডে ফিরুন
                    </Button>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">সোশ্যাল ফিড রিপোর্ট ম্যানেজমেন্ট</h1>
                <p className="text-gray-600">পোস্ট এবং কমেন্টের রিপোর্ট পরিচালনা করুন</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">মোট রিপোর্ট</CardTitle>
                        <Flag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalReports}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">অপেক্ষমান</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingReports}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">গৃহীত</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.acceptedReports}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Reports List */}
            <Card>
                <CardHeader>
                    <CardTitle>রিপোর্ট তালিকা</CardTitle>
                    <CardDescription>
                        সোশ্যাল ফিডে রিপোর্ট করা পোস্ট এবং কমেন্টগুলি দেখুন এবং পরিচালনা করুন
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="pending">অপেক্ষমান ({stats.pendingReports})</TabsTrigger>
                            <TabsTrigger value="accepted">গৃহীত ({stats.acceptedReports})</TabsTrigger>
                            <TabsTrigger value="declined">প্রত্যাখ্যাত ({stats.declinedReports})</TabsTrigger>
                            <TabsTrigger value="all">সব ({stats.totalReports})</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="mt-4">
                            {filteredReports.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    কোন রিপোর্ট খুঁজে পাওয়া যায়নি
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredReports.map((report) => (
                                        <Card key={report.id} className="border-l-4 border-l-red-500">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-3 flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            {getReportTypeIcon(report.reportType)}
                                                            <Badge variant="outline">
                                                                {report.reportType === "post" ? "পোস্ট" : "কমেন্ট"}
                                                            </Badge>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <span className="font-medium">কারণ:</span>
                                                                <Badge variant="destructive">{report.reason.label}</Badge>
                                                                {getStatusBadge(report.status)}
                                                            </div>

                                                            <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <Avatar className="w-6 h-6">
                                                                        <AvatarImage src={report.content.author.avatar} />
                                                                        <AvatarFallback>
                                                                            {report.content.author.name.charAt(0)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <span className="text-sm font-medium">{report.content.author.name}</span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {formatDate(report.content.postedAt)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 line-clamp-3">
                                                                    {report.content.text}
                                                                </p>
                                                                {report.content.images && report.content.images.length > 0 && (
                                                                    <div className="mt-2">
                                                                        <span className="text-xs text-gray-500">
                                                                            {report.content.images.length} টি ছবি সংযুক্ত
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="text-sm text-gray-600">
                                                                <div className="flex items-center space-x-4">
                                                                    <span>রিপোর্টকারী: {report.reportedBy.name}</span>
                                                                    <span>তারিখ: {formatDate(report.reportedAt)}</span>
                                                                </div>
                                                                {report.description && (
                                                                    <p className="mt-1 italic">"{report.description}"</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {report.status === "pending" && (
                                                        <div className="flex space-x-2">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        onClick={() => setSelectedReport(report)}
                                                                    >
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        গ্রহণ করুন
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>রিপোর্ট গ্রহণ করুন</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            আপনি কি নিশ্চিত যে এই রিপোর্ট গ্রহণ করতে চান এবং কন্টেন্ট মুছে ফেলতে চান?
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <div className="my-4">
                                                                        <label className="text-sm font-medium">প্রশাসনিক নোট (ঐচ্ছিক):</label>
                                                                        <Textarea
                                                                            placeholder="এই সিদ্ধান্তের কারণ লিখুন..."
                                                                            value={adminNote}
                                                                            onChange={(e) => setAdminNote(e.target.value)}
                                                                            className="mt-1"
                                                                        />
                                                                    </div>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel onClick={() => setAdminNote("")}>
                                                                            বাতিল
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => selectedReport && handleAcceptReport(selectedReport.id, true)}
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                                            গ্রহণ করুন ও মুছে দিন
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => setSelectedReport(report)}
                                                                    >
                                                                        <XCircle className="w-4 h-4 mr-1" />
                                                                        প্রত্যাখ্যান
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>রিপোর্ট প্রত্যাখ্যান করুন</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            আপনি কি নিশ্চিত যে এই রিপোর্ট প্রত্যাখ্যান করতে চান? কন্টেন্ট অপরিবর্তিত থাকবে।
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <div className="my-4">
                                                                        <label className="text-sm font-medium">প্রশাসনিক নোট (ঐচ্ছিক):</label>
                                                                        <Textarea
                                                                            placeholder="এই সিদ্ধান্তের কারণ লিখুন..."
                                                                            value={adminNote}
                                                                            onChange={(e) => setAdminNote(e.target.value)}
                                                                            className="mt-1"
                                                                        />
                                                                    </div>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel onClick={() => setAdminNote("")}>
                                                                            বাতিল
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => selectedReport && handleDeclineReport(selectedReport.id)}
                                                                        >
                                                                            প্রত্যাখ্যান করুন
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default SocialFeedReportMng;
