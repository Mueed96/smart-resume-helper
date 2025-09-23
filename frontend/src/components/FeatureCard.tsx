import React from 'react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="
      p-8 rounded-xl
      bg-blue-50 // Keeps the light blue tinted background

      // --- UPDATED BORDER AND SHADOW ---
      border border-blue-100 // Adds the thin, light blue border
      shadow-sm              // Adds the light drop shadow by default

      // Hover effects: increases shadow size smoothly
      hover:shadow-md 
      transition-shadow duration-300
      
      flex flex-col items-center text-center
    ">
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-semibold text-text-heading mb-2">{title}</h3>
      <p className="text-text-body">{description}</p>
    </div>
  );
}