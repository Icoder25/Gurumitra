
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ContentGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('english');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<Array<{title: string, content: string}>>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the story or content you'd like to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleStoryboard = [
        {
          title: "Slide 1: Introduction",
          content: "Meet Ravi, a farmer in Maharashtra who grows different crops in his field."
        },
        {
          title: "Slide 2: The Problem",
          content: "Ravi notices his crops grow differently in various parts of his field."
        },
        {
          title: "Slide 3: Black Soil Discovery",
          content: "In one corner, the black soil holds water well - perfect for cotton!"
        },
        {
          title: "Slide 4: Red Soil Area",
          content: "The red soil area needs more water but grows excellent vegetables."
        },
        {
          title: "Slide 5: Sandy Soil Benefits",
          content: "Near the river, sandy soil drains quickly - ideal for watermelons."
        },
        {
          title: "Slide 6: Local Analogy",
          content: "Just like we use different containers at home - steel for water, clay for curd."
        },
        {
          title: "Slide 7: Learning Points",
          content: "Different soils have different properties and uses."
        },
        {
          title: "Slide 8: Classroom Activity",
          content: "Students collect soil samples and test water absorption."
        },
        {
          title: "Slide 9: Conclusion",
          content: "Understanding soil helps farmers choose the right crops!"
        }
      ];
      
      setStoryboard(sampleStoryboard);
      setIsGenerating(false);
      
      toast({
        title: "Storyboard Generated!",
        description: "Your interactive story slides are ready"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">StoryCrafter</CardTitle>
            <CardDescription>
              Create culturally relevant stories and content with interactive storyboard slides
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                Content Prompt
              </label>
              <Textarea
                placeholder="Example: Create a story about farmers to explain different soil types for rural students in Maharashtra"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Storyboard...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate Story Slides
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {storyboard.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Generated Storyboard
              </CardTitle>
              <CardDescription>
                Interactive story slides ready for classroom presentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storyboard.map((slide, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <h4 className="font-semibold text-sm text-blue-600 mb-2">
                      {slide.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {slide.content}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline">Download as PDF</Button>
                <Button variant="outline">Export to PowerPoint</Button>
                <Button variant="outline">Share Storyboard</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;
