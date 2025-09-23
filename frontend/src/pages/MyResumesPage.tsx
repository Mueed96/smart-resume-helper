import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ResumeCard } from '../components/ResumeCard';
import { MyResumesSkeleton } from '../components/MyResumesSkeleton';
import { Link } from 'react-router-dom';
import { FilePlus, FolderOpen } from 'lucide-react';
import toast from 'react-hot-toast';

// Define the structure of the resume data we'll receive
interface UserResume {
  id: string;
  filename: string;
  score: number | null;
  createdAt: string;
}

export function MyResumesPage() {
  const { token } = useAuth();
  const [resumes, setResumes] = useState<UserResume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const fetchResumes = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('http://localhost:3001/resumes', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setResumes(response.data);
        } catch (err) {
          setError('Failed to fetch your resumes. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchResumes();
    }
  }, [token]);

  const handleDelete = async (resumeId: string) => {
    if (!token) {
      toast.error('You must be logged in to delete a resume.');
      return;
    }

    // A simple confirmation before deleting
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:3001/resumes/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Remove the deleted resume from the local state for an instant UI update
        setResumes(prevResumes => prevResumes.filter(r => r.id !== resumeId));
        toast.success('Resume deleted successfully.');
      } catch (err) {
        toast.error('Failed to delete resume. Please try again.');
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <MyResumesSkeleton />;
    }

    if (error) {
      return <div className="text-center text-error">{error}</div>;
    }

    if (resumes.length === 0) {
      return (
        <div className="text-center py-20">
          <FolderOpen className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-heading">You haven’t uploaded any resumes yet.</h2>
          <p className="mt-2 text-text-body mb-6">Get started by uploading your first resume for analysis.</p>
          <Link 
            to="/upload"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
          >
            <FilePlus size={20} /> Upload Your First Resume
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map(resume => (
          <ResumeCard key={resume.id} resume={resume} onDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-extrabold text-text-heading flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-primary" />
            My Resumes
          </h1>
          <p className="mt-2 text-text-body">View and manage your past uploaded resumes.</p>
        </header>
        {renderContent()}
      </div>
    </div>
  );
}