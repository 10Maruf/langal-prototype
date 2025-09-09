import { useState } from "react";
import { PostCard, SocialPost } from "@/components/social/PostCard";
import { CreatePost } from "@/components/social/CreatePost";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Users, Zap, MessageSquare, UserCheck, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ConsultantSocialFeed = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [feedFilter, setFeedFilter] = useState("all");

    const [posts, setPosts] = useState<SocialPost[]>([
        {
            id: "1",
            author: {
                name: "ডঃ আহমদ হাসান",
                avatar: "",
                location: "কৃষি বিশ্ববিদ্যালয়, ময়মনসিংহ",
                verified: true
            },
            content: "এই মৌসুমে ধানের ব্লাস্ট রোগের প্রকোপ বেশি দেখা যাচ্ছে। কৃষকভাইয়েরা নিয়মিত মাঠ পরিদর্শন করুন এবং প্রাথমিক লক্ষণ দেখা দিলেই ট্রাইসাইক্লাজল জাতীয় ছত্রাকনাশক প্রয়োগ করুন।",
            images: [],
            tags: ["ধান", "ব্লাস্ট", "পরামর্শ"],
    type: "expert_advice",
            likes: 156,
            comments: 42,
            shares: 28,
            postedAt: "2024-01-15T10:30:00Z",
            liked: false
        },
        {
            id: "2",
            author: {
                name: "প্রফেসর নাসির উদ্দিন",
                avatar: "",
                location: "শেরেবাংলা কৃষি বিশ্ববিদ্যালয়",
                verified: true
            },
            content: "আগামী সপ্তাহে ভারী বৃষ্টির সম্ভাবনা রয়েছে। যারা আউশ ধান কাটার পরিকল্পনা করেছেন, তারা আবহাওয়া অনুকূল থাকলে এই সপ্তাহেই কাটার ব্যবস্থা নিন।",
            images: [],
            tags: ["আবহাওয়া", "আউশ", "কাটাই"],
    type: "expert_advice",
            likes: 89,
            comments: 15,
            shares: 45,
            postedAt: "2024-01-15T08:15:00Z",
            liked: true
        },
        {
            id: "3",
            author: {
                name: "ডঃ সালমা খাতুন",
                avatar: "",
                location: "কৃষি গবেষণা ইনস্টিটিউট",
                verified: true
            },
            content: "নতুন জাতের হাইব্রিড টমেটো বীজ পরীক্ষামূলকভাবে কয়েকটি জেলায় বিতরণ করা হচ্ছে। এই জাতটি তাপমাত্রা সহনশীল এবং ভাইরাস প্রতিরোধী। আগ্রহী কৃষকরা স্থানীয় কৃষি অফিসে যোগাযোগ করুন।",
            images: [],
            tags: ["টমেটো", "নতুনজাত", "হাইব্রিড"],
            type: "expert_advice",
            likes: 203,
            comments: 67,
            shares: 89,
            postedAt: "2024-01-14T16:45:00Z",
            liked: false
        }
    ]);

    const handleCreatePost = (newPost: Omit<SocialPost, "id" | "postedAt" | "likes" | "comments" | "shares" | "liked">) => {
        const post: SocialPost = {
            ...newPost,
            id: Date.now().toString(),
            postedAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false,
            type: "expert"
        };

        setPosts([post, ...posts]);
        setShowCreatePost(false);

        toast({
            title: "পোস্ট প্রকাশিত হয়েছে",
            description: "আপনার পরামর্শ সফলভাবে শেয়ার করা হয়েছে।",
        });
    };

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const handleComment = (postId: string, comment: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, comments: post.comments + 1 }
                : post
        ));

        toast({
            title: "মন্তব্য যোগ করা হয়েছে",
            description: "আপনার মন্তব্য সফলভাবে পোস্ট করা হয়েছে।",
        });
    };

    const handleShare = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, shares: post.shares + 1 }
                : post
        ));

        toast({
            title: "পোস্ট শেয়ার করা হয়েছে",
            description: "পোস্টটি আপনার নেটওয়ার্কে শেয়ার করা হয়েছে।",
        });
    };

    const filteredPosts = posts.filter(post => {
        if (feedFilter === "all") return true;
        if (feedFilter === "expert") return post.type === "expert";
        if (feedFilter === "question") return post.type === "question";
        if (feedFilter === "success") return post.type === "success";
        return true;
    });

    const filterOptions = [
        { value: "all", label: "সব পোস্ট", icon: TrendingUp },
        { value: "expert", label: "বিশেষজ্ঞ পরামর্শ", icon: UserCheck },
        { value: "question", label: "প্রশ্ন", icon: MessageSquare },
        { value: "success", label: "সফলতার গল্প", icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="flex items-center justify-between p-4">
                    <div>
                        <h1 className="text-xl font-bold">কৃষি পরামর্শ ফিড</h1>
                        <p className="text-sm text-muted-foreground">বিশেষজ্ঞদের পরামর্শ ও কৃষি সংবাদ</p>
                    </div>
                    <Button
                        onClick={() => setShowCreatePost(true)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        পরামর্শ
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="p-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {filterOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = feedFilter === option.value;

                        return (
                            <Button
                                key={option.value}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFeedFilter(option.value)}
                                className="whitespace-nowrap flex items-center gap-1"
                            >
                                <Icon className="h-3 w-3" />
                                {option.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Posts */}
            <div className="px-4 space-y-4">
                {filteredPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                        onComment={handleComment}
                        onShare={handleShare}
                    />
                ))}
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
                        <CreatePost
                            onPost={handleCreatePost}
                            onCancel={() => setShowCreatePost(false)}
                            placeholder="কৃষকদের জন্য পরামর্শ লিখুন..."
                            defaultType="expert"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultantSocialFeed;
