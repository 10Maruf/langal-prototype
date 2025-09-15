import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertTriangle,
    MessageSquare,
    FileText,
    User,
    Calendar,
    CheckCircle,
    XCircle,
    Eye,
    MessageCircle
} from "lucide-react";
import { socialFeedService, PostReport, CommentReport } from "@/services/socialFeedService";
import { useToast } from "@/hooks/use-toast";
import { POST_REPORT_REASONS, COMMENT_REPORT_REASONS } from "@/types/social";

const ReportManagement = () => {
    const { toast } = useToast();
    const [reports, setReports] = useState<{
        postReports: PostReport[];
        commentReports: CommentReport[];
    }>({ postReports: [], commentReports: [] });
    const [selectedReport, setSelectedReport] = useState<PostReport | CommentReport | null>(null);
    const [actionNotes, setActionNotes] = useState("");
    const [activeTab, setActiveTab] = useState("post-reports");

    // Load reports
    useEffect(() => {
        const allReports = socialFeedService.getAllReports();
        setReports(allReports);
    }, []);

    // Refresh reports
    const refreshReports = () => {
        const allReports = socialFeedService.getAllReports();
        setReports(allReports);
    };

    // Handle post report action
    const handlePostReportAction = (reportId: string, action: 'resolved' | 'dismissed') => {
        const success = socialFeedService.handlePostReport(reportId, action, actionNotes);
        if (success) {
            refreshReports();
            setActionNotes("");
            toast({
                title: action === 'resolved' ? "রিপোর্ট সমাধান করা হয়েছে" : "রিপোর্ট বাতিল করা হয়েছে",
                description: action === 'resolved' 
                    ? "পোস্টটি সফলভাবে সরানো হয়েছে।"
                    : "রিপোর্টটি বাতিল করা হয়েছে।",
            });
        }
    };

    // Handle comment report action
    const handleCommentReportAction = (reportId: string, action: 'resolved' | 'dismissed') => {
        const success = socialFeedService.handleCommentReport(reportId, action, actionNotes);
        if (success) {
            refreshReports();
            setActionNotes("");
            toast({
                title: action === 'resolved' ? "রিপোর্ট সমাধান করা হয়েছে" : "রিপোর্ট বাতিল করা হয়েছে",
                description: action === 'resolved' 
                    ? "মন্তব্যটি সফলভাবে সরানো হয়েছে।"
                    : "রিপোর্টটি বাতিল করা হয়েছে।",
            });
        }
    };

    // Get reason label
    const getReasonLabel = (reasonId: string, isComment: boolean = false) => {
        const reasons = isComment ? COMMENT_REPORT_REASONS : POST_REPORT_REASONS;
        const reason = reasons.find(r => r.id === reasonId);
        return reason?.label || reasonId;
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    অপেক্ষমান
                </Badge>;
            case 'resolved':
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    সমাধান করা হয়েছে
                </Badge>;
            case 'dismissed':
                return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    <XCircle className="w-3 h-3 mr-1" />
                    বাতিল করা হয়েছে
                </Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const pendingPostReports = reports.postReports.filter(r => r.status === 'pending');
    const pendingCommentReports = reports.commentReports.filter(r => r.status === 'pending');
    const totalPending = pendingPostReports.length + pendingCommentReports.length;

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                                <p className="text-sm font-medium">মোট অপেক্ষমান</p>
                                <p className="text-2xl font-bold text-yellow-600">{totalPending}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium">পোস্ট রিপোর্ট</p>
                                <p className="text-2xl font-bold text-blue-600">{reports.postReports.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-purple-600" />
                            <div>
                                <p className="text-sm font-medium">মন্তব্য রিপোর্ট</p>
                                <p className="text-2xl font-bold text-purple-600">{reports.commentReports.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium">সমাধানকৃত</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {[...reports.postReports, ...reports.commentReports].filter(r => r.status === 'resolved').length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reports Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="post-reports" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        পোস্ট রিপোর্ট ({reports.postReports.length})
                    </TabsTrigger>
                    <TabsTrigger value="comment-reports" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        মন্তব্য রিপোর্ট ({reports.commentReports.length})
                    </TabsTrigger>
                </TabsList>

                {/* Post Reports */}
                <TabsContent value="post-reports" className="space-y-4">
                    {reports.postReports.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">কোন পোস্ট রিপোর্ট নেই</h3>
                                <p className="text-gray-500">এখনও কোন পোস্ট রিপোর্ট করা হয়নি।</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {reports.postReports.map((report) => (
                                <Card key={report.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <FileText className="h-5 w-5" />
                                                    পোস্ট রিপোর্ট
                                                </CardTitle>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        লেখক: {report.postAuthor}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        রিপোর্টকারী: {report.reportedBy}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(report.reportDate)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(report.status)}
                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                    {getReasonLabel(report.reason)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">পোস্টের বিষয়বস্তু:</h4>
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-sm">{report.postContent}</p>
                                                </div>
                                            </div>

                                            {report.status === 'pending' && (
                                                <div className="flex gap-2 pt-4 border-t">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                                সমাধান করুন
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>পোস্ট রিপোর্ট সমাধান</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <p>আপনি কি নিশ্চিত যে এই পোস্টটি সরাতে চান?</p>
                                                                <Textarea
                                                                    placeholder="মন্তব্য লিখুন (ঐচ্ছিক)..."
                                                                    value={actionNotes}
                                                                    onChange={(e) => setActionNotes(e.target.value)}
                                                                />
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => handlePostReportAction(report.id, 'resolved')}
                                                                    >
                                                                        হ্যাঁ, সরান
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handlePostReportAction(report.id, 'dismissed')}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        বাতিল করুন
                                                    </Button>
                                                </div>
                                            )}

                                            {report.notes && (
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-1">অপারেটর মন্তব্য:</h5>
                                                    <p className="text-sm text-blue-800">{report.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Comment Reports */}
                <TabsContent value="comment-reports" className="space-y-4">
                    {reports.commentReports.length === 0 ? (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">কোন মন্তব্য রিপোর্ট নেই</h3>
                                <p className="text-gray-500">এখনও কোন মন্তব্য রিপোর্ট করা হয়নি।</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {reports.commentReports.map((report) => (
                                <Card key={report.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <MessageCircle className="h-5 w-5" />
                                                    মন্তব্য রিপোর্ট
                                                </CardTitle>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-4 w-4" />
                                                        লেখক: {report.commentAuthor}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        রিপোর্টকারী: {report.reportedBy}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(report.reportDate)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(report.status)}
                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                    {getReasonLabel(report.reason, true)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium mb-2">মন্তব্যের বিষয়বস্তু:</h4>
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-sm">{report.commentContent}</p>
                                                </div>
                                            </div>

                                            {report.status === 'pending' && (
                                                <div className="flex gap-2 pt-4 border-t">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                                সমাধান করুন
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>মন্তব্য রিপোর্ট সমাধান</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <p>আপনি কি নিশ্চিত যে এই মন্তব্যটি সরাতে চান?</p>
                                                                <Textarea
                                                                    placeholder="মন্তব্য লিখুন (ঐচ্ছিক)..."
                                                                    value={actionNotes}
                                                                    onChange={(e) => setActionNotes(e.target.value)}
                                                                />
                                                                <div className="flex gap-2">
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={() => handleCommentReportAction(report.id, 'resolved')}
                                                                    >
                                                                        হ্যাঁ, সরান
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleCommentReportAction(report.id, 'dismissed')}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        বাতিল করুন
                                                    </Button>
                                                </div>
                                            )}

                                            {report.notes && (
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-1">অপারেটর মন্তব্য:</h5>
                                                    <p className="text-sm text-blue-800">{report.notes}</p>
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
        </div>
    );
};

export default ReportManagement;