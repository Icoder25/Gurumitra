
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Loader2, 
  CheckCircle, 
  Languages,
  Camera,
  MessageCircle,
  UserCheck,
  PenTool
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WorksheetGenerator } from '@/components/WorksheetGenerator';
import { KnowledgeSimplifier } from '@/components/KnowledgeSimplifier';
import { VisualAidGenerator } from '@/components/VisualAidGenerator';
import { StudentEvaluator } from '@/components/StudentEvaluator';

export const QuickActions = () => {
  const [request, setRequest] = useState('');
  const [language, setLanguage] = useState('english');
  const [subject, setSubject] = useState('science');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!request.trim()) {
      toast({
        title: "Please enter a request",
        description: "Describe what content you'd like me to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const sampleContent = `Here's a ${language} story about farmers and soil types:

In a small village in Maharashtra, farmer Ravi noticed that his crops grew differently in various parts of his field. In one corner, the black soil was rich and perfect for cotton - it held water well like a sponge. In another area, the red soil was good for vegetables but needed more water. The sandy soil near the river was great for watermelons because water drained quickly.

Just like how we use different containers for different things at home - steel for water, clay for curd - different soils are perfect for different crops!

Teaching Points:
• Black soil (काळी माती) - Good for cotton, holds water
• Red soil (लाल माती) - Good for vegetables, needs irrigation  
• Sandy soil (वाळूची माती) - Good drainage, perfect for fruits

Classroom Activities:
1. Soil sample collection from school grounds
2. Water absorption tests with different soil types
3. Seed growth experiments in various soils
4. Create soil types chart for classroom wall

Study Materials:
- Worksheets based on student performance levels
- Visual soil comparison charts
- Local farming examples and case studies
- Hands-on experiments with classroom materials`;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: "Your localized teaching content is ready",
      });
    }, 2000);
  };

  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(feature);
  };

  const handleBackToMain = () => {
    setActiveFeature(null);
  };

  // Render individual feature components
  if (activeFeature === 'worksheet-generator') {
    return <WorksheetGenerator onBack={handleBackToMain} />;
  }
  
  if (activeFeature === 'knowledge-simplifier') {
    return <KnowledgeSimplifier onBack={handleBackToMain} />;
  }
  
  if (activeFeature === 'visual-aid-generator') {
    return <VisualAidGenerator onBack={handleBackToMain} />;
  }
  
  if (activeFeature === 'student-evaluator') {
    return <StudentEvaluator onBack={handleBackToMain} />;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Try Sahayak Now
          </h3>
          <p className="text-lg text-gray-600">
            Generate your first piece of localized educational content
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-blue-600" />
              Hyper-Local Content Generator
            </CardTitle>
            <CardDescription>
              Describe the content you need, and I'll create culturally relevant, grade-appropriate material
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Subject
                </label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="social_studies">Social Studies</SelectItem>
                    <SelectItem value="language">Language Arts</SelectItem>
                    <SelectItem value="environmental">Environmental Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Content Request
              </label>
              <Textarea
                placeholder="Example: Create a story about farmers to explain different soil types for grades 3-5"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50" onClick={() => setRequest("Create a story about water cycle for rural students")}>
                Water Cycle Story
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50" onClick={() => setRequest("Explain fractions using local food examples")}>
                Fractions with Food
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50" onClick={() => setRequest("Make a poem about numbers in Hindi")}>
                Numbers Poem
              </Badge>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedContent && (
          <Card className="animate-fade-in mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Generated Content
              </CardTitle>
              <CardDescription>
                Your localized educational content is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                {generatedContent}
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button variant="outline" size="sm">
                  Copy Content
                </Button>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  Share with Colleagues
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleFeatureSelect('worksheet-generator')}>
            <Camera className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Image-to-Worksheet</h4>
            <p className="text-sm text-gray-600">
              Upload textbook photos to create differentiated worksheets
            </p>
            <Button variant="ghost" className="mt-3" size="sm">
              Try Now
            </Button>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleFeatureSelect('knowledge-simplifier')}>
            <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Knowledge Simplifier</h4>
            <p className="text-sm text-gray-600">
              Get simple explanations for complex questions
            </p>
            <Button variant="ghost" className="mt-3" size="sm">
              Try Now
            </Button>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleFeatureSelect('visual-aid-generator')}>
            <PenTool className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Visual Aid Generator</h4>
            <p className="text-sm text-gray-600">
              Create blackboard diagrams and visual aids
            </p>
            <Button variant="ghost" className="mt-3" size="sm">
              Try Now
            </Button>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleFeatureSelect('student-evaluator')}>
            <UserCheck className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Student Evaluator</h4>
            <p className="text-sm text-gray-600">
              Personalized assessment with YouTube suggestions
            </p>
            <Button variant="ghost" className="mt-3" size="sm">
              Try Now
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
