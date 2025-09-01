import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    UserPlus,
    Save,
    RefreshCw,
    FileText,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegisterFarmer = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        nid: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        fatherName: "",
        motherName: "",
        address: "",
        district: "",
        upazila: "",
        occupation: "কৃষক",
        landOwnership: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate registration process
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "সফল",
                description: "কৃষকের প্রফাইল সফলভাবে নিবন্ধিত হয়েছে",
            });

            // Reset form
            setFormData({
                name: "",
                nid: "",
                phone: "",
                email: "",
                dateOfBirth: "",
                fatherName: "",
                motherName: "",
                address: "",
                district: "",
                upazila: "",
                occupation: "কৃষক",
                landOwnership: "",
            });
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "নিবন্ধনে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const districts = [
        "ঢাকা", "চট্টগ্রাম", "সিলেট", "কুমিল্লা", "রংপুর", "বরিশাল",
        "খুলনা", "ময়মনসিংহ", "রাজশাহী", "গাজীপুর"
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    নতুন কৃষক নিবন্ধন
                </CardTitle>
                <CardDescription>
                    সরকারি অপারেটর হিসেবে নতুন কৃষক নিবন্ধন করুন
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">ব্যক্তিগত তথ্য</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">পূর্ণ নাম *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="কৃষকের পূর্ণ নাম"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="nid">এনআইডি নম্বর *</Label>
                                <Input
                                    id="nid"
                                    value={formData.nid}
                                    onChange={(e) => handleInputChange("nid", e.target.value)}
                                    placeholder="১৩ অথবা ১০ সংখ্যার এনআইডি"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone">ফোন নম্বর *</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    placeholder="০১XXXXXXXXX"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="dateOfBirth">জন্ম তারিখ *</Label>
                                <Input
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                    placeholder="DD/MM/YYYY"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="fatherName">পিতার নাম *</Label>
                                <Input
                                    id="fatherName"
                                    value={formData.fatherName}
                                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                                    placeholder="পিতার পূর্ণ নাম"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="motherName">মাতার নাম *</Label>
                                <Input
                                    id="motherName"
                                    value={formData.motherName}
                                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                                    placeholder="মাতার পূর্ণ নাম"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">ঠিকানা</h3>

                        <div>
                            <Label htmlFor="address">বিস্তারিত ঠিকানা *</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="গ্রাম, ওয়ার্ড, ডাকঘর, পোস্ট কোড"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="district">জেলা *</Label>
                                <Select onValueChange={(value) => handleInputChange("district", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="জেলা নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((district) => (
                                            <SelectItem key={district} value={district}>
                                                {district}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="upazila">উপজেলা *</Label>
                                <Input
                                    id="upazila"
                                    value={formData.upazila}
                                    onChange={(e) => handleInputChange("upazila", e.target.value)}
                                    placeholder="উপজেলার নাম"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">পেশাগত তথ্য</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="occupation">পেশা</Label>
                                <Select
                                    value={formData.occupation}
                                    onValueChange={(value) => handleInputChange("occupation", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="পেশা নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="কৃষক">কৃষক</SelectItem>
                                        <SelectItem value="কৃষি উদ্যোক্তা">কৃষি উদ্যোক্তা</SelectItem>
                                        <SelectItem value="পশুপালনকারী">পশুপালনকারী</SelectItem>
                                        <SelectItem value="মৎস্যচাষী">মৎস্যচাষী</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="landOwnership">জমির পরিমাণ</Label>
                                <Input
                                    id="landOwnership"
                                    value={formData.landOwnership}
                                    onChange={(e) => handleInputChange("landOwnership", e.target.value)}
                                    placeholder="যেমন: নিজস্ব ৫ বিঘা, ইজারা ২ বিঘা"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    nid: "",
                                    phone: "",
                                    email: "",
                                    dateOfBirth: "",
                                    fatherName: "",
                                    motherName: "",
                                    address: "",
                                    district: "",
                                    upazila: "",
                                    occupation: "কৃষক",
                                    landOwnership: "",
                                });
                            }}
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            রিসেট করুন
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    নিবন্ধন হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    নিবন্ধন করুন
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Help Information */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-800">নিবন্ধন সম্পর্কে গুরুত্বপূর্ণ তথ্য</h4>
                            <ul className="text-sm text-blue-700 mt-2 space-y-1">
                                <li>• এনআইডি নম্বর স্বয়ংক্রিয়ভাবে যাচাই হবে</li>
                                <li>• সমস্ত তথ্য সঠিক এবং হালনাগাদ হতে হবে</li>
                                <li>• নিবন্ধনের পর কৃষক তার অ্যাকাউন্ট ব্যবহার করতে পারবেন</li>
                                <li>• প্রয়োজনে পরবর্তীতে তথ্য সংশোধন করা যাবে</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegisterFarmer;
