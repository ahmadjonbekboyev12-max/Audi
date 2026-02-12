
import React from 'react';
import { LinkItem, AppSettings } from '../types';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PublicViewProps {
  links: LinkItem[];
  settings: AppSettings;
}

const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Link;
  return <IconComponent className={className} size={18} strokeWidth={1.5} />;
};

const PublicView: React.FC<PublicViewProps> = ({ links, settings }) => {
  const activeLinks = links.filter(link => link.isActive);

  return (
    <div className="min-h-screen w-full audi-light-gradient relative flex flex-col items-center justify-start py-16 px-6 overflow-y-auto">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/[0.02] blur-[100px] rounded-full pointer-events-none float-element"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-600/[0.03] blur-[80px] rounded-full pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        
        {/* Audi Rings - Black version for white background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <img 
            src={settings.logoUrl} 
            alt="Audi" 
            className="h-10 w-auto brightness-0"
          />
        </motion.div>

        {/* Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-black text-[11px] font-medium tracking-[0.5em] uppercase opacity-80">
            {settings.slogan}
          </h1>
          <div className="w-10 h-[2px] bg-red-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Links List */}
        <div className="w-full space-y-4">
          {activeLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.5 }}
              className="premium-card group relative block w-full py-5 px-8 rounded-sm overflow-hidden"
            >
              <div className="red-accent-line"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="text-gray-400 group-hover:text-red-600 transition-colors duration-300">
                    <IconRenderer name={link.iconName} />
                  </div>
                  <span className="text-gray-800 group-hover:text-black font-semibold tracking-wider text-[13px] uppercase transition-all duration-300">
                    {link.title}
                  </span>
                </div>
                <LucideIcons.ArrowRight 
                  className="text-gray-300 group-hover:text-red-600 transition-all duration-300" 
                  size={16} 
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 flex flex-col items-center space-y-4 opacity-40"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-black font-bold">
            &copy; {new Date().getFullYear()} Audi AG | O'zbekiston
          </p>
        </motion.footer>
      </div>

      {/* Admin Shield - Dark version */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link 
          to="/login" 
          className="text-black p-3 rounded-full hover:bg-black/5 transition-all duration-300 block group"
          title="Tizimga kirish"
        >
          <LucideIcons.Shield 
            size={22} 
            strokeWidth={1.5} 
            className="group-hover:text-red-600 transition-colors"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default PublicView;
