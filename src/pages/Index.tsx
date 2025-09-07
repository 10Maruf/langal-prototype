import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import FarmerDashboard from "./FarmerDashboard";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user type
    if (user) {
      switch (user.type) {
        case 'expert':
          navigate('/consultant-dashboard');
          break;
        case 'customer':
          navigate('/customer-dashboard');
          break;
        case 'farmer':
        default:
          // Farmers stay on the main dashboard
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <FarmerDashboard />
      </main>
    </div>
  );
};

export default Index;
