
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { DashboardProvider } from "./context/dashboardContext";
import { ThemeProvider } from "./context/themeContext";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Servers from "./pages/Servers";
import Attendance from "./pages/Attendance";
import Credentials from "./pages/Credentials";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <DashboardProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/servers" element={<Servers />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/credentials" element={<Credentials />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
