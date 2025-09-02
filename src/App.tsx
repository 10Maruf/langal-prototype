import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SocialFeed from "./pages/SocialFeed";
import Marketplace from "./pages/Marketplace";
import Diagnosis from "./pages/Diagnosis";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpertDashboard from "./pages/ExpertDashboard";
import ExpertProfile from "./pages/ExpertProfile";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import ConsultantProfile from "./pages/ConsultantProfile";
import DataOperatorDashboard from "./pages/DataOperatorDashboard";
import DataOperatorHome from "./pages/DataOperatorHome";
import DataOperatorProfileVerification from "./pages/DataOperatorProfileVerification";
import DataOperatorCropVerification from "./pages/DataOperatorCropVerification";
import DataOperatorRegisterFarmer from "./pages/DataOperatorRegisterFarmer";
import DataOperatorFieldData from "./pages/DataOperatorFieldData";
import DataOperatorReports from "./pages/DataOperatorReports";
import DataOperatorStatistics from "./pages/DataOperatorStatistics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <SocialFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/diagnosis"
              element={
                <ProtectedRoute>
                  <Diagnosis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expert-dashboard"
              element={
                <ProtectedRoute>
                  <ExpertDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expert-profile"
              element={
                <ProtectedRoute>
                  <ExpertProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-profile"
              element={
                <ProtectedRoute>
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultant-dashboard"
              element={
                <ProtectedRoute>
                  <ConsultantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultant-profile"
              element={
                <ProtectedRoute>
                  <ConsultantProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-operator"
              element={<DataOperatorHome />}
            />
            <Route
              path="/data-operator/dashboard"
              element={<DataOperatorDashboard />}
            />
            <Route
              path="/data-operator/profile-verification"
              element={<DataOperatorProfileVerification />}
            />
            <Route
              path="/data-operator/crop-verification"
              element={<DataOperatorCropVerification />}
            />
            <Route
              path="/data-operator/register-farmer"
              element={<DataOperatorRegisterFarmer />}
            />
            <Route
              path="/data-operator/field-data"
              element={<DataOperatorFieldData />}
            />
            <Route
              path="/data-operator/reports"
              element={<DataOperatorReports />}
            />
            <Route
              path="/data-operator/statistics"
              element={<DataOperatorStatistics />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
