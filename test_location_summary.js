// Test script for location summary
const sampleData = [
    {
        id: 1,
        farmerId: 1,
        farmerName: "মোহাম্মদ রহিম",
        farmerPhone: "01712345678",
        cropType: "ধান",
        landArea: "৫",
        landAreaUnit: "বিঘা",
        location: "গ্রাম: রামপুর",
        district: "ঢাকা",
        upazila: "সাভার",
        union: "বিরুলিয়া",
        submissionDate: "২৫/০৮/২০২৫",
        verificationStatus: "pending",
        estimatedYield: "৮০ মণ"
    },
    {
        id: 2,
        farmerId: 2,
        farmerName: "আবুল কাসেম",
        farmerPhone: "01812345678",
        cropType: "গম",
        landArea: "ৃ",
        landAreaUnit: "বিঘা",
        location: "গ্রাম: মিরপুর",
        district: "সিলেট",
        upazila: "সিলেট সদর",
        union: "খাদিমনগর",
        submissionDate: "২৬/০৮/২০২৫",
        verificationStatus: "pending",
        estimatedYield: "৪৫ মণ"
    }
];

function testLocationSummary() {
    const locationData = {};
    
    sampleData.forEach(crop => {
        const locationKey = `${crop.district}, ${crop.upazila}`;
        
        if (!locationData[locationKey]) {
            locationData[locationKey] = {
                district: crop.district,
                upazila: crop.upazila,
                union: crop.union || "সব ইউনিয়ন",
                totalCrops: 0,
                totalLandArea: 0,
                crops: {},
                verified: 0,
                pending: 0,
                rejected: 0,
                farmers: new Set()
            };
        }
        
        const location = locationData[locationKey];
        location.totalCrops++;
        location.totalLandArea += parseFloat(crop.landArea) || 0;
        location.farmers.add(crop.farmerName);
        location[crop.verificationStatus]++;
        
        if (!location.crops[crop.cropType]) {
            location.crops[crop.cropType] = {
                count: 0,
                totalArea: 0
            };
        }
        location.crops[crop.cropType].count++;
        location.crops[crop.cropType].totalArea += parseFloat(crop.landArea) || 0;
    });
    
    // Convert farmers Set to count
    Object.keys(locationData).forEach(location => {
        locationData[location].farmerCount = locationData[location].farmers.size;
        delete locationData[location].farmers;
    });
    
    console.log("Test Result:", Object.values(locationData));
    return Object.values(locationData);
}

testLocationSummary();
