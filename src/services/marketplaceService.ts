// Central Marketplace Service - Similar to socialFeedService

import { MarketplaceListing, ListingAuthor, ListingFilter } from "@/types/marketplace";

// Import marketplace images
import powerTillerImg from "@/assets/marketplace/power tiller.png";
import riceSeedImg from "@/assets/marketplace/rice seed.png";
import ureaFertilizerImg from "@/assets/marketplace/urea-fertilizer.png";
import ureaImg from "@/assets/marketplace/Urea.png";
import wheatGrainsImg from "@/assets/marketplace/wheat grains.png";
import harvesterImg from "@/assets/marketplace/harvester.png";
import tractorImg from "@/assets/marketplace/tractor.png";
import pumpImg from "@/assets/marketplace/pump.png";
import compostImg from "@/assets/marketplace/compost.png";
import potatoImg from "@/assets/marketplace/potato.png";

class MarketplaceService {
    private listings: MarketplaceListing[] = [];
    private initialized = false;

    initializeDummyData() {
        if (this.initialized) return;

        this.listings = [
            {
                id: "1",
                author: {
                    name: "করিম মিয়া",
                    avatar: "/placeholder.svg",
                    location: "নোয়াখালী",
                    verified: true,
                    rating: 4.8,
                    userType: "farmer"
                },
                title: "পাওয়ার টিলার (ভাল অবস্থায়)",
                description: "৮ হর্স পাওয়ার পাওয়ার টিলার। চলমান অবস্থায় আছে। খুব কম ব্যবহার হয়েছে। যেকোনো ধরনের চাষাবাদের জন্য উপযুক্ত।",
                price: 1500,
                currency: "BDT",
                category: "machinery",
                type: "rent",
                status: "active",
                images: [powerTillerImg],
                tags: ["পাওয়ার টিলার", "ভাড়া", "চাষাবাদ"],
                location: "নোয়াখালী",
                contactInfo: {
                    phone: "01712-345678"
                },
                createdAt: "2024-01-15T10:00:00Z",
                updatedAt: "2024-01-15T10:00:00Z",
                featured: true,
                views: 45,
                saves: 12,
                contacts: 8
            },
            {
                id: "2",
                author: {
                    name: "রহিম উদ্দিন",
                    avatar: "/placeholder.svg",
                    location: "কুমিল্লা",
                    verified: false,
                    rating: 4.5,
                    userType: "farmer"
                },
                title: "তাজা ধান বিক্রয়",
                description: "এই বছরের নতুন ধান। ভাল মানের BRRI-28 জাত। প্রতি কেজি ২৮ টাকা।",
                price: 28,
                currency: "BDT",
                category: "crops",
                type: "sell",
                status: "active",
                images: [riceSeedImg],
                tags: ["ধান", "BRRI-28", "নতুন"],
                location: "কুমিল্লা",
                contactInfo: {
                    phone: "01812-567890"
                },
                createdAt: "2024-01-14T14:30:00Z",
                updatedAt: "2024-01-14T14:30:00Z",
                views: 32,
                saves: 7,
                contacts: 15
            },
            {
                id: "3",
                author: {
                    name: "আবদুল কাদের",
                    avatar: "/placeholder.svg",
                    location: "ফেনী",
                    verified: true,
                    rating: 4.9,
                    userType: "farmer"
                },
                title: "ইউরিয়া সার (৫০ কেজি)",
                description: "সরকারি দোকান থেকে কেনা ইউরিয়া সার। অতিরিক্ত পড়ে গেছে তাই বিক্রি করছি।",
                price: 950,
                currency: "BDT",
                category: "fertilizer",
                type: "sell",
                status: "active",
                images: [ureaFertilizerImg],
                tags: ["ইউরিয়া", "সার", "৫০কেজি"],
                location: "ফেনী",
                contactInfo: {
                    phone: "01912-345678"
                },
                createdAt: "2024-01-13T09:15:00Z",
                updatedAt: "2024-01-13T09:15:00Z",
                views: 28,
                saves: 5,
                contacts: 12
            },
            {
                id: "4",
                author: {
                    name: "নুরুল ইসলাম",
                    avatar: "/placeholder.svg",
                    location: "রাজশাহী",
                    verified: true,
                    rating: 4.7,
                    userType: "farmer"
                },
                title: "গমের বীজ (উন্নত জাত)",
                description: "BARI গম-৩০ জাত। অংকুরোদগম হার ৯৫%+। সম্পূর্ণ বিশুদ্ধ বীজ।",
                price: 45,
                currency: "BDT",
                category: "seeds",
                type: "sell",
                status: "active",
                images: [wheatGrainsImg],
                tags: ["গম", "বীজ", "BARI-30"],
                location: "রাজশাহী",
                contactInfo: {
                    phone: "01712-987654"
                },
                createdAt: "2024-01-12T16:45:00Z",
                updatedAt: "2024-01-12T16:45:00Z",
                views: 38,
                saves: 9,
                contacts: 6
            },
            {
                id: "5",
                author: {
                    name: "আকবর আলী",
                    avatar: "/placeholder.svg",
                    location: "বগুড়া",
                    verified: true,
                    rating: 4.6,
                    userType: "farmer"
                },
                title: "হার্ভেস্টার মেশিন ভাড়া",
                description: "দ্রুত ধান কাটার জন্য হার্ভেস্টার মেশিন। অভিজ্ঞ অপারেটর সহ।",
                price: 3500,
                currency: "BDT",
                category: "machinery",
                type: "rent",
                status: "active",
                images: [harvesterImg],
                tags: ["হার্ভেস্টার", "ধান কাটা", "ভাড়া"],
                location: "বগুড়া",
                contactInfo: {
                    phone: "01612-345678"
                },
                createdAt: "2024-01-11T11:20:00Z",
                updatedAt: "2024-01-11T11:20:00Z",
                views: 52,
                saves: 18,
                contacts: 22
            },
            {
                id: "6",
                author: {
                    name: "শফিক উল্লাহ",
                    avatar: "/placeholder.svg",
                    location: "যশোর",
                    verified: true,
                    rating: 4.9,
                    userType: "farmer"
                },
                title: "ট্রাক্টর ভাড়া (৭৫ এইচপি)",
                description: "মাহিন্দ্রা ট্রাক্টর ৭৫ এইচপি। চাষাবাদ, পরিবহন সব কাজের জন্য উপযুক্ত। অভিজ্ঞ চালক সহ।",
                price: 2800,
                currency: "BDT",
                category: "machinery",
                type: "rent",
                status: "active",
                images: [tractorImg],
                tags: ["ট্রাক্টর", "৭৫এইচপি", "ভাড়া", "চাষাবাদ"],
                location: "যশোর",
                contactInfo: {
                    phone: "01715-456789"
                },
                createdAt: "2024-01-10T08:30:00Z",
                updatedAt: "2024-01-10T08:30:00Z",
                views: 67,
                saves: 23,
                contacts: 31
            },
            {
                id: "7",
                author: {
                    name: "রফিকুল ইসলাম",
                    avatar: "/placeholder.svg",
                    location: "রংপুর",
                    verified: false,
                    rating: 4.4,
                    userType: "farmer"
                },
                title: "সাবমার্সিবল পাম্প বিক্রয়",
                description: "৩ ইঞ্চি সাবমার্সিবল পাম্প। ১ বছরের ওয়ারেন্টি সহ। ১০০ ফুট পর্যন্ত পানি তুলতে পারে।",
                price: 8500,
                currency: "BDT",
                category: "machinery",
                type: "sell",
                status: "active",
                images: [pumpImg],
                tags: ["পাম্প", "সাবমার্সিবল", "সেচ"],
                location: "রংপুর",
                contactInfo: {
                    phone: "01818-765432"
                },
                createdAt: "2024-01-09T15:45:00Z",
                updatedAt: "2024-01-09T15:45:00Z",
                views: 34,
                saves: 11,
                contacts: 9
            },
            {
                id: "8",
                author: {
                    name: "হাবিবুর রহমান",
                    avatar: "/placeholder.svg",
                    location: "সিলেট",
                    verified: true,
                    rating: 4.7,
                    userType: "farmer"
                },
                title: "জৈব কম্পোস্ট সার",
                description: "গোবর ও খড় দিয়ে তৈরি জৈব কম্পোস্ট। সম্পূর্ণ প্রাকৃতিক। মাটির উর্বরতা বৃদ্ধি করে।",
                price: 15,
                currency: "BDT",
                category: "fertilizer",
                type: "sell",
                status: "active",
                images: [compostImg],
                tags: ["কম্পোস্ট", "জৈব সার", "প্রাকৃতিক"],
                location: "সিলেট",
                contactInfo: {
                    phone: "01912-654321"
                },
                createdAt: "2024-01-08T12:15:00Z",
                updatedAt: "2024-01-08T12:15:00Z",
                views: 29,
                saves: 8,
                contacts: 14
            },
            {
                id: "9",
                author: {
                    name: "আলমগীর হোসেন",
                    avatar: "/placeholder.svg",
                    location: "বরিশাল",
                    verified: true,
                    rating: 4.6,
                    userType: "farmer"
                },
                title: "তাজা আলু বিক্রয়",
                description: "দেশী জাতের আলু। এই সপ্তাহে তোলা। প্রতি কেজি ২৫ টাকা। পাইকারি দরেও পাওয়া যাবে।",
                price: 25,
                currency: "BDT",
                category: "crops",
                type: "sell",
                status: "active",
                images: [potatoImg],
                tags: ["আলু", "তাজা", "দেশী"],
                location: "বরিশাল",
                contactInfo: {
                    phone: "01612-987654"
                },
                createdAt: "2024-01-07T10:00:00Z",
                updatedAt: "2024-01-07T10:00:00Z",
                views: 41,
                saves: 16,
                contacts: 28
            },
            {
                id: "10",
                author: {
                    name: "মোস্তফা কামাল",
                    avatar: "/placeholder.svg",
                    location: "কুষ্টিয়া",
                    verified: false,
                    rating: 4.5,
                    userType: "farmer"
                },
                title: "ইউরিয়া সার (২৫ কেজি ব্যাগ)",
                description: "ব্র্যান্ডেড ইউরিয়া সার। নতুন স্টক। ফসলের জন্য অত্যন্ত কার্যকর। ছোট চাষিদের জন্য সুবিধাজনক প্যাকেট।",
                price: 480,
                currency: "BDT",
                category: "fertilizer",
                type: "sell",
                status: "active",
                images: [ureaImg],
                tags: ["ইউরিয়া", "সার", "২৫কেজি", "ব্র্যান্ডেড"],
                location: "কুষ্টিয়া",
                contactInfo: {
                    phone: "01715-123456"
                },
                createdAt: "2024-01-06T14:20:00Z",
                updatedAt: "2024-01-06T14:20:00Z",
                views: 33,
                saves: 7,
                contacts: 11
            }
        ];

        this.initialized = true;
    }

