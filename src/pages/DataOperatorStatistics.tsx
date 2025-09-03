import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, PieChart, BarChart3, Activity, Target, Award, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, LineChart, DonutChart } from "@/components/ui/charts";

const DataOperatorStatistics = () => {
    const navigate = useNavigate();

    // Overall Statistics
    const overallStats = {
        totalRegistrations: 1245,
        monthlyGrowth: 12.5,
        verificationRate: 89.7,
        avgProcessingTime: "২.৫ দিন",
        topCrop: "ধান",
        topDistrict: "কুমিল্লা",
        totalArea: "১৮,৫৬৭ বিঘা",
        avgYield: "১২.৫ মণ/বিঘা"
    };

    // Performance Metrics
    const performanceMetrics = [
        { metric: "দৈনিক যাচাই", value: "৩৫", target: "৪০", percentage: 87.5, trend: "up" },
        { metric: "সাপ্তাহিক নিবন্ধন", value: "১২৮", target: "১৫০", percentage: 85.3, trend: "up" },
        { metric: "মাসিক সম্পন্ন", value: "৪৫৬", target: "৫০০", percentage: 91.2, trend: "up" },
        { metric: "ত্রুটির হার", value: "২.৩%", target: "৫%", percentage: 95.4, trend: "down" }
    ];

    // Crop Distribution
    const cropDistribution = [
        { name: "ধান", value: 45.2, count: 564, color: "bg-green-500" },
        { name: "গম", value: 18.7, count: 233, color: "bg-yellow-500" },
        { name: "আলু", value: 12.3, count: 153, color: "bg-orange-500" },
        { name: "ভুট্টা", value: 10.8, count: 134, color: "bg-purple-500" },
        { name: "পেঁয়াজ", value: 7.5, count: 93, color: "bg-red-500" },
        { name: "অন্যান্য", value: 5.5, count: 68, color: "bg-gray-500" }
    ];

    // Verification Status
    const verificationStatus = [
        { status: "যাচাইকৃত", count: 1117, percentage: 89.7, color: "bg-green-500" },
        { status: "অপেক্ষমান", count: 98, percentage: 7.9, color: "bg-yellow-500" },
        { status: "প্রত্যাখ্যাত", count: 30, percentage: 2.4, color: "bg-red-500" }
    ];

    // Monthly Trends
    const monthlyTrends = [
        { month: "জানুয়ারি", registrations: 89, verifications: 78, efficiency: 87.6 },
        { month: "ফেব্রুয়ারি", registrations: 95, verifications: 88, efficiency: 92.6 },
        { month: "মার্চ", registrations: 104, verifications: 96, efficiency: 92.3 },
        { month: "এপ্রিল", registrations: 118, verifications: 109, efficiency: 92.4 },
        { month: "মে", registrations: 134, verifications: 125, efficiency: 93.3 },
        { month: "জুন", registrations: 142, verifications: 132, efficiency: 93.0 }
    ];

    // Regional Performance
    const regionalPerformance = [
        { region: "কুমিল্লা", farmers: 234, efficiency: 94.2, rank: 1 },
        { region: "চট্টগ্রাম", farmers: 198, efficiency: 91.8, rank: 2 },
        { region: "ঢাকা", farmers: 167, efficiency: 89.5, rank: 3 },
        { region: "রাজশাহী", farmers: 145, efficiency: 87.3, rank: 4 },
        { region: "খুলনা", farmers: 134, efficiency: 85.1, rank: 5 },
        { region: "বরিশাল", farmers: 123, efficiency: 83.7, rank: 6 },
        { region: "সিলেট", farmers: 112, efficiency: 81.2, rank: 7 },
        { region: "রংপুর", farmers: 98, efficiency: 78.9, rank: 8 }
    ];

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
                                <h1 className="text-2xl font-bold text-gray-900">পরিসংখ্যান</h1>
                                <p className="text-gray-600">সামগ্রিক পরিসংখ্যান ও ট্রেন্ড</p>
                            </div>
                        </div>
                        <TrendingUp className="h-8 w-8 text-teal-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">মোট নিবন্ধন</p>
                                    <p className="text-3xl font-bold">{overallStats.totalRegistrations.toLocaleString()}</p>
                                    <p className="text-sm text-blue-200">+{overallStats.monthlyGrowth}% এই মাসে</p>
                                </div>
                                <Activity className="h-12 w-12 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">যাচাইয়ের হার</p>
                                    <p className="text-3xl font-bold">{overallStats.verificationRate}%</p>
                                    <p className="text-sm text-green-200">গড় সময়: {overallStats.avgProcessingTime}</p>
                                </div>
                                <Target className="h-12 w-12 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">শীর্ষ ফসল</p>
                                    <p className="text-2xl font-bold">{overallStats.topCrop}</p>
                                    <p className="text-sm text-purple-200">মোট এলাকার ৪৫.২%</p>
                                </div>
                                <Award className="h-12 w-12 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100">গড় ফলন</p>
                                    <p className="text-2xl font-bold">{overallStats.avgYield}</p>
                                    <p className="text-sm text-orange-200">মোট: {overallStats.totalArea}</p>
                                </div>
                                <BarChart3 className="h-12 w-12 text-orange-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="performance" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="performance">কর্মক্ষমতা</TabsTrigger>
                        <TabsTrigger value="distribution">বিতরণ</TabsTrigger>
                        <TabsTrigger value="trends">ট্রেন্ড</TabsTrigger>
                        <TabsTrigger value="regional">আঞ্চলিক</TabsTrigger>
                    </TabsList>

                    {/* Performance Tab */}
                    <TabsContent value="performance" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Performance Metrics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        কর্মক্ষমতা মেট্রিক্স
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {performanceMetrics.map((metric, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-medium text-sm">{metric.metric}</h4>
                                                    <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                                                        {metric.trend === 'up' ? '↗' : '↘'} {metric.percentage}%
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xl font-bold">{metric.value}</span>
                                                    <span className="text-xs text-gray-500">লক্ষ্য: {metric.target}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${metric.trend === 'up' ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${metric.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Bar Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        সাপ্তাহিক কর্মক্ষমতা
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BarChart
                                        data={[
                                            { name: "সোম", value: 32, color: "bg-blue-500" },
                                            { name: "মঙ্গল", value: 28, color: "bg-green-500" },
                                            { name: "বুধ", value: 35, color: "bg-purple-500" },
                                            { name: "বৃহ", value: 42, color: "bg-orange-500" },
                                            { name: "শুক্র", value: 38, color: "bg-teal-500" },
                                            { name: "শনি", value: 25, color: "bg-pink-500" },
                                            { name: "রবি", value: 18, color: "bg-gray-500" }
                                        ]}
                                        height={250}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Distribution Tab */}
                    <TabsContent value="distribution" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Crop Distribution with Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="h-5 w-5" />
                                        ফসল বিতরণ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col lg:flex-row items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <DonutChart
                                                data={cropDistribution.map(crop => ({
                                                    name: crop.name,
                                                    value: crop.value,
                                                    color: crop.color
                                                }))}
                                                size={200}
                                                centerText="৬ ধরন"
                                            />
                                        </div>
                                        <div className="space-y-3 flex-1">
                                            {cropDistribution.map((crop, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded ${crop.color}`}></div>
                                                        <span className="font-medium">{crop.name}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold">{crop.value}%</div>
                                                        <div className="text-sm text-gray-500">{crop.count} কৃষক</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Verification Status with Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        যাচাই অবস্থা
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col lg:flex-row items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <DonutChart
                                                data={verificationStatus.map(status => ({
                                                    name: status.status,
                                                    value: status.percentage,
                                                    color: status.color
                                                }))}
                                                size={200}
                                                centerText={`${verificationStatus.reduce((sum, s) => sum + s.count, 0)}`}
                                            />
                                        </div>
                                        <div className="space-y-3 flex-1">
                                            {verificationStatus.map((status, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded ${status.color}`}></div>
                                                        <span className="font-medium">{status.status}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold">{status.count}</div>
                                                        <div className="text-sm text-gray-500">{status.percentage}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                                <p className="text-sm text-green-800">
                                                    <strong>সফলতার হার:</strong> {verificationStatus[0].percentage}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Trends Tab */}
                    <TabsContent value="trends" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Registration Trend Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        নিবন্ধন ট্রেন্ড
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <LineChart
                                        data={monthlyTrends.map(month => ({
                                            name: month.month.slice(0, 3),
                                            value: month.registrations
                                        }))}
                                        height={250}
                                        color="blue"
                                    />
                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-600">মাসিক নতুন নিবন্ধন</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Verification Trend Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        যাচাই ট্রেন্ড
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <LineChart
                                        data={monthlyTrends.map(month => ({
                                            name: month.month.slice(0, 3),
                                            value: month.verifications
                                        }))}
                                        height={250}
                                        color="green"
                                    />
                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-gray-600">মাসিক যাচাইকৃত</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Monthly Efficiency Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    মাসিক দক্ষতা তুলনা
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BarChart
                                    data={monthlyTrends.map(month => ({
                                        name: month.month.slice(0, 3),
                                        value: month.efficiency,
                                        color: month.efficiency >= 90 ? "bg-green-500" :
                                            month.efficiency >= 85 ? "bg-yellow-500" : "bg-red-500"
                                    }))}
                                    height={300}
                                />
                                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 bg-green-50 rounded">
                                        <div className="text-2xl font-bold text-green-600">৯৩.০%</div>
                                        <div className="text-sm text-green-700">সর্বোচ্চ দক্ষতা</div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded">
                                        <div className="text-2xl font-bold text-blue-600">৯১.৩%</div>
                                        <div className="text-sm text-blue-700">গড় দক্ষতা</div>
                                    </div>
                                    <div className="p-3 bg-orange-50 rounded">
                                        <div className="text-2xl font-bold text-orange-600">+৫.৪%</div>
                                        <div className="text-sm text-orange-700">উন্নতি হার</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detailed Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    বিস্তারিত তথ্য
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">মাস</th>
                                                <th className="text-left p-2">নিবন্ধন</th>
                                                <th className="text-left p-2">যাচাই</th>
                                                <th className="text-left p-2">দক্ষতা</th>
                                                <th className="text-left p-2">অবস্থা</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthlyTrends.map((month, index) => (
                                                <tr key={index} className="border-b hover:bg-gray-50">
                                                    <td className="p-2 font-medium">{month.month}</td>
                                                    <td className="p-2">{month.registrations}</td>
                                                    <td className="p-2">{month.verifications}</td>
                                                    <td className="p-2">
                                                        <Badge variant="secondary">
                                                            {month.efficiency}%
                                                        </Badge>
                                                    </td>
                                                    <td className="p-2">
                                                        <Badge variant={month.efficiency >= 90 ? "default" :
                                                            month.efficiency >= 85 ? "secondary" : "destructive"}>
                                                            {month.efficiency >= 90 ? "উৎকৃষ্ট" :
                                                                month.efficiency >= 85 ? "ভালো" : "উন্নতি প্রয়োজন"}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Regional Tab */}
                    <TabsContent value="regional" className="space-y-6">
                        {/* Regional Performance Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    জেলা ভিত্তিক কর্মক্ষমতা
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BarChart
                                    data={regionalPerformance.map(region => ({
                                        name: region.region,
                                        value: region.efficiency,
                                        color: region.rank <= 3 ? "bg-green-500" :
                                            region.rank <= 5 ? "bg-yellow-500" : "bg-red-500"
                                    }))}
                                    height={300}
                                />
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-3 bg-green-50 rounded">
                                        <div className="text-lg font-bold text-green-600">
                                            {regionalPerformance.slice(0, 3).length}
                                        </div>
                                        <div className="text-sm text-green-700">শীর্ষ জেলা</div>
                                    </div>
                                    <div className="text-center p-3 bg-blue-50 rounded">
                                        <div className="text-lg font-bold text-blue-600">
                                            {(regionalPerformance.reduce((sum, r) => sum + r.efficiency, 0) / regionalPerformance.length).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-blue-700">গড় দক্ষতা</div>
                                    </div>
                                    <div className="text-center p-3 bg-purple-50 rounded">
                                        <div className="text-lg font-bold text-purple-600">
                                            {Math.max(...regionalPerformance.map(r => r.efficiency))}%
                                        </div>
                                        <div className="text-sm text-purple-700">সর্বোচ্চ</div>
                                    </div>
                                    <div className="text-center p-3 bg-orange-50 rounded">
                                        <div className="text-lg font-bold text-orange-600">
                                            {regionalPerformance.reduce((sum, r) => sum + r.farmers, 0)}
                                        </div>
                                        <div className="text-sm text-orange-700">মোট কৃষক</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ranking Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    আঞ্চলিক কর্মক্ষমতা র‍্যাঙ্কিং
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {regionalPerformance.map((region, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${region.rank === 1 ? 'bg-yellow-500' :
                                                        region.rank === 2 ? 'bg-gray-400' :
                                                            region.rank === 3 ? 'bg-orange-600' :
                                                                region.rank <= 5 ? 'bg-blue-500' : 'bg-red-400'
                                                    }`}>
                                                    {region.rank}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{region.region}</h4>
                                                    <p className="text-sm text-gray-600">{region.farmers} কৃষক নিবন্ধিত</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-800">{region.efficiency}%</div>
                                                <div className="text-sm text-gray-500">দক্ষতার হার</div>
                                                <div className="mt-1">
                                                    {region.rank <= 3 && (
                                                        <Badge className="bg-yellow-500 text-white">🏆 শীর্ষ ৩</Badge>
                                                    )}
                                                    {region.rank > 6 && (
                                                        <Badge variant="destructive">উন্নতি প্রয়োজন</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Performance Summary */}
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">কর্মক্ষমতা সারসংক্ষেপ</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium">🥇 সেরা পারফরমার:</span>
                                            <span className="ml-2">{regionalPerformance[0].region} ({regionalPerformance[0].efficiency}%)</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">📈 গড় দক্ষতা:</span>
                                            <span className="ml-2">{(regionalPerformance.reduce((sum, r) => sum + r.efficiency, 0) / regionalPerformance.length).toFixed(1)}%</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">🎯 লক্ষ্য অর্জন:</span>
                                            <span className="ml-2">{regionalPerformance.filter(r => r.efficiency >= 85).length}/{regionalPerformance.length} জেলা</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DataOperatorStatistics;
