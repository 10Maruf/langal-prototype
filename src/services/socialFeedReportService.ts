import { ReportDetail, ReportStats, ReportType, PostReportReason, CommentReportReason, POST_REPORT_REASONS, COMMENT_REPORT_REASONS, UserType } from '@/types/social';
import { SocialFeedService } from './socialFeedService';

export class SocialFeedReportService {
    private static instance: SocialFeedReportService;
    private reports: ReportDetail[] = [];
    private socialFeedService: SocialFeedService;

    private constructor() {
        this.socialFeedService = SocialFeedService.getInstance();
        this.initializeDummyReports();
    }

    static getInstance(): SocialFeedReportService {
        if (!SocialFeedReportService.instance) {
            SocialFeedReportService.instance = new SocialFeedReportService();
        }
        return SocialFeedReportService.instance;
    }

    // Initialize with dummy reports for demonstration
    private initializeDummyReports() {
        const dummyReports: ReportDetail[] = [
            {
                id: "report_1",
                reportType: "post",
                contentId: "1",
                reportedBy: {
                    id: "user_reporter_1",
                    name: "রহিম উদ্দিন",
                    userType: "farmer"
                },
                reason: POST_REPORT_REASONS[2], // false_info
                description: "এই পোস্টে ভুল কৃষি তথ্য রয়েছে যা অন্যদের ক্ষতি করতে পারে",
                reportedAt: "2024-03-15T10:30:00Z",
                status: "pending",
                content: {
                    text: "এই বছর আমার ধানের ফলন খুবই ভাল হয়েছে। BRRI-29 জাতের ধান বপন করেছিলাম। প্রতি বিঘায় ২৮ মণ ধান পেয়েছি। আর কোন ভাই এই জাত ব্যবহার করেছেন?",
                    author: {
                        name: "আব্দুল করিম",
                        avatar: "/placeholder.svg",
                        location: "নোয়াখালী",
                        verified: true,
                        userType: "farmer"
                    },
                    postedAt: "2024-03-14T08:15:00Z",
                    images: []
                }
            },
            {
                id: "report_2",
                reportType: "comment",
                contentId: "comment_1",
                postId: "2",
                reportedBy: {
                    id: "user_reporter_2",
                    name: "সালমা খাতুন",
                    userType: "customer"
                },
                reason: COMMENT_REPORT_REASONS[1], // inappropriate
                description: "এই কমেন্টে অশ্লীল ভাষা ব্যবহার করা হয়েছে",
                reportedAt: "2024-03-15T14:20:00Z",
                status: "pending",
                content: {
                    text: "আপনার টমেটো দেখে মনে হচ্ছে রোগ লেগেছে। বোর্দো মিশ্রণ স্প্রে করুন এবং নিয়মিত পানি দিন।",
                    author: {
                        name: "ডঃ আশরাফুল আলম",
                        avatar: "/placeholder.svg",
                        location: "ঢাকা",
                        verified: true,
                        isExpert: true,
                        userType: "expert"
                    },
                    postedAt: "2024-03-14T12:30:00Z"
                }
            },
            {
                id: "report_3",
                reportType: "post",
                contentId: "3",
                reportedBy: {
                    id: "user_reporter_3",
                    name: "কামাল হোসেন",
                    userType: "farmer"
                },
                reason: POST_REPORT_REASONS[0], // spam
                description: "এই পোস্ট একই জিনিস বার বার শেয়ার করা হচ্ছে",
                reportedAt: "2024-03-14T16:45:00Z",
                status: "accepted",
                reviewedBy: "admin_1",
                reviewedAt: "2024-03-15T09:00:00Z",
                content: {
                    text: "আমার গমের ক্ষেতে পোকা লেগেছে। কী করতে পারি? দয়া করে সাহায্য করুন।",
                    author: {
                        name: "মতিউর রহমান",
                        avatar: "/placeholder.svg",
                        location: "রাজশাহী",
                        verified: false,
                        userType: "farmer"
                    },
                    postedAt: "2024-03-13T14:20:00Z",
                    images: []
                }
            },
            {
                id: "report_4",
                reportType: "comment",
                contentId: "comment_2",
                postId: "4",
                reportedBy: {
                    id: "user_reporter_4",
                    name: "হাসিনা বেগম",
                    userType: "customer"
                },
                reason: COMMENT_REPORT_REASONS[3], // false_advice
                description: "এই পরামর্শ ভুল এবং ক্ষতিকর হতে পারে",
                reportedAt: "2024-03-13T11:15:00Z",
                status: "declined",
                reviewedBy: "admin_1",
                reviewedAt: "2024-03-14T10:30:00Z",
                content: {
                    text: "দারুণ লাগছে আপনার বেগুন! আমিও এ বছর চাষ করেছি।",
                    author: {
                        name: "নাসির উদ্দিন",
                        avatar: "/placeholder.svg",
                        location: "সিলেট",
                        verified: true,
                        userType: "farmer"
                    },
                    postedAt: "2024-03-12T16:40:00Z"
                }
            },
            {
                id: "report_5",
                reportType: "post",
                contentId: "5",
                reportedBy: {
                    id: "user_reporter_5",
                    name: "আলী আহমদ",
                    userType: "farmer"
                },
                reason: POST_REPORT_REASONS[3], // harassment
                description: "এই পোস্টে অন্য কৃষকদের হয়রানি করা হচ্ছে",
                reportedAt: "2024-03-15T18:30:00Z",
                status: "pending",
                content: {
                    text: "নতুন জাতের আলু চাষ করে দারুণ ফলন পেয়েছি। আলু-৭৮ জাত ব্যবহার করেছি।",
                    author: {
                        name: "জামাল উদ্দিন",
                        avatar: "/placeholder.svg",
                        location: "বগুড়া",
                        verified: true,
                        userType: "farmer"
                    },
                    postedAt: "2024-03-15T15:20:00Z",
                    images: []
                }
            }
        ];

        this.reports = dummyReports;
    }

