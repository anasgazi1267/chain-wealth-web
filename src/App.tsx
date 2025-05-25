
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WalletContextProvider from "./providers/WalletProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Stake from "./pages/Stake";
import Validators from "./pages/Validators";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletContextProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stake" element={
              <ProtectedRoute>
                <Stake />
              </ProtectedRoute>
            } />
            <Route path="/validators" element={
              <ProtectedRoute>
                <Validators />
              </ProtectedRoute>
            } />
            <Route path="/rewards" element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            } />
            {/* Redirect old auth route to home */}
            <Route path="/auth" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletContextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
