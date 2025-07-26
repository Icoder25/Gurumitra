
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Camera, 
  MessageCircle, 
  PenTool, 
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: FileText,
    title: "StoryCrafter",
    description: "Generate culturally relevant stories, examples, and content in your local language with voice and text input support",
    example: "Create a story in Marathi about farmers explaining soil types",
    color: "from-blue-500 to-blue-600",
    route: "/content-generator"
  },
  {
    icon: Camera,
    title: "Snap2Sheet",
    description: "Upload textbook photos and instantly create differentiated worksheets for multiple grades with voice instructions",
    example: "Convert any textbook page into grade-appropriate activities",
    color: "from-orange-500 to-orange-600",
    route: "/worksheet-generator"
  },
  {
    icon: MessageCircle,
    title: "GyaanGenie",
    description: "Voice/Text Q&A system providing simple explanations with local analogies and voice responses",
    example: "Ask 'Why is the sky blue?' via voice or text, get spoken explanation",
    color: "from-green-500 to-green-600",
    route: "/knowledge-simplifier"
  },
  {
    icon: PenTool,
    title: "DiagramGen",
    description: "AI sketch and blackboard diagram support with voice-guided creation for easy classroom reproduction",
    example: "Generate water cycle diagrams, plant structures, maps via voice commands",
    color: "from-purple-500 to-purple-600",
    route: "/visual-aid-generator"
  },
  {
    icon: UserCheck,
    title: "Smart Evaluator",
    description: "Assess student progress with YouTube suggestions and AI-generated study materials, all with voice support",
    example: "Generate personalized remedial content with YouTube video recommendations",
    color: "from-pink-500 to-pink-600",
    route: "/student-evaluator"
  }
];

export const FeatureCards = () => {
  const navigate = useNavigate();

  const handleFeatureSelect = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Teach Effectively
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI tools with voice support designed specifically for multi-grade classrooms and resource-constrained environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 italic">
                    Example: {feature.example}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full group/btn"
                  onClick={() => handleFeatureSelect(feature.route)}
                >
                  Try Now
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
