
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeSimplifierProps {
  onBack: () => void;
}

export const KnowledgeSimplifier = ({ onBack }: KnowledgeSimplifierProps) => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('english');
  const [gradeLevel, setGradeLevel] = useState('3-5');
  const [isProcessing, setIsProcessing] = useState(false);
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        description: "Ask any question you'd like me to simplify",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const sampleAnswer = `Question: "${question}"

🌟 SIMPLE EXPLANATION (Grade ${gradeLevel}):
The sky looks blue because of tiny particles in the air! 

Think of it like this - imagine sunlight is like a box of different colored crayons (red, orange, yellow, green, blue, purple). When sunlight hits the tiny dust and air particles in our sky, the blue "crayon" gets scattered everywhere, just like when you shake blue glitter in a jar of water!

🏠 LOCAL ANALOGY:
It's like when your mother makes tea with milk - the milk particles spread throughout the water and make it white. Similarly, blue light spreads throughout our sky!

🎯 KEY POINTS:
• Sunlight has many colors mixed together
• Air particles scatter blue light more than other colors
• That's why we see blue when we look up
• At sunrise/sunset, we see red/orange because light travels through more air

📚 RELATED CONCEPTS TO EXPLORE:
• Rainbow formation (light separation)
• Why sunsets are red/orange
• How our eyes see different colors

💡 CLASSROOM ACTIVITY:
Use a flashlight and a glass of milky water to show how particles scatter light!`;

      setAnswer(sampleAnswer);
      setIsProcessing(false);
      
      toast({
        title: "Question Answered!",
        description: "Simple explanation with local analogies ready"
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
            <MessageCircle className="h-5 w-5 text-green-600" />
            Instant Knowledge Simplifier
          </CardTitle>
          <CardDescription>
            Get simple, culturally relevant explanations for complex questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Response Language
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
                Student Grade Level
              </label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">Grades 1-3</SelectItem>
                  <SelectItem value="3-5">Grades 3-5</SelectItem>
                  <SelectItem value="5-8">Grades 5-8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Student Question
            </label>
            <Textarea
              placeholder="Example: Why is the sky blue? / पानी क्यों गिरता है? / நிலா ஏன் வடிவம் மாறுகிறது?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleAskQuestion} 
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-green-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Simple Explanation...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Get Simple Answer
              </>
            )}
          </Button>

          {answer && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Simplified Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {answer}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Copy to Clipboard</Button>
                  <Button variant="outline" size="sm">Save Answer</Button>
                  <Button variant="outline" size="sm">Ask Follow-up</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
