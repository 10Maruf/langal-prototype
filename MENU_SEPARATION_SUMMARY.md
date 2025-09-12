# Farmer Menu Separation - Market Prices & Agricultural News

## সংক্ষিপ্ত বিবরণ

NewsFeed.tsx এ market price এবং news একসাথে ছিল। এখন সেগুলো আলাদা করে দুটি স্বতন্ত্র route তৈরি করা হয়েছে।

## যা করা হয়েছে

### 1. নতুন Pages তৈরি

- **MarketPrices.tsx** (`/market-prices`) - শুধুমাত্র বাজারদরের জন্য
- **AgriculturalNews.tsx** (`/agricultural-news`) - শুধুমাত্র কৃষি সংবাদের জন্য

### 2. Route Changes

- `/market-prices` - বাজারদর পেজ
- `/agricultural-news` - কৃষি সংবাদ পেজ

### 3. FarmerDashboard Menu Updates

- **"বাজারদর"** menu item এখন `/market-prices` এ যায়
- **"কৃষি সংবাদ"** menu item এখন `/agricultural-news` এ যায়

## Features

### MarketPrices.tsx এ যা আছে:

- ✅ দৈনিক বাজারদর তালিকা
- ✅ বাজার অনুযায়ী ফিল্টার
- ✅ দাম বৃদ্ধি/হ্রাসের সূচক
- ✅ পণ্যভিত্তিক দাম তুলনা
- ✅ স্থানীয় বাজারের তথ্য
- ✅ রিয়েল-টাইম আপডেট
- ✅ TTS সাপোর্ট

### AgriculturalNews.tsx এ যা আছে:

- ✅ কৃষি সংবাদ (নীতিমালা, ভর্তুকি, প্রশিক্ষণ)
- ✅ ক্যাটাগরি ভিত্তিক ফিল্টার
- ✅ অগ্রাধিকার ভিত্তিক সংবাদ
- ✅ সংবাদের ট্যাগিং সিস্টেম
- ✅ SMS সাবস্ক্রিপশন সুবিধা
- ✅ TTS সাপোর্ট

## পুরাতন Structure

```
/news-feed -> Market Prices + Agricultural News (একসাথে)
```

## নতুন Structure

```
/market-prices -> শুধু বাজারদর
/agricultural-news -> শুধু কৃষি সংবাদ
/news-feed -> অপরিবর্তিত (অন্যান্য ব্যবহারকারীদের জন্য)
```

## User Experience

- কৃষকরা এখন আলাদাভাবে বাজারদর এবং সংবাদ দেখতে পারবেন
- প্রতিটি পেজে specific content এবং features আছে
- Navigation আরো organized এবং user-friendly
- সব existing functionality intact আছে

## Technical Details

- দুটি নতুন route App.tsx এ যোগ করা হয়েছে
- FarmerDashboard এর menu items আপডেট করা হয়েছে
- Authentication এবং security বজায় রাখা হয়েছে
- Responsive design এবং accessibility support আছে
