import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Sprout,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    Map,
    FileText,
    Camera,
    Plus,
    Edit,
    BarChart3,
    TrendingUp
} from "lucide-react";

interface CropVerification {
    id: number;
    farmerId: number;
    farmerName: string;
    farmerPhone: string;
    cropType: string;
    landArea: string;
    landAreaUnit: "বিঘা" | "কাঠা" | "একর";
    location: string;
    district: string;
    upazila: string;
    landDocuments: string[];
    cropPhotos: string[];
    gpsCoordinates?: {
        latitude: number;
        longitude: number;
    };
    submissionDate: string;
    verificationStatus: "verified" | "pending" | "rejected";
    verificationNotes?: string;
    estimatedYield?: string;
    sowingDate?: string;
    harvestDate?: string;
}

interface CropVerificationProps {
    cropVerifications: CropVerification[];
    onStatusUpdate: (id: number, status: "verified" | "rejected", notes?: string) => void;
    onAddCrop?: (crop: Omit<CropVerification, 'id'>) => void;
    onUpdateCrop?: (id: number, crop: Partial<CropVerification>) => void;
}

const CropVerification = ({ cropVerifications, onStatusUpdate, onAddCrop, onUpdateCrop }: CropVerificationProps) => {
    const [selectedCrop, setSelectedCrop] = useState<CropVerification | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [verificationNotes, setVerificationNotes] = useState("");
    const [activeTab, setActiveTab] = useState("verification");

    // Location filter states
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [selectedUnion, setSelectedUnion] = useState("");

    // Form states for adding/editing crops
    const [formData, setFormData] = useState({
        farmerId: 0,
        farmerName: "",
        farmerPhone: "",
        cropType: "",
        landArea: "",
        landAreaUnit: "বিঘা" as "বিঘা" | "কাঠা" | "একর",
        location: "",
        district: "",
        upazila: "",
        estimatedYield: "",
        sowingDate: "",
        harvestDate: "",
        landDocuments: [] as string[],
        cropPhotos: [] as string[],
        gpsCoordinates: undefined as { latitude: number; longitude: number } | undefined
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "verified":
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />যাচাইকৃত</Badge>;
            case "rejected":
                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />বাতিল</Badge>;
            case "pending":
            default:
                return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />অপেক্ষমান</Badge>;
        }
    };

    const handleViewDetails = (crop: CropVerification) => {
        setSelectedCrop(crop);
        setVerificationNotes(crop.verificationNotes || "");
        setIsDetailsOpen(true);
    };

    const handleStatusUpdate = (status: "verified" | "rejected") => {
        if (selectedCrop) {
            onStatusUpdate(selectedCrop.id, status, verificationNotes);
            setIsDetailsOpen(false);
            setVerificationNotes("");
        }
    };

    const resetForm = () => {
        setFormData({
            farmerId: 0,
            farmerName: "",
            farmerPhone: "",
            cropType: "",
            landArea: "",
            landAreaUnit: "বিঘা",
            location: "",
            district: "",
            upazila: "",
            estimatedYield: "",
            sowingDate: "",
            harvestDate: "",
            landDocuments: [],
            cropPhotos: [],
            gpsCoordinates: undefined
        });
    };

    const handleAddCrop = () => {
        if (onAddCrop && formData.farmerName && formData.cropType && formData.landArea) {
            const newCrop = {
                ...formData,
                submissionDate: new Date().toLocaleDateString('bn-BD'),
                verificationStatus: "pending" as const,
                verificationNotes: ""
            };
            onAddCrop(newCrop);
            resetForm();
            setIsAddFormOpen(false);
        }
    };

    const handleEditCrop = () => {
        if (onUpdateCrop && selectedCrop) {
            onUpdateCrop(selectedCrop.id, formData);
            setIsEditFormOpen(false);
            setIsDetailsOpen(false);
            resetForm();
        }
    };

    const openEditForm = (crop: CropVerification) => {
        setSelectedCrop(crop);
        setFormData({
            farmerId: crop.farmerId,
            farmerName: crop.farmerName,
            farmerPhone: crop.farmerPhone,
            cropType: crop.cropType,
            landArea: crop.landArea,
            landAreaUnit: crop.landAreaUnit,
            location: crop.location,
            district: crop.district,
            upazila: crop.upazila,
            estimatedYield: crop.estimatedYield || "",
            sowingDate: crop.sowingDate || "",
            harvestDate: crop.harvestDate || "",
            landDocuments: crop.landDocuments,
            cropPhotos: crop.cropPhotos,
            gpsCoordinates: crop.gpsCoordinates
        });
        setIsEditFormOpen(true);
    };

    // Location data
    const locationData = {
        "ঢাকা": {
            "ঢাকা": {
                "ধামরাই": ["সাভার", "বিরুলিয়া", "সুতারপাড়া"],
                "সাভার": ["আশুলিয়া", "বিরুলিয়া", "তেতুলঝোড়া"],
                "কেরানীগঞ্জ": ["কেরানীগঞ্জ সদর", "রুহিতপুর", "কলাতিয়া"]
            },
            "গাজীপুর": {
                "গাজীপুর সদর": ["বোর্ড বাজার", "বাড্ডা", "গাছা"],
                "কালীগঞ্জ": ["কালীগঞ্জ সদর", "তুমলিয়া", "নাগরী"]
            }
        },
        "চট্টগ্রাম": {
            "চট্টগ্রাম": {
                "চট্টগ্রাম সদর": ["পাহাড়তলী", "আকবরশাহ", "বাকলিয়া"],
                "সীতাকুণ্ড": ["সীতাকুণ্ড সদর", "মুরাদপুর", "কুমিরা"]
            },
            "কক্সবাজার": {
                "কক্সবাজার সদর": ["কক্সবাজার সদর", "ঈশখালী", "জহুরা নগর"]
            }
        },
        "রাজশাহী": {
            "রাজশাহী": {
                "রাজশাহী সদর": ["রাজশাহী সদর", "কাজলা", "পুঠিয়া"],
                "গোদাগাড়ী": ["গোদাগাড়ী সদর", "পাকড়ী", "রিশিকুল"]
            }
        },
        "খুলনা": {
            "খুলনা": {
                "খুলনা সদর": ["খুলনা সদর", "সোনাডাঙ্গা", "খালিশপুর"],
                "দাকোপ": ["দাকোপ সদর", "কামারখোলা", "বাজুয়া"]
            }
        },
        "বরিশাল": {
            "বরিশাল": {
                "বরিশাল সদর": ["বরিশাল সদর", "কোটওয়ালী", "বানারীপাড়া"],
                "উজিরপুর": ["উজিরপুর সদর", "হার্টা", "বামনা"]
            }
        },
        "সিলেট": {
            "সিলেট": {
                "সিলেট সদর": ["সিলেট সদর", "খাদিমনগর", "জালালাবাদ"],
                "গোলাপগঞ্জ": ["গোলাপগঞ্জ সদর", "ফুলবাড়ী", "লক্ষ্মীপাশা"]
            }
        },
        "রংপুর": {
            "রংপুর": {
                "রংপুর সদর": ["রংপুর সদর", "তাজহাট", "আলমনগর"],
                "মিঠাপুকুর": ["মিঠাপুকুর সদর", "রানীশংকৈল", "ডিমলা"]
            }
        },
        "ময়মনসিংহ": {
            "ময়মনসিংহ": {
                "ময়মনসিংহ সদর": ["ময়মনসিংহ সদর", "চর ঈশ্বরদী", "ভালুকা"],
                "ত্রিশাল": ["ত্রিশাল সদর", "ধানিখোলা", "রামগোপালপুর"]
            }
        }
    };

    // Get districts based on selected division
    const getDistricts = () => {
        if (!selectedDivision) return [];
        return Object.keys(locationData[selectedDivision as keyof typeof locationData] || {});
    };

    // Get upazilas based on selected district
    const getUpazilas = () => {
        if (!selectedDivision || !selectedDistrict) return [];
        const divisionData = locationData[selectedDivision as keyof typeof locationData];
        return Object.keys(divisionData?.[selectedDistrict as keyof typeof divisionData] || {});
    };

    // Get unions based on selected upazila
    const getUnions = () => {
        if (!selectedDivision || !selectedDistrict || !selectedUpazila) return [];
        const divisionData = locationData[selectedDivision as keyof typeof locationData];
        const districtData = divisionData?.[selectedDistrict as keyof typeof divisionData];
        return districtData?.[selectedUpazila as keyof typeof districtData] || [];
    };

    // Filter crops based on selected location
    const getFilteredCrops = () => {
        // If no filters selected, return all crops
        if (!selectedDivision && !selectedDistrict && !selectedUpazila && !selectedUnion) {
            return cropVerifications;
        }

        return cropVerifications.filter(crop => {
            // Check division filter by checking if district belongs to selected division
            if (selectedDivision) {
                const divisionData = locationData[selectedDivision as keyof typeof locationData];
                if (!divisionData || !Object.keys(divisionData).includes(crop.district)) {
                    return false;
                }
            }

            if (selectedDistrict && crop.district !== selectedDistrict) return false;
            if (selectedUpazila && crop.upazila !== selectedUpazila) return false;
            if (selectedUnion && (crop as any).union !== selectedUnion) return false;
            return true;
        });
    };

    // Enhanced location summary with filtering
    const getLocationSummary = () => {
        // Apply filters if any are selected
        let cropsToProcess = cropVerifications;

        if (selectedDivision || selectedDistrict || selectedUpazila || selectedUnion) {
            cropsToProcess = getFilteredCrops();
        }

        if (cropsToProcess.length === 0) {
            return [];
        }

        // Simple grouping by district-upazila
        const groups: { [key: string]: any } = {};

        cropsToProcess.forEach((crop) => {
            const key = `${crop.district}-${crop.upazila}`;

            if (!groups[key]) {
                groups[key] = {
                    district: crop.district,
                    upazila: crop.upazila,
                    union: (crop as any).union || "সব ইউনিয়ন",
                    totalCrops: 0,
                    totalLandArea: 0,
                    crops: {},
                    verified: 0,
                    pending: 0,
                    rejected: 0,
                    farmers: new Set(),
                    totalYield: 0,
                    avgYieldPerBigha: 0
                };
            }

            const group = groups[key];
            group.totalCrops++;

            // Convert Bengali numerals to English for parsing
            const englishLandArea = crop.landArea.replace(/[০-৯]/g, (digit) => {
                return String.fromCharCode(digit.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0));
            });
            const landAreaNum = parseFloat(englishLandArea) || 0;
            group.totalLandArea += landAreaNum;

            // Add farmer to set (for unique count)
            group.farmers.add(crop.farmerName);

            // Status counting
            group[crop.verificationStatus]++;

            // Calculate yield
            if (crop.estimatedYield) {
                const englishYield = crop.estimatedYield.replace(/[০-৯]/g, (digit) => {
                    return String.fromCharCode(digit.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0));
                });
                const yieldAmount = parseFloat(englishYield.replace(/[^\d.]/g, '')) || 0;
                group.totalYield += yieldAmount;
            }

            // Crop type counting
            if (!group.crops[crop.cropType]) {
                group.crops[crop.cropType] = { count: 0, totalArea: 0, avgArea: 0 };
            }
            group.crops[crop.cropType].count++;
            group.crops[crop.cropType].totalArea += landAreaNum;
            group.crops[crop.cropType].avgArea = group.crops[crop.cropType].totalArea / group.crops[crop.cropType].count;
        });

        // Convert farmers Set to count and calculate averages
        Object.keys(groups).forEach(key => {
            groups[key].farmerCount = groups[key].farmers.size;
            groups[key].avgYieldPerBigha = groups[key].totalLandArea > 0
                ? groups[key].totalYield / groups[key].totalLandArea
                : 0;
            delete groups[key].farmers;
        });

        return Object.values(groups);
    };

    const getCropIcon = (cropType: string) => {
        switch (cropType.toLowerCase()) {
            case "ধান":
                return "🌾";
            case "গম":
                return "🌾";
            case "ভুট্টা":
                return "🌽";
            case "পাট":
                return "🌱";
            case "আলু":
                return "🥔";
            case "পেঁয়াজ":
                return "🧅";
            case "টমেটো":
                return "🍅";
            case "কাঁচামরিচ":
                return "🌶️";
            default:
                return "🌱";
        }
    };

    const renderCropForm = (title: string, onSubmit: () => void, onCancel: () => void) => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="farmerName">কৃষকের নাম</Label>
                    <Input
                        id="farmerName"
                        value={formData.farmerName}
                        onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                        placeholder="কৃষকের নাম লিখুন"
                    />
                </div>
                <div>
                    <Label htmlFor="farmerPhone">কৃষকের ফোন নম্বর</Label>
                    <Input
                        id="farmerPhone"
                        value={formData.farmerPhone}
                        onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="cropType">ফসলের ধরন</Label>
                    <Select value={formData.cropType} onValueChange={(value) => setFormData({ ...formData, cropType: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="ফসল নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ধান">ধান</SelectItem>
                            <SelectItem value="গম">গম</SelectItem>
                            <SelectItem value="ভুট্টা">ভুট্টা</SelectItem>
                            <SelectItem value="পাট">পাট</SelectItem>
                            <SelectItem value="আলু">আলু</SelectItem>
                            <SelectItem value="পেঁয়াজ">পেঁয়াজ</SelectItem>
                            <SelectItem value="রসুন">রসুন</SelectItem>
                            <SelectItem value="টমেটো">টমেটো</SelectItem>
                            <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Label htmlFor="landArea">জমির পরিমাণ</Label>
                        <Input
                            id="landArea"
                            value={formData.landArea}
                            onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                            placeholder="জমির পরিমাণ"
                        />
                    </div>
                    <div className="w-24">
                        <Label htmlFor="landAreaUnit">একক</Label>
                        <Select value={formData.landAreaUnit} onValueChange={(value: "বিঘা" | "কাঠা" | "একর") => setFormData({ ...formData, landAreaUnit: value })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="বিঘা">বিঘা</SelectItem>
                                <SelectItem value="কাঠা">কাঠা</SelectItem>
                                <SelectItem value="একর">একর</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="district">জেলা</Label>
                    <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="জেলা"
                    />
                </div>
                <div>
                    <Label htmlFor="upazila">উপজেলা</Label>
                    <Input
                        id="upazila"
                        value={formData.upazila}
                        onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        placeholder="উপজেলা"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="location">সম্পূর্ণ ঠিকানা</Label>
                <Textarea
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="গ্রাম, ডাকঘর এবং অন্যান্য তথ্য"
                    rows={3}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="estimatedYield">আনুমানিক ফলন</Label>
                    <Input
                        id="estimatedYield"
                        value={formData.estimatedYield}
                        onChange={(e) => setFormData({ ...formData, estimatedYield: e.target.value })}
                        placeholder="যেমন: ২০ মণ"
                    />
                </div>
                <div>
                    <Label htmlFor="sowingDate">বপনের তারিখ</Label>
                    <Input
                        id="sowingDate"
                        value={formData.sowingDate}
                        onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                        placeholder="দিন/মাস/বছর"
                    />
                </div>
                <div>
                    <Label htmlFor="harvestDate">কাটার তারিখ</Label>
                    <Input
                        id="harvestDate"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                        placeholder="দিন/মাস/বছর"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={onCancel}>
                    বাতিল
                </Button>
                <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
                    {title.includes('যোগ') ? 'সংরক্ষণ' : 'আপডেট'}
                </Button>
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Sprout className="h-5 w-5" />
                            ফসল ও জমির তথ্য যাচাইকরণ
                        </CardTitle>
                        <CardDescription>
                            কৃষকদের ফসল ও জমির পরিমাণ যাচাই করুন এবং অনুমোদন দিন
                        </CardDescription>
                    </div>
                    {onAddCrop && (
                        <Button onClick={() => setIsAddFormOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            নতুন ফসলের তথ্য যোগ করুন
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="verification" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            ফসল যাচাইকরণ
                        </TabsTrigger>
                        <TabsTrigger value="summary" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            লোকেশন ভিত্তিক সামারি
                        </TabsTrigger>
                    </TabsList>

                    {/* Verification Tab */}
                    <TabsContent value="verification" className="space-y-4">
                        <div className="space-y-4">
                            {cropVerifications.map((crop) => (
                                <div key={crop.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="text-3xl">{getCropIcon(crop.cropType)}</div>
                                            <div className="space-y-1">
                                                <h3 className="font-medium text-lg">{crop.farmerName}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <Sprout className="inline h-3 w-3 mr-1" />
                                                        ফসল: {crop.cropType}
                                                    </span>
                                                    <span className="flex items-center">
                                                        জমি: {crop.landArea} {crop.landAreaUnit}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <MapPin className="inline h-3 w-3 mr-1" />
                                                        {crop.upazila}, {crop.district}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="inline h-3 w-3 mr-1" />
                                                        জমা: {crop.submissionDate}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-sm font-medium">অবস্থা:</span>
                                                    {getStatusBadge(crop.verificationStatus)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetails(crop)}
                                            >
                                                <Eye className="h-3 w-3 mr-1" />
                                                বিস্তারিত
                                            </Button>
                                            {onUpdateCrop && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => openEditForm(crop)}
                                                >
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    সম্পাদনা
                                                </Button>
                                            )}
                                            {crop.gpsCoordinates && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        // Open Google Maps with coordinates
                                                        const url = `https://www.google.com/maps?q=${crop.gpsCoordinates!.latitude},${crop.gpsCoordinates!.longitude}`;
                                                        window.open(url, '_blank');
                                                    }}
                                                >
                                                    <Map className="h-3 w-3 mr-1" />
                                                    ম্যাপ
                                                </Button>
                                            )}
                                            {crop.verificationStatus === "pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleStatusUpdate("verified")}
                                                    >
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        অনুমোদন
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleStatusUpdate("rejected")}
                                                    >
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        বাতিল
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Summary Tab */}
                    <TabsContent value="summary" className="space-y-4">
                        {/* Location Filters */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    এলাকা নির্বাচন করুন
                                </CardTitle>
                                <CardDescription>
                                    বিভাগ, জেলা, উপজেলা এবং ইউনিয়ন অনুযায়ী ফসলের তথ্য দেখুন
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <Label htmlFor="division">বিভাগ</Label>
                                        <Select value={selectedDivision || "all"} onValueChange={(value) => {
                                            setSelectedDivision(value === "all" ? "" : value);
                                            setSelectedDistrict("");
                                            setSelectedUpazila("");
                                            setSelectedUnion("");
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">সব বিভাগ</SelectItem>
                                                {Object.keys(locationData).map((division) => (
                                                    <SelectItem key={division} value={division}>
                                                        {division}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="district">জেলা</Label>
                                        <Select
                                            value={selectedDistrict || "all"}
                                            onValueChange={(value) => {
                                                setSelectedDistrict(value === "all" ? "" : value);
                                                setSelectedUpazila("");
                                                setSelectedUnion("");
                                            }}
                                            disabled={!selectedDivision}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="জেলা নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">সব জেলা</SelectItem>
                                                {getDistricts().map((district) => (
                                                    <SelectItem key={district} value={district}>
                                                        {district}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="upazila">উপজেলা</Label>
                                        <Select
                                            value={selectedUpazila || "all"}
                                            onValueChange={(value) => {
                                                setSelectedUpazila(value === "all" ? "" : value);
                                                setSelectedUnion("");
                                            }}
                                            disabled={!selectedDistrict}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">সব উপজেলা</SelectItem>
                                                {getUpazilas().map((upazila) => (
                                                    <SelectItem key={upazila} value={upazila}>
                                                        {upazila}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="union">ইউনিয়ন</Label>
                                        <Select
                                            value={selectedUnion || "all"}
                                            onValueChange={(value) => setSelectedUnion(value === "all" ? "" : value)}
                                            disabled={!selectedUpazila}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="ইউনিয়ন নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">সব ইউনিয়ন</SelectItem>
                                                {getUnions().map((union) => (
                                                    <SelectItem key={union} value={union}>
                                                        {union}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Summary Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {getLocationSummary().length > 0 ? (
                                getLocationSummary().map((location: any, index: number) => (
                                    <Card key={index} className="border-l-4 border-l-green-500">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-green-600" />
                                                {location.district}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <span>{location.upazila}</span>
                                                {location.union !== "সব ইউনিয়ন" && (
                                                    <span className="text-blue-600">• {location.union}</span>
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Basic Statistics */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                    <div className="text-2xl font-bold text-blue-600">{location.totalCrops}</div>
                                                    <div className="text-sm text-blue-600">মোট ফসল</div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                                    <div className="text-2xl font-bold text-green-600">{location.farmerCount}</div>
                                                    <div className="text-sm text-green-600">কৃষক সংখ্যা</div>
                                                </div>
                                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                                    <div className="text-2xl font-bold text-purple-600">
                                                        {location.totalLandArea.toFixed(1)}
                                                    </div>
                                                    <div className="text-sm text-purple-600">মোট জমি (বিঘা)</div>
                                                </div>
                                                <div className="bg-orange-50 p-3 rounded-lg text-center">
                                                    <div className="text-2xl font-bold text-orange-600">
                                                        {location.avgYieldPerBigha.toFixed(1)}
                                                    </div>
                                                    <div className="text-sm text-orange-600">গড় ফলন/বিঘা</div>
                                                </div>
                                            </div>

                                            {/* Verification Status */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-sm flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    যাচাইকরণ অবস্থা
                                                </h4>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div className="text-center p-2 bg-green-50 rounded border-l-2 border-green-400">
                                                        <div className="text-green-700 font-bold text-lg">{location.verified}</div>
                                                        <div className="text-green-600">যাচাইকৃত</div>
                                                        <div className="text-green-500 text-xs">
                                                            {location.totalCrops > 0 ? `${((location.verified / location.totalCrops) * 100).toFixed(1)}%` : '0%'}
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                                                        <div className="text-yellow-700 font-bold text-lg">{location.pending}</div>
                                                        <div className="text-yellow-600">অপেক্ষমান</div>
                                                        <div className="text-yellow-500 text-xs">
                                                            {location.totalCrops > 0 ? `${((location.pending / location.totalCrops) * 100).toFixed(1)}%` : '0%'}
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-2 bg-red-50 rounded border-l-2 border-red-400">
                                                        <div className="text-red-700 font-bold text-lg">{location.rejected}</div>
                                                        <div className="text-red-600">বাতিল</div>
                                                        <div className="text-red-500 text-xs">
                                                            {location.totalCrops > 0 ? `${((location.rejected / location.totalCrops) * 100).toFixed(1)}%` : '0%'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Crop Type Details */}
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm flex items-center gap-2">
                                                    <Sprout className="h-4 w-4" />
                                                    ফসলভিত্তিক বিস্তারিত
                                                </h4>
                                                <div className="space-y-2">
                                                    {Object.entries(location.crops).map(([cropType, cropData]: [string, any]) => (
                                                        <div key={cropType} className="bg-gray-50 p-3 rounded border">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="flex items-center gap-2 font-medium">
                                                                    <span className="text-xl">{getCropIcon(cropType)}</span>
                                                                    {cropType}
                                                                </span>
                                                                <Badge variant="outline" className="bg-white">
                                                                    {cropData.count} টি খামার
                                                                </Badge>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                                                                <div>
                                                                    <div className="font-medium">মোট জমি</div>
                                                                    <div className="text-blue-600 font-bold">
                                                                        {cropData.totalArea.toFixed(1)} বিঘা
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">গড় জমি</div>
                                                                    <div className="text-green-600 font-bold">
                                                                        {cropData.avgArea.toFixed(1)} বিঘা
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">শতাংশ</div>
                                                                    <div className="text-purple-600 font-bold">
                                                                        {((cropData.totalArea / location.totalLandArea) * 100).toFixed(1)}%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Additional Statistics */}
                                            <div className="pt-3 border-t space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">গড় জমি প্রতি কৃষক:</span>
                                                    <span className="font-medium text-indigo-600">
                                                        {(location.totalLandArea / location.farmerCount).toFixed(2)} বিঘা
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">মোট আনুমানিক ফলন:</span>
                                                    <span className="font-medium text-green-600">
                                                        {location.totalYield.toFixed(1)} মণ
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600 flex items-center gap-1">
                                                        <TrendingUp className="h-3 w-3" />
                                                        সফলতার হার:
                                                    </span>
                                                    <span className="font-medium text-green-600">
                                                        {location.totalCrops > 0 ? ((location.verified / location.totalCrops) * 100).toFixed(1) : 0}%
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full">
                                    <Card className="text-center p-8">
                                        <CardContent>
                                            <div className="text-gray-400 text-6xl mb-4">📊</div>
                                            <h3 className="text-lg font-medium text-gray-600 mb-2">কোনো ডেটা পাওয়া যায়নি</h3>
                                            <p className="text-gray-500">
                                                {selectedDistrict || selectedDivision
                                                    ? "নির্বাচিত এলাকায় কোনো ফসলের তথ্য নেই। অন্য এলাকা নির্বাচন করুন।"
                                                    : "প্রথমে একটি এলাকা নির্বাচন করুন অথবা সব ডেটা দেখতে কোনো ফিল্টার প্রয়োগ করুন।"
                                                }
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() => {
                                                    setSelectedDivision("");
                                                    setSelectedDistrict("");
                                                    setSelectedUpazila("");
                                                    setSelectedUnion("");
                                                }}
                                            >
                                                সব ফিল্টার রিসেট করুন
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>

                        {/* Overall Statistics */}
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    {selectedDistrict || selectedDivision ?
                                        `${selectedDivision ? selectedDivision + ' বিভাগের' : ''} ${selectedDistrict ? selectedDistrict + ' জেলার' : ''} ${selectedUpazila ? selectedUpazila + ' উপজেলার' : ''} সামগ্রিক পরিসংখ্যান`
                                        : 'সামগ্রিক পরিসংখ্যান'
                                    }
                                </CardTitle>
                                <CardDescription>
                                    {getFilteredCrops().length > 0 ?
                                        `${getFilteredCrops().length} টি ফসলের তথ্য প্রদর্শিত হচ্ছে`
                                        : 'কোনো ফসলের তথ্য পাওয়া যায়নি'
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {getFilteredCrops().length}
                                        </div>
                                        <div className="text-sm text-gray-600">মোট আবেদন</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-green-600">
                                            {getFilteredCrops().filter(c => c.verificationStatus === 'verified').length}
                                        </div>
                                        <div className="text-sm text-gray-600">যাচাইকৃত</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {getFilteredCrops().filter(c => c.verificationStatus === 'pending').length}
                                        </div>
                                        <div className="text-sm text-gray-600">অপেক্ষমান</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {getFilteredCrops().reduce((sum, c) => {
                                                const englishLandArea = c.landArea.replace(/[০-৯]/g, (digit) => {
                                                    return String.fromCharCode(digit.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0));
                                                });
                                                return sum + (parseFloat(englishLandArea) || 0);
                                            }, 0).toFixed(1)}
                                        </div>
                                        <div className="text-sm text-gray-600">মোট জমি (বিঘা)</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                        <div className="text-2xl font-bold text-indigo-600">
                                            {getFilteredCrops().reduce((sum, c) => {
                                                const englishYield = (c.estimatedYield || '').replace(/[০-৯]/g, (digit) => {
                                                    return String.fromCharCode(digit.charCodeAt(0) - '০'.charCodeAt(0) + '0'.charCodeAt(0));
                                                });
                                                const yield_ = parseFloat(englishYield.replace(/[^\d.]/g, '') || '0');
                                                return sum + yield_;
                                            }, 0).toFixed(1)}
                                        </div>
                                        <div className="text-sm text-gray-600">আনুমানিক ফলন (মণ)</div>
                                    </div>
                                </div>

                                {/* Crop Type Distribution */}
                                {getFilteredCrops().length > 0 && (
                                    <div className="mt-6 space-y-3">
                                        <h3 className="font-medium flex items-center gap-2">
                                            <Sprout className="h-4 w-4" />
                                            ফসলের বিতরণ
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {Object.entries(
                                                getFilteredCrops().reduce((acc: any, crop) => {
                                                    acc[crop.cropType] = (acc[crop.cropType] || 0) + 1;
                                                    return acc;
                                                }, {})
                                            ).map(([cropType, count]: [string, any]) => (
                                                <div key={cropType} className="bg-white p-3 rounded-lg text-center shadow-sm">
                                                    <div className="text-2xl mb-1">{getCropIcon(cropType)}</div>
                                                    <div className="font-medium text-sm">{cropType}</div>
                                                    <div className="text-lg font-bold text-blue-600">{count}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {((count / getFilteredCrops().length) * 100).toFixed(1)}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Details Dialog */}
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>ফসল ও জমির বিস্তারিত তথ্য</DialogTitle>
                            <DialogDescription>
                                সম্পূর্ণ তথ্য যাচাই করুন এবং সিদ্ধান্ত নিন
                            </DialogDescription>
                        </DialogHeader>
                        {selectedCrop && (
                            <div className="space-y-6">
                                {/* Farmer and Crop Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">কৃষকের তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div>
                                                <Label className="font-medium">কৃষকের নাম</Label>
                                                <p className="text-sm">{selectedCrop.farmerName}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">ফোন নম্বর</Label>
                                                <p className="text-sm">{selectedCrop.farmerPhone}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">এলাকা</Label>
                                                <p className="text-sm">{selectedCrop.location}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">উপজেলা ও জেলা</Label>
                                                <p className="text-sm">{selectedCrop.upazila}, {selectedCrop.district}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">ফসলের তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div>
                                                <Label className="font-medium">ফসলের ধরন</Label>
                                                <p className="text-sm flex items-center">
                                                    <span className="text-2xl mr-2">{getCropIcon(selectedCrop.cropType)}</span>
                                                    {selectedCrop.cropType}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">জমির পরিমাণ</Label>
                                                <p className="text-sm">{selectedCrop.landArea} {selectedCrop.landAreaUnit}</p>
                                            </div>
                                            {selectedCrop.sowingDate && (
                                                <div>
                                                    <Label className="font-medium">বপন তারিখ</Label>
                                                    <p className="text-sm">{selectedCrop.sowingDate}</p>
                                                </div>
                                            )}
                                            {selectedCrop.harvestDate && (
                                                <div>
                                                    <Label className="font-medium">ফসল কাটার তারিখ</Label>
                                                    <p className="text-sm">{selectedCrop.harvestDate}</p>
                                                </div>
                                            )}
                                            {selectedCrop.estimatedYield && (
                                                <div>
                                                    <Label className="font-medium">প্রত্যাশিত ফলন</Label>
                                                    <p className="text-sm">{selectedCrop.estimatedYield}</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* GPS Coordinates */}
                                {selectedCrop.gpsCoordinates && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">অবস্থান তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="font-medium">অক্ষাংশ (Latitude)</Label>
                                                    <p className="text-sm">{selectedCrop.gpsCoordinates.latitude}</p>
                                                </div>
                                                <div>
                                                    <Label className="font-medium">দ্রাঘিমাংশ (Longitude)</Label>
                                                    <p className="text-sm">{selectedCrop.gpsCoordinates.longitude}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="mt-3"
                                                onClick={() => {
                                                    const url = `https://www.google.com/maps?q=${selectedCrop.gpsCoordinates!.latitude},${selectedCrop.gpsCoordinates!.longitude}`;
                                                    window.open(url, '_blank');
                                                }}
                                            >
                                                <Map className="h-4 w-4 mr-2" />
                                                Google Maps এ দেখুন
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Documents and Photos */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">কাগজপত্র ও ছবি</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="font-medium mb-2 block">জমির দলিল</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedCrop.landDocuments.map((doc, index) => (
                                                        <div key={index} className="flex items-center p-2 bg-gray-100 rounded">
                                                            <FileText className="h-4 w-4 mr-2" />
                                                            <span className="text-sm">{doc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="font-medium mb-2 block">ফসলের ছবি</Label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {selectedCrop.cropPhotos.map((photo, index) => (
                                                        <div key={index} className="text-center">
                                                            <div className="border rounded-lg p-4 bg-gray-100">
                                                                <Camera className="w-8 h-8 mx-auto text-gray-400" />
                                                                <p className="text-xs mt-1">ছবি {index + 1}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Verification Notes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">যাচাইকরণ মন্তব্য</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            placeholder="যাচাইকরণের মন্তব্য লিখুন..."
                                            value={verificationNotes}
                                            onChange={(e) => setVerificationNotes(e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                                        বন্ধ করুন
                                    </Button>
                                    {selectedCrop.verificationStatus === "pending" && (
                                        <>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleStatusUpdate("verified")}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                অনুমোদন করুন
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleStatusUpdate("rejected")}
                                            >
                                                <XCircle className="h-4 w-4 mr-2" />
                                                বাতিল করুন
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Add New Crop Dialog */}
                <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>নতুন ফসলের তথ্য যোগ করুন</DialogTitle>
                            <DialogDescription>
                                নতুন কৃষকের ফসল ও জমির তথ্য যোগ করুন
                            </DialogDescription>
                        </DialogHeader>
                        {renderCropForm(
                            "নতুন ফসলের তথ্য যোগ করুন",
                            handleAddCrop,
                            () => {
                                setIsAddFormOpen(false);
                                resetForm();
                            }
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Crop Dialog */}
                <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>ফসলের তথ্য সম্পাদনা করুন</DialogTitle>
                            <DialogDescription>
                                কৃষকের ফসল ও জমির তথ্য সম্পাদনা করুন
                            </DialogDescription>
                        </DialogHeader>
                        {renderCropForm(
                            "ফসলের তথ্য সম্পাদনা করুন",
                            handleEditCrop,
                            () => {
                                setIsEditFormOpen(false);
                                resetForm();
                            }
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default CropVerification;
