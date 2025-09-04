import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Mic,
    Volume2,
    VolumeX,
    Sprout,
    MessageSquare,
    ShoppingCart,
    CloudSun,
    BookOpen,
    Users,
    Activity,
    ArrowRight,
    Play,
    Pause,
    Phone,
    MessageCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const FarmerDashboard = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isTTSEnabled, setIsTTSEnabled] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // Text-to-Speech function
    const speakText = (text: string) => {
        if (!isTTSEnabled) return;
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'bn-BD'; // Bengali language
            utterance.rate = 0.8; // Slower speech for better understanding
            window.speechSynthesis.speak(utterance);
        }
    };

    // Voice recognition function
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
        }
    };

    const handleVoiceCommand = (command: string) => {
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand.includes('ফসল') || lowerCommand.includes('চাষ')) {
            speakText('ফসল সুপারিশ বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => window.location.href = '#crops', 1000);
        } else if (lowerCommand.includes('বাজার') || lowerCommand.includes('বিক্রি')) {
            speakText('বাজার বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => window.location.href = '#marketplace', 1000);
        } else if (lowerCommand.includes('পরামর্শ') || lowerCommand.includes('সাহায্য')) {
            speakText('বিশেষজ্ঞ পরামর্শ বিভাগে নিয়ে যাচ্ছি');
            setTimeout(() => window.location.href = '#consultation', 1000);
        } else {
            speakText('দুঃখিত, আমি বুঝতে পারিনি। আবার চেষ্টা করুন।');
        }
    };

    const menuItems = [
        {
            id: 'crops',
            title: 'ফসল সুপারিশ',
            subtitle: 'সঠিক ফসল বেছে নিন',
            description: 'আপনার মাটি ও আবহাওয়া অনুযায়ী সেরা ফসল পেতে',
            icon: Sprout,
            color: 'bg-green-500',
            hoverColor: 'hover:bg-green-600',
            route: '/recommendation',
            audioText: 'ফসল সুপারিশ - আপনার মাটি ও আবহাওয়া অনুযায়ী সেরা ফসল বেছে নিন'
        },
        {
            id: 'diagnosis',
            title: 'রোগ নির্ণয়',
            subtitle: 'ফসলের সমস্যা সমাধান',
            description: 'ছবি তুলে জানুন রোগ ও চিকিৎসা',
            icon: Activity,
            color: 'bg-red-500',
            hoverColor: 'hover:bg-red-600',
            route: '/diagnosis',
            audioText: 'রোগ নির্ণয় - ফসলের ছবি তুলে জানুন রোগ ও চিকিৎসার উপায়'
        },
        {
            id: 'marketplace',
            title: 'হাটবাজার',
            subtitle: 'কিনুন ও বিক্রি করুন',
            description: 'ফসল, বীজ ও যন্ত্রপাতি',
            icon: ShoppingCart,
            color: 'bg-blue-500',
            hoverColor: 'hover:bg-blue-600',
            route: '/marketplace',
            audioText: 'হাটবাজার - ফসল বিক্রি করুন এবং প্রয়োজনীয় জিনিস কিনুন'
        },
        {
            id: 'social',
            title: 'কৃষক সমাজ',
            subtitle: 'অভিজ্ঞতা শেয়ার করুন',
            description: 'অন্য কৃষকদের সাথে কথা বলুন',
            icon: Users,
            color: 'bg-purple-500',
            hoverColor: 'hover:bg-purple-600',
            route: '/social-feed',
            audioText: 'কৃষক সমাজ - অন্য কৃষকদের সাথে অভিজ্ঞতা শেয়ার করুন'
        },
        {
            id: 'consultation',
            title: 'বিশেষজ্ঞ পরামর্শ',
            subtitle: 'ভয়েস কল করুন',
            description: 'কৃষি বিশেষজ্ঞদের সাথে কথা বলুন',
            icon: Phone,
            color: 'bg-indigo-500',
            hoverColor: 'hover:bg-indigo-600',
            route: '/consultation',
            audioText: 'বিশেষজ্ঞ পরামর্শ - কৃষি বিশেষজ্ঞদের সাথে সরাসরি কথা বলুন'
        },
        {
            id: 'others',
            title: 'আরও সেবা',
            subtitle: 'আবহাওয়া ও সংবাদ',
            description: 'আবহাওয়ার খবর ও কৃষি সংবাদ',
            icon: CloudSun,
            color: 'bg-orange-500',
            hoverColor: 'hover:bg-orange-600',
            route: '/others',
            audioText: 'আরও সেবা - আবহাওয়ার খবর এবং কৃষি সংবাদ পান'
        }
    ];

    const quickStats = [
        { label: 'আজকের তাপমাত্রা', value: '৩২°সে', icon: CloudSun, color: 'text-orange-500' },
        { label: 'নতুন পরামর্শ', value: '৫টি', icon: MessageCircle, color: 'text-blue-500' },
        { label: 'বাজারের দাম', value: 'আপডেট', icon: ShoppingCart, color: 'text-green-500' },
    ];

    const handleMenuClick = (item: typeof menuItems[0]) => {
        speakText(item.audioText);
        setTimeout(() => {
            window.location.href = item.route;
        }, 1500);
    };

    const toggleTTS = () => {
        setIsTTSEnabled(!isTTSEnabled);
        const message = !isTTSEnabled ? 'কণ্ঠস্বর চালু করা হয়েছে' : 'কণ্ঠস্বর বন্ধ করা হয়েছে';
        
        toast({
            title: message,
            description: !isTTSEnabled ? 'এখন সব লেখা শুনতে পাবেন' : 'কণ্ঠস্বর সেবা বন্ধ',
        });

        if (!isTTSEnabled) {
            speakText(message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
            <Header />
            
            <main className="pt-16 pb-8">
                {/* Welcome Section */}
                <div className="px-4 py-6 bg-white/80 backdrop-blur-sm border-b">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                    সুপ্রভাত, {user?.name || 'কৃষক ভাই'}! 
                                </h1>
                                <p className="text-gray-600">আজ কি সাহায্য প্রয়োজন?</p>
                            </div>
                            
                            {/* Voice Controls */}
                            <div className="flex gap-2">
                                <Button
                                    variant={isTTSEnabled ? "default" : "outline"}
                                    size="sm"
                                    onClick={toggleTTS}
                                    className="flex items-center gap-2"
                                >
                                    {isTTSEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                                    <span className="hidden sm:inline">কণ্ঠস্বর</span>
                                </Button>
                                
                                <Button
                                    variant={isListening ? "destructive" : "outline"}
                                    size="sm"
                                    onClick={startListening}
                                    disabled={isListening}
                                    className="flex items-center gap-2"
                                >
                                    <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                                    <span className="hidden sm:inline">
                                        {isListening ? 'শুনছি...' : 'বলুন'}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {quickStats.map((stat, index) => (
                                <div key={index} className="bg-white/60 rounded-lg p-3 text-center">
                                    <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
                                    <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                                    <p className="font-semibold text-sm">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Menu */}
                <div className="px-4 py-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {menuItems.map((item) => {
                                const IconComponent = item.icon;
                                
                                return (
                                    <Card
                                        key={item.id}
                                        className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group"
                                        onClick={() => handleMenuClick(item)}
                                        onMouseEnter={() => isTTSEnabled && speakText(item.title)}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`${item.color} ${item.hoverColor} w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                                                    <IconComponent className="h-8 w-8 text-white" />
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm font-medium text-blue-600">
                                                    {item.subtitle}
                                                </p>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                            
                                            {/* Audio Play Button */}
                                            {isTTSEnabled && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        speakText(item.audioText);
                                                    }}
                                                >
                                                    <Play className="h-3 w-3 mr-1" />
                                                    শুনুন
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Voice Help Guide */}
                {isTTSEnabled && (
                    <div className="px-4 pb-6">
                        <div className="max-w-4xl mx-auto">
                            <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Mic className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">কণ্ঠস্বর নির্দেশনা</h4>
                                            <p className="text-sm text-blue-700">
                                                "ফসল", "বাজার", "পরামর্শ" - এই শব্দগুলো বলে সরাসরি সেই বিভাগে যান
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FarmerDashboard;