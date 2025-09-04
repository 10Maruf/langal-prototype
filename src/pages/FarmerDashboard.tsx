import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Mic,
    Volume2,
    VolumeX,
    Sprout,
    ShoppingCart,
    CloudSun,
    Users,
    Activity,
    Phone,
    Stethoscope,
    Bell,
    User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isTTSEnabled, setIsTTSEnabled] = useState(true);
    const [isListening, setIsListening] = useState(false);

    // Text-to-Speech function
    const speakText = (text: string) => {
        if (!isTTSEnabled) return;
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any current speech
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'bn-BD';
            utterance.rate = 0.7;
            utterance.volume = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Voice recognition
    const startListening = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.lang = 'bn-BD';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleVoiceCommand(transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            toast({
                title: "ভয়েস সাপোর্ট নেই",
                description: "এই ব্রাউজার ভয়েস কমান্ড সাপোর্ট করে না",
            });
        }
    };

    const handleVoiceCommand = (command: string) => {
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand.includes('ফসল') || lowerCommand.includes('চাষ')) {
            speakText('ফসল সুপারিশ বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => navigate('/recommendation'), 1000);
        } else if (lowerCommand.includes('বাজার') || lowerCommand.includes('বিক্রি')) {
            speakText('বাজার বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => navigate('/marketplace'), 1000);
        } else if (lowerCommand.includes('পরামর্শ') || lowerCommand.includes('ডাক্তার')) {
            speakText('বিশেষজ্ঞ পরামর্শ বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => navigate('/consultation'), 1000);
        } else if (lowerCommand.includes('রোগ') || lowerCommand.includes('সমস্যা')) {
            speakText('রোগ নির্ণয় বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => navigate('/diagnosis'), 1000);
        } else {
            speakText('দুঃখিত, বুঝতে পারিনি। আবার চেষ্টা করুন।');
        }
    };

    const menuItems = [
        {
            id: 'crops',
            title: 'ফসল পরিকল্পনা',
            icon: Sprout,
            bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
            route: '/recommendation',
            audioText: 'ফসল পরিকল্পনা - কোন ফসল চাষ করবেন তা জানুন'
        },
        {
            id: 'diagnosis',
            title: 'রোগ নির্ণয়',
            icon: Stethoscope,
            bgColor: 'bg-gradient-to-br from-red-400 to-red-600',
            route: '/diagnosis',
            audioText: 'রোগ নির্ণয় - ফসলের রোগ চিহ্নিত করুন'
        },
        {
            id: 'marketplace',
            title: 'হাটবাজার',
            icon: ShoppingCart,
            bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
            route: '/marketplace',
            audioText: 'হাটবাজার - কিনুন এবং বিক্রি করুন'
        },
        {
            id: 'social',
            title: 'কৃষক সমাজ',
            icon: Users,
            bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
            route: '/social-feed',
            audioText: 'কৃষক সমাজ - অন্য কৃষকদের সাথে কথা বলুন'
        },
        {
            id: 'consultation',
            title: 'ডাক্তার',
            icon: Phone,
            bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
            route: '/consultation',
            audioText: 'ডাক্তার - বিশেষজ্ঞদের সাথে কথা বলুন'
        },
        {
            id: 'others',
            title: 'অন্যান্য',
            icon: CloudSun,
            bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
            route: '/others',
            audioText: 'অন্যান্য - আবহাওয়া এবং সংবাদ'
        }
    ];

    const handleMenuClick = (item: typeof menuItems[0]) => {
        if (isTTSEnabled) {
            speakText(item.audioText);
        }
        setTimeout(() => navigate(item.route), 500);
    };

    const toggleTTS = () => {
        setIsTTSEnabled(!isTTSEnabled);
        const message = !isTTSEnabled ? 'কণ্ঠস্বর চালু' : 'কণ্ঠস্বর বন্ধ';
        
        toast({
            title: message,
            description: !isTTSEnabled ? 'এখন সব শুনতে পাবেন' : 'আওয়াজ বন্ধ',
        });

        if (!isTTSEnabled) {
            setTimeout(() => speakText(message), 100);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
            {/* Simple Header */}
            <div className="bg-white/90 backdrop-blur-sm shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                সুপ্রভাত! 🌞
                            </h1>
                            <p className="text-gray-600">আজ কি সাহায্য লাগবে?</p>
                        </div>
                        
                        {/* Voice Controls */}
                        <div className="flex gap-3">
                            <Button
                                variant={isTTSEnabled ? "default" : "outline"}
                                size="lg"
                                onClick={toggleTTS}
                                className="h-14 w-14 rounded-full"
                            >
                                {isTTSEnabled ? 
                                    <Volume2 className="h-6 w-6" /> : 
                                    <VolumeX className="h-6 w-6" />
                                }
                            </Button>
                            
                            <Button
                                variant={isListening ? "destructive" : "secondary"}
                                size="lg"
                                onClick={startListening}
                                disabled={isListening}
                                className="h-14 w-14 rounded-full"
                            >
                                <Mic className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Menu Grid */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        
                        return (
                            <Card
                                key={item.id}
                                className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 border-0 shadow-lg overflow-hidden"
                                onClick={() => handleMenuClick(item)}
                                onMouseEnter={() => isTTSEnabled && speakText(item.title)}
                            >
                                <CardContent className="p-0">
                                    <div className="aspect-square flex flex-col items-center justify-center text-center">
                                        {/* Large Colorful Icon */}
                                        <div className={`${item.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                            <IconComponent className="h-10 w-10 text-white" />
                                        </div>
                                        
                                        {/* Simple Title */}
                                        <h3 className="text-lg font-bold text-gray-800 px-2 leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Voice Help */}
            {isTTSEnabled && (
                <div className="px-6 pb-6">
                    <Card className="bg-blue-50/80 border-blue-200 max-w-md mx-auto">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Mic className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900 mb-1">
                                        🎤 কথা বলুন
                                    </p>
                                    <p className="text-xs text-blue-700">
                                        "ফসল", "বাজার", "ডাক্তার" বলুন
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Quick Access */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3">
                <Button
                    variant="secondary"
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg"
                    onClick={() => navigate('/notifications')}
                >
                    <Bell className="h-6 w-6" />
                </Button>
                
                <Button
                    variant="outline"
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg bg-white"
                    onClick={() => navigate('/profile')}
                >
                    <User className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
};

export default FarmerDashboard;