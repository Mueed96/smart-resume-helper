import { ScrollLink } from './ScrollLink';
import { Linkedin, Github, MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Branding */}
          <div className="md:col-span-1">
            <ScrollLink to="/" className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="ResueMay Logo" className="h-8 w-auto invert brightness-0" />
              <span className="text-xl font-bold text-white">ResueMay</span>
            </ScrollLink>
            <p className="text-sm text-gray-400">
              Turn Your Resume Into Opportunities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><ScrollLink to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</ScrollLink></li>
              <li><ScrollLink to="/upload" className="text-sm text-gray-400 hover:text-white transition-colors">Upload</ScrollLink></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><ScrollLink to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</ScrollLink></li>
              <li><ScrollLink to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</ScrollLink></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Social Icons */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <div className="flex mt-4 space-x-4">
              {/* --- UPDATED SOCIAL LINKS --- */}
              <a href="https://www.linkedin.com/in/abdul-mueed-551713245" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/Mueed96" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://wa.me/+923376006030" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Strip */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto py-4 px-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} ResueMay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}