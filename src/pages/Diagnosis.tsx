import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mic, Camera, Upload, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Disease {
  name: string;
  probability: number;
  treatment: string;
  cost: number;
  type?: string;
  guideline?: string[];
  chemicals?: Chemical[];
  videos?: string[];
}

interface Chemical {
  name: string;
  dosePerAcre: number;
  unit: string;
  pricePerUnit: number;
  note?: string;
  type: string;
}

const Diagnosis = () => {
  const { toast } = useToast();
  const [crop, setCrop] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acre");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Disease[]>([]);

  const crops = [
    { value: "rice", label: "ধান" },
    { value: "wheat", label: "গম" },
    { value: "corn", label: "ভুট্টা" },
    { value: "tomato", label: "টমেটো" },
    { value: "potato", label: "আলু" },
    { value: "eggplant", label: "বেগুন" },
    { value: "cucumber", label: "শসা" },
    { value: "cabbage", label: "বাঁধাকপি" }
  ];

  const mockDiseases: Record<string, Disease[]> = {
    rice: [
      { 
        name: "ব্লাস্ট রোগ (ছত্রাক)", 
        probability: 78, 
        treatment: "ট্রাইসাইক্লাজোল স্প্রে", 
        cost: 450,
        type: "ছত্রাক রোগ",
        guideline: [
          "সংক্রমিত গাছ/ছিটে অংশ অপসারণ করুন",
          "জমিতে অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন",
          "পর্যাপ্ত পানি নিষ্কাশন নিশ্চিত করুন",
          "লেবেল মেনে ফাঙ্গিসাইড প্রয়োগ করুন"
        ],
        chemicals: [
          { name: "ট্রাইসাইক্লাজোল 75WP", dosePerAcre: 0.12, unit: "কেজি", pricePerUnit: 1200, note: "পানি ২০০ লিটার", type: "fungicide" },
          { name: "আজক্সিস্ট্রোবিন 250SC", dosePerAcre: 0.08, unit: "লিটার", pricePerUnit: 2200, note: "পানি ২০০ লিটার", type: "fungicide" }
        ],
        videos: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
      },
      { 
        name: "ব্যাকটেরিয়াল লিফ ব্লাইট", 
        probability: 65, 
        treatment: "কপার অক্সিক্লোরাইড", 
        cost: 320,
        type: "ব্যাকটেরিয়া রোগ",
        guideline: [
          "সেচের পানি নিয়ন্ত্রণ, ক্ষেতে হাঁটা কমান",
          "তামাযুক্ত (Copper) প্রোডাক্ট লেবেলমতো ব্যবহার"
        ],
        chemicals: [
          { name: "কপার অক্সিক্লোরাইড 50WP", dosePerAcre: 0.6, unit: "কেজি", pricePerUnit: 550, note: "২০০ লিটার পানি", type: "bactericide" }
        ],
        videos: ["https://www.youtube.com/watch?v=3GwjfUFyY6M"]
      }
    ],
    tomato: [
      { 
        name: "লেট ব্লাইট (Phytophthora)", 
        probability: 82, 
        treatment: "ম্যানকোজেব স্প্রে", 
        cost: 380,
        type: "ছত্রাক রোগ",
        guideline: [
          "সংক্রমিত পাতা/ফল অপসারণ",
          "ভোর/সন্ধ্যায় স্প্রে; পাতা ভালোমতো ভিজবে"
        ],
        chemicals: [
          { name: "ম্যানকোজেব 80WP", dosePerAcre: 1.0, unit: "কেজি", pricePerUnit: 450, note: "২০০–২৪০ লিটার পানি", type: "fungicide" },
          { name: "মেটাল্যাক্সিল + ম্যানকোজেব", dosePerAcre: 0.8, unit: "কেজি", pricePerUnit: 800, note: "২০০ লিটার পানি", type: "fungicide" }
        ],
        videos: ["https://www.youtube.com/watch?v=oHg5SJYRHA0"]
      },
      { 
        name: "লিফ কার্ল (ভাইরাস)", 
        probability: 60, 
        treatment: "ইমিডাক্লোপ্রিড স্প্রে", 
        cost: 420,
        type: "ভাইরাস রোগ",
        guideline: [
          "ভেক্টর পোকা (সাদা মাছি) নিয়ন্ত্রণ",
          "সংক্রমিত গাছ তুলে ফেলুন"
        ],
        chemicals: [
          { name: "ইমিডাক্লোপ্রিড 17.8SL", dosePerAcre: 0.08, unit: "লিটার", pricePerUnit: 1500, note: "সাদা মাছির জন্য", type: "insecticide" }
        ],
        videos: ["https://www.youtube.com/watch?v=DLzxrzFCyOs"]
      }
    ],
    potato: [
      { 
        name: "আর্লি ব্লাইট", 
        probability: 75, 
        treatment: "ক্লোরোথালোনিল", 
        cost: 350,
        type: "ছত্রাক রোগ",
        guideline: [
          "ফসল ঘনত্ব কমান",
          "ফাঙ্গিসাইড রোটেশন অনুসরণ"
        ],
        chemicals: [
          { name: "ক্লোরোথালোনিল 75WP", dosePerAcre: 1.0, unit: "কেজি", pricePerUnit: 650, note: "২০০ লিটার পানি", type: "fungicide" }
        ],
        videos: ["https://www.youtube.com/watch?v=ub82Xb1C8os"]
      },
      { 
        name: "লেট ব্লাইট", 
        probability: 68, 
        treatment: "মেটাল্যাক্সিল", 
        cost: 480,
        type: "ছত্রাক রোগ",
        guideline: [
          "সংক্রমিত অংশ পুড়িয়ে ফেলুন",
          "আর্দ্রতা কমান, বায়ু চলাচল বাড়ান"
        ],
        chemicals: [
          { name: "মেটাল্যাক্সিল 25WP", dosePerAcre: 0.8, unit: "কেজি", pricePerUnit: 850, note: "২০০ লিটার পানি", type: "fungicide" }
        ],
        videos: []
      }
    ],
    eggplant: [
      { 
        name: "ফোমপসিস ফল পচা", 
        probability: 65, 
        treatment: "কারবেনডাজিম", 
        cost: 280,
        type: "ছত্রাক রোগ",
        guideline: [
          "সংক্রমিত ফল তুলে ফেলুন",
          "স্প্রে ইন্টারভাল ৭–১০ দিন"
        ],
        chemicals: [
          { name: "কারবেনডাজিম 50WP", dosePerAcre: 0.2, unit: "কেজি", pricePerUnit: 900, note: "২০০ লিটার পানি", type: "fungicide" }
        ],
        videos: []
      }
    ],
    cucumber: [
      { 
        name: "পাউডারি মিলডিউ", 
        probability: 70, 
        treatment: "সালফার স্প্রে", 
        cost: 200,
        type: "ছত্রাক রোগ",
        guideline: [
          "পাতা শুকনো রাখুন",
          "ভোর/বিকেল স্প্রে"
        ],
        chemicals: [
          { name: "সালফার 80WP", dosePerAcre: 1.0, unit: "কেজি", pricePerUnit: 300, note: "২০০ লিটার পানি", type: "fungicide" }
        ],
        videos: []
      }
    ]
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'bn-BD';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(prev => prev ? `${prev} ${transcript}` : transcript);
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

  const handleDiagnosis = async () => {
    if (!crop || (!symptoms && !image)) {
      toast({
        title: "তথ্য প্রয়োজন",
        description: "ফসল নির্বাচন করুন এবং লক্ষণ বা ছবি দিন।",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const diseases = mockDiseases[crop] || [];
      setResults(diseases);
      setIsAnalyzing(false);
      
      toast({
        title: "বিশ্লেষণ সম্পূর্ণ",
        description: `${diseases.length} টি সম্ভাব্য রোগ পাওয়া গেছে।`,
      });
    }, 2000);
  };

  const calculateTotalCost = () => {
    if (!results.length || !area) return 0;
    const areaInAcre = unit === "acre" ? parseFloat(area) : 
                      unit === "bigha" ? parseFloat(area) * 0.33 :
                      parseFloat(area) / 100;
    
    return results[0]?.cost * areaInAcre || 0;
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            ফসলের রোগ নির্ণয়
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">রোগের তথ্য দিন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Crop Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">ফসলের নাম</label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger>
                <SelectValue placeholder="ফসল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Symptoms Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">লক্ষণ বর্ণনা</label>
            <Textarea
              placeholder="পাতায় দাগ, রং পরিবর্তন, শুকিয়ে যাওয়া ইত্যাদি লিখুন..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[80px]"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className="w-full"
            >
              <Mic className="h-4 w-4 mr-2" />
              ভয়েস দিয়ে বলুন
            </Button>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">রোগাক্রান্ত অংশের ছবি</label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
              {image ? (
                <div className="space-y-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setImage(null)}
                  >
                    ছবি পরিবর্তন করুন
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    ছবি আপলোড করুন বা ক্যামেরা ব্যবহার করুন
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <label className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-1" />
                        ফাইল নির্বাচন
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <label className="cursor-pointer">
                        <Camera className="h-4 w-4 mr-1" />
                        ক্যামেরা
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Area Input */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">জমির পরিমাণ</label>
              <Input
                type="number"
                placeholder="যেমন: 1.5"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">একক</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acre">একর</SelectItem>
                  <SelectItem value="bigha">বিঘা</SelectItem>
                  <SelectItem value="decimal">ডেসিমেল</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleDiagnosis}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "বিশ্লেষণ করা হচ্ছে..." : "রোগ নির্ণয় করুন"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <>
          {/* Disease List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">সম্ভাব্য রোগসমূহ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.map((disease, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{disease.name}</h3>
                    <Badge variant={disease.probability > 70 ? "destructive" : "secondary"}>
                      {disease.probability}% সম্ভাবনা
                    </Badge>
                  </div>
                  
                  {disease.type && (
                    <Badge variant="outline">{disease.type}</Badge>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    <strong>চিকিৎসা:</strong> {disease.treatment}
                  </p>
                  
                  {disease.guideline && (
                    <div className="space-y-1">
                      <strong className="text-sm">নির্দেশনা:</strong>
                      <ul className="text-sm space-y-1 ml-4">
                        {disease.guideline.map((guide, idx) => (
                          <li key={idx}>• {guide}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {disease.chemicals && area && (
                    <div className="space-y-2">
                      <strong className="text-sm">প্রস্তাবিত ঔষধ:</strong>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-border p-2 text-left">ঔষধ</th>
                              <th className="border border-border p-2 text-left">পরিমাণ</th>
                              <th className="border border-border p-2 text-left">খরচ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {disease.chemicals.map((chem, idx) => {
                              const areaInAcre = unit === "acre" ? parseFloat(area) : 
                                               unit === "bigha" ? parseFloat(area) * 0.33 :
                                               parseFloat(area) / 100;
                              const qty = chem.dosePerAcre * areaInAcre;
                              const cost = qty * chem.pricePerUnit;
                              
                              return (
                                <tr key={idx}>
                                  <td className="border border-border p-2">{chem.name}</td>
                                  <td className="border border-border p-2">{qty.toFixed(2)} {chem.unit}</td>
                                  <td className="border border-border p-2">৳{cost.toLocaleString('bn-BD')}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {disease.videos && disease.videos.length > 0 && (
                    <div className="space-y-1">
                      <strong className="text-sm">ভিডিও গাইড:</strong>
                      {disease.videos.map((video, idx) => (
                        <a key={idx} href={video} target="_blank" rel="noopener noreferrer" 
                           className="block text-xs text-blue-600 hover:underline break-all">
                          {video}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Calculation */}
          {area && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">আনুমানিক খরচ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      {area} {unit === "acre" ? "একর" : unit === "bigha" ? "বিঘা" : "ডেসিমেল"} জমির জন্য
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ৳{calculateTotalCost().toLocaleString('bn-BD')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      প্রাথমিক চিকিৎসার জন্য
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expert Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">বিশেষজ্ঞ সহায়তা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>কৃষি কল সেন্টার:</strong> ১৬১২৩
                </p>
                <p>
                  <strong>উপজেলা কৃষি অফিস:</strong> ৩৩৩
                </p>
                <p className="text-muted-foreground">
                  জরুরি প্রয়োজনে স্থানীয় কৃষি সম্প্রসারণ কর্মকর্তার সাথে যোগাযোগ করুন।
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Diagnosis;