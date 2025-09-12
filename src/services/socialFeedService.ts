// Central Social Feed Service - Facebook-like system for all user types
import { SocialPost, PostComment } from '@/types/social';

export class SocialFeedService {
    private static instance: SocialFeedService;
    private posts: SocialPost[] = [];
    private comments: { [postId: string]: PostComment[] } = {};
    private reportedPosts: Set<string> = new Set();
    private reportedComments: Set<string> = new Set();

    static getInstance(): SocialFeedService {
        if (!SocialFeedService.instance) {
            SocialFeedService.instance = new SocialFeedService();
        }
        return SocialFeedService.instance;
    }

    // Initialize with dummy data including images
    initializeDummyData() {
        this.posts = [
            {
                id: "1",
                author: {
                    name: "আব্দুল করিম",
                    avatar: "/placeholder.svg",
                    location: "নোয়াখালী",
                    verified: true,
                    userType: "farmer"
                },
                content: "এই বছর আমার ধানের ফলন খুবই ভাল হয়েছে। BRRI-29 জাতের ধান বপন করেছিলাম। প্রতি বিঘায় ২৮ মণ ধান পেয়েছি। আর কোন ভাই এই জাত ব্যবহার করেছেন?",
                images: [
                    "/langal-prototype/src/assets/crops/rice.jpg",
                    "/langal-prototype/src/assets/marketplace/rice seed.png"
                ],
                tags: ["ধান", "BRRI29", "ফলন"],
                type: "general",
                likes: 34,
                comments: 12,
                shares: 5,
                postedAt: "2024-01-15T10:30:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "2",
                author: {
                    name: "ফাতেমা খাতুন",
                    avatar: "/placeholder.svg",
                    location: "কুমিল্লা",
                    verified: false,
                    userType: "farmer"
                },
                content: "আমার টমেটো গাছে লেট ব্লাইট রোগ দেখা দিয়েছে। কেউ কি বলতে পারবেন কোন ওষুধ ব্যবহার করলে ভাল হবে? ছবি দেখে মতামত দিন।",
                images: [
                    "/langal-prototype/src/assets/crops/tomato.jpg"
                ],
                tags: ["টমেটো", "রোগ", "সাহায্য"],
                type: "question",
                likes: 18,
                comments: 23,
                shares: 8,
                postedAt: "2024-01-15T08:15:00Z",
                liked: true,
                isOwnPost: false
            },
            {
                id: "3",
                author: {
                    name: "রহিম উদ্দিন",
                    avatar: "/placeholder.svg",
                    location: "ফেনী",
                    verified: true,
                    userType: "farmer"
                },
                content: "আমার কাছে অতিরিক্ত ইউরিয়া সার আছে। ভাল দামে বিক্রয় করব। আগ্রহীরা যোগাযোগ করুন।",
                images: [
                    "/langal-prototype/src/assets/marketplace/urea-fertilizer.png"
                ],
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
                liked: false,
                isOwnPost: false
            },
            {
                id: "4",
                author: {
                    name: "ডঃ মোহাম্মদ রহিম",
                    avatar: "/placeholder.svg",
                    location: "কৃষি বিশ্ববিদ্যালয়",
                    verified: true,
                    isExpert: true,
                    userType: "expert"
                },
                content: "ধানের ব্লাস্ট রোগ প্রতিরোধে ট্রাইসাইক্লাজোল গ্রুপের ছত্রাকনাশক ব্যবহার করুন। প্রতি লিটার পানিতে ০.৬ গ্রাম মিশিয়ে ১৫ দিন পর পর ২-৩ বার স্প্রে করুন। রোগ দেখা দেওয়ার সাথে সাথেই প্রয়োগ করুন।",
                images: [
                    "/langal-prototype/src/assets/crops/rice.jpg",
                    "/langal-prototype/src/assets/crops/wheat.jpg"
                ],
                tags: ["ধান", "ব্লাস্ট", "রোগ", "ছত্রাকনাশক"],
                type: "expert_advice",
                likes: 89,
                comments: 45,
                shares: 32,
                postedAt: "2024-01-15T09:00:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "5",
                author: {
                    name: "সালমা আক্তার",
                    avatar: "/placeholder.svg",
                    location: "ঢাকা",
                    verified: false,
                    userType: "customer"
                },
                content: "আমি নিয়মিত অর্গানিক সবজি কিনি। কোথায় ভাল মানের অর্গানিক সবজি পাওয়া যায়? দাম একটু বেশি হলেও সমস্যা নেই।",
                images: [
                    "/langal-prototype/src/assets/crops/eggplant.jpg",
                    "/langal-prototype/src/assets/crops/potato.jpg",
                    "/langal-prototype/src/assets/crops/tomato.jpg"
                ],
                tags: ["অর্গানিক", "সবজি", "কেনাকাটা"],
                type: "question",
                likes: 42,
                comments: 28,
                shares: 15,
                postedAt: "2024-01-14T14:20:00Z",
                liked: true,
                isOwnPost: false
            },
            // Additional posts without images
            {
                id: "6",
                author: {
                    name: "হাসান আলী",
                    avatar: "/placeholder.svg",
                    location: "রংপুর",
                    verified: false,
                    userType: "farmer"
                },
                content: "কেউ কি বলতে পারবেন এই সময়ে কোন সবজি লাগালে ভাল দাম পাওয়া যাবে? বাজারের চাহিদা কেমন? নতুন কৃষক হিসেবে পরামর্শ চাই।",
                images: [],
                tags: ["সবজি", "বাজার", "প্রশ্ন", "নতুন কৃষক"],
                type: "question",
                likes: 22,
                comments: 28,
                shares: 6,
                postedAt: "2024-01-14T11:30:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "7",
                author: {
                    name: "নূরুল ইসলাম",
                    avatar: "/placeholder.svg",
                    location: "রাজশাহী",
                    verified: true,
                    userType: "farmer"
                },
                content: "শীতকালে সবজি চাষে সেচ ব্যবস্থাপনা খুবই গুরুত্বপূর্ণ। ভোর ও বিকেলে হালকা সেচ দিলে ভাল ফলাফল পাওয়া যায়। মাটিতে রস ধরে রাখার জন্য মালচিং করুন। এই পদ্ধতি অনুসরণ করে আমি ভাল ফলন পেয়েছি।",
                images: [],
                tags: ["সবজি", "সেচ", "পরামর্শ", "শীত", "মালচিং"],
                type: "advice",
                likes: 56,
                comments: 31,
                shares: 18,
                postedAt: "2024-01-14T14:20:00Z",
                liked: true,
                isOwnPost: false
            },
            {
                id: "8",
                author: {
                    name: "প্রফেসর আক্তার হোসেন",
                    avatar: "/placeholder.svg",
                    location: "কৃষি গবেষণা ইনস্টিটিউট",
                    verified: true,
                    isExpert: true,
                    userType: "expert"
                },
                content: "আধুনিক টমেটো চাষে হাইব্রিড জাতের ব্যবহার বৃদ্ধি পাচ্ছে। BARI টমেটো-১৪ ও ১৫ জাত শীত মৌসুমে চাষের জন্য উপযুক্ত। প্রতি শতকে ১৫০-২০০ গাছ লাগানো যেতে পারে। ভার্মি কম্পোস্ট ব্যবহার করলে ফলন ২০-২৫% বৃদ্ধি পায়।",
                images: [],
                tags: ["টমেটো", "হাইব্রিড", "BARI", "ভার্মি কম্পোস্ট"],
                type: "expert_advice",
                likes: 76,
                comments: 38,
                shares: 28,
                postedAt: "2024-01-14T11:30:00Z",
                liked: true,
                isOwnPost: false
            },
            {
                id: "9",
                author: {
                    name: "রশিদা বেগম",
                    avatar: "/placeholder.svg",
                    location: "চট্টগ্রাম",
                    verified: false,
                    userType: "customer"
                },
                content: "আমি নতুন গৃহিণী। বাজার করার সময় কিভাবে বুঝবো সবজি তাজা কিনা? অভিজ্ঞ বোনেরা পরামর্শ দিন। কোন বিশেষ লক্ষণ আছে কি?",
                images: [],
                tags: ["সবজি", "পরামর্শ", "নতুন", "বাজার"],
                type: "question",
                likes: 31,
                comments: 19,
                shares: 8,
                postedAt: "2024-01-14T09:45:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "10",
                author: {
                    name: "করিম মিয়া",
                    avatar: "/placeholder.svg",
                    location: "বরিশাল",
                    verified: true,
                    userType: "farmer"
                },
                content: "আমার গরুর গাড়ি ভাড়া দেওয়ার ব্যবস্থা আছে। ফসল পরিবহনের জন্য যোগাযোগ করুন। দামও কম।",
                images: [
                    "/langal-prototype/src/assets/marketplace/tractor.png"
                ],
                tags: ["গরুর গাড়ি", "ভাড়া", "পরিবহন"],
                type: "marketplace",
                marketplaceLink: {
                    title: "গরুর গাড়ি ভাড়া",
                    price: 500,
                    category: "যন্ত্রপাতি"
                },
                likes: 19,
                comments: 8,
                shares: 12,
                postedAt: "2024-01-14T07:20:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "11",
                author: {
                    name: "আমিনুল ইসলাম",
                    avatar: "/placeholder.svg",
                    location: "সিলেট",
                    verified: false,
                    userType: "farmer"
                },
                content: "আগামীকাল বৃষ্টির সম্ভাবনা আছে। যারা ধান কাটার পরিকল্পনা করেছেন, আজকেই কাটা শুরু করুন। নাহলে ক্ষতি হতে পারে।",
                images: [],
                tags: ["আবহাওয়া", "ধান", "কাটাই", "বৃষ্টি"],
                type: "advice",
                likes: 67,
                comments: 23,
                shares: 15,
                postedAt: "2024-01-14T06:30:00Z",
                liked: true,
                isOwnPost: false
            },
            {
                id: "12",
                author: {
                    name: "ডঃ সালমা খাতুন",
                    avatar: "/placeholder.svg",
                    location: "কৃষি গবেষণা ইনস্টিটিউট",
                    verified: true,
                    isExpert: true,
                    userType: "expert"
                },
                content: "নতুন জাতের হাইব্রিড আলুর বীজ এখন বাজারে এসেছে। এই জাতটি তাপমাত্রা সহনশীল এবং ব্যাকটেরিয়া প্রতিরোধী। আগ্রহী কৃষকরা স্থানীয় কৃষি অফিসে যোগাযোগ করুন।",
                images: [],
                tags: ["আলু", "নতুনজাত", "হাইব্রিড", "প্রতিরোধী"],
                type: "expert_advice",
                likes: 125,
                comments: 52,
                shares: 89,
                postedAt: "2024-01-13T16:45:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "13",
                author: {
                    name: "জাহাঙ্গীর আলম",
                    avatar: "/placeholder.svg",
                    location: "কুষ্টিয়া",
                    verified: false,
                    userType: "farmer"
                },
                content: "আমার পাওয়ার টিলার বিক্রি করব। ভাল অবস্থায় আছে। মাত্র ২ বছর ব্যবহার করেছি। আগ্রহীরা দেখে নিতে পারেন।",
                images: [
                    "/langal-prototype/src/assets/marketplace/power tiller.png"
                ],
                tags: ["পাওয়ার টিলার", "বিক্রয়", "যন্ত্রপাতি"],
                type: "marketplace",
                marketplaceLink: {
                    title: "পাওয়ার টিলার (ব্যবহৃত)",
                    price: 65000,
                    category: "যন্ত্রপাতি"
                },
                likes: 15,
                comments: 7,
                shares: 3,
                postedAt: "2024-01-13T15:20:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "14",
                author: {
                    name: "মাহবুবা রহমান",
                    avatar: "/placeholder.svg",
                    location: "ময়মনসিংহ",
                    verified: false,
                    userType: "customer"
                },
                content: "কেউ কি জানেন কোথায় ভাল মানের দেশি মুরগির ডিম পাওয়া যায়? ঢাকায় থাকি। বাড়িতে ছোট বাচ্চা আছে, তাই মানসম্মত ডিম দরকার।",
                images: [],
                tags: ["মুরগির ডিম", "দেশি", "শিশু খাবার", "ঢাকা"],
                type: "question",
                likes: 24,
                comments: 16,
                shares: 5,
                postedAt: "2024-01-13T12:15:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "15",
                author: {
                    name: "আবুল হাসান",
                    avatar: "/placeholder.svg",
                    location: "গাজীপুর",
                    verified: true,
                    userType: "farmer"
                },
                content: "কম্পোস্ট সার তৈরির সহজ পদ্ধতি জানতে চান? গোবর, খড়, পচা পাতা ও রান্নাঘরের উচ্ছিষ্ট মিশিয়ে ৩-৪ মাস রেখে দিন। মাঝে মাঝে নেড়ে দিবেন।",
                images: [
                    "/langal-prototype/src/assets/marketplace/compost.png"
                ],
                tags: ["কম্পোস্ট", "জৈব সার", "পদ্ধতি", "পরিবেশ বান্ধব"],
                type: "advice",
                likes: 43,
                comments: 21,
                shares: 35,
                postedAt: "2024-01-13T10:40:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "16",
                author: {
                    name: "সুমাইয়া আক্তার",
                    avatar: "/placeholder.svg",
                    location: "ব্রাহ্মণবাড়িয়া",
                    verified: false,
                    userType: "farmer"
                },
                content: "গত সপ্তাহে আমার মাছের খামারে অক্সিজেনের সমস্যা হয়েছিল। এখন ভাল আছে। নতুন কৃষকদের বলব - মাছের খামারে অক্সিজেন পাম্প রাখা জরুরি।",
                images: [],
                tags: ["মাছ চাষ", "অক্সিজেন", "খামার", "পরামর্শ"],
                type: "advice",
                likes: 29,
                comments: 14,
                shares: 7,
                postedAt: "2024-01-13T08:25:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "17",
                author: {
                    name: "রফিকুল ইসলাম",
                    avatar: "/placeholder.svg",
                    location: "যশোর",
                    verified: true,
                    userType: "farmer"
                },
                content: "আমার এই বছরের সবজি চাষ খুবই ভাল হয়েছে! প্রতিদিন ৫০০ টাকার মত আয় হচ্ছে। সবাইকে সবজি চাষে উৎসাহিত করি।",
                images: [
                    "/langal-prototype/src/assets/crops/eggplant.jpg",
                    "/langal-prototype/src/assets/crops/garlic.jpg",
                    "/langal-prototype/src/assets/crops/lentils.jpg",
                    "/langal-prototype/src/assets/crops/mustard.jpg"
                ],
                tags: ["সবজি চাষ", "আয়", "সফলতার গল্প", "উৎসাহ"],
                type: "general",
                likes: 98,
                comments: 45,
                shares: 67,
                postedAt: "2024-01-12T17:30:00Z",
                liked: true,
                isOwnPost: false
            },
            {
                id: "18",
                author: {
                    name: "তানিয়া খান",
                    avatar: "/placeholder.svg",
                    location: "ঢাকা",
                    verified: false,
                    userType: "customer"
                },
                content: "আমার বাসায় ছাদে বাগান করতে চাই। কোন সবজি সহজ এবং কম জায়গায় করা যায়? শীতের জন্য কোনটা ভাল হবে?",
                images: [],
                tags: ["ছাদ বাগান", "শীতের সবজি", "নতুন", "সহজ চাষ"],
                type: "question",
                likes: 18,
                comments: 32,
                shares: 12,
                postedAt: "2024-01-12T14:15:00Z",
                liked: false,
                isOwnPost: false
            },
            {
                id: "19",
                author: {
                    name: "মনির হোসেন",
                    avatar: "/placeholder.svg",
                    location: "পাবনা",
                    verified: true,
                    userType: "farmer"
                },
                content: "আমার গমের ক্ষেতে পোকামাকড়ের আক্রমণ হয়েছে। কোন কীটনাশক ভাল কাজ করে? খরচও কম হয় এমন কিছু বলুন।",
                images: [
                    "/langal-prototype/src/assets/crops/wheat.jpg"
                ],
                tags: ["গম", "পোকামাকড়", "কীটনাশক", "সাহায্য"],
                type: "question",
                likes: 35,
                comments: 26,
                shares: 11,
                postedAt: "2024-01-12T11:50:00Z",
                liked: false,
                isOwnPost: false
            }
        ];

        // Initialize dummy comments
        this.comments = {
            "1": [
                {
                    id: "c1",
                    author: {
                        name: "নূরুল ইসলাম",
                        avatar: "/placeholder.svg",
                        userType: "farmer"
                    },
                    content: "আমিও এই জাত ব্যবহার করেছি। খুবই ভাল ফলন পেয়েছি।",
                    postedAt: "2024-01-15T11:30:00Z",
                    likes: 5,
                    liked: false,
                    replies: []
                },
                {
                    id: "c2",
                    author: {
                        name: "করিম মিয়া",
                        avatar: "/placeholder.svg",
                        userType: "farmer"
                    },
                    content: "কোথা থেকে বীজ পেয়েছেন ভাই?",
                    postedAt: "2024-01-15T12:15:00Z",
                    likes: 2,
                    liked: false,
                    replies: []
                }
            ],
            "2": [
                {
                    id: "c3",
                    author: {
                        name: "ডঃ আহমেদ হাসান",
                        avatar: "/placeholder.svg",
                        userType: "expert",
                        isExpert: true
                    },
                    content: "ছবি দেখে মনে হচ্ছে লেট ব্লাইট রোগ। রিডোমিল গোল্ড স্প্রে করুন প্রতি লিটার পানিতে ২ গ্রাম।",
                    postedAt: "2024-01-15T09:00:00Z",
                    likes: 15,
                    liked: false,
                    replies: []
                }
            ]
        };
    }

