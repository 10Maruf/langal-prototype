import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  windSpeed: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }[];
}

const WeatherPlanning = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [cropName, setCropName] = useState("");
  const [question, setQuestion] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Mock weather data
  const mockWeather: WeatherData = {
    temperature: 28,
    humidity: 75,
    rainfall: 12,
    condition: "আংশিক মেঘলা",
    windSpeed: 15,
    forecast: [
      { day: "আজ", temp: 28, condition: "মেঘলা", icon: "☁️" },
      { day: "আগামীকাল", temp: 30, condition: "রোদ", icon: "☀️" },
      { day: "পরশু", temp: 26, condition: "বৃষ্টি", icon: "🌧️" },
      { day: "৪ দিন পর", temp: 27, condition: "মেঘলা", icon: "☁️" },
      { day: "৫ দিন পর", temp: 29, condition: "রোদ", icon: "☀️" },
      { day: "৬ দিন পর", temp: 25, condition: "বৃষ্টি", icon: "🌧️" },
      { day: "৭ দিন পর", temp: 28, condition: "আংশিক মেঘলা", icon: "⛅" }
    ]
  };

  const getCropRecommendations = (crop: string, weather: WeatherData) => {
    const recommendations = [];
    
    if (weather.temperature > 30) {
      recommendations.push("🌡️ তাপমাত্রা বেশি - ছায়ার ব্যবস্থা করুন বা সকাল/সন্ধ্যায় সেচ দিন");
    }
    
    if (weather.humidity > 80) {
      recommendations.push("💧 আর্দ্রতা বেশি - ছত্রাক রোগের জন্য সতর্ক থাকুন");
    }
    
    if (weather.rainfall > 10) {
      recommendations.push("🌧️ বৃষ্টির সম্ভাবনা - নিষ্কাশনের ব্যবস্থা রাখুন");
    }
    
    if (weather.windSpeed > 20) {
      recommendations.push("💨 বাতাস বেশি - গাছের সাপোর্ট দিন");
    }

    // Crop specific recommendations
    if (crop.includes("ধান")) {
      recommendations.push("🌾 ধানের জন্য - জলাবদ্ধতা এড়িয়ে ৫-১০ সেমি পানি রাখুন");
    } else if (crop.includes("টমেটো")) {
      recommendations.push("🍅 টমেটোর জন্য - পাতায় পানি লাগানো এড়িয়ে চলুন");
    } else if (crop.includes("সবজি")) {
      recommendations.push("🥬 সবজির জন্য - নিয়মিত হালকা সেচ দিন");
    }

    return recommendations;
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'bn-BD';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(prev => prev ? `${prev} ${transcript}` : transcript);
      };
      
      recognition.start();
    } else {
      toast({
        title: "সাপোর্ট নেই",
        description: "আপনার ব্রাউজার ভয়েস ইনপুট সাপোর্ট করে না।",
        variant: "destructive"
      });
    }
  };

  const handleWeatherCheck = () => {
    if (!location) {
      toast({
        title: "তথ্য প্রয়োজন",
        description: "লোকেশন দিন।",
        variant: "destructive"
      });
      return;
    }

    setWeather(mockWeather);
    const recs = getCropRecommendations(cropName, mockWeather);
    setRecommendations(recs);
    
    toast({
      title: "আবহাওয়া আপডেট",
      description: "বর্তমান আবহাওয়া ও সুপারিশ লোড হয়েছে।",
    });
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            আবহাওয়া ভিত্তিক পরিকল্পনা
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">তথ্য দিন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">লোকেশন</label>
              <Input
                placeholder="যেমন: নোয়াখালী, ঢাকা"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ফসলের নাম (ঐচ্ছিক)</label>
              <Input
                placeholder="যেমন: ধান, টমেটো"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">আবহাওয়া সম্পর্কিত প্রশ্ন</label>
            <Textarea
              placeholder="যেমন: এই আবহাওয়ায় কি করব? বৃষ্টি হলে কি সমস্যা হবে?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[80px]"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className="w-full"
            >
              <Mic className="h-4 w-4 mr-2" />
              ভয়েস দিয়ে প্রশ্ন করুন
            </Button>
          </div>

          <Button onClick={handleWeatherCheck} className="w-full">
            আবহাওয়া দেখুন ও সুপারিশ নিন
          </Button>
        </CardContent>
      </Card>

      {/* Weather Display */}
      {weather && (
        <>
          {/* Current Weather */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">বর্তমান আবহাওয়া - {location}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-semibold">{weather.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">তাপমাত্রা</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-semibold">{weather.humidity}%</div>
                    <div className="text-sm text-muted-foreground">আর্দ্রতা</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-semibold">{weather.rainfall}mm</div>
                    <div className="text-sm text-muted-foreground">বৃষ্টিপাত</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-semibold">{weather.windSpeed} km/h</div>
                    <div className="text-sm text-muted-foreground">বাতাসের গতি</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-lg py-2 px-4">
                  {weather.condition}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">৭ দিনের পূর্বাভাস</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="text-center border rounded-lg p-3">
                    <div className="text-sm font-medium mb-1">{day.day}</div>
                    <div className="text-2xl mb-1">{day.icon}</div>
                    <div className="font-semibold">{day.temp}°C</div>
                    <div className="text-xs text-muted-foreground">{day.condition}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">আবহাওয়া ভিত্তিক সুপারিশ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* General Agricultural Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">সাধারণ পরামর্শ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>সকাল (৬-৮টা):</strong> সেচ ও স্প্রে করার উত্তম সময়</p>
                <p><strong>দুপুর (১২-৩টা):</strong> তীব্র রোদে কাজ এড়িয়ে চলুন</p>
                <p><strong>সন্ধ্যা (৪-৬টা):</strong> ফসল পরিদর্শন ও হালকা কাজের সময়</p>
                <p><strong>বৃষ্টির আগে:</strong> ছত্রাকনাশক স্প্রে করুন</p>
                <p><strong>বৃষ্টির পরে:</strong> পানি নিষ্কাশনের ব্যবস্থা দেখুন</p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">জরুরি যোগাযোগ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>আবহাওয়া হটলাইন:</strong> ১০৯০</p>
              <p><strong>কৃষি কল সেন্টার:</strong> ১৬১২ৣ</p>
              <p><strong>দুর্যোগ ব্যবস্থাপনা:</strong> ১০৯০</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WeatherPlanning;