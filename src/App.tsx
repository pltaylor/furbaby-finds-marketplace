import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PetDetails from "./pages/PetDetails";
import BreederDetails from "./pages/BreederDetails";
import BreederLogin from "./pages/BreederLogin";
import BreederAdmin from "./pages/BreederAdmin";
import CreateLitter from "./pages/CreateLitter";
import AddPet from "./pages/AddPet";
import BreederProfile from "./pages/BreederProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/breeder/:name" element={<BreederDetails />} />
          <Route path="/breeder-login" element={<BreederLogin />} />
          <Route path="/breeder-admin" element={<BreederAdmin />} />
          <Route path="/breeder-admin/create-litter" element={<CreateLitter />} />
          <Route path="/breeder-admin/add-pet" element={<AddPet />} />
          <Route path="/breeder-admin/profile" element={<BreederProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
