import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TTSButton } from "@/components/ui/tts-button";
import { MapPin, Heart, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: "machinery" | "crops" | "seeds" | "fertilizer" | "livestock" | "tools" | "other";
  type: "sell" | "rent" | "buy" | "service";
  location: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  images: string[];
  postedAt: string;
  featured?: boolean;
  saved?: boolean;
}

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onContact: (item: MarketplaceItem) => void;
  onSave: (item: MarketplaceItem) => void;
}

export const MarketplaceCard = ({ item, onContact, onSave }: MarketplaceCardProps) => {
  const categoryColors = {
    machinery: "bg-blue-50 text-blue-700 border-blue-200",
    crops: "bg-green-50 text-green-700 border-green-200",
    seeds: "bg-yellow-50 text-yellow-700 border-yellow-200",
    fertilizer: "bg-purple-50 text-purple-700 border-purple-200",
    livestock: "bg-orange-50 text-orange-700 border-orange-200",
    tools: "bg-indigo-50 text-indigo-700 border-indigo-200",
    other: "bg-gray-50 text-gray-700 border-gray-200"
  };

  const categoryLabels = {
    machinery: "যন্ত্রপাতি",
    crops: "ফসল",
    seeds: "বীজ",
    fertilizer: "সার",
    livestock: "গবাদি পশু",
    tools: "হাতিয়ার",
    other: "অন্যান্য"
  };

  const typeLabels = {
    sell: "বিক্রয়",
    rent: "ভাড়া",
    buy: "কিনতে চাই",
    service: "সেবা"
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md",
      item.featured && "ring-2 ring-accent/50"
    )}>
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[item.category]}>
              {categoryLabels[item.category]}
            </Badge>
            <Badge variant={item.type === "sell" ? "default" : "outline"}>
              {typeLabels[item.type]}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <TTSButton
              text={`${item.title}। ${item.description}। দাম ${item.price} টাকা। স্থান ${item.location}। বিক্রেতা ${item.seller.name}`}
              authorName={item.seller.name}
              size="icon"
              variant="ghost"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave(item)}
              className="h-8 w-8 p-0"
            >
              <Heart className={cn(
                "h-4 w-4",
                item.saved && "fill-red-500 text-red-500"
              )} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
          {item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <span className="text-2xl">🏷️</span>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold text-primary">
            ৳{item.price.toLocaleString('bn-BD')}
            {item.type === "rent" && <span className="text-xs text-muted-foreground">/দিন</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{item.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.seller.name}</span>
            {item.seller.verified && <span className="text-green-600">✓</span>}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{item.seller.rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button
          onClick={() => onContact(item)}
          className="w-full h-8 text-xs"
          size="sm"
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          যোগাযোগ করুন
        </Button>
      </CardFooter>
    </Card>
  );
};