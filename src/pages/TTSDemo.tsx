import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TTSButton } from "@/components/ui/tts-button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Mic, Users, MessageSquare } from "lucide-react";

const TTSDemo = () => {
  const [selectedText, setSelectedText] = useState("");

  const sampleTexts = [
    "আসসালামু আলাইকুম! আমি একজন কৃষক। আজ আমার ধানের ক্ষেতে নতুন জাতের বীজ বপন করেছি।",
    "এই বছর আমার টমেটের ফলন খুবই ভাল হয়েছে। প্রতি বিঘায় ১৫ মণ টমেটো পেয়েছি।",
    "কৃষি বিশেষজ্ঞের পরামর্শ: এই মৌসুমে সরিষার চাষ করলে ভালো লাভ হবে।",
    "বাজারে আজ পেঁয়াজের দাম কমেছে। প্রতি কেজি ৪০ টাকা থেকে ৩৫ টাকা হয়েছে।"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Volume2 className="h-8 w-8 text-primary" />
            TTS ডেমো - কৃষক ফিড
          </h1>
          <p className="text-muted-foreground text-lg">
            বাংলা টেক্সট-টু-স্পিচ ফিচার পরীক্ষা করুন
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Volume2 className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">বাংলা TTS</h3>
              <p className="text-sm text-muted-foreground">
                পোস্টের বিষয়বস্তু বাংলায় শুনুন
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">সবার জন্য</h3>
              <p className="text-sm text-muted-foreground">
                নিরক্ষর কৃষকরাও ব্যবহার করতে পারবেন
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">সহজ ব্যবহার</h3>
              <p className="text-sm text-muted-foreground">
                একটি ক্লিকেই পোস্ট শুনুন
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sample Posts */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold mb-4">নমুনা পোস্ট</h2>
          
          {sampleTexts.map((text, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">কৃষক ভাই {index + 1}</p>
                      <p className="text-sm text-muted-foreground">২ ঘন্টা আগে</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">সাধারণ</Badge>
                    <TTSButton 
                      text={text}
                      authorName={`কৃষক ভাই ${index + 1}`}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Text Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              কাস্টম টেক্সট পরীক্ষা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                আপনার টেক্সট লিখুন:
              </label>
              <textarea
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
                className="w-full p-3 border rounded-md min-h-[100px] resize-none"
                placeholder="এখানে বাংলায় যেকোনো টেক্সট লিখুন..."
              />
            </div>
            <div className="flex items-center gap-2">
              <TTSButton 
                text={selectedText || "কোনো টেক্সট লেখা হয়নি"}
                size="default"
                variant="default"
                
                className={!selectedText ? "opacity-50 cursor-not-allowed" : ""}
              />
              <Button
                variant="outline"
                onClick={() => setSelectedText("")}
                disabled={!selectedText}
              >
                পরিষ্কার করুন
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>ব্যবহারের নির্দেশনা</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">১</Badge>
              <p className="text-sm">যেকোনো পোস্টের স্পিকার আইকনে ক্লিক করুন</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">২</Badge>
              <p className="text-sm">পোস্টটি বাংলায় পড়া শুরু হবে</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">৩</Badge>
              <p className="text-sm">বন্ধ করতে আবার স্পিকার আইকনে ক্লিক করুন</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">৪</Badge>
              <p className="text-sm">কাস্টম টেক্সট বক্সে নিজের টেক্সট লিখে পরীক্ষা করুন</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TTSDemo;
