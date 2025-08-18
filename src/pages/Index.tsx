import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import SocialFeed from "./SocialFeed";
import Marketplace from "./Marketplace";
import Diagnosis from "./Diagnosis";
import Recommendation from "./Recommendation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <SocialFeed />;
      case "marketplace":
        return <Marketplace />;
      case "diagnosis":
        return <Diagnosis />;
      case "recommendation":
        return <Recommendation />;
      case "chat":
        return (
          <div className="p-4 pb-20 text-center">
            <h2 className="text-xl font-bold mb-4">চ্যাট</h2>
            <p className="text-muted-foreground">শীঘ্রই আসছে...</p>
          </div>
        );
      default:
        return <SocialFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
