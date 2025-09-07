import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketplaceCard, MarketplaceItem } from "@/components/marketplace/MarketplaceCard";
import { MarketplaceFilters, MarketplaceFilters as FilterType } from "@/components/marketplace/MarketplaceFilters";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterType>({
    search: "",
    category: "all",
    type: "all",
    location: "all",
    priceRange: [0, 100000],
    sortBy: "newest"
  });

  // Mock data
  const [items] = useState<MarketplaceItem[]>([
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
      title: "ইউরিয়া সার (৫০ কেজি)",
      description: "সরকারি দোকান থেকে কেনা। অতিরিক্ত পড়ে গেছে।",
      price: 950,
      currency: "BDT",
      category: "fertilizer",
      type: "sell",
      location: "ফেনী",
      seller: {
        name: "আবদুল কাদের",
        rating: 4.9,
        verified: true
      },
      images: [],
      postedAt: "2024-01-13T09:15:00Z"
    },
    {
      id: "4",
      title: "গমের বীজ (উন্নত জাত)",
      description: "BARI গম-৩০ জাত। অংকুরোদগম হার ৯৫%+।",
      price: 45,
      currency: "BDT",
      category: "seeds",
      type: "sell",
      location: "রাজশাহী",
      seller: {
        name: "নুরুল ইসলাম",
        rating: 4.7,
        verified: true
      },
      images: [],
      postedAt: "2024-01-12T16:45:00Z"
    },
    {
      id: "5",
      title: "হার্ভেস্টার মেশিন ভাড়া",
      description: "দ্রুত ধান কাটার জন্য। অভিজ্ঞ অপারেটর সহ।",
      price: 3500,
      currency: "BDT",
      category: "machinery",
      type: "rent",
      location: "বগুড়া",
      seller: {
        name: "আকবর আলী",
        rating: 4.6,
        verified: true
      },
      images: [],
      postedAt: "2024-01-11T11:20:00Z"
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

  const handleContact = (item: MarketplaceItem) => {
    toast({
      title: "যোগাযোগের তথ্য",
      description: `${item.seller.name} এর সাথে যোগাযোগ করতে কল করুন: ০১৭১২-৩৪৫৬৭৮`,
    });
  };

  const handleSave = (item: MarketplaceItem) => {
    toast({
      title: "সেভ করা হয়েছে",
      description: "আইটেমটি আপনার সেভ লিস্টে যোগ করা হয়েছে।",
    });
  };

  // Filter items based on current filters
  const filteredItems = items.filter(item => {
    if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    if (filters.type !== "all" && item.type !== filters.type) {
      return false;
    }
    if (filters.location !== "all" && !item.location.includes(filters.location)) {
      return false;
    }
    return true;
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                বাজার
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} টি পণ্য পাওয়া গেছে
              </p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            বিজ্ঞাপন দিন
          </Button>
        </div>
      </div>

      {/* Filters */}
      <MarketplaceFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Items Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <MarketplaceCard
              key={item.id}
              item={item}
              onContact={handleContact}
              onSave={handleSave}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">কোন পণ্য পাওয়া যায়নি</h3>
            <p className="text-muted-foreground">
              অন্য ফিল্টার ব্যবহার করে দেখুন অথবা নতুন বিজ্ঞাপন দিন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;