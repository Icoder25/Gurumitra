
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, Palette, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VisualAidGeneratorProps {
  onBack: () => void;
}

export const VisualAidGenerator = ({ onBack }: VisualAidGeneratorProps) => {
  const [description, setDescription] = useState('');
  const [diagramType, setDiagramType] = useState('concept');
  const [complexity, setComplexity] = useState('simple');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAid, setGeneratedAid] = useState('');
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: "Please describe what you need",
        description: "Tell me what visual aid you'd like me to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleAid = `🎨 VISUAL AID GENERATED: "${description}"

📋 BLACKBOARD DRAWING INSTRUCTIONS:

STEP 1: Draw the main structure
• Draw a large circle in the center (represents Earth)
• Add wavy lines above for "atmosphere"
• Draw the sun in top-left corner with rays

STEP 2: Add the water cycle elements
• Cloud at top-right: Draw fluffy cloud shape with cotton-like edges
• Rain drops: Draw 5-6 teardrop shapes falling from cloud
• River: Draw wavy line from bottom-left to right side of Earth
• Mountains: Draw 2-3 triangle shapes on left side

STEP 3: Add arrows and labels
• Arrow 1: From river to cloud (labeled "EVAPORATION")
• Arrow 2: From cloud to rain (labeled "CONDENSATION") 
• Arrow 3: From rain to river (labeled "PRECIPITATION")
• Arrow 4: Curved arrow showing cycle continues

📝 SIMPLE TEXT LABELS TO WRITE:
1. "SUN" - next to sun drawing
2. "EVAPORATION" - water goes up
3. "CLOUD FORMATION" - water becomes cloud
4. "RAIN" - water falls down
5. "COLLECTION" - water gathers

🎯 TEACHING TIPS:
• Use different colored chalk for each step
• Point to each part while explaining
• Have students trace the arrows with their finger
• Use hand gestures to show water movement

📐 BLACKBOARD SPACE NEEDED:
• Full blackboard width recommended
• Height: About 3/4 of blackboard
• Keep labels large enough for back row to read

🌟 STUDENT ACTIVITY:
Have students draw their own mini version in notebooks while you draw on blackboard!`;

      setGeneratedAid(sampleAid);
      setIsGenerating(false);
      
      toast({
        title: "Visual Aid Generated!",
        description: "Step-by-step blackboard drawing instructions ready"
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Features
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-purple-600" />
            Visual Aid Generator
          </CardTitle>
          <CardDescription>
            Generate blackboard diagrams and visual aids with step-by-step drawing instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Diagram Type
              </label>
              <Select value={diagramType} onValueChange={setDiagramType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concept">Concept Diagram</SelectItem>
                  <SelectItem value="process">Process Flow</SelectItem>
                  <SelectItem value="structure">Structure/Anatomy</SelectItem>
                  <SelectItem value="map">Maps & Geography</SelectItem>
                  <SelectItem value="timeline">Timeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Complexity Level
              </label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple (Primary)</SelectItem>
                  <SelectItem value="moderate">Moderate (Middle)</SelectItem>
                  <SelectItem value="detailed">Detailed (Upper)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Describe the Visual Aid
            </label>
            <Textarea
              placeholder="Example: Water cycle diagram showing evaporation, condensation, and precipitation for grade 4 students"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                Creating Visual Aid Instructions...
              </>
            ) : (
              <>
                <Palette className="h-4 w-4 mr-2" />
                Generate Visual Aid
              </>
            )}
          </Button>

          {generatedAid && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-5 w-5" />
                  Visual Aid Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {generatedAid}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Print Instructions</Button>
                  <Button variant="outline" size="sm">Save Template</Button>
                  <Button variant="outline" size="sm">Create Handout</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