    // Get all reports
    async getAllReports(): Promise<ReportDetail[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.reports]);
            }, 500);
        });
    }

    // Get reports by status
    async getReportsByStatus(status: "pending" | "accepted" | "declined"): Promise<ReportDetail[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filtered = this.reports.filter(report => report.status === status);
                resolve(filtered);
            }, 300);
        });
    }

    // Get report statistics
    async getReportStats(): Promise<ReportStats> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stats: ReportStats = {
                    totalReports: this.reports.length,
                    pendingReports: this.reports.filter(r => r.status === "pending").length,
                    acceptedReports: this.reports.filter(r => r.status === "accepted").length,
                    declinedReports: this.reports.filter(r => r.status === "declined").length,
                    postReports: this.reports.filter(r => r.reportType === "post").length,
                    commentReports: this.reports.filter(r => r.reportType === "comment").length,
                };
                resolve(stats);
            }, 200);
        });
    }

    // Accept a report and optionally delete content
    async acceptReport(reportId: string, deleteContent: boolean = true, adminNote?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const reportIndex = this.reports.findIndex(r => r.id === reportId);
                    if (reportIndex === -1) {
                        reject(new Error("Report not found"));
                        return;
                    }

                    const report = this.reports[reportIndex];
                    
                    // Update report status
                    this.reports[reportIndex] = {
                        ...report,
                        status: "accepted",
                        reviewedBy: "current_admin", // In real app, get from auth context
                        reviewedAt: new Date().toISOString()
                    };

                    // If deleteContent is true, delete the actual post/comment
                    if (deleteContent) {
                        if (report.reportType === "post") {
                            this.socialFeedService.adminDeletePost(report.contentId);
                        } else if (report.reportType === "comment") {
                            this.socialFeedService.adminDeleteComment(report.contentId, report.postId || "");
                        }
                    }

                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 800);
        });
    }

    // Decline a report
    async declineReport(reportId: string, adminNote?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const reportIndex = this.reports.findIndex(r => r.id === reportId);
                    if (reportIndex === -1) {
                        reject(new Error("Report not found"));
                        return;
                    }

                    const report = this.reports[reportIndex];
                    
                    // Update report status
                    this.reports[reportIndex] = {
                        ...report,
                        status: "declined",
                        reviewedBy: "current_admin", // In real app, get from auth context
                        reviewedAt: new Date().toISOString()
                    };

                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 600);
        });
    }

    // Create a new report (for when users report content)
    async createReport(
        reportType: ReportType,
        contentId: string,
        reason: PostReportReason | CommentReportReason,
        reportedBy: { id: string; name: string; userType: UserType },
        description?: string,
        postId?: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Get content details from social feed service
                    let content;
                    if (reportType === "post") {
                        const post = this.socialFeedService.getPostById(contentId);
                        if (!post) {
                            reject(new Error("Post not found"));
                            return;
                        }
                        content = {
                            text: post.content,
                            author: post.author,
                            postedAt: post.postedAt,
                            images: post.images
                        };
                    } else {
                        const comment = this.socialFeedService.getCommentById(contentId, postId || "");
                        if (!comment) {
                            reject(new Error("Comment not found"));
                            return;
                        }
                        content = {
                            text: comment.content,
                            author: comment.author,
                            postedAt: comment.postedAt
                        };
                    }

                    const newReport: ReportDetail = {
                        id: `report_${Date.now()}`,
                        reportType,
                        contentId,
                        postId,
                        reportedBy,
                        reason,
                        description,
                        reportedAt: new Date().toISOString(),
                        status: "pending",
                        content
                    };

                    this.reports.unshift(newReport);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 400);
        });
    }

    // Get report by ID
    async getReportById(reportId: string): Promise<ReportDetail | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const report = this.reports.find(r => r.id === reportId);
                resolve(report || null);
            }, 200);
        });
    }
}

export default SocialFeedReportService;