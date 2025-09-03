import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileVerification from "@/components/data-operator/ProfileVerification";

// Farmer type definition
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
    nidVerificationStatus: 'verified' | 'pending' | 'failed';
    profileVerificationStatus: 'verified' | 'pending' | 'rejected';
    documents: string[];
}

const DataOperatorProfileVerification = () => {
    const navigate = useNavigate();

    // Enhanced farmer data with NID verification
    const [farmers, setFarmers] = useState<Farmer[]>([
        {
            id: 1,
            name: "মোহাম্মদ রহিম",
            nid: "1234567890123",
            phone: "01712345678",
            email: "rahim@example.com",
            address: "গ্রাম: রামপুর, ডাকঘর: কুমিল্লা সদর",
            district: "কুমিল্লা",
            upazila: "কুমিল্লা সদর",
            dateOfBirth: "১৫/০১/১৯৮০",
            fatherName: "আবুল হাসেম",
            motherName: "রহিমা খাতুন",
            occupation: "কৃষক",
            landOwnership: "নিজস্ব ৫ বিঘা",
            registrationDate: "২৫/০৮/২০২৫",
            nidVerificationStatus: "verified",
            profileVerificationStatus: "pending",
            documents: ["এনআইডি কার্ড", "জমির দলিল"],
        },
        {
            id: 2,
            name: "সালমা খাতুন",
            nid: "9876543210987",
            phone: "01798765432",
            email: "salma@example.com",
            address: "গ্রাম: সোনারগাঁ, ডাকঘর: নারায়ণগঞ্জ",
            district: "নারায়ণগঞ্জ",
            upazila: "সোনারগাঁ",
            dateOfBirth: "২২/০৭/১৯৮৫",
            fatherName: "মতিউর রহমান",
            motherName: "ফাতেমা বেগম",
            occupation: "কৃষক",
            landOwnership: "লিজ ৩ বিঘা",
            registrationDate: "২০/০৮/২০২৫",
            nidVerificationStatus: "pending",
            profileVerificationStatus: "pending",
            documents: ["এনআইডি কার্ড"],
        },
        {
            id: 3,
            name: "আব্দুর রহিম",
            nid: "1122334455667",
            phone: "01611223344",
            email: "abdur@example.com",
            address: "গ্রাম: পটুয়াখালী, ডাকঘর: পটুয়াখালী সদর",
            district: "পটুয়াখালী",
            upazila: "পটুয়াখালী সদর",
            dateOfBirth: "১০/১২/১৯৭৮",
            fatherName: "নূরুল ইসলাম",
            motherName: "নূরজাহান বেগম",
            occupation: "কৃষক",
            landOwnership: "নিজস্ব ৮ বিঘা",
            registrationDate: "১৮/০৮/২০২৫",
            nidVerificationStatus: "verified",
            profileVerificationStatus: "verified",
            documents: ["এনআইডি কার্ড", "জমির দলিল", "ব্যাংক স্টেটমেন্ট"],
        }
    ]);

    const handleStatusUpdate = (farmerId: number, status: 'verified' | 'rejected') => {
        setFarmers(prev => prev.map(farmer =>
            farmer.id === farmerId
                ? { ...farmer, profileVerificationStatus: status }
                : farmer
        ));
    };

    const handleEditFarmer = (farmer: Farmer) => {
        setFarmers(prev => prev.map(f =>
            f.id === farmer.id ? farmer : f
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
                                <h1 className="text-2xl font-bold text-gray-900">প্রোফাইল যাচাই</h1>
                                <p className="text-gray-600">কৃষকদের প্রোফাইল যাচাই ও অনুমোদন</p>
                            </div>
                        </div>
                        <UserCheck className="h-8 w-8 text-blue-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProfileVerification
                    farmers={farmers}
                    onStatusUpdate={handleStatusUpdate}
                    onEditFarmer={handleEditFarmer}
                />
            </div>
        </div>
    );
};

export default DataOperatorProfileVerification;
