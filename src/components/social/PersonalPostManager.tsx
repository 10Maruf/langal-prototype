import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Edit2, 
    Trash2, 
    Search, 
    Filter, 
    Eye,
    Heart,
    MessageCircle,
    Share2,
    TrendingUp,
    Users,
    Zap,
    UserCheck,
    Plus,
    Calendar,
    BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SocialPost } from "@/types/social";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { socialFeedService } from "@/services/socialFeedService";

interface PersonalPostManagerProps {
    onClose?: () => void;
}

export const PersonalPostManager = ({ onClose }: PersonalPostManagerProps) => {
    const { user } = useAuth();
    const { toast } = useToast();
    
    // State management
    const [myPosts, setMyPosts] = useState<SocialPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<SocialPost[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
    const [editedContent, setEditedContent] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
    const [activeTab, setActiveTab] = useState("posts");

    // Load user's posts
    useEffect(() => {
        if (user) {
            const userPosts = socialFeedService.getUserPosts(user.name);
            setMyPosts(userPosts);
            setFilteredPosts(userPosts);
        }
    }, [user]);

    // Filter posts based on search and type
    useEffect(() => {
        let filtered = myPosts;

        // Filter by type
        if (filterType !== "all") {
            filtered = filtered.filter(post => post.type === filterType);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(post => 
                post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredPosts(filtered);
    }, [myPosts, filterType, searchQuery]);

    // Handle post edit
    const handleEditPost = (post: SocialPost) => {
        setEditingPost(post);
        setEditedContent(post.content);
    };

    // Save edited post
    const handleSaveEdit = () => {
        if (editingPost) {
            const updatedPost = socialFeedService.updatePost(
                editingPost.id,
                { content: editedContent },
                user?.name || ""
            );
            
            if (updatedPost) {
                setMyPosts(myPosts.map(p => 
                    p.id === editingPost.id ? updatedPost : p
                ));
                setEditingPost(null);
                setEditedContent("");
                
                toast({
                    title: "পোস্ট আপডেট হয়েছে",
                    description: "আপনার পোস্ট সফলভাবে আপডেট করা হয়েছে।",
                });
            }
        }
    };

    // Handle post delete
    const handleDeletePost = (postId: string) => {
        const success = socialFeedService.deletePost(postId, user?.name || "");
        
        if (success) {
            setMyPosts(myPosts.filter(p => p.id !== postId));
            setShowDeleteDialog(null);
            
            toast({
                title: "পোস্ট মুছে ফেলা হয়েছে",
                description: "আপনার পোস্ট সফলভাবে মুছে ফেলা হয়েছে।",
            });
        }
    };

    // Get post statistics
    const getPostStats = () => {
        const totalLikes = myPosts.reduce((sum, post) => sum + post.likes, 0);
        const totalComments = myPosts.reduce((sum, post) => sum + post.comments, 0);
        const totalShares = myPosts.reduce((sum, post) => sum + post.shares, 0);
        const averageEngagement = myPosts.length > 0
            ? Math.round((totalLikes + totalComments + totalShares) / myPosts.length)
            : 0;

        const mostLikedPost = myPosts.length > 0
            ? myPosts.reduce((max, post) => post.likes > max.likes ? post : max, myPosts[0])
            : null;

        return {
            totalPosts: myPosts.length,
            totalLikes,
            totalComments,
            totalShares,
            averageEngagement,
            mostLikedPost,
            postsByType: {
                general: myPosts.filter(p => p.type === "general").length,
                marketplace: myPosts.filter(p => p.type === "marketplace").length,
                question: myPosts.filter(p => p.type === "question").length,
                advice: myPosts.filter(p => p.type === "advice").length,
                expert_advice: myPosts.filter(p => p.type === "expert_advice").length,
            }
        };
    };

    const stats = getPostStats();

    const typeLabels = {
        general: "সাধারণ",
        marketplace: "বাজার",
        question: "প্রশ্ন",
        advice: "পরামর্শ",
        expert_advice: "বিশেষজ্ঞ পরামর্শ"
    };

    const typeColors = {
        general: "bg-blue-50 text-blue-700 border-blue-200",
        marketplace: "bg-green-50 text-green-700 border-green-200",
        question: "bg-yellow-50 text-yellow-700 border-yellow-200",
        advice: "bg-purple-50 text-purple-700 border-purple-200",
        expert_advice: "bg-indigo-50 text-indigo-700 border-indigo-200"
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "আজ";
        if (diffDays === 1) return "গতকাল";
        if (diffDays < 7) return `${diffDays} দিন আগে`;
        return date.toLocaleDateString('bn-BD');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">আমার পোস্ট ম্যানেজার</h1>
                    <p className="text-muted-foreground">
                        আপনার সকল পোস্ট দেখুন, সম্পাদনা করুন এবং পরিচালনা করুন
                    </p>
                </div>
                {onClose && (
                    <Button variant="outline" onClick={onClose}>
                        বন্ধ করুন
                    </Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="posts">পোস্ট তালিকা</TabsTrigger>
                    <TabsTrigger value="analytics">পরিসংখ্যান</TabsTrigger>
                    <TabsTrigger value="settings">সেটিংস</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="পোস্ট খুঁজুন..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="w-[180px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">সব ধরণের</SelectItem>
                                        <SelectItem value="general">সাধারণ</SelectItem>
                                        <SelectItem value="marketplace">বাজার</SelectItem>
                                        <SelectItem value="question">প্রশ্ন</SelectItem>
                                        <SelectItem value="advice">পরামর্শ</SelectItem>
                                        <SelectItem value="expert_advice">বিশেষজ্ঞ পরামর্শ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {filteredPosts.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-lg font-medium mb-2">কোন পোস্ট নেই</h3>
                                    <p className="text-muted-foreground">
                                        {searchQuery || filterType !== "all" 
                                            ? "আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোন পোস্ট খুঁজে পাওয়া যায়নি।"
                                            : "আপনি এখনো কোন পোস্ট করেননি। প্রথম পোস্ট করুন!"
                                        }
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredPosts.map((post) => (
                                <Card key={post.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className={typeColors[post.type]}>
                                                    {typeLabels[post.type]}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {formatTime(post.postedAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedPost(post)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditPost(post)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteDialog(post.id)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-sm">
                                            {post.content.length > 150 
                                                ? post.content.substring(0, 150) + "..."
                                                : post.content
                                            }
                                        </p>
                                        
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Heart className="h-4 w-4" />
                                                <span>{post.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="h-4 w-4" />
                                                <span>{post.comments}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Share2 className="h-4 w-4" />
                                                <span>{post.shares}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট পোস্ট</p>
                                        <p className="text-2xl font-bold">{stats.totalPosts}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 rounded-full mr-4">
                                        <Heart className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট লাইক</p>
                                        <p className="text-2xl font-bold">{stats.totalLikes}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-full mr-4">
                                        <MessageCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট মন্তব্য</p>
                                        <p className="text-2xl font-bold">{stats.totalComments}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                        <BarChart3 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">গড় এনগেজমেন্ট</p>
                                        <p className="text-2xl font-bold">{stats.averageEngagement}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Post Types Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>পোস্টের ধরণ অনুযায়ী বিভাজন</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(stats.postsByType).map(([type, count]) => (
                                    <div key={type} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className={typeColors[type as keyof typeof typeColors]}>
                                                {typeLabels[type as keyof typeof typeLabels]}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{count}</span>
                                            <span className="text-sm text-muted-foreground">
                                                ({stats.totalPosts > 0 ? Math.round((count / stats.totalPosts) * 100) : 0}%)
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Most Liked Post */}
                    {stats.mostLikedPost && (
                        <Card>
                            <CardHeader>
                                <CardTitle>সবচেয়ে জনপ্রিয় পোস্ট</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm mb-2">
                                        {stats.mostLikedPost.content.length > 200
                                            ? stats.mostLikedPost.content.substring(0, 200) + "..."
                                            : stats.mostLikedPost.content
                                        }
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Heart className="h-4 w-4" />
                                            <span>{stats.mostLikedPost.likes} লাইক</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{stats.mostLikedPost.comments} মন্তব্য</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>পোস্ট সেটিংস</CardTitle>
                            <CardDescription>
                                আপনার পোস্ট সংক্রান্ত পছন্দসমূহ কনফিগার করুন
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">স্বয়ংক্রিয় ব্যাকআপ</h4>
                                    <p className="text-sm text-muted-foreground">
                                        আপনার পোস্টগুলি স্বয়ংক্রিয়ভাবে ব্যাকআপ করুন
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    সক্রিয় করুন
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">ডেটা এক্সপোর্ট</h4>
                                    <p className="text-sm text-muted-foreground">
                                        আপনার সকল পোস্ট ডাউনলোড করুন
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    এক্সপোর্ট করুন
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Edit Post Dialog */}
            <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>পোস্ট সম্পাদনা করুন</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[200px] resize-none"
                            placeholder="আপনার পোস্টের বিষয়বস্তু লিখুন..."
                        />
                        <div className="flex gap-2">
                            <Button onClick={handleSaveEdit}>
                                সংরক্ষণ করুন
                            </Button>
                            <Button variant="outline" onClick={() => setEditingPost(null)}>
                                বাতিল
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>পোস্ট মুছে ফেলুন</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</p>
                        <div className="flex gap-2">
                            <Button 
                                variant="destructive" 
                                onClick={() => showDeleteDialog && handleDeletePost(showDeleteDialog)}
                            >
                                হ্যাঁ, মুছে ফেলুন
                            </Button>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
                                বাতিল
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Post Preview Dialog */}
            <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>পোস্ট প্রিভিউ</DialogTitle>
                    </DialogHeader>
                    {selectedPost && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className={typeColors[selectedPost.type]}>
                                    {typeLabels[selectedPost.type]}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    {formatTime(selectedPost.postedAt)}
                                </span>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm leading-relaxed">{selectedPost.content}</p>
                                
                                {selectedPost.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {selectedPost.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    <span>{selectedPost.likes} লাইক</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{selectedPost.comments} মন্তব্য</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Share2 className="h-4 w-4" />
                                    <span>{selectedPost.shares} শেয়ার</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};