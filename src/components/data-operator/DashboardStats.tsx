import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    UserCheck,
    UserX,
    Clock,
    Sprout,
    CheckCircle,
    AlertTriangle
} from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    description?: string;
}

const StatsCard = ({ title, value, icon, color, description }: StatsCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className={`p-2 rounded-lg ${color}`}>
                {icon}
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
        </CardContent>
    </Card>
);

interface DashboardStatsProps {
    farmers: Array<{
        profileVerificationStatus: "verified" | "pending" | "rejected";
        nidVerificationStatus: "verified" | "pending" | "failed";
    }>;
    cropVerifications: Array<{
        verificationStatus: "verified" | "pending" | "rejected";
    }>;
}

const DashboardStats = ({ farmers, cropVerifications }: DashboardStatsProps) => {
    const farmerStats = {
        total: farmers.length,
        verified: farmers.filter(f => f.profileVerificationStatus === "verified").length,
        pending: farmers.filter(f => f.profileVerificationStatus === "pending").length,
        rejected: farmers.filter(f => f.profileVerificationStatus === "rejected").length,
    };

    const cropStats = {
        total: cropVerifications.length,
        verified: cropVerifications.filter(c => c.verificationStatus === "verified").length,
        pending: cropVerifications.filter(c => c.verificationStatus === "pending").length,
        rejected: cropVerifications.filter(c => c.verificationStatus === "rejected").length,
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatsCard
                title="মোট কৃষক"
                value={farmerStats.total}
                icon={<Users className="h-4 w-4" />}
                color="bg-blue-100 text-blue-600"
                description="নিবন্ধিত কৃষকের সংখ্যা"
            />
            <StatsCard
                title="অনুমোদিত প্রফাইল"
                value={farmerStats.verified}
                icon={<UserCheck className="h-4 w-4" />}
                color="bg-green-100 text-green-600"
                description="যাচাইকৃত কৃষক প্রফাইল"
            />
            <StatsCard
                title="অপেক্ষমান প্রফাইল"
                value={farmerStats.pending}
                icon={<Clock className="h-4 w-4" />}
                color="bg-yellow-100 text-yellow-600"
                description="যাচাইয়ের অপেক্ষায়"
            />
            <StatsCard
                title="ফসল যাচাই"
                value={cropStats.verified}
                icon={<Sprout className="h-4 w-4" />}
                color="bg-emerald-100 text-emerald-600"
                description={`${cropStats.pending} টি অপেক্ষমান`}
            />
        </div>
    );
};

export default DashboardStats;
