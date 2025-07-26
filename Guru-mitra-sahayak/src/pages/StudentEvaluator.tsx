
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, FileText, Download, Eye, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentEvaluator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} answer sheet(s) added for evaluation`
    });
  };

  const handleEvaluateSheets = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload answer sheets first",
        variant: "destructive"
      });
      return;
    }

    setIsEvaluating(true);
    
    // Simulate AI evaluation process
    setTimeout(() => {
      const mockResults = uploadedFiles.map((file, index) => ({
        studentName: `Student ${index + 1}`,
        fileName: file.name,
        totalMarks: 100,
        scoredMarks: Math.floor(Math.random() * 40) + 60,
        percentage: Math.floor((Math.floor(Math.random() * 40) + 60)),
        weakTopics: [
          'Algebra', 'Geometry', 'Trigonometry'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: [
          {
            topic: 'Algebra',
            resources: [
              'https://www.khanacademy.org/math/algebra',
              'https://www.youtube.com/watch?v=algebra-basics'
            ]
          },
          {
            topic: 'Geometry',
            resources: [
              'https://www.khanacademy.org/math/geometry',
              'https://www.youtube.com/watch?v=geometry-basics'
            ]
          }
        ]
      }));
      
      setEvaluationResults(mockResults);
      setIsEvaluating(false);
      setShowResults(true);
      
      toast({
        title: "Evaluation Complete!",
        description: "Answer sheets evaluated successfully"
      });
    }, 3000);
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Student Name', 'File Name', 'Total Marks', 'Scored Marks', 'Percentage', 'Weak Topics'].join(','),
      ...evaluationResults.map(result => [
        result.studentName,
        result.fileName,
        result.totalMarks,
        result.scoredMarks,
        `${result.percentage}%`,
        result.weakTopics.join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evaluation_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV Downloaded",
      description: "Evaluation results saved to CSV file"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Smart Evaluator</CardTitle>
            <CardDescription>
              Upload offline test answer sheets for AI-powered evaluation and personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Answer Sheets</h3>
              <p className="text-gray-600 mb-4">
                Upload photos of student answer sheets (JPG, PNG, PDF)
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600" asChild>
                  <span>Choose Files</span>
                </Button>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Uploaded Files ({uploadedFiles.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="flex-1 text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleEvaluateSheets}
                    disabled={isEvaluating}
                    className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Evaluating Answer Sheets...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Start AI Evaluation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {showResults && evaluationResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Evaluation Results
                  </CardTitle>
                  <CardDescription>
                    AI has analyzed {evaluationResults.length} answer sheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evaluationResults.map((result, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-lg">{result.studentName}</h4>
                              <p className="text-sm text-gray-600">{result.fileName}</p>
                              <div className="mt-2">
                                <span className="text-2xl font-bold text-green-600">
                                  {result.scoredMarks}/{result.totalMarks}
                                </span>
                                <span className="ml-2 text-lg text-gray-600">
                                  ({result.percentage}%)
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-red-600 mb-2">Weak Topics:</h5>
                              <div className="space-y-2">
                                {result.weakTopics.map((topic: string, topicIndex: number) => (
                                  <div key={topicIndex} className="text-sm">
                                    <span className="font-medium">{topic}</span>
                                    <div className="ml-2 mt-1">
                                      {result.recommendations
                                        .filter((rec: any) => rec.topic === topic)
                                        .map((rec: any, recIndex: number) => (
                                          <div key={recIndex}>
                                            {rec.resources.map((link: string, linkIndex: number) => (
                                              <a
                                                key={linkIndex}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-xs block"
                                              >
                                                📚 Reference Material {linkIndex + 1}
                                              </a>
                                            ))}
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Button
                    onClick={downloadCSV}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Results as CSV
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentEvaluator;
