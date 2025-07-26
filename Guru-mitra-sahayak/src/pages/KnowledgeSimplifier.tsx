import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MessageCircle, Loader2, CheckCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const KnowledgeSimplifier = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('marathi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        description: "Ask any question in your regional language",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const sampleAnswers: {[key: string]: string} = {
        marathi: `प्रश्न: "${question}"

🌟 सोपे उत्तर:
आकाश निळे दिसते कारण सूर्याच्या प्रकाशात सर्व रंग असतात. जेव्हा हा प्रकाश हवेतील छोट्या कणांना भेटतो, तेव्हा निळा रंग इतर रंगांपेक्षा जास्त पसरतो.

🏠 स्थानिक उदाहरण:
जसे आपण दुधात निळा रंग मिसळला तर संपूर्ण दूध निळे होते, तसेच आकाशातील निळा प्रकाश सर्वत्र पसरतो.

💡 मुख्य मुद्दे:
• सूर्याच्या प्रकाशात सात रंग असतात
• निळा रंग सर्वात जास्त पसरतो
• म्हणून आकाश निळे दिसते`,

        hindi: `प्रश्न: "${question}"

🌟 आसान जवाब:
आसमान नीला दिखता है क्योंकि सूरज की रोशनी में सभी रंग होते हैं। जब यह रोशनी हवा के छोटे कणों से टकराती है, तो नीला रंग दूसरे रंगों से ज्यादा फैलता है।

🏠 स्थानीय उदाहरण:
जैसे दूध में नीला रंग मिलाने से पूरा दूध नीला हो जाता है, वैसे ही आसमान में नीला प्रकाश हर जगह फैल जाता है।

💡 मुख्य बातें:
• सूरज के प्रकाश में सात रंग हैं
• नीला रंग सबसे ज्यादा फैलता है
• इसलिए आसमान नीला दिखता है`,

        english: `Question: "${question}"

🌟 Simple Answer:
The sky looks blue because sunlight contains all colors. When this light hits tiny particles in the air, blue light scatters more than other colors.

🏠 Local Example:
Just like when you mix blue color in milk, the whole milk becomes blue - similarly, blue light spreads everywhere in the sky.

💡 Key Points:
• Sunlight has seven colors
• Blue light scatters the most
• That's why the sky appears blue`
      };
      
      setAnswer(sampleAnswers[language] || sampleAnswers.english);
      setIsProcessing(false);
      
      toast({
        title: "प्रश्नाचे उत्तर तयार!",
        description: "Regional language answer ready"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">GyaanGenie</CardTitle>
            <CardDescription>
              Ask questions in regional language and get simple explanations with local analogies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Response Language
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
                Your Question (Regional Language)
              </label>
              <Textarea
                placeholder="उदाहरण: आकाश निळे का दिसते? / आसमान नीला क्यों दिखता है? / Why is the sky blue?"
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
                  Processing Question...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Get Simple Answer
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {answer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Regional Language Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                {answer}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Copy Answer</Button>
                <Button variant="outline" size="sm">Save Response</Button>
                <Button variant="outline" size="sm">Ask Follow-up</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KnowledgeSimplifier;
