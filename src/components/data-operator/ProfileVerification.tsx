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
    User
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
                return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />অনুমোদিত</Badge>;
            case "rejected":
                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />বাতিল</Badge>;
            case "failed":
                return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />ব্যর্থ</Badge>;
            case "pending":
            default:
                return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />অপেক্ষমান</Badge>;
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
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    কৃষকের প্রফাইল যাচাইকরণ
                </CardTitle>
                <CardDescription>
                    এনআইডি যাচাইকৃত কৃষকদের প্রফাইল অনুমোদন করুন
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {farmers.map((farmer) => (
                        <div key={farmer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        {farmer.profilePhoto ? (
                                            <img src={farmer.profilePhoto} alt={farmer.name} className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-medium text-lg">{farmer.name}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <IdCard className="inline h-3 w-3 mr-1" />
                                                এনআইডি: {farmer.nid}
                                            </span>
                                            <span className="flex items-center">
                                                <Phone className="inline h-3 w-3 mr-1" />
                                                {farmer.phone}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <MapPin className="inline h-3 w-3 mr-1" />
                                                {farmer.upazila}, {farmer.district}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="inline h-3 w-3 mr-1" />
                                                নিবন্ধন: {farmer.registrationDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-sm font-medium">এনআইডি যাচাই:</span>
                                            {getStatusBadge(farmer.nidVerificationStatus)}
                                            <span className="text-sm font-medium ml-4">প্রফাইল অবস্থা:</span>
                                            {getStatusBadge(farmer.profileVerificationStatus)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleViewDetails(farmer)}
                                    >
                                        <Eye className="h-3 w-3 mr-1" />
                                        বিস্তারিত
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(farmer)}
                                    >
                                        <Edit className="h-3 w-3 mr-1" />
                                        সম্পাদনা
                                    </Button>
                                    {farmer.profileVerificationStatus === "pending" && (
                                        <>
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleStatusUpdate(farmer.id, "verified")}
                                            >
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                অনুমোদন
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleStatusUpdate(farmer.id, "rejected")}
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

                {/* Details Dialog */}
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>কৃষকের বিস্তারিত তথ্য</DialogTitle>
                            <DialogDescription>
                                সম্পূর্ণ প্রফাইল তথ্য যাচাই করুন
                            </DialogDescription>
                        </DialogHeader>
                        {selectedFarmer && (
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">ব্যক্তিগত তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div>
                                                <Label className="font-medium">নাম</Label>
                                                <p className="text-sm">{selectedFarmer.name}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">এনআইডি নম্বর</Label>
                                                <p className="text-sm">{selectedFarmer.nid}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">জন্ম তারিখ</Label>
                                                <p className="text-sm">{selectedFarmer.dateOfBirth}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">পিতার নাম</Label>
                                                <p className="text-sm">{selectedFarmer.fatherName}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">মাতার নাম</Label>
                                                <p className="text-sm">{selectedFarmer.motherName}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">যোগাযোগের তথ্য</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div>
                                                <Label className="font-medium">ফোন নম্বর</Label>
                                                <p className="text-sm">{selectedFarmer.phone}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">ইমেইল</Label>
                                                <p className="text-sm">{selectedFarmer.email}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">ঠিকানা</Label>
                                                <p className="text-sm">{selectedFarmer.address}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">উপজেলা</Label>
                                                <p className="text-sm">{selectedFarmer.upazila}</p>
                                            </div>
                                            <div>
                                                <Label className="font-medium">জেলা</Label>
                                                <p className="text-sm">{selectedFarmer.district}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Documents */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">কাগজপত্র</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <Label className="font-medium">প্রফাইল ফটো</Label>
                                                <div className="mt-2 border rounded-lg p-4">
                                                    {selectedFarmer.profilePhoto ? (
                                                        <img src={selectedFarmer.profilePhoto} alt="Profile" className="w-full h-32 object-cover rounded" />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                                            <User className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Label className="font-medium">এনআইডি (সামনে)</Label>
                                                <div className="mt-2 border rounded-lg p-4">
                                                    {selectedFarmer.nidFrontPhoto ? (
                                                        <img src={selectedFarmer.nidFrontPhoto} alt="NID Front" className="w-full h-32 object-cover rounded" />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                                            <FileText className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Label className="font-medium">এনআইডি (পিছনে)</Label>
                                                <div className="mt-2 border rounded-lg p-4">
                                                    {selectedFarmer.nidBackPhoto ? (
                                                        <img src={selectedFarmer.nidBackPhoto} alt="NID Back" className="w-full h-32 object-cover rounded" />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                                                            <FileText className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                                        বন্ধ করুন
                                    </Button>
                                    {selectedFarmer.profileVerificationStatus === "pending" && (
                                        <>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleStatusUpdate(selectedFarmer.id, "verified")}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                অনুমোদন করুন
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleStatusUpdate(selectedFarmer.id, "rejected")}
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

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>কৃষকের তথ্য সম্পাদনা</DialogTitle>
                            <DialogDescription>
                                প্রয়োজনীয় তথ্য সংশোধন করুন
                            </DialogDescription>
                        </DialogHeader>
                        {editForm && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">নাম</Label>
                                        <Input
                                            id="name"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">ফোন নম্বর</Label>
                                        <Input
                                            id="phone"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">ইমেইল</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="district">জেলা</Label>
                                        <Input
                                            id="district"
                                            value={editForm.district}
                                            onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="upazila">উপজেলা</Label>
                                        <Input
                                            id="upazila"
                                            value={editForm.upazila}
                                            onChange={(e) => setEditForm({ ...editForm, upazila: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="occupation">পেশা</Label>
                                        <Input
                                            id="occupation"
                                            value={editForm.occupation}
                                            onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="address">ঠিকানা</Label>
                                    <Textarea
                                        id="address"
                                        value={editForm.address}
                                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                        বাতিল
                                    </Button>
                                    <Button onClick={handleSaveEdit}>
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