    // Get listings with optional filtering
    getListings(filter?: Partial<ListingFilter>, userType?: string): MarketplaceListing[] {
        if (!this.initialized) {
            this.initializeDummyData();
        }

        let filtered = [...this.listings];

        if (filter) {
            // Filter by search
            if (filter.search) {
                filtered = filtered.filter(listing =>
                    listing.title.toLowerCase().includes(filter.search!.toLowerCase()) ||
                    listing.description.toLowerCase().includes(filter.search!.toLowerCase()) ||
                    listing.tags.some(tag => tag.toLowerCase().includes(filter.search!.toLowerCase()))
                );
            }

            // Filter by category
            if (filter.category && filter.category !== "all") {
                filtered = filtered.filter(listing => listing.category === filter.category);
            }

            // Filter by type
            if (filter.type && filter.type !== "all") {
                filtered = filtered.filter(listing => listing.type === filter.type);
            }

            // Filter by location
            if (filter.location && filter.location !== "all") {
                filtered = filtered.filter(listing => 
                    listing.location.includes(filter.location!) ||
                    listing.author.location.includes(filter.location!)
                );
            }

            // Filter by status (for personal listings)
            if (filter.status && filter.status !== "all") {
                filtered = filtered.filter(listing => listing.status === filter.status);
            }

            // Sort listings
            if (filter.sortBy) {
                switch (filter.sortBy) {
                    case "newest":
                        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                        break;
                    case "oldest":
                        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                        break;
                    case "price_low":
                        filtered.sort((a, b) => a.price - b.price);
                        break;
                    case "price_high":
                        filtered.sort((a, b) => b.price - a.price);
                        break;
                    case "popular":
                        filtered.sort((a, b) => b.views - a.views);
                        break;
                }
            }
        }

        return filtered;
    }