    // Get all posts with filtering
    getPosts(filter: string = "all", userType?: string): SocialPost[] {
        let filteredPosts = [...this.posts];
        
        if (filter !== "all") {
            filteredPosts = filteredPosts.filter(post => post.type === filter);
        }

        return filteredPosts.sort((a, b) => 
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
    }

    // Get user's own posts
    getUserPosts(userId: string): SocialPost[] {
        return this.posts.filter(post => post.author.name === userId);
    }

    // Create new post
    createPost(postData: Partial<SocialPost>, authorInfo: any): SocialPost {
        const newPost: SocialPost = {
            id: Date.now().toString(),
            author: authorInfo,
            content: postData.content || "",
            images: postData.images || [],
            tags: postData.tags || [],
            type: postData.type || "general",
            marketplaceLink: postData.marketplaceLink,
            likes: 0,
            comments: 0,
            shares: 0,
            postedAt: new Date().toISOString(),
            liked: false,
            isOwnPost: true
        };

        this.posts.unshift(newPost);
        return newPost;
    }

    // Toggle like on post
    toggleLike(postId: string): SocialPost | null {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            return { ...post };
        }
        return null;
    }

    // Get comments for a post
    getComments(postId: string): PostComment[] {
        return this.comments[postId] || [];
    }

    // Add comment to post
    addComment(postId: string, content: string, authorInfo: any): PostComment {
        if (!this.comments[postId]) {
            this.comments[postId] = [];
        }

        const newComment: PostComment = {
            id: `c_${Date.now()}`,
            author: authorInfo,
            content,
            postedAt: new Date().toISOString(),
            likes: 0,
            liked: false,
            replies: []
        };

        this.comments[postId].push(newComment);
        
        // Update post comment count
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.comments += 1;
        }

