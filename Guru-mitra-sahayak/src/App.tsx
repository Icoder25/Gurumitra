
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
import ContentGenerator from "./pages/ContentGenerator";
import WorksheetGenerator from "./pages/WorksheetGenerator";
import KnowledgeSimplifier from "./pages/KnowledgeSimplifier";
import VisualAidGenerator from "./pages/VisualAidGenerator";
import StudentEvaluator from "./pages/StudentEvaluator";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/content-generator" element={<ContentGenerator />} />
          <Route path="/worksheet-generator" element={<WorksheetGenerator />} />
          <Route path="/knowledge-simplifier" element={<KnowledgeSimplifier />} />
          <Route path="/visual-aid-generator" element={<VisualAidGenerator />} />
          <Route path="/student-evaluator" element={<StudentEvaluator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
