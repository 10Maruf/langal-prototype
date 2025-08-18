import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, TrendingUp, TrendingDown, DollarSign, Calendar, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'policy' | 'market' | 'weather' | 'technology';
  date: string;
  source: string;
  link?: string;
  priority: 'high' | 'medium' | 'low';
}

interface MarketPrice {
  item: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  market: string;
  date: string;
}

const NewsFeed = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock news data
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'নতুন বীজ ভর্তুকি প্রকল্প ঘোষণা',
      summary: 'সরকার কৃষকদের জন্য ৫০% বীজ ভর্তুকি প্রকল্প ঘোষণা করেছে। আগামী মাসে আবেদন শুরু।',
      category: 'policy',
      date: '২ ঘন্টা আগে',
      source: 'কৃষি মন্ত্রণালয়',
      priority: 'high'
    },
    {
      id: '2',
      title: 'ধানের দাম বৃদ্ধি পেয়েছে',
      summary: 'বিগত সপ্তাহে ধানের দাম প্রতি মণ ৫০ টাকা বেড়েছে। কৃষকরা এখনই বিক্রয়ের সুযোগ নিতে পারেন।',
      category: 'market',
      date: '৫ ঘন্টা আগে',
      source: 'কৃষি বিপণন অধিদপ্তর',
      priority: 'high'
    },
    {
      id: '3',
      title: 'আগামী সপ্তাহে ভারী বৃষ্টির সম্ভাবনা',
      summary: 'আবহাওয়া অধিদপ্তরের পূর্বাভাস অনুযায়ী আগামী ৩-৪ দিন ভারী বৃষ্টি হতে পারে।',
      category: 'weather',
      date: '১ দিন আগে',
      source: 'আবহাওয়া অধিদপ্তর',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'কৃষি ঋণে নতুন সুদের হার',
      summary: 'ব্যাংকগুলো কৃষি ঋণের সুদের হার ৯% থেকে কমিয়ে ৭% করেছে।',
      category: 'policy',
      date: '২ দিন আগে',
      source: 'বাংলাদেশ ব্যাংক',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'স্মার্ট সেচ প্রযুক্তি প্রশিক্ষণ',
      summary: 'কৃষি সম্প্রসারণ অধিদপ্তর স্মার্ট সেচ প্রযুক্তির উপর বিনামূল্যে প্রশিক্ষণ দিচ্ছে।',
      category: 'technology',
      date: '৩ দিন আগে',
      source: 'কৃষি সম্প্রসারণ অধিদপ্তর',
      priority: 'low'
    },
    {
      id: '6',
      title: 'সারের দাম স্থিতিশীল',
      summary: 'বর্তমানে ইউরিয়া সারের দাম ৮০০ টাকা প্রতি বস্তা এবং এটি স্থিতিশীল রয়েছে।',
      category: 'market',
      date: '৪ দিন আগে',
      source: 'সার ব্যবস্থাপনা অধিদপ্তর',
      priority: 'low'
    }
  ];

  // Mock market prices
  const marketPrices: MarketPrice[] = [
    {
      item: 'ধান (আমন)',
      currentPrice: 1250,
      previousPrice: 1200,
      change: 50,
      changePercent: 4.17,
      market: 'কাপ্তাই বাজার',
      date: 'আজ'
    },
    {
      item: 'আলু',
      currentPrice: 45,
      previousPrice: 50,
      change: -5,
      changePercent: -10,
      market: 'শেরেবাংলা নগর',
      date: 'আজ'
    },
    {
      item: 'টমেটো',
      currentPrice: 80,
      previousPrice: 75,
      change: 5,
      changePercent: 6.67,
      market: 'কারওয়ান বাজার',
      date: 'আজ'
    },
    {
      item: 'পেঁয়াজ',
      currentPrice: 60,
      previousPrice: 65,
      change: -5,
      changePercent: -7.69,
      market: 'শ্যামবাজার',
      date: 'আজ'
    },
    {
      item: 'সরিষা',
      currentPrice: 140,
      previousPrice: 135,
      change: 5,
      changePercent: 3.7,
      market: 'চট্টগ্রাম',
      date: 'আজ'
    }
  ];

  const categories = [
    { key: 'all', label: 'সব', icon: '📰' },
    { key: 'policy', label: 'নীতিমালা', icon: '📜' },
    { key: 'market', label: 'বাজার', icon: '💹' },
    { key: 'weather', label: 'আবহাওয়া', icon: '🌦️' },
    { key: 'technology', label: 'প্রযুক্তি', icon: '💻' }
  ];

  const getFilteredNews = () => {
    if (selectedCategory === 'all') return newsItems;
    return newsItems.filter(item => item.category === selectedCategory);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'policy': return 'bg-blue-100 text-blue-800';
      case 'market': return 'bg-green-100 text-green-800';
      case 'weather': return 'bg-yellow-100 text-yellow-800';
      case 'technology': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            কৃষি সংবাদ ও বাজার
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Market Prices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            আজকের বাজারদর
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketPrices.map((price, index) => (
              <div key={index} className="flex items-center justify-between border rounded-lg p-3 bg-muted/30">
                <div className="flex-1">
                  <div className="font-semibold">{price.item}</div>
                  <div className="text-sm text-muted-foreground">{price.market}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">৳{price.currentPrice}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    price.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {price.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {price.change > 0 ? '+' : ''}{price.change} ({price.changePercent.toFixed(1)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              আরো দাম দেখুন
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-3 py-2 rounded-full text-sm border transition-colors flex items-center gap-1 ${
                  selectedCategory === category.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Items */}
      <div className="space-y-3">
        {getFilteredNews().map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  <div className="flex gap-1 flex-shrink-0">
                    <Badge className={getPriorityBadgeColor(item.priority)}>
                      {item.priority === 'high' ? 'জরুরি' : item.priority === 'medium' ? 'গুরুত্বপূর্ণ' : 'সাধারণ'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{item.summary}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                      {item.category === 'policy' ? 'নীতিমালা' : 
                       item.category === 'market' ? 'বাজার' :
                       item.category === 'weather' ? 'আবহাওয়া' : 'প্রযুক্তি'}
                    </Badge>
                    <span className="text-muted-foreground">{item.source}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </div>
                </div>
                
                {item.link && (
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    বিস্তারিত পড়ুন
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription Notice */}
      <Card>
        <CardContent className="pt-4 text-center">
          <div className="space-y-2">
            <h4 className="font-semibold">নিয়মিত আপডেট পেতে</h4>
            <p className="text-sm text-muted-foreground">
              গুরুত্বপূর্ণ কৃষি সংবাদ ও বাজারদর SMS এ পেতে ১৬১২৩ নম্বরে "NEWS" লিখে পাঠান
            </p>
            <Button variant="outline" size="sm">
              SMS সাবস্ক্রিপশন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsFeed;