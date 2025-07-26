
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Gurumitra Product Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Watch how Gurumitra transforms teaching with AI-powered tools
          </p>
          
          <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500">Product Demo Video</p>
              <p className="text-sm text-gray-400 mt-2">Click to play demonstration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Content Generation</h3>
              <p className="text-sm text-gray-600">See how AI creates culturally relevant content</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Multi-level Worksheets</h3>
              <p className="text-sm text-gray-600">Differentiated activities for all students</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Visual Aids</h3>
              <p className="text-sm text-gray-600">AI-generated diagrams and illustrations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
