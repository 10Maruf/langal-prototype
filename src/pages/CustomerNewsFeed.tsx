import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TTSButton } from "@/components/ui/tts-button";
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

const CustomerNewsFeed = () => {
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
            summary: 'বিগত সপ্তাহে ধানের দাম প্রতি মণ ৫০ টাকা বেড়েছে। ক্রেতাদের এখনই কেনার পরামর্শ।',
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
            title: 'নিরাপদ খাদ্য কেনাকাটার টিপস',
            summary: 'স্বাস্থ্য মন্ত্রণালয় নিরাপদ খাদ্য কেনার জন্য ক্রেতাদের বিশেষ নির্দেশনা দিয়েছে।',
            category: 'policy',
            date: '২ দিন আগে',
            source: 'স্বাস্থ্য মন্ত্রণালয়',
            priority: 'medium'
        },
        {
            id: '5',
            title: 'অনলাইন বাজার প্রযুক্তি উন্নতি',
            summary: 'নতুন অ্যাপের মাধ্যমে এখন ঘরে বসে কৃষিপণ্য অর্ডার করা যাবে।',
            category: 'technology',
            date: '৩ দিন আগে',
            source: 'তথ্য প্রযুক্তি মন্ত্রণালয়',
            priority: 'low'
        },
        {
            id: '6',
            title: 'সবজির দাম স্থিতিশীল',
            summary: 'বর্তমানে বেশিরভাগ সবজির দাম স্থিতিশীল রয়েছে এবং পর্যাপ্ত সরবরাহ আছে।',
            category: 'market',
            date: '৪ দিন আগে',
            source: 'ভোক্তা অধিকার সংস্থা',
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
            item: 'পেঁয়াজ (দেশি)',
            currentPrice: 45,
            previousPrice: 48,
            change: -3,
            changePercent: -6.25,
            market: 'কাঁঠালবাগান বাজার',
            date: 'আজ'
        },
        {
            item: 'টমেটো',
            currentPrice: 60,
            previousPrice: 55,
            change: 5,
            changePercent: 9.09,
            market: 'শ্যামবাজার',
            date: 'আজ'
        },
        {
            item: 'আলু',
            currentPrice: 25,
            previousPrice: 25,
            change: 0,
            changePercent: 0,
            market: 'মালিবাগ বাজার',
            date: 'আজ'
        },
        {
            item: 'গাজর',
            currentPrice: 35,
            previousPrice: 32,
            change: 3,
            changePercent: 9.38,
            market: 'নিউমার্কেট',
            date: 'আজ'
        },
        {
            item: 'মুলা',
            currentPrice: 18,
            previousPrice: 20,
            change: -2,
            changePercent: -10,
            market: 'বসুন্ধরা সিটি মার্কেট',
            date: 'আজ'
        }
    ];

    const filteredNews = newsItems.filter(item =>
        selectedCategory === 'all' || item.category === selectedCategory
    );

    const categories = [
        { value: 'all', label: 'সব খবর', color: 'bg-blue-100 text-blue-800' },
        { value: 'policy', label: 'নীতি', color: 'bg-green-100 text-green-800' },
        { value: 'market', label: 'বাজার', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'weather', label: 'আবহাওয়া', color: 'bg-purple-100 text-purple-800' },
        { value: 'technology', label: 'প্রযুক্তি', color: 'bg-orange-100 text-orange-800' }
    ];

    const priorityColors = {
        high: 'border-l-red-500 bg-red-50',
        medium: 'border-l-yellow-500 bg-yellow-50',
        low: 'border-l-green-500 bg-green-50'
    };

    const handleNewsClick = (news: NewsItem) => {
        toast({
            title: news.title,
            description: news.summary,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <Newspaper className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">আজকের খবর</p>
                                <p className="text-2xl font-bold">{newsItems.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <TrendingUp className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">দাম বৃদ্ধি</p>
                                <p className="text-2xl font-bold">
                                    {marketPrices.filter(price => price.change > 0).length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <TrendingDown className="h-8 w-8 text-red-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-muted-foreground">দাম হ্রাস</p>
                                <p className="text-2xl font-bold">
                                    {marketPrices.filter(price => price.change < 0).length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Market Prices */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        আজকের বাজার দর
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {marketPrices.map((price) => (
                            <Card key={price.item} className="border-l-4 border-l-blue-300">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold">{price.item}</h4>
                                            <p className="text-sm text-muted-foreground">{price.market}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold">৳{price.currentPrice}</p>
                                            <div className={`flex items-center text-sm ${price.change > 0 ? 'text-green-600' :
                                                price.change < 0 ? 'text-red-600' : 'text-gray-500'
                                                }`}>
                                                {price.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> :
                                                    price.change < 0 ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
                                                {price.change !== 0 ? `${Math.abs(price.changePercent)}%` : 'স্থিতিশীল'}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* News Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className="whitespace-nowrap"
                    >
                        {category.label}
                    </Button>
                ))}
            </div>

            {/* News List */}
            <div className="space-y-4">
                {filteredNews.map((news) => (
                    <Card
                        key={news.id}
                        className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${priorityColors[news.priority]}`}
                        onClick={() => handleNewsClick(news)}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary" className={
                                            categories.find(c => c.value === news.category)?.color || 'bg-gray-100 text-gray-800'
                                        }>
                                            {categories.find(c => c.value === news.category)?.label}
                                        </Badge>
                                        <Badge variant="outline" className={
                                            news.priority === 'high' ? 'border-red-500 text-red-700' :
                                                news.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                                                    'border-green-500 text-green-700'
                                        }>
                                            {news.priority === 'high' ? 'জরুরি' :
                                                news.priority === 'medium' ? 'গুরুত্বপূর্ণ' : 'সাধারণ'}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg mb-1">{news.title}</CardTitle>
                                </div>
                                <div className="flex items-center gap-1">
                                    <TTSButton
                                        text={`${news.title}। ${news.summary}। উৎস: ${news.source}`}
                                        authorName={news.source}
                                        size="icon"
                                        variant="ghost"
                                    />
                                    {news.link && (
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-muted-foreground mb-3">{news.summary}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{news.date}</span>
                                </div>
                                <span className="font-medium">{news.source}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredNews.length === 0 && (
                <div className="text-center py-12">
                    <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">কোন খবর পাওয়া যায়নি</h3>
                    <p className="text-muted-foreground">
                        এই ক্যাটেগরিতে কোন খবর নেই
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerNewsFeed;
