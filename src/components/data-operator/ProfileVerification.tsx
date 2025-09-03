import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    UserCheck,
    MapPin,
    Phone,
    Mail,
    Calendar,
    IdCard,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Eye,
    Edit,
    FileText,
    User,
    Shield,
    ShieldCheck,
    ShieldX,
    Clock,
    UserCircle,
    Sparkles,
    Award,
    Star,
    CheckCircle2,
    AlertCircle,
    X
} from "lucide-react";

interface Farmer {
    id: number;
    name: string;
    nid: string;
    phone: string;
    email: string;
    address: string;
    district: string;
    upazila: string;
    dateOfBirth: string;
    fatherName: string;
    motherName: string;
    occupation: string;
    landOwnership: string;
    registrationDate: string;
    nidVerificationStatus: "verified" | "pending" | "failed";
    profileVerificationStatus: "verified" | "pending" | "rejected";
    profilePhoto?: string;
    nidFrontPhoto?: string;
    nidBackPhoto?: string;
    documents: string[];
}

interface ProfileVerificationProps {
    farmers: Farmer[];
    onStatusUpdate: (farmerId: number, status: "verified" | "rejected") => void;
    onEditFarmer: (farmer: Farmer) => void;
}

const ProfileVerification = ({ farmers, onStatusUpdate, onEditFarmer }: ProfileVerificationProps) => {
    const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<Farmer | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "verified":
                return (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        অনুমোদিত
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg">
                        <ShieldX className="w-4 h-4 mr-1" />
                        বাতিল
                    </Badge>
                );
            case "failed":
                return (
                    <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
                        <XCircle className="w-4 h-4 mr-1" />
                        ব্যর্থ
                    </Badge>
                );
            case "pending":
            default:
                return (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg animate-pulse">
                        <Clock className="w-4 h-4 mr-1" />
                        অপেক্ষমান
                    </Badge>
                );
        }
    };

    const handleViewDetails = (farmer: Farmer) => {
        setSelectedFarmer(farmer);
        setIsDetailsOpen(true);
    };

    const handleEdit = (farmer: Farmer) => {
        setEditForm({ ...farmer });
        setIsEditOpen(true);
    };

    const handleSaveEdit = () => {
        if (editForm) {
            onEditFarmer(editForm);
            setIsEditOpen(false);
            setEditForm(null);
        }
    };

    const handleStatusUpdate = (farmerId: number, status: "verified" | "rejected") => {
        onStatusUpdate(farmerId, status);
        setIsDetailsOpen(false);
    };

    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <UserCheck className="h-6 w-6" />
                    </div>
                    কৃষকের প্রফাইল যাচাইকরণ
                    <Sparkles className="h-5 w-5 text-yellow-300" />
                </CardTitle>
                <CardDescription className="text-blue-100">
                    এনআইডি যাচাইকৃত কৃষকদের প্রফাইল অনুমোদন করুন
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-6">
                    {farmers.map((farmer) => (
                        <div key={farmer.id} className="bg-white border-2 border-transparent rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                            {farmer.profilePhoto ? (
                                                <img src={farmer.profilePhoto} alt={farmer.name} className="w-16 h-16 rounded-full object-cover border-4 border-white" />
                                            ) : (
                                                <UserCircle className="w-8 h-8 text-white" />
                                            )}
                                        </div>
                                        {farmer.profileVerificationStatus === "verified" && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                                <Award className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                            {farmer.name}
                                            {farmer.profileVerificationStatus === "verified" && (
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            )}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                <IdCard className="inline h-4 w-4 mr-2 text-blue-500" />
                                                এনআইডি: {farmer.nid}
                                            </span>
                                            <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                <Phone className="inline h-4 w-4 mr-2 text-green-500" />
                                                {farmer.phone}
                                            </span>
                                            <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                <MapPin className="inline h-4 w-4 mr-2 text-red-500" />
                                                {farmer.upazila}, {farmer.district}
                                            </span>
                                            <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                <Calendar className="inline h-4 w-4 mr-2 text-purple-500" />
                                                নিবন্ধন: {farmer.registrationDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-semibold text-gray-700">এনআইডি যাচাই:</span>
                                                {getStatusBadge(farmer.nidVerificationStatus)}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-semibold text-gray-700">প্রফাইল অবস্থা:</span>
                                                {getStatusBadge(farmer.profileVerificationStatus)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 shadow-md"
                                        onClick={() => handleViewDetails(farmer)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        বিস্তারিত
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 shadow-md"
                                        onClick={() => handleEdit(farmer)}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        সম্পাদনা
                                    </Button>
                                    {farmer.profileVerificationStatus === "pending" && (
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md"
                                                onClick={() => handleStatusUpdate(farmer.id, "verified")}
                                            >
                                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                                অনুমোদন
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                                                onClick={() => handleStatusUpdate(farmer.id, "rejected")}
                                            >
                                                <XCircle className="h-4 w-4 mr-1" />
                                                বাতিল
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Details Dialog */}
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50">
                        <DialogHeader className="pb-4 border-b border-blue-200">
                            <DialogTitle className="flex items-center gap-3 text-2xl text-blue-800">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <UserCircle className="h-6 w-6 text-blue-600" />
                                </div>
                                কৃষকের বিস্তারিত তথ্য
                                <Shield className="h-5 w-5 text-green-500" />
                            </DialogTitle>
                            <DialogDescription className="text-blue-600 font-medium">
                                সম্পূর্ণ প্রফাইল তথ্য যাচাই করুন
                            </DialogDescription>
                        </DialogHeader>
                        {selectedFarmer && (
                            <div className="space-y-6 pt-4">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg">
                                        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <User className="h-5 w-5" />
                                                ব্যক্তিগত তথ্য
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-4">
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-green-700 flex items-center gap-2">
                                                    <UserCircle className="h-4 w-4" />
                                                    নাম
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.name}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-green-700 flex items-center gap-2">
                                                    <IdCard className="h-4 w-4" />
                                                    এনআইডি নম্বর
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.nid}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-green-700 flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    জন্ম তারিখ
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.dateOfBirth}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-green-700">পিতার নাম</Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.fatherName}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-green-700">মাতার নাম</Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.motherName}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg">
                                        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Phone className="h-5 w-5" />
                                                যোগাযোগের তথ্য
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 p-4">
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-blue-700 flex items-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    ফোন নম্বর
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.phone}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-blue-700 flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    ইমেইল
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.email}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-blue-700 flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    ঠিকানা
                                                </Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.address}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-blue-700">উপজেলা</Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.upazila}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                                <Label className="font-semibold text-blue-700">জেলা</Label>
                                                <p className="text-gray-800 font-medium mt-1">{selectedFarmer.district}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Documents */}
                                <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            কাগজপত্র
                                            <Sparkles className="h-4 w-4 text-yellow-300" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <Label className="font-semibold text-purple-700 mb-3 block">প্রফাইল ফটো</Label>
                                                <div className="bg-white border-2 border-dashed border-purple-300 rounded-xl p-4 hover:border-purple-500 transition-colors">
                                                    {selectedFarmer.profilePhoto ? (
                                                        <div className="relative">
                                                            <img src={selectedFarmer.profilePhoto} alt="Profile" className="w-full h-32 object-cover rounded-lg shadow-md" />
                                                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                                            <UserCircle className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Label className="font-semibold text-purple-700 mb-3 block">এনআইডি (সামনে)</Label>
                                                <div className="bg-white border-2 border-dashed border-purple-300 rounded-xl p-4 hover:border-purple-500 transition-colors">
                                                    {selectedFarmer.nidFrontPhoto ? (
                                                        <div className="relative">
                                                            <img src={selectedFarmer.nidFrontPhoto} alt="NID Front" className="w-full h-32 object-cover rounded-lg shadow-md" />
                                                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                                            <FileText className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Label className="font-semibold text-purple-700 mb-3 block">এনআইডি (পিছনে)</Label>
                                                <div className="bg-white border-2 border-dashed border-purple-300 rounded-xl p-4 hover:border-purple-500 transition-colors">
                                                    {selectedFarmer.nidBackPhoto ? (
                                                        <div className="relative">
                                                            <img src={selectedFarmer.nidBackPhoto} alt="NID Back" className="w-full h-32 object-cover rounded-lg shadow-md" />
                                                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                                            <FileText className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-blue-200">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDetailsOpen(false)}
                                        className="bg-gray-50 hover:bg-gray-100 border-gray-300"
                                    >
                                        বন্ধ করুন
                                    </Button>
                                    {selectedFarmer.profileVerificationStatus === "pending" && (
                                        <>
                                            <Button
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
                                                onClick={() => handleStatusUpdate(selectedFarmer.id, "verified")}
                                            >
                                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                                অনুমোদন করুন
                                            </Button>
                                            <Button
                                                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg"
                                                onClick={() => handleStatusUpdate(selectedFarmer.id, "rejected")}
                                            >
                                                <XCircle className="h-5 w-5 mr-2" />
                                                বাতিল করুন
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-orange-50">
                        <DialogHeader className="pb-4 border-b border-orange-200">
                            <DialogTitle className="flex items-center gap-3 text-2xl text-orange-800">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Edit className="h-6 w-6 text-orange-600" />
                                </div>
                                কৃষকের তথ্য সম্পাদনা
                                <Sparkles className="h-5 w-5 text-yellow-500" />
                            </DialogTitle>
                            <DialogDescription className="text-orange-600 font-medium">
                                প্রয়োজনীয় তথ্য সংশোধন করুন
                            </DialogDescription>
                        </DialogHeader>
                        {editForm && (
                            <div className="space-y-6 pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2 font-semibold text-orange-700">
                                            <UserCircle className="h-4 w-4" />
                                            নাম
                                        </Label>
                                        <Input
                                            id="name"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center gap-2 font-semibold text-orange-700">
                                            <Phone className="h-4 w-4" />
                                            ফোন নম্বর
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2 font-semibold text-orange-700">
                                            <Mail className="h-4 w-4" />
                                            ইমেইল
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="district" className="flex items-center gap-2 font-semibold text-orange-700">
                                            <MapPin className="h-4 w-4" />
                                            জেলা
                                        </Label>
                                        <Input
                                            id="district"
                                            value={editForm.district}
                                            onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="upazila" className="font-semibold text-orange-700">উপজেলা</Label>
                                        <Input
                                            id="upazila"
                                            value={editForm.upazila}
                                            onChange={(e) => setEditForm({ ...editForm, upazila: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="occupation" className="font-semibold text-orange-700">পেশা</Label>
                                        <Input
                                            id="occupation"
                                            value={editForm.occupation}
                                            onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                                            className="border-orange-200 focus:border-orange-400 bg-white shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="flex items-center gap-2 font-semibold text-orange-700">
                                        <MapPin className="h-4 w-4" />
                                        ঠিকানা
                                    </Label>
                                    <Textarea
                                        id="address"
                                        value={editForm.address}
                                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                        className="border-orange-200 focus:border-orange-400 bg-white shadow-sm min-h-[80px]"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 pt-6 border-t border-orange-200">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditOpen(false)}
                                        className="bg-gray-50 hover:bg-gray-100 border-gray-300"
                                    >
                                        বাতিল
                                    </Button>
                                    <Button
                                        onClick={handleSaveEdit}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        সংরক্ষণ করুন
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ProfileVerification;
