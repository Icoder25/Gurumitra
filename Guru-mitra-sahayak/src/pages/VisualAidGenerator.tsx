
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Palette, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const VisualAidGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('marathi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what visual aid you need in regional language",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      // Simulate AI image generation
      setGeneratedImage('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop');
      setIsGenerating(false);
      
      toast({
        title: "Visual Aid Generated!",
        description: "AI-generated image with labels ready"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">DiagramGen</CardTitle>
            <CardDescription>
              Generate AI-powered images with labels in your regional language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Language for Labels
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Describe Visual Aid (Regional Language)
              </label>
              <Textarea
                placeholder="उदाहरण: पाण्याच्या चक्राचे चित्र बनवा ज्यात ढग, पाऊस, नदी आणि समुद्र दाखवा / Create water cycle diagram showing clouds, rain, river and ocean"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating AI Image...
                </>
              ) : (
                <>
                  <Palette className="h-4 w-4 mr-2" />
                  Generate Visual Aid
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedImage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <CheckCircle className="h-5 w-5" />
                AI-Generated Visual Aid
              </CardTitle>
              <CardDescription>
                Image with regional language labels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img 
                  src={generatedImage} 
                  alt="Generated visual aid" 
                  className="w-full rounded-lg shadow-lg"
                />
                {/* Sample labels */}
                <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
                  ढग (Cloud)
                </div>
                <div className="absolute top-1/2 right-4 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
                  पाऊस (Rain)
                </div>
                <div className="absolute bottom-4 left-1/3 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
                  नदी (River)
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Download Image</Button>
                <Button variant="outline" size="sm">Print for Classroom</Button>
                <Button variant="outline" size="sm">Generate More</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VisualAidGenerator;
