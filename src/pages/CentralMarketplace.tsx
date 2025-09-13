import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MarketplaceCard } from "@/components/marketplace/MarketplaceCard";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { CreateListing } from "@/components/marketplace/CreateListing";
import { ListingManager } from "@/components/marketplace/ListingManager";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
    Plus, 
    ShoppingCart, 
    TrendingUp, 
    ArrowLeft,
    User,
    Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { marketplaceService } from "@/services/marketplaceService";
import { MarketplaceListing, ListingFilter, LISTING_CATEGORIES, LISTING_TYPES } from "@/types/marketplace";

const CentralMarketplace = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // State management
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [showCreateListing, setShowCreateListing] = useState(false);
    const [showListingManager, setShowListingManager] = useState(false);
    const [filters, setFilters] = useState<ListingFilter>({
        search: "",
        category: "all",
        type: "all",
        location: "all",
        priceRange: [0, 100000],
        sortBy: "newest"
    });
    const [isLoading, setIsLoading] = useState(true);

    // Initialize service and load listings
    useEffect(() => {
        marketplaceService.initializeDummyData();
        loadListings();
    }, []);

    // Load listings based on filters
    const loadListings = () => {
        setIsLoading(true);
        setTimeout(() => {
            const filteredListings = marketplaceService.getListings(filters, user?.type);
            setListings(filteredListings);
            setIsLoading(false);
        }, 300);
    };

    // Reload listings when filters change
    useEffect(() => {
        loadListings();
    }, [filters, user?.type]);

    // Handle new listing creation
    const handleCreateListing = (listingData: any) => {
        const authorInfo = {
            name: user?.name || "ব্যবহারকারী",
            avatar: "/placeholder.svg",
            location: getLocationByUserType(),
            verified: user?.type === "expert",
            rating: 4.5,
            userType: user?.type || "farmer"
        };

        const newListing = marketplaceService.createListing(listingData, authorInfo);
        setListings([newListing, ...listings]);
        setShowCreateListing(false);

        toast({
            title: "বিজ্ঞাপন পোস্ট করা হয়েছে",
            description: "আপনার বিজ্ঞাপন সফলভাবে প্রকাশিত হয়েছে।",
        });
    };

    // Handle contact seller
    const handleContact = (listing: MarketplaceListing) => {
        const updatedListing = marketplaceService.contactSeller(listing.id);
        if (updatedListing) {
            setListings(listings.map(l => l.id === listing.id ? updatedListing : l));
        }

        toast({
            title: "যোগাযোগের তথ্য",
            description: `${listing.author.name} এর সাথে যোগাযোগ করতে কল করুন: ${listing.contactInfo?.phone || "০১৭১২-৩৪৫৬৭৮"}`,
        });
    };

    // Handle save listing
    const handleSave = (listing: MarketplaceListing) => {
        const updatedListing = marketplaceService.toggleSave(listing.id);
        if (updatedListing) {
            setListings(listings.map(l => l.id === listing.id ? updatedListing : l));
        }

        toast({
            title: "সেভ করা হয়েছে",
            description: "আইটেমটি আপনার সেভ লিস্টে যোগ করা হয়েছে।",
        });
    };

    // Get location based on user type
    const getLocationByUserType = () => {
        switch (user?.type) {
            case "expert":
                return "কৃষি বিশ্ববিদ্যালয়";
            case "customer":
                return "ঢাকা";
            case "farmer":
            default:
                return "বাংলাদেশ";
        }
    };

    // Get page title based on user type
    const getPageTitle = () => {
        switch (user?.type) {
            case "expert":
                return "কৃষি বাজার ও পরামর্শ";
            case "customer":
                return "কৃষি বাজার";
            case "farmer":
            default:
                return "কেন্দ্রীয় বাজার";
        }
    };

    // Get create button text
    const getCreateButtonText = () => {
        switch (user?.type) {
            case "expert":
                return "পরামর্শ দিন";
            case "customer":
                return "পোস্ট করুন";
            case "farmer":
            default:
                return "বিজ্ঞাপন দিন";
        }
    };

    // Handle filters change
    const handleFiltersChange = (newFilters: Partial<ListingFilter>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // Clear all filters
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

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="bg-card border-b p-4 sticky top-0 z-40 backdrop-blur-md bg-background/95">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="p-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-primary" />
                                {getPageTitle()}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {listings.length} টি পণ্য পাওয়া গেছে
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowListingManager(true)}
                        >
                            <User className="h-4 w-4 mr-1" />
                            আমার বিজ্ঞাপন
                        </Button>
                        <Button size="sm" onClick={() => setShowCreateListing(true)}>
                            <Plus className="h-4 w-4 mr-1" />
                            {getCreateButtonText()}
                        </Button>
                    </div>
                </div>

                {/* Quick Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button
                        variant={filters.category === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}
                        className="flex-shrink-0"
                    >
                        সব ক্যাটেগরি
                    </Button>
                    {LISTING_CATEGORIES.slice(0, 4).map((category) => (
                        <Button
                            key={category.id}
                            variant={filters.category === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                            className="flex-shrink-0"
                        >
                            {category.icon} {category.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <MarketplaceFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
            />

            {/* Listings Feed */}
            <div className="space-y-4 p-4 max-w-4xl mx-auto">
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-muted h-48 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : listings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🛒</div>
                        <h3 className="text-lg font-medium mb-2">কোন বিজ্ঞাপন নেই</h3>
                        <p className="text-muted-foreground mb-4">
                            {filters.search || filters.category !== "all" || filters.type !== "all"
                                ? "আপনার ফিল্টারের সাথে মিলে এমন কোন বিজ্ঞাপন খুঁজে পাওয়া যায়নি।"
                                : "প্রথম বিজ্ঞাপন দিন এবং কমিউনিটির সাথে শেয়ার করুন!"
                            }
                        </p>
                        <Button onClick={() => setShowCreateListing(true)}>
                            <Plus className="h-4 w-4 mr-1" />
                            {getCreateButtonText()}
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listings.map((listing) => (
                            <MarketplaceCard
                                key={listing.id}
                                item={{
                                    id: listing.id,
                                    title: listing.title,
                                    description: listing.description,
                                    price: listing.price,
                                    currency: listing.currency,
                                    category: listing.category,
                                    type: listing.type,
                                    location: listing.location,
                                    seller: {
                                        name: listing.author.name,
                                        rating: listing.author.rating || 0,
                                        verified: listing.author.verified || false
                                    },
                                    images: listing.images,
                                    postedAt: listing.createdAt,
                                    featured: listing.featured
                                }}
                                onContact={() => handleContact(listing)}
                                onSave={() => handleSave(listing)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Listing Dialog */}
            <Dialog open={showCreateListing} onOpenChange={setShowCreateListing}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <CreateListing
                        onListing={handleCreateListing}
                        onCancel={() => setShowCreateListing(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Listing Manager Dialog */}
            <Dialog open={showListingManager} onOpenChange={setShowListingManager}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <ListingManager onClose={() => setShowListingManager(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CentralMarketplace;