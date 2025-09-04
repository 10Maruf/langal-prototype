import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
          // Farmers get the new centralized dashboard
          break;
      }
    }
  }, [user, navigate]);

  // Show farmer dashboard for farmers and unauthenticated users
  return <FarmerDashboard />;
};

export default Index;
