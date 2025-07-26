
import React from 'react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/lovable-uploads/29cb2f41-50e2-48f7-b723-9c863e47a55f.png" 
              alt="Gurumitra Logo" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mb-4">
              Empowering teachers with AI-powered tools for better learning outcomes in multi-grade classrooms.
            </p>
            <p className="text-sm text-gray-400">
              "Smarter Teaching, Better Learning"
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="text-gray-300 p-0 h-auto">Features</Button></li>
              <li><Button variant="link" className="text-gray-300 p-0 h-auto">Pricing</Button></li>
              <li><Button variant="link" className="text-gray-300 p-0 h-auto">Demo</Button></li>
              <li><Button variant="link" className="text-gray-300 p-0 h-auto">Support</Button></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>support@gurumitra.ai</li>
              <li>+91 9876543210</li>
              <li>Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Gurumitra. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
