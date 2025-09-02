import { Button } from "@/components/ui/button";
import { ArrowLeft, CloudSun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FieldDataCollection from "@/components/data-operator/FieldDataCollection";

const DataOperatorFieldData = () => {
    const navigate = useNavigate();

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
                                <h1 className="text-2xl font-bold text-gray-900">মাঠ পর্যায়ের তথ্য</h1>
                                <p className="text-gray-600">আবহাওয়া ও কৃষি তথ্য সংগ্রহ</p>
                            </div>
                        </div>
                        <CloudSun className="h-8 w-8 text-orange-600" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FieldDataCollection />
            </div>
        </div>
    );
};

export default DataOperatorFieldData;
