import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertTriangle,
    Clock,
    Shield,
    MapPin,
    Calendar,
    Eye
} from "lucide-react";

interface AlertItem {
    id: string;
    type: "urgent" | "warning" | "info";
    title: string;
    description: string;
    action?: string;
    actionUrl?: string;
    timestamp: string;
}

interface CriticalAlertsProps {
    farmers: Array<{
        id: number;
        name: string;
        registrationDate: string;
        profileVerificationStatus: "verified" | "pending" | "rejected";
        nidVerificationStatus: "verified" | "pending" | "failed";
    }>;
    cropVerifications: Array<{
        id: number;
        farmerName: string;
        submissionDate: string;
        verificationStatus: "verified" | "pending" | "rejected";
    }>;
}

const CriticalAlerts = ({ farmers, cropVerifications }: CriticalAlertsProps) => {
    const generateAlerts = (): AlertItem[] => {
        const alerts: AlertItem[] = [];

        // Check for farmers pending for more than 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        farmers.forEach(farmer => {
            if (farmer.profileVerificationStatus === "pending") {
                // Simulate date comparison (in real app, would parse actual dates)
                alerts.push({
                    id: `farmer-urgent-${farmer.id}`,
                    type: "urgent",
                    title: "জরুরি: দীর্ঘ সময় ধরে অপেক্ষমান প্রফাইল",
                    description: `${farmer.name} এর প্রফাইল ৭ দিনের বেশি সময় ধরে যাচাইয়ের অপেক্ষায় রয়েছে`,
                    action: "এখনই যাচাই করুন",
                    timestamp: farmer.registrationDate,
                });
            }

            if (farmer.nidVerificationStatus === "failed") {
                alerts.push({
                    id: `nid-failed-${farmer.id}`,
                    type: "warning",
                    title: "এনআইডি যাচাইকরণ ব্যর্থ",
                    description: `${farmer.name} এর এনআইডি যাচাইকরণ ব্যর্থ হয়েছে - ম্যানুয়াল পর্যালোচনা প্রয়োজন`,
                    action: "পর্যালোচনা করুন",
                    timestamp: farmer.registrationDate,
                });
            }
        });

        // Check for pending crop verifications
        cropVerifications.forEach(crop => {
            if (crop.verificationStatus === "pending") {
                alerts.push({
                    id: `crop-pending-${crop.id}`,
                    type: "info",
                    title: "নতুন ফসল যাচাইকরণ অনুরোধ",
                    description: `${crop.farmerName} এর ফসলের তথ্য যাচাইয়ের অপেক্ষায় রয়েছে`,
                    action: "যাচাই করুন",
                    timestamp: crop.submissionDate,
                });
            }
        });

        // Sort by urgency: urgent > warning > info
        return alerts.sort((a, b) => {
            const urgencyOrder = { urgent: 3, warning: 2, info: 1 };
            return urgencyOrder[b.type] - urgencyOrder[a.type];
        });
    };

    const alerts = generateAlerts();

    const getAlertVariant = (type: string) => {
        switch (type) {
            case "urgent":
                return "destructive";
            case "warning":
                return "default";
            case "info":
                return "default";
            default:
                return "default";
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case "urgent":
                return <AlertTriangle className="h-4 w-4" />;
            case "warning":
                return <Shield className="h-4 w-4" />;
            case "info":
                return <Clock className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getBadgeColor = (type: string) => {
        switch (type) {
            case "urgent":
                return "bg-red-100 text-red-800";
            case "warning":
                return "bg-yellow-100 text-yellow-800";
            case "info":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (alerts.length === 0) {
        return (
            <Alert className="mb-6 border-green-200 bg-green-50">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">সব কিছু ঠিক আছে!</AlertTitle>
                <AlertDescription className="text-green-700">
                    কোনো জরুরি কাজ বা অ্যালার্ট নেই। সমস্ত কার্যক্রম স্বাভাবিকভাবে চলছে।
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                গুরুত্বপূর্ণ বিজ্ঞপ্তি ({alerts.length})
            </h3>

            {alerts.slice(0, 5).map((alert) => (
                <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
                    <div className="flex items-start justify-between w-full">
                        <div className="flex items-start space-x-3">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <AlertTitle className="text-sm font-medium">{alert.title}</AlertTitle>
                                    <Badge className={getBadgeColor(alert.type)}>
                                        {alert.type === "urgent" ? "জরুরি" :
                                            alert.type === "warning" ? "সতর্কতা" : "তথ্য"}
                                    </Badge>
                                </div>
                                <AlertDescription className="text-sm">
                                    {alert.description}
                                </AlertDescription>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {alert.timestamp}
                                </div>
                            </div>
                        </div>
                        {alert.action && (
                            <Button size="sm" variant="outline" className="ml-4">
                                <Eye className="h-3 w-3 mr-1" />
                                {alert.action}
                            </Button>
                        )}
                    </div>
                </Alert>
            ))}

            {alerts.length > 5 && (
                <p className="text-sm text-gray-600 text-center">
                    আরও {alerts.length - 5} টি বিজ্ঞপ্তি রয়েছে...
                </p>
            )}
        </div>
    );
};

export default CriticalAlerts;
