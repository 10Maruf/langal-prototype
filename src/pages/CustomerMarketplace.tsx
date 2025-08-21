import { useState } from "react";
import { CustomerMarketplaceCard, CustomerMarketplaceItem } from "@/components/marketplace/CustomerMarketplaceCard";
import { MarketplaceFilters, MarketplaceFilters as FilterType } from "@/components/marketplace/MarketplaceFilters";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerMarketplace = () => {
    const { toast } = useToast();

    const [filters, setFilters] = useState<FilterType>({
        search: "",
        category: "all",
        type: "all",
        location: "all",
        priceRange: [0, 100000],
        sortBy: "newest"
    });

    // Mock data for customer marketplace - includes both buying and selling
    const [items] = useState<CustomerMarketplaceItem[]>([
        {
            id: "1",
            title: "পাওয়ার টিলার (ভাল অবস্থায়)",
            description: "৮ হর্স পাওয়ার, চলমান অবস্থায় আছে। খুব কম ব্যবহার হয়েছে।",
            price: 1500,
            currency: "BDT",
            category: "machinery",
            type: "rent",
            location: "নোয়াখালী",
            seller: {
                name: "করিম মিয়া",
                rating: 4.8,
                verified: true
            },
            images: [],
            postedAt: "2024-01-15T10:00:00Z",
            featured: true
        },
        {
            id: "2",
            title: "তাজা ধান বিক্রয়",
            description: "এই বছরের নতুন ধান। ভাল মানের BRRI-28 জাত।",
            price: 28,
            currency: "BDT",
            category: "crops",
            type: "sell",
            location: "কুমিল্লা",
            seller: {
                name: "রহিম উদ্দিন",
                rating: 4.5,
                verified: false
            },
            images: [],
            postedAt: "2024-01-14T14:30:00Z"
        },
        {
            id: "3",
            title: "অর্গানিক টমেটো",
            description: "সম্পূর্ণ প্রাকৃতিক উপায়ে চাষ করা। কোন রাসায়নিক ব্যবহার নেই।",
            price: 60,
            currency: "BDT",
            category: "vegetables",
            type: "sell",
            location: "ঢাকা",
            seller: {
                name: "সালমা আক্তার",
                rating: 4.9,
                verified: true
            },
            images: [],
            postedAt: "2024-01-13T09:15:00Z"
        },
        {
            id: "4",
            title: "তাজা রুই মাছ",
            description: "পুকুরের তাজা মাছ। দৈনিক সরবরাহ আছে।",
            price: 280,
            currency: "BDT",
            category: "fish",
            type: "sell",
            location: "সিলেট",
            seller: {
                name: "কবির হোসেন",
                rating: 4.7,
                verified: true
            },
            images: [],
            postedAt: "2024-01-12T16:45:00Z"
        },
        {
            id: "5",
            title: "বাড়ির তৈরি দুধ বিক্রয়",
            description: "খাঁটি গরুর দুধ। প্রতিদিন সকাল ও বিকালে সরবরাহ।",
            price: 65,
            currency: "BDT",
            category: "dairy",
            type: "sell",
            location: "ময়মনসিংহ",
            seller: {
                name: "রশিদা বেগম",
                rating: 4.6,
                verified: false
            },
            images: [],
            postedAt: "2024-01-11T11:20:00Z"
        },
        {
            id: "6",
            title: "ফ্রিজার (ব্যবহৃত)",
            description: "ভাল অবস্থায় ডিপ ফ্রিজার। মাছ-মাংস রাখার জন্য আদর্শ।",
            price: 15000,
            currency: "BDT",
            category: "equipment",
            type: "sell",
            location: "চট্টগ্রাম",
            seller: {
                name: "আনিস আহমেদ",
                rating: 4.4,
                verified: false
            },
            images: [],
            postedAt: "2024-01-10T13:30:00Z"
        },
        {
            id: "7",
            title: "পেঁয়াজ কিনতে চাই",
            description: "২০ কেজি ভাল মানের পেঁয়াজ প্রয়োজন। ভাল দাম দেব।",
            price: 40,
            currency: "BDT",
            category: "vegetables",
            type: "buy",
            location: "বরিশাল",
            seller: {
                name: "নাসির উদ্দিন",
                rating: 4.3,
                verified: false
            },
            images: [],
            postedAt: "2024-01-09T15:45:00Z"
        },
        {
            id: "8",
            title: "মুরগির মাংস চাই",
            description: "দেশি মুরগির মাংস দরকার। অনুষ্ঠানের জন্য।",
            price: 350,
            currency: "BDT",
            category: "meat",
            type: "buy",
            location: "যশোর",
            seller: {
                name: "ফরিদা খাতুন",
                rating: 4.5,
                verified: false
            },
            images: [],
            postedAt: "2024-01-08T09:30:00Z"
        }
    ]);

    const handleFiltersChange = (newFilters: Partial<FilterType>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: "",
            category: "all",
            type: "all",
            location: "all",
            priceRange: [0, 100000],
            sortBy: "newest"
        });
    };

    const filteredItems = items.filter(item => {
        // Search filter
        if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Category filter
        if (filters.category !== "all" && item.category !== filters.category) {
            return false;
        }

        // Type filter (buy/sell/rent)
        if (filters.type !== "all" && item.type !== filters.type) {
            return false;
        }

        // Location filter
        if (filters.location !== "all" && item.location !== filters.location) {
            return false;
        }

        // Price range filter
        if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        switch (filters.sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.seller.rating - a.seller.rating;
            case "newest":
            default:
                return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        }
    });

    const handleAddProduct = () => {
        toast({
            title: "পণ্য যোগ করুন",
            description: "পণ্য যোগ করার ফিচার শীঘ্রই আসছে।",
        });
    };

    const handleItemClick = (item: CustomerMarketplaceItem) => {
        toast({
            title: item.type === "buy" ? "ক্রয়ের অনুরোধ" : "বিক্রয়ের তথ্য",
            description: `${item.title} - ৳${item.price}`,
        });
    };

    // Stats data
    const stats = {
        totalProducts: items.length,
        buyRequests: items.filter(item => item.type === "buy").length,
        sellOffers: items.filter(item => item.type === "sell").length,
        rentals: items.filter(item => item.type === "rent").length
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">মোট পণ্য</p>
                    <p className="text-xl font-bold">{stats.totalProducts}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">বিক্রয়</p>
                    <p className="text-xl font-bold">{stats.sellOffers}</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <ShoppingCart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">ক্রয়</p>
                    <p className="text-xl font-bold">{stats.buyRequests}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">ভাড়া</p>
                    <p className="text-xl font-bold">{stats.rentals}</p>
                </div>
            </div>

            {/* Add Product Button */}
            <Button
                onClick={handleAddProduct}
                className="w-full md:w-auto"
                size="lg"
            >
                <Plus className="w-4 h-4 mr-2" />
                পণ্য যোগ করুন
            </Button>

            {/* Filters */}
            <MarketplaceFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <CustomerMarketplaceCard
                        key={item.id}
                        item={item}
                        onClick={() => handleItemClick(item)}
                        onContact={() => handleItemClick(item)}
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">কোন পণ্য পাওয়া যায়নি</h3>
                    <p className="text-muted-foreground">
                        অন্য ফিল্টার ব্যবহার করে আবার চেষ্টা করুন
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerMarketplace;
