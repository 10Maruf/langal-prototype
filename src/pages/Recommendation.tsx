import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sprout, MapPin, Calendar, DollarSign, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Crop {
  name: string;
  cost: number;
  yield: number;
  price: number;
  duration: number;
  easy: boolean;
  quick: boolean;
  profit: number;
  breakdown: {
    seed: number;
    fert: number;
    labor: number;
    irrigation: number;
    other: number;
  };
  plan: {
    phase: string;
    window: string;
    actions: string[];
  }[];
}

const Recommendation = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedCrops, setSelectedCrops] = useState<Set<string>>(new Set());
  const [step, setStep] = useState(1);
  const [crops, setCrops] = useState<Crop[]>([]);

  const cropDatabase: Record<string, Crop[]> = {
    "Jul-Aug": [
      {
        name: "আমন ধান",
        cost: 18000,
        yield: 18,
        price: 28,
        duration: 120,
        easy: true,
        quick: false,
        profit: 486000,
        breakdown: { seed: 1800, fert: 5200, labor: 7000, irrigation: 1800, other: 2200 },
        plan: [
          { phase: "মাঠ প্রস্তুতি", window: "Day -10 to -1", actions: ["আগাছা পরিষ্কার, চাষ+মাঠ সমতল", "জৈব সার ১ টন/একর (সম্ভব হলে)"] },
          { phase: "রোপণ/বপন", window: "Day 0", actions: ["চারা ২৫–৩০ দিন বয়সে রোপণ", "বপনে ২০–২৫ কেজি বীজ/একর"] },
          { phase: "সার (বেসাল)", window: "Day 0", actions: ["ইউরিয়া ২০ কেজি, টিএসপি ১৬ কেজি, এমওপি ১২ কেজি"] },
          { phase: "টপড্রেস", window: "Day 35–40", actions: ["ইউরিয়া ১৮ কেজি"] },
          { phase: "হারভেস্ট", window: "Day 120–130", actions: ["৮৫% পাকা হলে কাটা"] }
        ]
      },
      {
        name: "তিল",
        cost: 7000,
        yield: 0.6,
        price: 180,
        duration: 95,
        easy: true,
        quick: true,
        profit: 101000,
        breakdown: { seed: 500, fert: 900, labor: 3800, irrigation: 600, other: 1200 },
        plan: [
          { phase: "বপন", window: "Day 0", actions: ["ছিটিয়ে বা লাইনে বপন"] },
          { phase: "বেসাল", window: "Day 0", actions: ["টিএসপি 8 কেজি, এমওপি 6 কেজি"] },
          { phase: "পাতলা করা", window: "Day 15–20", actions: ["গাছ ১০–১২ সেমি দূরে রাখুন"] },
          { phase: "হারভেস্ট", window: "Day 90–100", actions: ["ফল ফেটে যাওয়ার আগে সংগ্রহ"] }
        ]
      }
    ],
    "Sep-Nov": [
      {
        name: "সরিষা",
        cost: 8000,
        yield: 0.8,
        price: 150,
        duration: 95,
        easy: true,
        quick: true,
        profit: 112000,
        breakdown: { seed: 900, fert: 1600, labor: 3200, irrigation: 800, other: 1500 },
        plan: [
          { phase: "বপন", window: "Day 0", actions: ["লাইন দূরত্ব ৩০ সেমি, গাছ ৫–৭ সেমি"] },
          { phase: "বেসাল", window: "Day 0", actions: ["টিএসপি 10 কেজি, এমওপি 6 কেজি"] },
          { phase: "টপড্রেস", window: "Day 25–30", actions: ["ইউরিয়া 10 কেজি"] },
          { phase: "হারভেস্ট", window: "Day 90–100", actions: ["ফল ৭০–৮০% পেকে গেলে সংগ্রহ"] }
        ]
      },
      {
        name: "গম",
        cost: 15000,
        yield: 2.5,
        price: 35,
        duration: 110,
        easy: true,
        quick: false,
        profit: 72500,
        breakdown: { seed: 2200, fert: 3800, labor: 5200, irrigation: 1800, other: 1000 },
        plan: [
          { phase: "বপন", window: "Day 0", actions: ["২০–২২ কেজি বীজ/একর"] },
          { phase: "বেসাল", window: "Day 0", actions: ["টিএসপি 16 কেজি, এমওপি 8 কেজি"] },
          { phase: "টপড্রেস-১", window: "Day 20–25", actions: ["ইউরিয়া 12 কেজি"] },
          { phase: "টপড্রেস-২", window: "Day 45–50", actions: ["ইউরিয়া 12 কেজি"] },
          { phase: "হারভেস্ট", window: "Day 105–115", actions: ["শস্য কঠিন হলে কাটা"] }
        ]
      }
    ],
    "Dec-Feb": [
      {
        name: "বোরো ধান",
        cost: 22000,
        yield: 20,
        price: 26,
        duration: 145,
        easy: false,
        quick: false,
        profit: 498000,
        breakdown: { seed: 2200, fert: 7000, labor: 9000, irrigation: 2200, other: 1600 },
        plan: [
          { phase: "নার্সারি", window: "Day -25 to -1", actions: ["বীজতলা প্রস্তুতি, আগাছা নিয়ন্ত্রণ"] },
          { phase: "রোপণ", window: "Day 0", actions: ["চারা ২৫–৩০ দিন বয়সে"] },
          { phase: "বেসাল", window: "Day 0", actions: ["ইউরিয়া 22 কেজি, টিএসপি 20 কেজি, এমওপি 14 কেজি"] },
          { phase: "টপড্রেস-১", window: "Day 25–30", actions: ["ইউরিয়া 18 কেজি"] },
          { phase: "টপড্রেস-২", window: "Day 50–55", actions: ["ইউরিয়া 18 কেজি, এমওপি 8 কেজি"] },
          { phase: "হারভেস্ট", window: "Day 140–150", actions: ["ধান ৮৫% পাকা হলে"] }
        ]
      },
      {
        name: "আলু",
        cost: 20000,
        yield: 10,
        price: 18,
        duration: 95,
        easy: true,
        quick: true,
        profit: 160000,
        breakdown: { seed: 9000, fert: 3200, labor: 5200, irrigation: 1200, other: 400 },
        plan: [
          { phase: "রোপণ", window: "Day 0", actions: ["কন্দ ২০–২৫ সেমি দূরে"] },
          { phase: "বেসাল", window: "Day 0", actions: ["টিএসপি 16 কেজি, এমওপি 8 কেজি"] },
          { phase: "টপড্রেস-১", window: "Day 20–25", actions: ["ইউরিয়া 12 কেজি"] },
          { phase: "টপড্রেস-২", window: "Day 45–50", actions: ["ইউরিয়া 12 কেজি"] },
          { phase: "হারভেস্ট", window: "Day 105–115", actions: ["শস্য কঠিন হলে কাটা"] }
        ]
      },
      {
        name: "শাকসবজি (লাউ/কুমড়া)",
        cost: 9000,
        yield: 3.5,
        price: 30,
        duration: 75,
        easy: true,
        quick: true,
        profit: 96000,
        breakdown: { seed: 1000, fert: 2200, labor: 3800, irrigation: 900, other: 1100 },
        plan: [
          { phase: "মাচা/বেড", window: "Day -5 to -1", actions: ["মাচা তৈরি, মাটিতে জৈব সার মেশান"] },
          { phase: "রোপণ", window: "Day 0", actions: ["৪x৬ ফুট দূরত্বে"] },
          { phase: "সার ব্যবস্থাপনা", window: "প্রতি ১৫ দিনে", actions: ["ঝাড়ে গোবর/কম্পোস্ট, প্রয়োজনে সামান্য ইউরিয়া"] },
          { phase: "সেচ", window: "৫–৭ দিনে", actions: ["মাটি স্যাঁতসেঁতে রাখুন"] },
          { phase: "হারভেস্ট", window: "Day 60–80", actions: ["বাজার উপযোগী আকার হলে তোলা"] }
        ]
      }
    ],
    "Mar-Jun": [
      {
        name: "ভুট্টা",
        cost: 16000,
        yield: 3.5,
        price: 24,
        duration: 110,
        easy: true,
        quick: false,
        profit: 68000,
        breakdown: { seed: 2600, fert: 4200, labor: 5200, irrigation: 1800, other: 1200 },
        plan: [
          { phase: "বপন", window: "Day 0", actions: ["লাইন দূরত্ব ৬০ সেমি, গাছ ২০ সেমি"] },
          { phase: "বেসাল", window: "Day 0", actions: ["টিএসপি 16 কেজি, এমওপি 8 কেজি"] },
          { phase: "টপড্রেস-১", window: "Day 20–25", actions: ["ইউরিয়া 12 কেজি"] },
          { phase: "টপড্রেস-২", window: "Day 40–45", actions: ["ইউরিয়া 12 কেজি, এমওপি 8 কেজি"] },
          { phase: "সেচ", window: "১০–১২ দিনে একবার", actions: ["ফুল আসা সময়ে আর্দ্রতা জরুরি"] },
          { phase: "হারভেস্ট", window: "Day 100–115", actions: ["শস্য ২৫–৩০% আর্দ্রতায় সংগ্রহ"] }
        ]
      }
    ]
  };

  const locations = [
    "Noakhali", "Dhaka", "Rajshahi", "Chattogram", "Barishal", "Khulna", "Sylhet", "Rangpur"
  ];

  const seasons = [
    { value: "Dec-Feb", label: "রবি (ডিসেম্বর-ফেব্রুয়ারি)" },
    { value: "Mar-Jun", label: "প্রাক-খরিপ (মার্চ-জুন)" },
    { value: "Jul-Aug", label: "খরিপ ১ (জুলাই-আগস্ট)" },
    { value: "Sep-Nov", label: "খরিপ ২ (সেপ্টেম্বর-নভেম্বর)" }
  ];

  const handleRecommend = () => {
    if (!location || !season) {
      toast({
        title: "তথ্য প্রয়োজন",
        description: "লোকেশন এবং সিজন নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }

    const seasonCrops = cropDatabase[season] || [];
    setCrops(seasonCrops);
    setStep(2);
    
    toast({
      title: "সুপারিশ প্রস্তুত",
      description: `${seasonCrops.length}টি ফসলের সুপারিশ পাওয়া গেছে।`,
    });
  };

  const getFilteredCrops = () => {
    if (!activeFilter) return crops;
    
    return crops.filter(crop => {
      switch (activeFilter) {
        case "lowCost":
          return crop.cost <= Math.min(...crops.map(c => c.cost)) * 1.2;
        case "highProfit":
          return crop.profit >= Math.max(...crops.map(c => c.profit)) * 0.8;
        case "easy":
          return crop.easy;
        case "quick":
          return crop.quick;
        default:
          return true;
      }
    });
  };

  const toggleCropSelection = (cropName: string) => {
    const newSelected = new Set(selectedCrops);
    if (newSelected.has(cropName)) {
      newSelected.delete(cropName);
    } else {
      newSelected.add(cropName);
    }
    setSelectedCrops(newSelected);
  };

  const generateYearPlan = () => {
    const months = [
      { key: "জানুয়ারি", season: "Dec-Feb" },
      { key: "ফেব্রুয়ারি", season: "Dec-Feb" },
      { key: "মার্চ", season: "Mar-Jun" },
      { key: "এপ্রিল", season: "Mar-Jun" },
      { key: "মে", season: "Mar-Jun" },
      { key: "জুন", season: "Mar-Jun" },
      { key: "জুলাই", season: "Jul-Aug" },
      { key: "আগস্ট", season: "Jul-Aug" },
      { key: "সেপ্টেম্বর", season: "Sep-Nov" },
      { key: "অক্টোবর", season: "Sep-Nov" },
      { key: "নভেম্বর", season: "Sep-Nov" },
      { key: "ডিসেম্বর", season: "Dec-Feb" }
    ];

    return months.map(month => {
      const seasonCrops = cropDatabase[month.season] || [];
      const bestCrop = seasonCrops.sort((a, b) => b.profit - a.profit)[0];
      
      return {
        month: month.key,
        crop: bestCrop?.name || "—",
        action: bestCrop?.plan[0]?.phase || "পরিকল্পনা",
        duration: bestCrop?.duration || 0
      };
    });
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            ফসল সুপারিশ
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Step 1: Input */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">তথ্য দিন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  লোকেশন (জেলা/উপজেলা)
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="লোকেশন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  সিজন / মাস
                </label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="সিজন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleRecommend} className="flex-1">
                সেরা ফসল দেখুন
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setLocation("");
                  setSeason("");
                  setCrops([]);
                  setStep(1);
                }}
              >
                রিসেট
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Results with Filters */}
      {step === 2 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                সুপারিশকৃত ফসল - {location} • {seasons.find(s => s.value === season)?.label}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "lowCost", label: "💸 কম খরচ" },
                  { key: "highProfit", label: "💰 বেশি লাভ" },
                  { key: "easy", label: "👌 সহজ" },
                  { key: "quick", label: "⚡ দ্রুত" }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(activeFilter === filter.key ? null : filter.key)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      activeFilter === filter.key
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {getFilteredCrops().map((crop, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedCrops.has(crop.name)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <div className="flex gap-2">
                      {crop.easy && <Badge variant="secondary">👌 সহজ</Badge>}
                      {crop.quick && <Badge variant="secondary">⚡ দ্রুত</Badge>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>খরচ: ৳{crop.cost.toLocaleString('bn-BD')}</span>
                    </div>
                    <div>
                      <span>ফলন: {crop.yield} টন/একর</span>
                    </div>
                    <div>
                      <span>দাম: ৳{crop.price}/কেজি</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span>{crop.duration} দিন</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">
                      লাভ: ৳{crop.profit.toLocaleString('bn-BD')}
                    </div>
                    <Button
                      variant={selectedCrops.has(crop.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCropSelection(crop.name)}
                    >
                      {selectedCrops.has(crop.name) ? "নির্বাচিত" : "নির্বাচন করুন"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  ফেরত যান
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={selectedCrops.size === 0}
                  className="flex-1"
                >
                  নির্বাচিত ফসল নিয়ে এগিয়ে যান ({selectedCrops.size})
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 3: Detailed Plans */}
      {step === 3 && (
        <>
          {crops.filter(crop => selectedCrops.has(crop.name)).map((crop, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{crop.name} - বিস্তারিত পরিকল্পনা</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>খরচ: ৳{crop.cost.toLocaleString('bn-BD')}</div>
                  <div>ফলন: {crop.yield} টন/একর</div>
                  <div>দাম: ৳{crop.price}/কেজি</div>
                  <div>সময়কাল: {crop.duration} দিন</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">চাষাবাদ পরিকল্পনা:</h4>
                  {crop.plan.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                      <div className="font-medium">{phase.phase}</div>
                      <div className="text-sm text-muted-foreground mb-2">{phase.window}</div>
                      <ul className="text-sm space-y-1">
                        {phase.actions.map((action, actionIdx) => (
                          <li key={actionIdx}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      ৳{crop.profit.toLocaleString('bn-BD')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      প্রত্যাশিত লাভ (প্রতি একর)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  ফেরত যান
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  ১ বছরের প্ল্যান দেখুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 4: Year Plan */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📅 ১ বছরের পরিকল্পনা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {generateYearPlan().map((month, index) => (
                <div key={index} className="border rounded-lg p-3 bg-muted/30">
                  <h5 className="font-semibold text-sm mb-2">{month.month}</h5>
                  <div className="text-sm space-y-1">
                    <div><strong>{month.crop}</strong></div>
                    <div className="text-muted-foreground">কাজ: {month.action}</div>
                    {month.duration > 0 && (
                      <div className="text-muted-foreground">~ {month.duration} দিন</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                ফেরত যান
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Recommendation;