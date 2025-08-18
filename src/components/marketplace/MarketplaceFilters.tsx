import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarketplaceFilters {
  search: string;
  category: string;
  type: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
}

interface MarketplaceFiltersProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: Partial<MarketplaceFilters>) => void;
  onClearFilters: () => void;
}

export const MarketplaceFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: MarketplaceFiltersProps) => {
  const categories = [
    { value: "all", label: "সব ক্যাটেগরি" },
    { value: "machinery", label: "যন্ত্রপাতি" },
    { value: "crops", label: "ফসল" },
    { value: "seeds", label: "বীজ" },
    { value: "fertilizer", label: "সার" }
  ];

  const types = [
    { value: "all", label: "সব ধরন" },
    { value: "sell", label: "বিক্রয়" },
    { value: "rent", label: "ভাড়া" }
  ];

  const locations = [
    { value: "all", label: "সব এলাকা" },
    { value: "dhaka", label: "ঢাকা" },
    { value: "chattogram", label: "চট্টগ্রাম" },
    { value: "rajshahi", label: "রাজশাহী" },
    { value: "khulna", label: "খুলনা" },
    { value: "barishal", label: "বরিশাল" },
    { value: "sylhet", label: "সিলেট" },
    { value: "rangpur", label: "রংপুর" },
    { value: "mymensingh", label: "ময়মনসিংহ" }
  ];

  const sortOptions = [
    { value: "newest", label: "নতুন প্রথমে" },
    { value: "price_low", label: "কম দাম প্রথমে" },
    { value: "price_high", label: "বেশি দাম প্রথমে" },
    { value: "rating", label: "রেটিং অনুযায়ী" }
  ];

  const hasActiveFilters = filters.search || 
    (filters.category && filters.category !== "all") ||
    (filters.type && filters.type !== "all") ||
    (filters.location && filters.location !== "all");

  return (
    <div className="space-y-4 p-4 bg-card border-b">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="খুঁজুন (যন্ত্র, ফসল, বীজ...)"
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Filter Row */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Select 
          value={filters.category} 
          onValueChange={(value) => onFiltersChange({ category: value })}
        >
          <SelectTrigger className="w-32 flex-shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.type} 
          onValueChange={(value) => onFiltersChange({ type: value })}
        >
          <SelectTrigger className="w-24 flex-shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.location} 
          onValueChange={(value) => onFiltersChange({ location: value })}
        >
          <SelectTrigger className="w-28 flex-shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.sortBy} 
          onValueChange={(value) => onFiltersChange({ sortBy: value })}
        >
          <SelectTrigger className="w-32 flex-shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((sort) => (
              <SelectItem key={sort.value} value={sort.value}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4 mr-1" />
            ক্লিয়ার
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="text-xs">
              "{filters.search}"
              <button 
                onClick={() => onFiltersChange({ search: "" })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.category && filters.category !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {categories.find(c => c.value === filters.category)?.label}
              <button 
                onClick={() => onFiltersChange({ category: "all" })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.type && filters.type !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {types.find(t => t.value === filters.type)?.label}
              <button 
                onClick={() => onFiltersChange({ type: "all" })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.location && filters.location !== "all" && (
            <Badge variant="secondary" className="text-xs">
              {locations.find(l => l.value === filters.location)?.label}
              <button 
                onClick={() => onFiltersChange({ location: "all" })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};