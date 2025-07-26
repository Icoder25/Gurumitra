
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const WorksheetGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheets, setWorksheets] = useState<{[key: string]: string}>({});

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File uploaded successfully",
        description: "Ready to generate differentiated worksheets"
      });
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: "Please upload a file",
        description: "Select an image or PDF to continue",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleWorksheets = {
        beginner: `BEGINNER LEVEL WORKSHEET - Solar System

📚 DEFINITIONS:
1. Solar System: _________________
2. Planet: _____________________
3. Sun: _______________________
4. Moon: ______________________

🔗 MATCH THE FOLLOWING:
A. Earth          1. Biggest planet
B. Jupiter        2. Our home planet  
C. Sun           3. Earth's satellite
D. Moon          4. Center of solar system

✅ CIRCLE THE CORRECT ANSWER:
- How many planets are there? (7, 8, 9)
- What is at the center? (Moon, Sun, Earth)`,

        intermediate: `INTERMEDIATE LEVEL WORKSHEET - Solar System

📝 MULTIPLE CHOICE QUESTIONS:
1. Which planet is closest to the Sun?
   a) Venus  b) Mercury  c) Earth  d) Mars

2. What causes day and night on Earth?
   a) Moon's rotation  b) Earth's rotation  c) Sun's movement

📖 FILL IN THE BLANKS:
1. The _______ is the center of our solar system.
2. Earth takes _______ days to orbit the Sun.
3. The largest planet is _______.
4. _______ is known as the Red Planet.`,

        advanced: `ADVANCED LEVEL WORKSHEET - Solar System

🤔 HIGHER ORDER THINKING SKILLS (HOTS):
1. Why do you think life exists on Earth but not on other planets? Explain with 3 reasons.

2. If you were to design a new planet, what features would it need to support life?

3. Compare and contrast Earth and Mars. Create a Venn diagram.

📝 SHORT ANSWERS:
1. Explain the difference between rotation and revolution. (3-4 sentences)
2. Why do planets stay in their orbits around the Sun?
3. How would life on Earth change if there was no Moon?`
      };
      
      setWorksheets(sampleWorksheets);
      setIsGenerating(false);
      
      toast({
        title: "Worksheets Generated!",
        description: "Three difficulty levels created successfully"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Snap2Sheet</CardTitle>
            <CardDescription>
              Upload content and get worksheets for Beginner, Intermediate, and Advanced levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Upload Image or PDF
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {selectedFile ? selectedFile.name : "Click to upload image or PDF"}
                  </p>
                </label>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !selectedFile}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Differentiated Worksheets...
                </>
              ) : (
                "Generate Worksheets for All Levels"
              )}
            </Button>
          </CardContent>
        </Card>

        {Object.keys(worksheets).length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Generated Worksheets
            </h3>
            
            {Object.entries(worksheets).map(([level, content]) => (
              <Card key={level}>
                <CardHeader>
                  <CardTitle className="capitalize text-lg">
                    {level} Level
                    {level === 'beginner' && ' - Definitions, Match-the-following'}
                    {level === 'intermediate' && ' - MCQs, Fill-in-the-blanks'}
                    {level === 'advanced' && ' - HOTS, Short Answers'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                    {content}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Download PDF</Button>
                    <Button variant="outline" size="sm">Print</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksheetGenerator;