        return newComment;
    }

    // Toggle like on comment
    toggleCommentLike(postId: string, commentId: string): PostComment | null {
        const comments = this.comments[postId];
        if (comments) {
            const comment = comments.find(c => c.id === commentId);
            if (comment) {
                comment.liked = !comment.liked;
                comment.likes += comment.liked ? 1 : -1;
                return { ...comment };
            }
        }
        return null;
    }

    // Report post
    reportPost(postId: string, reason: string): boolean {
        this.reportedPosts.add(postId);
        console.log(`Post ${postId} reported for: ${reason}`);
        return true;
    }

    // Report comment
    reportComment(postId: string, commentId: string, reason: string): boolean {
        this.reportedComments.add(commentId);
        console.log(`Comment ${commentId} reported for: ${reason}`);
        return true;
    }

    // Delete post (only own posts)
    deletePost(postId: string, userId: string): boolean {
        const postIndex = this.posts.findIndex(p => 
            p.id === postId && p.author.name === userId
        );
        
        if (postIndex !== -1) {
            this.posts.splice(postIndex, 1);
            delete this.comments[postId];
            return true;
        }
        return false;
    }

    // Update post
    updatePost(postId: string, updates: Partial<SocialPost>, userId: string): SocialPost | null {
        const post = this.posts.find(p => 
            p.id === postId && p.author.name === userId
        );
        
        if (post) {
            Object.assign(post, updates);
            return { ...post };
        }
        return null;
    }

    // Share post
    sharePost(postId: string): SocialPost | null {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.shares += 1;
            return { ...post };
        }
        return null;
    }
}

export const socialFeedService = SocialFeedService.getInstance();