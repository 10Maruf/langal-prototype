import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserType } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Users, User, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<UserType>("farmer");
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: "ত্রুটি",
                description: "অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const success = await login(email, password, activeTab);
            if (success) {
                toast({
                    title: "সফল",
                    description: "সফলভাবে লগইন হয়েছে",
                });

                // Navigate based on user type
                switch (activeTab) {
                    case 'farmer':
                        navigate('/');
                        break;
                    case 'expert':
                        navigate('/expert-dashboard');
                        break;
                    case 'customer':
                        navigate('/customer-dashboard');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            toast({
                title: "ত্রুটি",
                description: "লগইনে সমস্যা হয়েছে",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getUserTypeIcon = (type: UserType) => {
        switch (type) {
            case 'farmer':
                return <User className="h-5 w-5" />;
            case 'expert':
                return <UserCheck className="h-5 w-5" />;
            case 'customer':
                return <Users className="h-5 w-5" />;
            default:
                return <User className="h-5 w-5" />;
        }
    };

    const getUserTypeLabel = (type: UserType) => {
        switch (type) {
            case 'farmer':
                return 'কৃষক';
            case 'expert':
                return 'কৃষি বিশেষজ্ঞ';
            case 'customer':
                return 'ক্রেতা';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <img src="/img/Asset 3.png" alt="logo" className="h-16 w-16 mb-2" />
                        <h1 className="text-2xl font-bold text-primary mb-2">লাঙল</h1>
                        <p className="text-sm text-gray-700 font-medium px-3 py-1 bg-green-50 rounded-md border-l-4 border-green-500">
                            কৃষকের ডিজিটাল হাতিয়ার
                        </p>
                    </div>
                    <CardTitle className="text-xl">লগইন করুন</CardTitle>
                    <CardDescription>
                        আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger 
                                value="farmer" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'farmer' 
                                        ? 'data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-green-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('farmer')}
                                <span className="hidden sm:inline">কৃষক</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="expert" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'expert' 
                                        ? 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:border-blue-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('expert')}
                                <span className="hidden sm:inline">বিশেষজ্ঞ</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="customer" 
                                className={`flex items-center gap-1 ${
                                    activeTab === 'customer' 
                                        ? 'data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 data-[state=active]:border-purple-500' 
                                        : ''
                                }`}
                            >
                                {getUserTypeIcon('customer')}
                                <span className="hidden sm:inline">ক্রেতা</span>
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleLogin} className="space-y-4 mt-6">
                            <TabsContent value="farmer" className="space-y-4 mt-0">
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <h3 className="font-semibold text-green-800">কৃষক হিসেবে লগইন</h3>
                                    <p className="text-sm text-green-600">আপনার ফসল ও কৃষিকাজ পরিচালনা করুন</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="expert" className="space-y-4 mt-0">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-semibold text-blue-800">কৃষি বিশেষজ্ঞ হিসেবে লগইন</h3>
                                    <p className="text-sm text-blue-600">কৃষকদের পরামর্শ ও সহায়তা প্রদান করুন</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4 mt-0">
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <h3 className="font-semibold text-purple-800">ক্রেতা হিসেবে লগইন</h3>
                                    <p className="text-sm text-purple-600">তাজা কৃষিপণ্য কিনুন</p>
                                </div>
                            </TabsContent>

                            <div className="space-y-2">
                                <Label htmlFor="email">ইমেইল</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="আপনার ইমেইল দিন"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">পাসওয়ার্ড</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="আপনার পাসওয়ার্ড দিন"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </form>
                    </Tabs>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        onClick={handleLogin}
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                লগইন হচ্ছে...
                            </>
                        ) : (
                            <>
                                {getUserTypeIcon(activeTab)}
                                <span className="ml-2">{getUserTypeLabel(activeTab)} হিসেবে লগইন</span>
                            </>
                        )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-600">
                        নতুন ব্যবহারকারী?{" "}
                        <Button 
                            variant="link" 
                            className="p-0 text-green-600 hover:text-green-700 font-medium" 
                            onClick={() => navigate('/register')}
                        >
                            নিবন্ধন করুন
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
