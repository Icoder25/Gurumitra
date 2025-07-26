
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-600/10" />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/f9a913e7-0092-410b-a772-9a9eb41cd995.png"
              alt="Gurumitra Logo" 
              className="h-20 w-auto"
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Empowering Teachers,{' '}
          <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Transforming Education
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Revolutionary AI-powered platform designed specifically for Indian educators. 
          Create engaging content, assess students intelligently, and bridge language barriers effortlessly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3"
            onClick={() => navigate('/auth')}
          >
            Start Teaching with AI
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate('/demo')}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            View Demo
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Teachers Empowered</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-gray-600">Regional Languages</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
            <div className="text-gray-600">Students Benefited</div>
          </div>
        </div>
      </div>
    </section>
  );
};
