import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CropVerification from "@/components/data-operator/CropVerification";

const DataOperatorCropVerification = () => {
    const navigate = useNavigate();

    // Enhanced crop verification data with union field
    const [cropVerifications, setCropVerifications] = useState([
        {
            id: 1,
            farmerId: 1,
            farmerName: "মোহাম্মদ রহিম",
            farmerPhone: "01712345678",
            cropType: "আমন ধান",
            landArea: "৫",
            landAreaUnit: "বিঘা" as const,
            location: "রামপুর, কুমিল্লা সদর",
            district: "কুমিল্লা",
            upazila: "কুমিল্লা সদর",
            landDocuments: ["জমির দলিল", "খতিয়ান"],
            cropPhotos: ["field1.jpg"],
            gpsCoordinates: {
                latitude: 23.4607,
                longitude: 91.1809
            },
            submissionDate: "২৫/০৮/২০২৫",
            verificationStatus: "pending" as const,
            estimatedYield: "৮০ মণ",
            sowingDate: "২০/০৭/২০২৫",
            harvestDate: "১৫/১১/২০২৫"
        },
        {
            id: 2,
            farmerId: 2,
            farmerName: "সালমা খাতুন",
            farmerPhone: "01798765432",
            cropType: "আলু",
            landArea: "৩",
            landAreaUnit: "বিঘা" as const,
            location: "সোনারগাঁ, নারায়ণগঞ্জ",
            district: "নারায়ণগঞ্জ",
            upazila: "সোনারগাঁ",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["field2.jpg"],
            gpsCoordinates: {
                latitude: 23.6238,
                longitude: 90.6147
            },
            submissionDate: "২০/০৮/২০২৫",
            verificationStatus: "verified" as const,
            estimatedYield: "১২০ মণ",
            sowingDate: "১০/০৮/২০২৫",
            harvestDate: "১০/১২/২০২৫"
        },
        {
            id: 3,
            farmerId: 3,
            farmerName: "আব্দুর রহিম",
            farmerPhone: "01611223344",
            cropType: "গম",
            landArea: "৮",
            landAreaUnit: "বিঘা" as const,
            location: "পটুয়াখালী সদর, পটুয়াখালী",
            district: "পটুয়াখালী",
            upazila: "পটুয়াখালী সদর",
            landDocuments: ["জমির দলিল", "খতিয়ান", "ব্যাংক স্টেটমেন্ট"],
            cropPhotos: ["field3.jpg"],
            gpsCoordinates: {
                latitude: 22.3596,
                longitude: 90.3298
            },
            submissionDate: "১৮/০৮/২০২৫",
            verificationStatus: "verified" as const,
            estimatedYield: "১৬০ মণ",
            sowingDate: "১৫/১১/২০২৪",
            harvestDate: "১৫/০৩/২০২৫"
        },
        {
            id: 4,
            farmerId: 4,
            farmerName: "আমিনা বেগম",
            farmerPhone: "01755666777",
            cropType: "পেঁয়াজ",
            landArea: "২",
            landAreaUnit: "বিঘা" as const,
            location: "ফরিদপুর সদর, ফরিদপুর",
            district: "ফরিদপুর",
            upazila: "ফরিদপুর সদর",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["field4.jpg"],
            gpsCoordinates: {
                latitude: 23.6070,
                longitude: 89.8429
            },
            submissionDate: "১০/০৯/২০২৫",
            verificationStatus: "pending" as const,
            estimatedYield: "৪০ মণ",
            sowingDate: "০৫/০৯/২০২৫",
            harvestDate: "০৫/০১/২০২৬"
        },
        {
            id: 5,
            farmerId: 5,
            farmerName: "করিম উদ্দিন",
            farmerPhone: "01844555666",
            cropType: "ভুট্টা",
            landArea: "৬",
            landAreaUnit: "বিঘা" as const,
            location: "রংপুর সদর, রংপুর",
            district: "রংপুর",
            upazila: "রংপুর সদর",
            landDocuments: ["জমির দলিল"],
            cropPhotos: ["field5.jpg"],
            gpsCoordinates: {
                latitude: 25.7439,
                longitude: 89.2752
            },
            submissionDate: "৩০/০৮/২০২৫",
            verificationStatus: "rejected" as const,
            estimatedYield: "২৪০ মণ",
            sowingDate: "২৫/০৮/২০২৫",
            harvestDate: "২৫/১২/২০২৫"
        }
    ]);

    const handleCropStatusUpdate = (cropId: number, status: 'verified' | 'rejected') => {
        setCropVerifications(prev => prev.map(crop => 
            crop.id === cropId 
                ? { ...crop, verificationStatus: status }
                : crop
        ));
    };

    const handleAddCrop = (newCrop: any) => {
        setCropVerifications(prev => [
            ...prev, 
            { 
                ...newCrop, 
                id: prev.length + 1,
                submissionDate: new Date().toLocaleDateString('bn-BD')
            }
        ]);
    };

    const handleUpdateCrop = (cropId: number, updatedData: any) => {
        setCropVerifications(prev => prev.map(crop => 
            crop.id === cropId 
                ? { ...crop, ...updatedData }
                : crop
        ));
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
                                <h1 className="text-2xl font-bold text-gray-900">ফসল যাচাই</h1>
                                <p className="text-gray-600">ফসলের তথ্য যাচাই ও লোকেশন সামারি</p>
                            </div>
                        </div>
                        <Sprout className="h-8 w-8 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CropVerification
                    cropVerifications={cropVerifications}
                    onStatusUpdate={handleCropStatusUpdate}
                    onAddCrop={handleAddCrop}
                    onUpdateCrop={handleUpdateCrop}
                />
            </div>
        </div>
    );
};

export default DataOperatorCropVerification;