    // Get user's listings
    getUserListings(userName: string): MarketplaceListing[] {
        return this.listings
            .filter(listing => listing.author.name === userName)
            .map(listing => ({ ...listing, isOwnListing: true }));
    }

    // Create new listing
    createListing(listingData: any, author: ListingAuthor): MarketplaceListing {
        const newListing: MarketplaceListing = {
            id: Date.now().toString(),
            author,
            title: listingData.title,
            description: listingData.description,
            price: listingData.price,
            currency: listingData.currency || "BDT",
            category: listingData.category,
            type: listingData.type,
            status: "active",
            images: listingData.images || [],
            tags: listingData.tags || [],
            location: listingData.location || author.location,
            contactInfo: listingData.contactInfo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            featured: false,
            views: 0,
            saves: 0,
            contacts: 0,
            isOwnListing: true
        };

        this.listings.unshift(newListing);
        return newListing;
    }

    // Update listing
    updateListing(listingId: string, updates: Partial<MarketplaceListing>, userName: string): MarketplaceListing | null {
        const listingIndex = this.listings.findIndex(l => l.id === listingId);
        if (listingIndex === -1) return null;

        const listing = this.listings[listingIndex];
        if (listing.author.name !== userName) return null;

        const updatedListing = {
            ...listing,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.listings[listingIndex] = updatedListing;
        return updatedListing;
    }

    // Delete listing
    deleteListing(listingId: string, userName: string): boolean {
        const listingIndex = this.listings.findIndex(l => l.id === listingId);
        if (listingIndex === -1) return false;

        const listing = this.listings[listingIndex];
        if (listing.author.name !== userName) return false;

        this.listings.splice(listingIndex, 1);
        return true;
    }

    // Contact seller (increment contact count)
    contactSeller(listingId: string): MarketplaceListing | null {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return null;

        listing.contacts += 1;
        return listing;
    }

    // Save/unsave listing
    toggleSave(listingId: string): MarketplaceListing | null {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return null;

        listing.saves += 1;
        return listing;
    }

    // Increment view count
    incrementViews(listingId: string): void {
        const listing = this.listings.find(l => l.id === listingId);
        if (listing) {
            listing.views += 1;
        }
    }

    // Get single listing
    getListing(listingId: string): MarketplaceListing | null {
        return this.listings.find(l => l.id === listingId) || null;
    }
}

export const marketplaceService = new MarketplaceService();