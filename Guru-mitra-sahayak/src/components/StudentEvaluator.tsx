
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, Youtube, BookOpen, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentEvaluatorProps {
  onBack: () => void;
}

export const StudentEvaluator = ({ onBack }: StudentEvaluatorProps) => {
  const [studentDetails, setStudentDetails] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const [weakArea, setWeakArea] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState('');
  const { toast } = useToast();

  const handleEvaluate = async () => {
    if (!studentDetails.trim() || !weakArea.trim()) {
      toast({
        title: "Please fill in student details",
        description: "Describe the student's current level and weak areas",
        variant: "destructive"
      });
      return;
    }

    setIsEvaluating(true);
    
    setTimeout(() => {
      const sampleEvaluation = `👨‍🎓 STUDENT EVALUATION & REMEDIATION PLAN

📊 ASSESSMENT SUMMARY:
Student: Grade 4 student struggling with basic multiplication
Weak Areas: ${weakArea}
Current Level: Can do addition/subtraction, struggles with times tables

🎯 PERSONALIZED REMEDIATION PLAN:

PHASE 1: Foundation Building (Week 1-2)
• Review skip counting (2s, 5s, 10s)
• Use visual arrays and grouping activities
• Practice with manipulatives (stones, sticks)

PHASE 2: Pattern Recognition (Week 3-4)  
• Multiplication as repeated addition
• Number patterns and sequences
• Real-world multiplication problems

PHASE 3: Mastery & Application (Week 5-6)
• Times table drills with games
• Word problem solving
• Mental math strategies

📺 RECOMMENDED YOUTUBE VIDEOS:
1. "Multiplication Made Easy" - Khan Academy Kids (Hindi)
   https://youtube.com/watch?v=example1
   Duration: 8 minutes | Perfect for visual learners

2. "Times Tables Songs in Hindi" - Math Antics 
   https://youtube.com/watch?v=example2
   Duration: 12 minutes | Helps with memorization

3. "Real Life Multiplication Examples" - Vedantu
   https://youtube.com/watch?v=example3
   Duration: 15 minutes | Shows practical applications

📚 AI-GENERATED STUDY MATERIALS:

WORKSHEET 1: Visual Multiplication
• Array drawings for 2×3, 3×4, etc.
• Fill-in-the-blanks with pictures
• Color-coded multiplication charts

WORKSHEET 2: Story Problems
• Local context problems (buying fruits, counting animals)
• Step-by-step solution guides
• Picture-based word problems

WORKSHEET 3: Games & Activities
• Multiplication bingo cards
• Skip counting exercises
• Pattern completion tasks

📈 PROGRESS TRACKING:
Week 1: Basic arrays and grouping ⭐⭐⭐
Week 2: Skip counting mastery ⭐⭐
Week 3: Simple multiplication facts ⭐
Week 4: Word problems ⭐
Week 5: Times tables fluency 
Week 6: Complex applications

🏆 SUCCESS INDICATORS:
✓ Can solve 5×6 without counting
✓ Recognizes multiplication in daily life
✓ Solves 2-step word problems
✓ Shows confidence in math discussions`;

      setEvaluation(sampleEvaluation);
      setIsEvaluating(false);
      
      toast({
        title: "Evaluation Complete!",
        description: "Personalized remediation plan with YouTube resources ready"
      });
    }, 2500);
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
            <UserCheck className="h-5 w-5 text-pink-600" />
            Personalized Student Evaluator & Remediator
          </CardTitle>
          <CardDescription>
            Assess student progress and create personalized remediation with YouTube suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Subject Area
            </label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="language">Language Arts</SelectItem>
                <SelectItem value="social_studies">Social Studies</SelectItem>
                <SelectItem value="environmental">Environmental Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Student Current Level & Performance
            </label>
            <Textarea
              placeholder="Example: Grade 4 student, good at addition/subtraction, participates actively in class discussions, but struggles with multiplication tables and word problems"
              value={studentDetails}
              onChange={(e) => setStudentDetails(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Specific Weak Areas or Challenges
            </label>
            <Textarea
              placeholder="Example: Cannot memorize times tables, confuses multiplication with addition, struggles with word problems, lacks confidence in math"
              value={weakArea}
              onChange={(e) => setWeakArea(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <Button 
            onClick={handleEvaluate} 
            disabled={isEvaluating}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-700"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Personalized Plan...
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Generate Remediation Plan
              </>
            )}
          </Button>

          {evaluation && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-700">
                  <CheckCircle className="h-5 w-5" />
                  Personalized Remediation Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {evaluation}
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button variant="outline" size="sm">
                    <Youtube className="h-4 w-4 mr-2" />
                    Open YouTube Links
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Download Worksheets
                  </Button>
                  <Button variant="outline" size="sm">Save Plan</Button>
                  <Button variant="outline" size="sm">Share with Parents</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
