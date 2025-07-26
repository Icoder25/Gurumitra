
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/29cb2f41-50e2-48f7-b723-9c863e47a55f.png" 
              alt="Gurumitra Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Button variant="ghost" onClick={() => navigate('/demo')}>
              View Demo
            </Button>
            <Button variant="ghost">
              Features
            </Button>
            <Button variant="ghost">
              Pricing
            </Button>
            <Button variant="ghost">
              Support
            </Button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => navigate('/auth')}
            >
              Start Teaching with AI
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
