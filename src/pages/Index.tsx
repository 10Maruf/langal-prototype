import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import SocialFeed from "./SocialFeed";
import Marketplace from "./Marketplace";
import Diagnosis from "./Diagnosis";
import Recommendation from "./Recommendation";
import Others from "./Others";

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
      case "others":
        return <Others />;
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
