// Central Marketplace Types - Enhanced for listing management

export type ListingType = "sell" | "rent" | "buy" | "service";
export type ListingCategory = "crops" | "machinery" | "fertilizer" | "seeds" | "livestock" | "tools" | "other";
export type ListingStatus = "active" | "sold" | "expired" | "draft";

export interface ListingAuthor {
    name: string;
    avatar?: string;
    location: string;
    verified?: boolean;
    rating?: number;
    userType: "farmer" | "customer" | "expert";
}

export interface MarketplaceListing {
    id: string;
    author: ListingAuthor;
    title: string;
    description: string;
    price: number;
    currency: string;
    category: ListingCategory;
    type: ListingType;
    status: ListingStatus;
    images: string[];
    tags: string[];
    location: string;
    contactInfo?: {
        phone?: string;
        email?: string;
    };
    createdAt: string;
    updatedAt: string;
    featured?: boolean;
    views: number;
    saves: number;
    contacts: number;
    isOwnListing?: boolean;
}

export interface ListingComment {
    id: string;
    author: {
        name: string;
        avatar?: string;
        userType: "farmer" | "customer" | "expert";
    };
    content: string;
    createdAt: string;
    likes: number;
    liked?: boolean;
}

export interface ListingFilter {
    search: string;
    category: string;
    type: string;
    location: string;
    priceRange: [number, number];
    sortBy: string;
    status?: string;
}

// Category options
export const LISTING_CATEGORIES = [
    { id: "crops", label: "ফসল ও শাকসবজি", icon: "🌾" },
    { id: "machinery", label: "যন্ত্রপাতি", icon: "🚜" },
    { id: "fertilizer", label: "সার ও কীটনাশক", icon: "🧪" },
    { id: "seeds", label: "বীজ ও চারা", icon: "🌱" },
    { id: "livestock", label: "গবাদি পশু", icon: "🐄" },
    { id: "tools", label: "হাতিয়ার", icon: "🔧" },
    { id: "other", label: "অন্যান্য", icon: "📦" }
];

// Type options
export const LISTING_TYPES = [
    { id: "sell", label: "বিক্রি", color: "green" },
    { id: "rent", label: "ভাড়া", color: "blue" },
    { id: "buy", label: "কিনতে চাই", color: "purple" },
    { id: "service", label: "সেবা", color: "orange" }
];

// Location options (major districts in Bangladesh)
export const LOCATIONS = [
    "ঢাকা", "চট্টগ্রাম", "সিলেট", "খুলনা", "বরিশাল", "রাজশাহী", "রংপুর", "ময়মনসিংহ",
    "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ", "সাভার", "টাঙ্গাইল", "কিশোরগঞ্জ", "নেত্রকোণা",
    "জামালপুর", "শেরপুর", "বগুড়া", "জয়পুরহাট", "পাবনা", "সিরাজগঞ্জ", "নাটোর",
    "নওগাঁ", "চাঁপাইনবাবগঞ্জ", "কুষ্টিয়া", "মাগুরা", "নড়াইল", "যশোর", "সাতক্ষীরা",
    "বাগেরহাট", "পিরোজপুর", "ঝালকাঠি", "ভোলা", "পটুয়াখালী", "বরগুনা", "হবিগঞ্জ",
    "মৌলভীবাজার", "সুনামগঞ্জ", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "লক্ষ্মীপুর", "নোয়াখালী",
    "ফেনী", "খাগড়াছড়ি", "রাঙ্গামাটি", "বান্দরবান", "পঞ্চগড়", "ঠাকুরগাঁও", "দিনাজপুর",
    "নীলফামারী", "লালমনিরহাট", "কুড়িগ্রাম", "গাইবান্ধা", "জামালপুর", "শেরপুর"
];