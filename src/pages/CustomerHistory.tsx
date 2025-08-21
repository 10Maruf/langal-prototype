import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Truck, Calendar, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
    id: string;
    title: string;
    type: 'buy' | 'sell';
    quantity: number;
    unit: string;
    price: number;
    totalAmount: number;
    date: string;
    status: 'completed' | 'pending' | 'cancelled' | 'delivered';
    seller?: string;
    buyer?: string;
    location: string;
    category: string;
}

const CustomerHistory = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    // Mock history data
    const historyItems: HistoryItem[] = [
        {
            id: "1",
            title: "অর্গানিক টমেটো",
            type: "buy",
            quantity: 5,
            unit: "কেজি",
            price: 60,
            totalAmount: 300,
            date: "২০২৪-০১-১৫",
            status: "delivered",
            seller: "সালমা আক্তার",
            location: "ঢাকা",
            category: "সবজি"
        },
        {
            id: "2",
            title: "তাজা রুই মাছ",
            type: "buy",
            quantity: 2,
            unit: "কেজি",
            price: 280,
            totalAmount: 560,
            date: "২০২৪-০১-১৪",
            status: "delivered",
            seller: "কবির হোসেন",
            location: "সিলেট",
            category: "মাছ"
        },
        {
            id: "3",
            title: "বাড়ির তৈরি দুধ",
            type: "buy",
            quantity: 3,
            unit: "লিটার",
            price: 65,
            totalAmount: 195,
            date: "২০২৪-০১-১৩",
            status: "completed",
            seller: "রশিদা বেগম",
            location: "ময়মনসিংহ",
            category: "দুগ্ধ"
        },
        {
            id: "4",
            title: "পুরাতন ফ্রিজার বিক্রি",
            type: "sell",
            quantity: 1,
            unit: "টি",
            price: 12000,
            totalAmount: 12000,
            date: "২০২৪-০১-১২",
            status: "completed",
            buyer: "আনিস আহমেদ",
            location: "চট্টগ্রাম",
            category: "যন্ত্র"
        },
        {
            id: "5",
            title: "ব্রি-২৮ ধান",
            type: "buy",
            quantity: 50,
            unit: "কেজি",
            price: 28,
            totalAmount: 1400,
            date: "২০২৪-০১-১১",
            status: "pending",
            seller: "রহিম উদ্দিন",
            location: "কুমিল্লা",
            category: "ফসল"
        },
        {
            id: "6",
            title: "দেশি মুরগি",
            type: "buy",
            quantity: 1,
            unit: "টি",
            price: 800,
            totalAmount: 800,
            date: "২০২৪-০১-১০",
            status: "cancelled",
            seller: "ফরিদা খাতুন",
            location: "যশোর",
            category: "মাংস"
        },
        {
            id: "7",
            title: "পেঁয়াজ বাল্ক অর্ডার",
            type: "buy",
            quantity: 20,
            unit: "কেজি",
            price: 45,
            totalAmount: 900,
            date: "২০২৪-০১-০৯",
            status: "delivered",
            seller: "নাসির উদ্দিন",
            location: "বরিশাল",
            category: "সবজি"
        },
        {
            id: "8",
            title: "পুরাতন কম্পিউটার বিক্রি",
            type: "sell",
            quantity: 1,
            unit: "টি",
            price: 8000,
            totalAmount: 8000,
            date: "২০২৪-০১-০৮",
            status: "completed",
            buyer: "সুমন হোসেন",
            location: "ঢাকা",
            category: "যন্ত্র"
        }
    ];

    const filteredItems = historyItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || item.type === filterType;
        const matchesStatus = filterStatus === "all" || item.status === filterStatus;

        let matchesDate = true;
        if (dateFilter !== "all") {
            const itemDate = new Date(item.date);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));

            switch (dateFilter) {
                case "week":
                    matchesDate = daysDiff <= 7;
                    break;
                case "month":
                    matchesDate = daysDiff <= 30;
                    break;
                case "year":
                    matchesDate = daysDiff <= 365;
                    break;
            }
        }

        return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    const statusColors = {
        completed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
        delivered: "bg-blue-100 text-blue-800"
    };

    const statusLabels = {
        completed: "সম্পন্ন",
        pending: "বিচারাধীন",
        cancelled: "বাতিল",
        delivered: "ডেলিভারি"
    };

    const typeColors = {
        buy: "bg-blue-50 text-blue-700",
        sell: "bg-green-50 text-green-700"
    };

    const typeLabels = {
        buy: "ক্রয়",
        sell: "বিক্রয়"
    };

    // Calculate statistics
    const stats = {
        totalTransactions: historyItems.length,
        totalBought: historyItems.filter(item => item.type === "buy").length,
        totalSold: historyItems.filter(item => item.type === "sell").length,
        totalSpent: historyItems
            .filter(item => item.type === "buy" && item.status === "completed")
            .reduce((sum, item) => sum + item.totalAmount, 0),
        totalEarned: historyItems
            .filter(item => item.type === "sell" && item.status === "completed")
            .reduce((sum, item) => sum + item.totalAmount, 0)
    };

    const handleExport = () => {
        toast({
            title: "এক্সপোর্ট",
            description: "ইতিহাস ডাউনলোড ফিচার শীঘ্রই আসছে।",
        });
    };

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
                        <p className="text-xl font-bold">{stats.totalTransactions}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 text-center">
                        <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">কেনা</p>
                        <p className="text-xl font-bold">{stats.totalBought}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 text-center">
                        <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">বিক্রি</p>
                        <p className="text-xl font-bold">{stats.totalSold}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-red-600 text-lg font-bold">-৳</div>
                        <p className="text-sm text-muted-foreground">খরচ</p>
                        <p className="text-lg font-bold">৳{stats.totalSpent.toLocaleString('bn-BD')}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-green-600 text-lg font-bold">+৳</div>
                        <p className="text-sm text-muted-foreground">আয়</p>
                        <p className="text-lg font-bold">৳{stats.totalEarned.toLocaleString('bn-BD')}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            ফিল্টার
                        </CardTitle>
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="h-4 w-4 mr-2" />
                            এক্সপোর্ট
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="খুঁজুন..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger>
                                <SelectValue placeholder="ধরন নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">সব ধরন</SelectItem>
                                <SelectItem value="buy">ক্রয়</SelectItem>
                                <SelectItem value="sell">বিক্রয়</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                                <SelectItem value="completed">সম্পন্ন</SelectItem>
                                <SelectItem value="pending">বিচারাধীন</SelectItem>
                                <SelectItem value="delivered">ডেলিভারি</SelectItem>
                                <SelectItem value="cancelled">বাতিল</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="সময় নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">সব সময়</SelectItem>
                                <SelectItem value="week">গত সপ্তাহ</SelectItem>
                                <SelectItem value="month">গত মাস</SelectItem>
                                <SelectItem value="year">গত বছর</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* History List */}
            <div className="space-y-4">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className={typeColors[item.type]}>
                                            {typeLabels[item.type]}
                                        </Badge>
                                        <Badge variant="outline" className={statusColors[item.status]}>
                                            {statusLabels[item.status]}
                                        </Badge>
                                        <Badge variant="secondary">{item.category}</Badge>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {item.type === "buy" && item.seller ? `বিক্রেতা: ${item.seller}` :
                                            item.type === "sell" && item.buyer ? `ক্রেতা: ${item.buyer}` : ""}
                                        {item.location && ` • ${item.location}`}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-primary">
                                        ৳{item.totalAmount.toLocaleString('bn-BD')}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.quantity} {item.unit} × ৳{item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{item.date}</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                    বিস্তারিত দেখুন
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">কোন লেনদেন পাওয়া যায়নি</h3>
                    <p className="text-muted-foreground">
                        আপনার ফিল্টার অনুযায়ী কোন লেনদেন খুঁজে পাওয়া যায়নি
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerHistory;
