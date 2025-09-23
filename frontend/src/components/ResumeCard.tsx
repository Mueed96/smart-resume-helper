import { Link } from 'react-router-dom';
import { FileText, Trash2, Eye, Calendar } from 'lucide-react';

// Define the structure of the resume data we'll receive
interface Resume {
  id: string;
  filename: string;
  score: number | null;
  createdAt: string;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void; // A function to call when delete is clicked
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'bg-gray-200 text-gray-600';
    if (score > 75) return 'bg-green-100 text-secondary';
    if (score >= 50) return 'bg-yellow-100 text-yellow-600';
    return 'bg-red-100 text-error';
  };

  return (
    <div className="bg-surface p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between">
          <FileText className="h-8 w-8 text-primary" />
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreColor(resume.score)}`}>
            Score: {resume.score ?? 'N/A'}
          </span>
        </div>
        <h3 className="mt-4 font-bold text-text-heading truncate">{resume.filename}</h3>
        <p className="text-xs text-text-subtle flex items-center gap-2 mt-1">
          <Calendar size={14} />
          Uploaded on {new Date(resume.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        <Link 
          to={`/resumes/${resume.id}`}
          className="flex-1 text-center bg-primary text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={16} /> View Analysis
        </Link>
        <button 
          onClick={() => onDelete(resume.id)}
          className="p-2 text-error hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}