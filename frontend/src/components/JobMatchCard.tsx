import { Building2, Sparkles } from 'lucide-react';
import type { JobMatch } from '../types';

interface JobMatchCardProps {
  job: JobMatch;
}

export default function JobMatchCard({ job }: JobMatchCardProps) {
  const getBadgeColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-100 text-secondary';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-600';
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <div className="bg-gradient-to-r from-surface to-blue-50 p-5 rounded-lg shadow-md border border-gray-200 flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-text-heading">{job.title}</h3>
        <span
          className={`text-base font-bold px-3 py-1.5 rounded-full ${getBadgeColor(job.matchPercentage)} animate-pulse-once`}
        >
          {job.matchPercentage}%
        </span>
      </div>
      
      <div className="flex items-center text-md text-text-body mb-4">
        <Building2 className="h-4 w-4 mr-2" />
        <span>{job.company}</span>
      </div>

      <div className="text-sm text-text-subtle mb-4 flex-grow h-24 overflow-y-auto pr-2 border-b pb-4">
        <p>{job.description}</p>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-text-heading mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          Matching Skills
        </h4>
        {job.matchingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {job.matchingSkills.map((skill) => (
              <span key={skill} className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-subtle">No matching skills found.</p>
        )}
      </div>

      <div className="mt-auto pt-4">
        <a 
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
        >
          View Job
        </a>
      </div>
    </div>
  );
}