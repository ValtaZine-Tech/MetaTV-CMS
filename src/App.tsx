import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Music from "./pages/Music";
import UploadMusic from "./pages/UploadMusic";
import Videos from "./pages/Videos";
import UploadVideo from "./pages/UploadVideo";
import Livestreams from "./pages/Livestreams";
import CreateStream from "./pages/CreateStream";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import Donations from "./pages/Donations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/music" element={<Music />} />
              <Route path="/music/upload" element={<UploadMusic />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos/upload" element={<UploadVideo />} />
              <Route path="/livestreams" element={<Livestreams />} />
              <Route path="/livestreams/create" element={<CreateStream />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;