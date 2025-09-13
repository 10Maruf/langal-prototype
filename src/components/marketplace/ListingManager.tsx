import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Edit2, 
    Trash2, 
    Search, 
    Filter, 
    Eye,
    Phone,
    MessageCircle,
    Share2,
    TrendingUp,
    DollarSign,
    MapPin,
    Calendar,
    BarChart3,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MarketplaceListing, LISTING_CATEGORIES, LISTING_TYPES } from "@/types/marketplace";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { marketplaceService } from "@/services/marketplaceService";

interface ListingManagerProps {
    onClose?: () => void;
}

export const ListingManager = ({ onClose }: ListingManagerProps) => {
    const { user } = useAuth();
    const { toast } = useToast();
    
    // State management
    const [myListings, setMyListings] = useState<MarketplaceListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
    const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
    const [activeTab, setActiveTab] = useState("listings");

    // Load user's listings
    useEffect(() => {
        if (user) {
            const userListings = marketplaceService.getUserListings(user.name);
            setMyListings(userListings);
            setFilteredListings(userListings);
        }
    }, [user]);

    // Filter listings based on search and filters
    useEffect(() => {
        let filtered = myListings;

        // Filter by category
        if (filterCategory !== "all") {
            filtered = filtered.filter(listing => listing.category === filterCategory);
        }

        // Filter by status
        if (filterStatus !== "all") {
            filtered = filtered.filter(listing => listing.status === filterStatus);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(listing => 
                listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredListings(filtered);
    }, [myListings, filterCategory, filterStatus, searchQuery]);

    // Handle listing edit
    const handleEditListing = (listing: MarketplaceListing) => {
        setEditingListing(listing);
        setEditedTitle(listing.title);
        setEditedDescription(listing.description);
        setEditedPrice(listing.price.toString());
    };

    // Save edited listing
    const handleSaveEdit = () => {
        if (editingListing) {
            const updatedListing = marketplaceService.updateListing(
                editingListing.id,
                { 
                    title: editedTitle,
                    description: editedDescription,
                    price: parseFloat(editedPrice)
                },
                user?.name || ""
            );
            
            if (updatedListing) {
                setMyListings(myListings.map(l => 
                    l.id === editingListing.id ? updatedListing : l
                ));
                setEditingListing(null);
                
                toast({
                    title: "বিজ্ঞাপন আপডেট হয়েছে",
                    description: "আপনার বিজ্ঞাপন সফলভাবে আপডেট করা হয়েছে।",
                });
            }
        }
    };

    // Handle listing delete
    const handleDeleteListing = (listingId: string) => {
        const success = marketplaceService.deleteListing(listingId, user?.name || "");
        
        if (success) {
            setMyListings(myListings.filter(l => l.id !== listingId));
            setShowDeleteDialog(null);
            
            toast({
                title: "বিজ্ঞাপন মুছে ফেলা হয়েছে",
                description: "আপনার বিজ্ঞাপন সফলভাবে মুছে ফেলা হয়েছে।",
            });
        }
    };

    // Get listing statistics
    const getListingStats = () => {
        const totalViews = myListings.reduce((sum, listing) => sum + listing.views, 0);
        const totalSaves = myListings.reduce((sum, listing) => sum + listing.saves, 0);
        const totalContacts = myListings.reduce((sum, listing) => sum + listing.contacts, 0);
        const averageViews = myListings.length > 0
            ? Math.round(totalViews / myListings.length)
            : 0;

        const mostViewedListing = myListings.length > 0
            ? myListings.reduce((max, listing) => listing.views > max.views ? listing : max, myListings[0])
            : null;

        return {
            totalListings: myListings.length,
            totalViews,
            totalSaves,
            totalContacts,
            averageViews,
            mostViewedListing,
            listingsByCategory: LISTING_CATEGORIES.reduce((acc, cat) => {
                acc[cat.id] = myListings.filter(l => l.category === cat.id).length;
                return acc;
            }, {} as Record<string, number>),
            listingsByStatus: {
                active: myListings.filter(l => l.status === "active").length,
                sold: myListings.filter(l => l.status === "sold").length,
                expired: myListings.filter(l => l.status === "expired").length,
                draft: myListings.filter(l => l.status === "draft").length,
            }
        };
    };

    const stats = getListingStats();

    const categoryLabels = LISTING_CATEGORIES.reduce((acc, cat) => {
        acc[cat.id] = cat.label;
        return acc;
    }, {} as Record<string, string>);

    const typeLabels = LISTING_TYPES.reduce((acc, type) => {
        acc[type.id] = type.label;
        return acc;
    }, {} as Record<string, string>);

    const statusLabels = {
        active: "সক্রিয়",
        sold: "বিক্রিত",
        expired: "মেয়াদোত্তীর্ণ",
        draft: "খসড়া"
    };

    const statusColors = {
        active: "bg-green-50 text-green-700 border-green-200",
        sold: "bg-blue-50 text-blue-700 border-blue-200",
        expired: "bg-red-50 text-red-700 border-red-200",
        draft: "bg-gray-50 text-gray-700 border-gray-200"
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "আজ";
        if (diffDays === 1) return "গতকাল";
        if (diffDays < 7) return `${diffDays} দিন আগে`;
        return date.toLocaleDateString('bn-BD');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">আমার বিজ্ঞাপন ম্যানেজার</h1>
                    <p className="text-muted-foreground">
                        আপনার সকল বিজ্ঞাপন দেখুন, সম্পাদনা করুন এবং পরিচালনা করুন
                    </p>
                </div>
                {onClose && (
                    <Button variant="outline" onClick={onClose}>
                        বন্ধ করুন
                    </Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="listings">বিজ্ঞাপন তালিকা</TabsTrigger>
                    <TabsTrigger value="analytics">পরিসংখ্যান</TabsTrigger>
                    <TabsTrigger value="settings">সেটিংস</TabsTrigger>
                </TabsList>

                <TabsContent value="listings" className="space-y-4">
                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="বিজ্ঞাপন খুঁজুন..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <Select value={filterCategory} onValueChange={setFilterCategory}>
                                    <SelectTrigger className="w-[180px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">সব ক্যাটেগরি</SelectItem>
                                        {LISTING_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">সব অবস্থা</SelectItem>
                                        <SelectItem value="active">সক্রিয়</SelectItem>
                                        <SelectItem value="sold">বিক্রিত</SelectItem>
                                        <SelectItem value="expired">মেয়াদোত্তীর্ণ</SelectItem>
                                        <SelectItem value="draft">খসড়া</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Listings List */}
                    <div className="space-y-4">
                        {filteredListings.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <div className="text-4xl mb-4">📦</div>
                                    <h3 className="text-lg font-medium mb-2">কোন বিজ্ঞাপন নেই</h3>
                                    <p className="text-muted-foreground">
                                        {searchQuery || filterCategory !== "all" || filterStatus !== "all"
                                            ? "আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোন বিজ্ঞাপন খুঁজে পাওয়া যায়নি।"
                                            : "আপনি এখনো কোন বিজ্ঞাপন দেননি। প্রথম বিজ্ঞাপন দিন!"
                                        }
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredListings.map((listing) => (
                                <Card key={listing.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className={statusColors[listing.status]}>
                                                    {statusLabels[listing.status]}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {typeLabels[listing.type]}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {formatTime(listing.createdAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedListing(listing)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditListing(listing)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowDeleteDialog(listing.id)}
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <h3 className="font-medium">{listing.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {listing.description.length > 100
                                                    ? listing.description.substring(0, 100) + "..."
                                                    : listing.description
                                                }
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                                <span className="font-medium text-green-600">
                                                    ৳{listing.price}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{listing.location}</span>
                                            </div>
                                        </div>

                                        {listing.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {listing.tags.map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{listing.views}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Phone className="h-4 w-4" />
                                                <span>{listing.contacts}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                                        <TrendingUp className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট বিজ্ঞাপন</p>
                                        <p className="text-2xl font-bold">{stats.totalListings}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-full mr-4">
                                        <Eye className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট ভিউ</p>
                                        <p className="text-2xl font-bold">{stats.totalViews}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">মোট যোগাযোগ</p>
                                        <p className="text-2xl font-bold">{stats.totalContacts}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-orange-100 rounded-full mr-4">
                                        <BarChart3 className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">গড় ভিউ</p>
                                        <p className="text-2xl font-bold">{stats.averageViews}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>ক্যাটেগরি অনুযায়ী বিতরণ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {LISTING_CATEGORIES.map((cat) => {
                                    const count = stats.listingsByCategory[cat.id] || 0;
                                    const percentage = stats.totalListings > 0 
                                        ? Math.round((count / stats.totalListings) * 100) 
                                        : 0;
                                    
                                    return (
                                        <div key={cat.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span>{cat.icon}</span>
                                                <span className="text-sm">{cat.label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 bg-muted rounded-full h-2">
                                                    <div 
                                                        className="bg-primary h-2 rounded-full transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium w-8">{count}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>বিজ্ঞাপন সেটিংস</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">অটো রিনিউ</h4>
                                    <p className="text-sm text-muted-foreground">
                                        ৩০ দিন পর স্বয়ংক্রিয়ভাবে বিজ্ঞাপন নবায়ন করুন
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    সক্রিয় করুন
                                </Button>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">ইমেইল নোটিফিকেশন</h4>
                                    <p className="text-sm text-muted-foreground">
                                        নতুন যোগাযোগের জন্য ইমেইল পান
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    সক্রিয় করুন
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Edit Dialog */}
            <Dialog open={!!editingListing} onOpenChange={() => setEditingListing(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>বিজ্ঞাপন সম্পাদনা করুন</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">শিরোনাম</label>
                            <Input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">বিবরণ</label>
                            <Textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">দাম</label>
                            <Input
                                type="number"
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleSaveEdit} className="flex-1">
                                সংরক্ষণ করুন
                            </Button>
                            <Button variant="outline" onClick={() => setEditingListing(null)}>
                                বাতিল
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>বিজ্ঞাপন মুছে ফেলুন</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-destructive" />
                            <p>আপনি কি নিশ্চিত যে এই বিজ্ঞাপনটি মুছে ফেলতে চান?</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="destructive"
                                onClick={() => showDeleteDialog && handleDeleteListing(showDeleteDialog)}
                                className="flex-1"
                            >
                                হ্যাঁ, মুছে ফেলুন
                            </Button>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
                                বাতিল
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};