
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Upload, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorksheetGeneratorProps {
  onBack: () => void;
}

export const WorksheetGenerator = ({ onBack }: WorksheetGeneratorProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gradeLevel, setGradeLevel] = useState('3-5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorksheet, setGeneratedWorksheet] = useState('');
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "Image uploaded successfully",
        description: "Ready to generate differentiated worksheets"
      });
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: "Please upload an image",
        description: "Select a textbook page photo to continue",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const sampleWorksheet = `DIFFERENTIATED WORKSHEET - GRADES ${gradeLevel}

Based on your uploaded textbook page about "The Solar System"

🌟 GRADE 3 ACTIVITIES:
1. Color the planets in order from the Sun
2. Circle the biggest planet: Jupiter Mars Earth
3. Draw your favorite planet

🌟 GRADE 4 ACTIVITIES:
1. Fill in the blanks: The _____ is the center of our solar system
2. List 3 planets you can see from Earth
3. Match planets with their sizes (small/medium/large)

🌟 GRADE 5 ACTIVITIES:
1. Explain why planets orbit the Sun (2-3 sentences)
2. Compare Earth and Mars - similarities and differences
3. Research project: Choose one planet and write 5 facts

📝 ASSESSMENT RUBRIC:
Grade 3: Completion and effort (visual recognition)
Grade 4: Accuracy of facts and basic understanding
Grade 5: Depth of explanation and research quality

🎯 EXTENSION ACTIVITIES:
- Create a solar system mobile
- Act out planetary orbits in the classroom
- Design an alien for each planet`;

      setGeneratedWorksheet(sampleWorksheet);
      setIsGenerating(false);
      
      toast({
        title: "Worksheet Generated!",
        description: "Your differentiated worksheet is ready for all grade levels"
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
            <Camera className="h-5 w-5 text-orange-600" />
            Image-to-Differentiated Worksheet Generator
          </CardTitle>
          <CardDescription>
            Upload a textbook page photo and generate worksheets for multiple grade levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Upload Textbook Page
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {selectedFile ? selectedFile.name : "Click to upload textbook page photo"}
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Target Grade Levels
            </label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">Grades 1-3</SelectItem>
                <SelectItem value="3-5">Grades 3-5</SelectItem>
                <SelectItem value="5-8">Grades 5-8</SelectItem>
                <SelectItem value="mixed">Mixed (1-8)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !selectedFile}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Image & Generating Worksheets...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Generate Differentiated Worksheet
              </>
            )}
          </Button>

          {generatedWorksheet && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Generated Worksheet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                  {generatedWorksheet}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Download PDF</Button>
                  <Button variant="outline" size="sm">Print Worksheet</Button>
                  <Button variant="outline" size="sm">Save Template</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
