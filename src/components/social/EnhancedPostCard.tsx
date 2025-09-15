import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TTSButton } from "@/components/ui/tts-button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
    Heart, 
    MessageCircle, 
    Share2, 
    MoreHorizontal, 
    MapPin, 
    ExternalLink, 
    UserCheck,
    Flag,
    Edit2,
    Trash2,
    Send,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SocialPost, PostComment, POST_REPORT_REASONS, COMMENT_REPORT_REASONS } from "@/types/social";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { socialFeedService } from "@/services/socialFeedService";

interface EnhancedPostCardProps {
    post: SocialPost;
    onLike: (post: SocialPost) => void;
    onShare: (post: SocialPost) => void;
    onMarketplaceClick?: (post: SocialPost) => void;
    onDelete?: (postId: string) => void;
    onUpdate?: (postId: string, updates: Partial<SocialPost>) => void;
}

export const EnhancedPostCard = ({
    post,
    onLike,
    onShare,
    onMarketplaceClick,
    onDelete,
    onUpdate
}: EnhancedPostCardProps) => {
    const { user } = useAuth();
    const { toast } = useToast();
    
    // State management
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportCommentId, setReportCommentId] = useState<string | null>(null);
    const [showFullContent, setShowFullContent] = useState(false);

    // Load comments when showing comments section
    const loadComments = () => {
        if (!showComments) {
            const postComments = socialFeedService.getComments(post.id);
            setComments(postComments);
        }
        setShowComments(!showComments);
    };

    // Handle comment submission
    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;

        const comment = socialFeedService.addComment(
            post.id,
            newComment,
            {
                name: user?.name || "ব্যবহারকারী",
                avatar: "/placeholder.svg",
                userType: user?.type || "farmer",
                isExpert: user?.type === "expert"
            }
        );

        setComments([...comments, comment]);
        setNewComment("");
        
        toast({
            title: "মন্তব্য যোগ করা হয়েছে",
            description: "আপনার মন্তব্য সফলভাবে পোস্ট করা হয়েছে।",
        });
    };

    // Handle comment like
    const handleCommentLike = (commentId: string) => {
        const updatedComment = socialFeedService.toggleCommentLike(post.id, commentId);
        if (updatedComment) {
            setComments(comments.map(c => 
                c.id === commentId ? updatedComment : c
            ));
        }
    };

    // Handle post edit
    const handleEditSave = () => {
        if (onUpdate) {
            onUpdate(post.id, { content: editedContent });
            setIsEditing(false);
            toast({
                title: "পোস্ট আপডেট হয়েছে",
                description: "আপনার পোস্ট সফলভাবে আপডেট করা হয়েছে।",
            });
        }
    };

    // Handle post report
    const handleReportPost = () => {
        if (!reportReason) return;

        socialFeedService.reportPost(post.id, reportReason);
        setShowReportDialog(false);
        setReportReason("");
        
        toast({
            title: "রিপোর্ট জমা দেওয়া হয়েছে",
            description: "আমরা আপনার রিপোর্ট পর্যালোচনা করব।",
        });
    };

    // Handle comment report
    const handleReportComment = (commentId: string) => {
        if (!reportReason) return;

        socialFeedService.reportComment(post.id, commentId, reportReason);
        setShowReportDialog(false);
        setReportReason("");
        setReportCommentId(null);
        
        toast({
            title: "মন্তব্য রিপোর্ট করা হয়েছে",
            description: "আমরা আপনার রিপোর্ট পর্যালোচনা করব।",
        });
    };

    // Utility functions
    const typeColors = {
        general: "bg-blue-50 text-blue-700 border-blue-200",
        marketplace: "bg-green-50 text-green-700 border-green-200",
        question: "bg-yellow-50 text-yellow-700 border-yellow-200",
        advice: "bg-purple-50 text-purple-700 border-purple-200",
        expert_advice: "bg-indigo-50 text-indigo-700 border-indigo-200"
    };

    const typeLabels = {
        general: "সাধারণ",
        marketplace: "বাজার",
        question: "প্রশ্ন",
        advice: "পরামর্শ",
        expert_advice: "বিশেষজ্ঞ পরামর্শ"
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return "এখনই";
        if (diffHours < 24) return `${diffHours} ঘন্টা আগে`;
        if (diffDays < 7) return `${diffDays} দিন আগে`;
        return date.toLocaleDateString('bn-BD');
    };

    const shouldTruncateContent = post.content.length > 300;
    const displayContent = shouldTruncateContent && !showFullContent 
        ? post.content.substring(0, 300) + "..." 
        : post.content;

    const isOwnPost = post.isOwnPost || (user?.name === post.author.name);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                                {post.author.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{post.author.name}</span>
                                {post.author.verified && (
                                    <span className="text-green-600 text-xs">✓</span>
                                )}
                                {post.author.isExpert && (
                                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                        <UserCheck className="h-3 w-3 mr-1" />
                                        বিশেষজ্ঞ
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{post.author.location}</span>
                                <span>•</span>
                                <span>{formatTime(post.postedAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={typeColors[post.type]}>
                            {typeLabels[post.type]}
                        </Badge>
                        <TTSButton
                            text={post.content}
                            authorName={post.author.name}
                            size="icon"
                            variant="ghost"
                        />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {isOwnPost && (
                                    <>
                                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            সম্পাদনা
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            onClick={() => onDelete?.(post.id)}
                                            className="text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            মুছে ফেলুন
                                        </DropdownMenuItem>
                                    </>
                                )}
                                {!isOwnPost && (
                                    <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                                        <Flag className="h-4 w-4 mr-2" />
                                        রিপোর্ট করুন
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Post Content */}
                {isEditing ? (
                    <div className="space-y-2">
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[100px] resize-none"
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleEditSave}>
                                সংরক্ষণ
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedContent(post.content);
                                }}
                            >
                                বাতিল
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm leading-relaxed">{displayContent}</p>
                        {shouldTruncateContent && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFullContent(!showFullContent)}
                                className="px-0 text-primary h-auto"
                            >
                                {showFullContent ? (
                                    <>
                                        <ChevronUp className="h-4 w-4 mr-1" />
                                        কম দেখুন
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4 mr-1" />
                                        আরো দেখুন
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Images */}
                {post.images.length > 0 && (
                    <div className={cn(
                        "grid gap-2 rounded-lg overflow-hidden max-w-2xl mx-auto",
                        post.images.length === 1 && "grid-cols-1",
                        post.images.length === 2 && "grid-cols-2",
                        post.images.length >= 3 && "grid-cols-2"
                    )}>
                        {post.images.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative bg-muted overflow-hidden rounded-md",
                                    // Single image: wider aspect ratio on mobile, more constrained on desktop
                                    post.images.length === 1 && "aspect-[4/3] sm:aspect-[3/2] max-h-64 sm:max-h-80",
                                    // Two images: square on mobile, rectangular on desktop
                                    post.images.length === 2 && "aspect-square sm:aspect-[4/3] max-h-48 sm:max-h-60",
                                    // Multiple images: smaller squares
                                    post.images.length >= 3 && "aspect-square max-h-32 sm:max-h-40",
                                    post.images.length === 3 && index === 0 && "row-span-2 max-h-64 sm:max-h-80"
                                )}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                />
                                {post.images.length > 4 && index === 3 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                                        +{post.images.length - 4}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Marketplace Link */}
                {post.marketplaceLink && (
                    <Card className="border-2 border-accent/20 bg-accent/5">
                        <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-sm">{post.marketplaceLink.title}</h4>
                                    <p className="text-lg font-bold text-primary">
                                        ৳{post.marketplaceLink.price.toLocaleString('bn-BD')}
                                    </p>
                                    <Badge variant="outline" className="text-xs mt-1">
                                        {post.marketplaceLink.category}
                                    </Badge>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onMarketplaceClick?.(post)}
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    দেখুন
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>

            <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onLike(post)}
                            className={cn(
                                "h-8 px-2",
                                post.liked && "text-red-500"
                            )}
                        >
                            <Heart className={cn(
                                "h-4 w-4 mr-1",
                                post.liked && "fill-current"
                            )} />
                            <span className="text-xs">{post.likes}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={loadComments}
                            className="h-8 px-2"
                        >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="text-xs">{post.comments}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onShare(post)}
                            className="h-8 px-2"
                        >
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">{post.shares}</span>
                        </Button>
                    </div>
                </div>
            </CardFooter>

            {/* Comments Section */}
            {showComments && (
                <CardContent className="pt-0 space-y-4">
                    {/* Comment Input */}
                    <div className="flex gap-2 items-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>
                                {user?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <Textarea
                                placeholder="একটি মন্তব্য লিখুন..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px] resize-none"
                            />
                            <Button 
                                size="sm" 
                                onClick={handleCommentSubmit}
                                disabled={!newComment.trim()}
                            >
                                <Send className="h-4 w-4 mr-1" />
                                মন্তব্য করুন
                            </Button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-3">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-2 items-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.author.avatar} />
                                    <AvatarFallback>
                                        {comment.author.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="bg-muted rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">
                                                {comment.author.name}
                                            </span>
                                            {comment.author.isExpert && (
                                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                                    <UserCheck className="h-3 w-3 mr-1" />
                                                    বিশেষজ্ঞ
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm">{comment.content}</p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                        <span>{formatTime(comment.postedAt)}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleCommentLike(comment.id)}
                                            className={cn(
                                                "h-6 px-2 text-xs",
                                                comment.liked && "text-red-500"
                                            )}
                                        >
                                            <Heart className={cn(
                                                "h-3 w-3 mr-1",
                                                comment.liked && "fill-current"
                                            )} />
                                            {comment.likes}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setReportCommentId(comment.id);
                                                setShowReportDialog(true);
                                            }}
                                            className="h-6 px-2 text-xs"
                                        >
                                            <Flag className="h-3 w-3 mr-1" />
                                            রিপোর্ট
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}

            {/* Report Dialog */}
            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {reportCommentId ? 'মন্তব্য রিপোর্ট করুন' : 'পোস্ট রিপোর্ট করুন'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Select value={reportReason} onValueChange={setReportReason}>
                            <SelectTrigger>
                                <SelectValue placeholder="রিপোর্টের কারণ নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {(reportCommentId ? COMMENT_REPORT_REASONS : POST_REPORT_REASONS).map((reason) => (
                                    <SelectItem key={reason.id} value={reason.id}>
                                        <div>
                                            <div className="font-medium">{reason.label}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {reason.description}
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => reportCommentId ? handleReportComment(reportCommentId) : handleReportPost()}
                                disabled={!reportReason}
                            >
                                রিপোর্ট জমা দিন
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowReportDialog(false);
                                    setReportReason("");
                                    setReportCommentId(null);
                                }}
                            >
                                বাতিল
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};