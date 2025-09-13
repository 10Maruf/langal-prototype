import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Plus, Upload, MapPin, Tag, DollarSign } from "lucide-react";
import { LISTING_CATEGORIES, LISTING_TYPES, LOCATIONS } from "@/types/marketplace";
import { useAuth } from "@/contexts/AuthContext";

interface CreateListingProps {
    onListing: (listingData: any) => void;
    onCancel: () => void;
}

export const CreateListing = ({ onListing, onCancel }: CreateListingProps) => {
    const { user } = useAuth();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            setImages([...images, ...newImages]);
        }
    };

    const handleSubmit = () => {
        const listingData = {
            title,
            description,
            price: parseFloat(price),
            currency: "BDT",
            category,
            type,
            location: location || user?.location,
            contactInfo: {
                phone: phone
            },
            tags,
            images: images.map(img => URL.createObjectURL(img)) // In real app, upload to server
        };

        onListing(listingData);
    };

    const getTypeButtonText = () => {
        switch (user?.type) {
            case "farmer":
                return "বিজ্ঞাপন দিন";
            case "customer":
                return "পোস্ট করুন";
            default:
                return "তালিকাভুক্ত করুন";
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">নতুন বিজ্ঞাপন তৈরি করুন</CardTitle>
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{user?.name || "ব্যবহারকারী"}</p>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                {user?.location || "বাংলাদেশ"}
                            </span>
                            {user?.type === "farmer" && (
                                <Badge variant="secondary" className="text-xs">কৃষক</Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Listing Type & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">ধরন</label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="ধরন নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {LISTING_TYPES.map((listingType) => (
                                    <SelectItem key={listingType.id} value={listingType.id}>
                                        {listingType.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">ক্যাটেগরি</label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {LISTING_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.icon} {cat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">শিরোনাম</label>
                    <Input
                        placeholder="আপনার পণ্য বা সেবার শিরোনাম লিখুন..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2">বিবরণ</label>
                    <Textarea
                        placeholder="বিস্তারিত বিবরণ লিখুন..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Price & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            <DollarSign className="h-4 w-4 inline mr-1" />
                            দাম (টাকা)
                        </label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            স্থান
                        </label>
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger>
                                <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                {LOCATIONS.map((loc) => (
                                    <SelectItem key={loc} value={loc}>
                                        {loc}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <label className="block text-sm font-medium mb-2">যোগাযোগ নম্বর</label>
                    <Input
                        placeholder="01712-345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        <Tag className="h-4 w-4 inline mr-1" />
                        ট্যাগসমূহ
                    </label>
                    <div className="flex gap-2 mb-2">
                        <Input
                            placeholder="ট্যাগ যোগ করুন..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTag}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="cursor-pointer">
                                #{tag}
                                <X
                                    className="h-3 w-3 ml-1"
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        <Upload className="h-4 w-4 inline mr-1" />
                        ছবি আপলোড করুন
                    </label>
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-2"
                    />
                    {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-20 object-cover rounded border"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Button 
                        onClick={handleSubmit}
                        disabled={!title || !description || !category || !type || !price}
                        className="flex-1"
                    >
                        {getTypeButtonText()}
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        বাতিল
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};