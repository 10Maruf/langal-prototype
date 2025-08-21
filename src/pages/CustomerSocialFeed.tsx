import { useState } from "react";
import { PostCard, SocialPost } from "@/components/social/PostCard";
import { CreatePost } from "@/components/social/CreatePost";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Users, Zap, MessageSquare, UserCheck, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CustomerSocialFeed = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [feedFilter, setFeedFilter] = useState("all");

    const [posts, setPosts] = useState<SocialPost[]>([
        {
            id: "1",
            author: {
                name: "আব্দুল করিম",
                avatar: "",
                location: "নোয়াখালী",
                verified: true
            },
            content: "এই বছর আমার ধানের ফলন খুবই ভাল হয়েছে। BRRI-29 জাতের ধান বপন করেছিলাম। প্রতি বিঘায় ২৮ মণ ধান পেয়েছি। আর কোন ভাই এই জাত ব্যবহার করেছেন?",
            images: [],
            tags: ["ধান", "BRRI29", "ফলন"],
            type: "general",
            likes: 34,
            comments: 12,
            shares: 5,
            postedAt: "2024-01-15T10:30:00Z",
            liked: false
        },
        {
            id: "2",
            author: {
                name: "সালমা আক্তার",
                avatar: "",
                location: "ঢাকা",
                verified: false
            },
            content: "আমি নিয়মিত অর্গানিক সবজি কিনি। কোথায় ভাল মানের অর্গানিক সবজি পাওয়া যায়? দাম একটু বেশি হলেও সমস্যা নেই।",
            images: [],
            tags: ["অর্গানিক", "সবজি", "কেনাকাটা"],
            type: "question",
            likes: 18,
            comments: 23,
            shares: 8,
            postedAt: "2024-01-15T08:15:00Z",
            liked: true
        },
        {
            id: "3",
            author: {
                name: "রহিম উদ্দিন",
                avatar: "",
                location: "ফেনী",
                verified: true
            },
            content: "আমার কাছে অতিরিক্ত ইউরিয়া সার আছে। ভাল দামে বিক্রয় করব। আগ্রহীরা যোগাযোগ করুন।",
            images: [],
            tags: ["সার", "বিক্রয়", "ইউরিয়া"],
            type: "marketplace",
            marketplaceLink: {
                title: "ইউরিয়া সার (৫০ কেজি)",
                price: 950,
                category: "সার"
            },
            likes: 25,
            comments: 15,
            shares: 12,
            postedAt: "2024-01-14T16:45:00Z",
            liked: false
        },
        {
            id: "4",
            author: {
                name: "ফারিয়া খান",
                avatar: "",
                location: "চট্টগ্রাম",
                verified: false
            },
            content: "আমি নতুন গৃহিণী। বাজার করার সময় কিভাবে বুঝবো সবজি তাজা কিনা? অভিজ্ঞ বোনেরা পরামর্শ দিন।",
            images: [],
            tags: ["সবজি", "পরামর্শ", "নতুন"],
            type: "advice",
            likes: 45,
            comments: 31,
            shares: 18,
            postedAt: "2024-01-14T14:20:00Z",
            liked: true
        },
        {
            id: "5",
            author: {
                name: "কবির হোসেন",
                avatar: "",
                location: "সিলেট",
                verified: true
            },
            content: "আমার দোকানে এই সপ্তাহে বিশেষ ছাড়! তাজা মাছ ২০% কম দামে। আগ্রহীরা যোগাযোগ করুন।",
            images: [],
            tags: ["মাছ", "ছাড়", "দোকান"],
            type: "marketplace",
            marketplaceLink: {
                title: "তাজা রুই মাছ",
                price: 280,
                category: "মাছ"
            },
            likes: 28,
            comments: 19,
            shares: 14,
            postedAt: "2024-01-14T12:10:00Z",
            liked: false
        },
        {
            id: "6",
            author: {
                name: "ডঃ মোহাম্মদ রহিম",
                avatar: "",
                location: "কৃষি বিশ্ববিদ্যালয়",
                verified: true
            },
            content: "শীতকালে পুষ্টিকর খাবার খাওয়া জরুরি। মৌসুমী ফল ও সবজি খান। বিশেষ করে গাজর, পালং শাক, কমলা খুবই উপকারী।",
            images: [],
            tags: ["পুষ্টি", "শীত", "স্বাস্থ্য", "সবজি"],
            type: "advice",
            likes: 89,
            comments: 42,
            shares: 35,
            postedAt: "2024-01-13T15:30:00Z",
            liked: true
        }
    ]);

    const handleCreatePost = (postData: any) => {
        const newPost: SocialPost = {
            id: String(posts.length + 1),
            author: {
                name: user?.name || "ক্রেতা",
                avatar: "",
                location: "ঢাকা",
                verified: false
            },
            content: postData.content,
            images: [],
            tags: postData.tags || [],
            type: postData.type || "general",
            likes: 0,
            comments: 0,
            shares: 0,
            postedAt: new Date().toISOString(),
            liked: false
        };

        setPosts([newPost, ...posts]);
        setShowCreatePost(false);

        toast({
            title: "পোস্ট প্রকাশিত হয়েছে",
            description: "আপনার পোস্টটি সফলভাবে প্রকাশিত হয়েছে।",
        });
    };

    const handleLike = (post: SocialPost) => {
        setPosts(posts.map(p =>
            p.id === post.id
                ? {
                    ...p,
                    liked: !p.liked,
                    likes: p.liked ? p.likes - 1 : p.likes + 1
                }
                : p
        ));
    };

    const handleComment = (post: SocialPost) => {
        toast({
            title: "কমেন্ট",
            description: "কমেন্ট ফিচার শীঘ্রই আসছে।",
        });
    };

    const handleShare = (post: SocialPost) => {
        toast({
            title: "শেয়ার",
            description: "পোস্টটি শেয়ার করা হয়েছে।",
        });
    };

    const filteredPosts = posts.filter(post => {
        if (feedFilter === "all") return true;
        return post.type === feedFilter;
    });

    const filterOptions = [
        { value: "all", label: "সব পোস্ট", icon: Zap },
        { value: "general", label: "সাধারণ", icon: MessageSquare },
        { value: "question", label: "প্রশ্ন", icon: MessageSquare },
        { value: "advice", label: "পরামর্শ", icon: UserCheck },
        { value: "marketplace", label: "বাজার", icon: TrendingUp }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">ক্রেতা সম্প্রদায়</p>
                    <p className="text-lg font-bold">২,৫৪৩</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">আজকের পোস্ট</p>
                    <p className="text-lg font-bold">১২৮</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-full">
                        <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">সক্রিয় এখন</p>
                    <p className="text-lg font-bold">৪৫৬</p>
                </div>
            </div>

            {/* Create Post Button */}
            <Button
                onClick={() => setShowCreatePost(true)}
                className="w-full mb-4"
                size="lg"
            >
                <Plus className="w-4 h-4 mr-2" />
                নতুন পোস্ট লিখুন
            </Button>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {filterOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Button
                            key={option.value}
                            variant={feedFilter === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFeedFilter(option.value)}
                            className="whitespace-nowrap"
                        >
                            <Icon className="w-4 h-4 mr-1" />
                            {option.label}
                        </Button>
                    );
                })}
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onLike={() => handleLike(post)}
                        onComment={() => handleComment(post)}
                        onShare={() => handleShare(post)}
                    />
                ))}
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
                <CreatePost
                    onPost={handleCreatePost}
                    onCancel={() => setShowCreatePost(false)}
                />
            )}
        </div>
    );
};

export default CustomerSocialFeed;
