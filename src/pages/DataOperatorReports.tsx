import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BarChart3, Download, FileText, Calendar, TrendingUp, Users, Sprout, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DataOperatorReports = () => {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState("monthly");
    const [selectedDistrict, setSelectedDistrict] = useState("all");

    // Sample report data
    const reportData = {
        totalFarmers: 1245,
        totalCrops: 2890,
        verifiedCrops: 2156,
        pendingVerification: 734,
        rejectedCrops: 145,
        totalLandArea: "১৮,৫৬৭ বিঘা",
        districts: 8,
        upazilas: 64
    };

    const monthlyData = [
        { month: "জানুয়ারি", farmers: 45, crops: 89, verified: 67 },
        { month: "ফেব্রুয়ারি", farmers: 52, crops: 95, verified: 78 },
        { month: "মার্চ", farmers: 38, crops: 76, verified: 65 },
        { month: "এপ্রিল", farmers: 67, crops: 134, verified: 98 },
        { month: "মে", farmers: 89, crops: 178, verified: 145 },
        { month: "জুন", farmers: 76, crops: 156, verified: 123 }
    ];

    const cropWiseData = [
        { crop: "ধান", area: "৮,৭৮৯ বিঘা", farmers: 567, percentage: 47.3 },
        { crop: "গম", area: "৩,২৪৫ বিঘা", farmers: 234, percentage: 17.5 },
        { crop: "আলু", area: "২,১৩৪ বিঘা", farmers: 189, percentage: 11.5 },
        { crop: "ভুট্টা", area: "১,৮৯০ বিঘা", farmers: 156, percentage: 10.2 },
        { crop: "পেঁয়াজ", area: "১,২৩৪ বিঘা", farmers: 99, percentage: 6.6 },
        { crop: "অন্যান্য", area: "১,২৭৫ বিঘা", farmers: 87, percentage: 6.9 }
    ];

    const districtWiseData = [
        { district: "কুমিল্লা", farmers: 234, crops: 456, area: "৩,৪৫৬ বিঘা" },
        { district: "চট্টগ্রাম", farmers: 198, crops: 387, area: "২,৮৯৭ বিঘা" },
        { district: "ঢাকা", farmers: 167, crops: 334, area: "২,৪৫৬ বিঘা" },
        { district: "রাজশাহী", farmers: 145, crops: 289, area: "২,১৩৪ বিঘা" },
        { district: "খুলনা", farmers: 134, crops: 267, area: "১,৯৮৭ বিঘা" },
        { district: "বরিশাল", farmers: 123, crops: 245, area: "১,৮৪৫ বিঘা" },
        { district: "সিলেট", farmers: 112, crops: 223, area: "১,৬৭৮ বিঘা" },
        { district: "রংপুর", farmers: 98, crops: 196, area: "১,৪৫৬ বিঘা" }
    ];

    const generateReport = () => {
        // Report generation logic
        alert("রিপোর্ট ডাউনলোড শুরু হচ্ছে...");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate('/data-operator')}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                ড্যাশবোর্ড
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">রিপোর্ট ও বিশ্লেষণ</h1>
                                <p className="text-gray-600">ডেটা রিপোর্ট ও পরিসংখ্যান</p>
                            </div>
                        </div>
                        <BarChart3 className="h-8 w-8 text-indigo-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filter Controls */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            রিপোর্ট ফিল্টার
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">সময়কাল</label>
                                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                                        <SelectItem value="monthly">মাসিক</SelectItem>
                                        <SelectItem value="quarterly">ত্রৈমাসিক</SelectItem>
                                        <SelectItem value="yearly">বার্ষিক</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">জেলা</label>
                                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">সকল জেলা</SelectItem>
                                        <SelectItem value="comilla">কুমিল্লা</SelectItem>
                                        <SelectItem value="dhaka">ঢাকা</SelectItem>
                                        <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button onClick={generateReport} className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    <Download className="h-4 w-4 mr-2" />
                                    রিপোর্ট ডাউনলোড
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">মোট কৃষক</p>
                                    <p className="text-3xl font-bold">{reportData.totalFarmers.toLocaleString()}</p>
                                </div>
                                <Users className="h-12 w-12 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">মোট ফসল</p>
                                    <p className="text-3xl font-bold">{reportData.totalCrops.toLocaleString()}</p>
                                </div>
                                <Sprout className="h-12 w-12 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">যাচাইকৃত</p>
                                    <p className="text-3xl font-bold">{reportData.verifiedCrops.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="h-12 w-12 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100">মোট জমি</p>
                                    <p className="text-2xl font-bold">{reportData.totalLandArea}</p>
                                </div>
                                <MapPin className="h-12 w-12 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Progress */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>মাসিক অগ্রগতি</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">মাস</th>
                                        <th className="text-left p-2">নতুন কৃষক</th>
                                        <th className="text-left p-2">নতুন ফসল</th>
                                        <th className="text-left p-2">যাচাইকৃত</th>
                                        <th className="text-left p-2">যাচাইয়ের হার</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyData.map((month, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-2 font-medium">{month.month}</td>
                                            <td className="p-2">{month.farmers}</td>
                                            <td className="p-2">{month.crops}</td>
                                            <td className="p-2">{month.verified}</td>
                                            <td className="p-2">
                                                <Badge variant="secondary">
                                                    {((month.verified / month.crops) * 100).toFixed(1)}%
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Crop-wise Analysis */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>ফসল ভিত্তিক বিশ্লেষণ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cropWiseData.map((crop, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-lg mb-2">{crop.crop}</h4>
                                    <p className="text-sm text-gray-600">জমির পরিমাণ: {crop.area}</p>
                                    <p className="text-sm text-gray-600">কৃষক সংখ্যা: {crop.farmers} জন</p>
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-500">শতাংশ</span>
                                            <span className="text-xs font-medium">{crop.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ width: `${crop.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* District-wise Report */}
                <Card>
                    <CardHeader>
                        <CardTitle>জেলা ভিত্তিক রিপোর্ট</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">জেলা</th>
                                        <th className="text-left p-2">কৃষক সংখ্যা</th>
                                        <th className="text-left p-2">ফসল সংখ্যা</th>
                                        <th className="text-left p-2">জমির পরিমাণ</th>
                                        <th className="text-left p-2">গড় জমি/কৃষক</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {districtWiseData.map((district, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="p-2 font-medium">{district.district}</td>
                                            <td className="p-2">{district.farmers}</td>
                                            <td className="p-2">{district.crops}</td>
                                            <td className="p-2">{district.area}</td>
                                            <td className="p-2">
                                                <Badge variant="outline">
                                                    {(district.crops / district.farmers).toFixed(1)} ফসল
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DataOperatorReports;
