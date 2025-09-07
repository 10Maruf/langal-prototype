import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard, SocialPost } from "@/components/social/PostCard";
import { CreatePost } from "@/components/social/CreatePost";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Users, Zap, MessageSquare, UserCheck, Filter, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SocialFeed = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
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
        name: "ফাতেমা খাতুন",
        avatar: "",
        location: "কুমিল্লা",
        verified: false
      },
      content: "আমার টমেটো গাছে লেট ব্লাইট রোগ দেখা দিয়েছে। কেউ কি বলতে পারবেন কোন ওষুধ ব্যবহার করলে ভাল হবে? ছবি দেখে মতামত দিন।",
      images: [],
      tags: ["টমেটো", "রোগ", "সাহায্য"],
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
        name: "নুরুল ইসলাম",
        avatar: "",
        location: "রাজশাহী",
        verified: true
      },
      content: "শীতকালে সবজি চাষে সেচ ব্যবস্থাপনা খুবই গুরুত্বপূর্ণ। ভোর ও বিকেলে হালকা সেচ দিলে ভাল ফলাফল পাওয়া যায়। মাটিতে রস ধরে রাখার জন্য মালচিং করুন।",
      images: [],
      tags: ["সবজি", "সেচ", "পরামর্শ", "শীত"],
      type: "advice",
      likes: 56,
      comments: 31,
      shares: 18,
      postedAt: "2024-01-14T14:20:00Z",
      liked: true
    },
    {
      id: "6",
      author: {
        name: "ডঃ মোহাম্মদ রহিম",
        avatar: "",
        location: "কৃষি বিশ্ববিদ্যালয়",
        verified: true,
        isExpert: true
      },
      content: "ধানের ব্লাস্ট রোগ প্রতিরোধে ট্রাইসাইক্লাজোল গ্রুপের ছত্রাকনাশক ব্যবহার করুন। প্রতি লিটার পানিতে ০.৬ গ্রাম মিশিয়ে ১৫ দিন পর পর ২-৩ বার স্প্রে করুন। রোগ দেখা দেওয়ার সাথে সাথেই প্রয়োগ করুন।",
      images: [],
      tags: ["ধান", "ব্লাস্ট", "রোগ", "ছত্রাকনাশক"],
      type: "expert_advice",
      likes: 89,
      comments: 45,
      shares: 32,
      postedAt: "2024-01-15T09:00:00Z",
      liked: false
    },
    {
      id: "7",
      author: {
        name: "প্রফেসর আক্তার হোসেন",
        avatar: "",
        location: "কৃষি গবেষণা ইনস্টিটিউট",
        verified: true,
        isExpert: true
      },
      content: "আধুনিক টমেটো চাষে হাইব্রিড জাতের ব্যবহার বৃদ্ধি পাচ্ছে। BARI টমেটো-১৪ ও ১৫ জাত শীত মৌসুমে চাষের জন্য উপযুক্ত। প্রতি শতকে ১৫০-২০০ গাছ লাগানো যেতে পারে। ভার্মি কম্পোস্ট ব্যবহার করলে ফলন ২০-২৫% বৃদ্ধি পায়।",
      images: [],
      tags: ["টমেটো", "হাইব্রিড", "BARI", "ভার্মি কম্পোস্ট"],
      type: "expert_advice",
      likes: 76,
      comments: 38,
      shares: 28,
      postedAt: "2024-01-14T11:30:00Z",
      liked: true
    },
    {
      id: "5",
      author: {
        name: "সালাহউদ্দিন",
        avatar: "",
        location: "বগুড়া",
        verified: false
      },
      content: "কেউ কি বলতে পারবেন এই সময়ে কোন সবজি লাগালে ভাল দাম পাওয়া যাবে? বাজারের চাহিদা কেমন?",
      images: [],
      tags: ["সবজি", "বাজার", "প্রশ্ন"],
      type: "question",
      likes: 22,
      comments: 28,
      shares: 6,
      postedAt: "2024-01-14T11:30:00Z",
      liked: false
    }
  ]);

  const handleCreatePost = (postData: any) => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      author: {
        name: "কৃষক ভাই",
        avatar: "",
        location: "নোয়াখালী",
        verified: false
      },
      content: postData.content,
      images: postData.images || [],
      tags: postData.tags || [],
      type: postData.type,
      marketplaceLink: postData.marketplaceLink,
      likes: 0,
      comments: 0,
      shares: 0,
      postedAt: new Date().toISOString(),
      liked: false
    };

    setPosts([newPost, ...posts]);
    setShowCreatePost(false);

    toast({
      title: "পোস্ট করা হয়েছে",
      description: "আপনার পোস্ট সফলভাবে প্রকাশিত হয়েছে।",
    });
  };

  const handleLike = (post: SocialPost) => {
    setPosts(posts.map(p =>
      p.id === post.id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const handleComment = (post: SocialPost) => {
    toast({
      title: "মন্তব্য",
      description: "মন্তব্য বৈশিষ্ট্য শীঘ্রই আসছে!",
    });
  };

  const handleShare = (post: SocialPost) => {
    toast({
      title: "শেয়ার",
      description: "পোস্ট শেয়ার করা হয়েছে!",
    });
  };

  const handleMarketplaceClick = (post: SocialPost) => {
    toast({
      title: "বাজারে যাচ্ছে",
      description: "বাজার পেজে নিয়ে যাওয়া হচ্ছে...",
    });
  };

  const filteredPosts = feedFilter === "all"
    ? posts
    : posts.filter(post => post.type === feedFilter);

  const feedFilters = [
    { id: "all", label: "সব", icon: Users },
    { id: "general", label: "সাধারণ", icon: Users },
    { id: "marketplace", label: "বাজার", icon: TrendingUp },
    { id: "question", label: "প্রশ্ন", icon: Zap },
    { id: "advice", label: "পরামর্শ", icon: MessageSquare },
    { id: "expert_advice", label: "বিশেষজ্ঞ পরামর্শ", icon: UserCheck }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">
              {user?.type === 'expert' ? 'কৃষি ফিড ও পরামর্শ' : 'কৃষি ফিড'}
            </h1>
          </div>
          <Button size="sm" onClick={() => setShowCreatePost(!showCreatePost)}>
            <Plus className="h-4 w-4 mr-1" />
            {user?.type === 'expert' ? 'পরামর্শ দিন' : 'পোস্ট করুন'}
          </Button>
        </div>

        {/* Feed Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {feedFilters.map((filter) => {
            const Icon = filter.icon;
            const isExpertAdvice = filter.id === 'expert_advice';
            return (
              <Button
                key={filter.id}
                variant={feedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedFilter(filter.id)}
                className={`flex-shrink-0 ${isExpertAdvice && feedFilter !== filter.id
                  ? 'border-blue-300 text-blue-700 hover:bg-blue-50'
                  : ''
                  }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {filter.label}
                {isExpertAdvice && (
                  <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-700">
                    নতুন
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <CreatePost
          onPost={handleCreatePost}
          onCancel={() => setShowCreatePost(false)}
        />
      )}

      {/* Posts Feed */}
      <div className="space-y-4 p-4">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onMarketplaceClick={handleMarketplaceClick}
          />
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">কোন পোস্ট নেই</h3>
            <p className="text-muted-foreground">
              প্রথম পোস্ট করুন এবং কমিউনিটির সাথে শেয়ার করুন!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeed;