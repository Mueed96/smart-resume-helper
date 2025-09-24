import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import JobMatchCard from '../components/JobMatchCard';
import { ScoreBreakdownChart } from '../components/ScoreBreakdownChart';
import { HighlightedText } from '../components/HighlightedText';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { Lightbulb, AlertTriangle, Download, ArrowLeft, FileText, BarChart, CheckSquare, Briefcase, FileX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { ResumeAnalysis, JobMatch } from '../types';

const themeColors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#F43F5E',
  yellow: '#FBBF24',
  surface: '#FFFFFF',
};

// --- THE FIX: Create a clean base URL constant from the environment variable ---
const API_BASE_URL = import.meta.env.VITE_API_URL;

export function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (id && token) {
      const fetchAllData = async () => {
        try {
          setIsLoading(true);
          // --- THE FIX: Use the new base URL constant for all API calls ---
          const analysisUrl = `${API_BASE_URL}/resumes/${id}`;
          const matchesUrl = `${API_BASE_URL}/resumes/${id}/matches`;

          const authHeaders = { headers: { 'Authorization': `Bearer ${token}` } };

          const [analysisResponse, matchesResponse] = await Promise.all([
            axios.get(analysisUrl, authHeaders),
            axios.get(matchesUrl, authHeaders),
          ]);

          setAnalysis(analysisResponse.data);
          setJobMatches(matchesResponse.data);
        } catch (err) {
          setError('Could not find analysis for this resume. Please upload a resume first to see your results.');
        } 
        finally { setIsLoading(false); }
      };
      fetchAllData();
    }
  }, [id, token]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (analysis) {
      const timer = setInterval(() => {
        setDisplayScore(prevScore => {
          if (prevScore < analysis.score) {
            return prevScore + 1;
          } else {
            clearInterval(timer);
            return analysis.score;
          }
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [analysis]);

  const handleDownload = () => {
    const dashboardElement = document.getElementById('dashboard-content');
    if (dashboardElement) {
      html2canvas(dashboardElement, { backgroundColor: '#F9FAFB' }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`resume-analysis-${analysis?.filename}.pdf`);
      });
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-200px)] text-center">
        <FileX className="h-16 w-16 text-error mb-4" />
        <h2 className="text-2xl font-bold text-text-heading">Analysis Not Found</h2>
        <p className="text-text-body mt-2 mb-6">{error}</p>
        <Link 
          to="/upload"
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-md flex items-center transition-transform duration-200 hover:scale-105"
        >
          Go to Upload Page
        </Link>
      </div>
    );
  }

  const getScoreColorInfo = (score: number) => {
    if (score > 75) return { className: 'text-secondary', hex: themeColors.secondary };
    if (score >= 50) return { className: 'text-yellow-400', hex: themeColors.yellow };
    return { className: 'text-danger', hex: themeColors.danger };
  };

  const keywordsToHighlight = ['Education', 'Experience', 'Skills', ...jobMatches.flatMap(j => j.matchingSkills)];
  const scoreColor = getScoreColorInfo(analysis?.score ?? 0);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center flex-wrap gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-text-subtle" />
            <div>
              <h2 className="text-sm font-medium text-text-subtle">Analysis Report</h2>
              <h1 className="text-2xl font-bold text-text-heading">{analysis?.filename}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/upload"
              className="bg-surface hover:bg-gray-100 text-text-body font-bold py-2 px-4 rounded-md flex items-center transition-all duration-200 hover:scale-105 border border-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Upload Another
            </Link>
            <button 
              onClick={handleDownload} 
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-md flex items-center transition-transform duration-200 hover:scale-105"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </button>
          </div>
        </header>

        <div id="dashboard-content" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-xl font-semibold text-text-heading mb-4">Resume Score</h2>
              <div className="relative w-40 h-40 mx-auto">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-5xl font-extrabold"
                  style={{ background: `radial-gradient(closest-side, ${themeColors.surface} 79%, transparent 80% 100%), conic-gradient(${scoreColor.hex} calc(${displayScore}% / 100 * 360deg), #e5e7eb 0)`}}
                >
                  <span className={scoreColor.className}>{displayScore}</span>
                </div>
              </div>
              <p className="text-text-subtle mt-2">Overall Score</p>
            </div>
            
            <div style={{ transitionDelay: '100ms' }} className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-text-subtle mr-3" />
                  <h2 className="text-xl font-semibold text-text-heading">Score Breakdown</h2>
              </div>
              {analysis?.scoreBreakdown && <ScoreBreakdownChart data={analysis.scoreBreakdown} />}
            </div>
            
            <div style={{ transitionDelay: '200ms' }} className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center mb-4">
                  <CheckSquare className="h-6 w-6 text-text-subtle mr-3" />
                  <h2 className="text-xl font-semibold text-text-heading">Improvement Suggestions</h2>
              </div>
              <ul className="space-y-3">
                {analysis?.suggestions.map((suggestion, index) => {
                  const isMissing = suggestion.toLowerCase().includes('missing');
                  return (
                    <li key={index} className="flex items-start p-3 bg-background rounded-md">
                      <div className={`w-1.5 h-auto self-stretch rounded-full mr-3 ${isMissing ? 'bg-error' : 'bg-yellow-400'}`}></div>
                      <div>
                        {isMissing ? <AlertTriangle className="text-error h-5 w-5 float-left mr-2" /> : <Lightbulb className="text-yellow-400 h-5 w-5 float-left mr-2" />}
                        <p className="text-text-body">{suggestion}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div style={{ transitionDelay: '300ms' }} className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-heading">Parsed Resume</h2>
              </div>
              <div className="bg-background p-4 rounded-md h-[400px] overflow-y-auto text-text-body border border-gray-200">
                <HighlightedText text={analysis?.parsedText ?? ''} keywords={keywordsToHighlight} />
              </div>
            </div>

            <div style={{ transitionDelay: '400ms' }} className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center mb-4">
                  <Briefcase className="h-6 w-6 text-text-subtle mr-3" />
                  <h2 className="text-xl font-semibold text-text-heading">Top Job Matches</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobMatches.map((job) => (
                  <JobMatchCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}