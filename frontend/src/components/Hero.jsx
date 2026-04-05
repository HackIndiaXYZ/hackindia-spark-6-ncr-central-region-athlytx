import React from 'react';

const Hero = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 ${className}`}>
      <div className="container mx-auto px-4 py-20 text-center text-white">
        {trustBadge && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              {trustBadge.text}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          {headline.line1}
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
          {headline.line2}
        </h2>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90">
          {subtitle}
        </p>
        
        {buttons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.primary && (
              <button 
                onClick={buttons.primary.onClick}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
              >
                {buttons.primary.text}
              </button>
            )}
            {buttons.secondary && (
              <button 
                onClick={buttons.secondary.onClick}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
              >
                {buttons.secondary.text}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
