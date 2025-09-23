import { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, File as FileIcon, UploadCloud, ArrowLeft } from 'lucide-react';
import { SuccessDisplay } from '../components/SuccessDisplay';
import { StepIndicator } from '../components/StepIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth to get the token

type UploadStatus = 'idle' | 'file-selected' | 'uploading' | 'success' | 'error' | 'analyzing';
interface UploadResponse {
  id: string;
}

export function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth(); // 2. Get the token from our AuthContext

  const currentStep = useMemo(() => {
    switch (status) {
      case 'idle':
      case 'file-selected':
      case 'error':
        return 1;
      case 'uploading':
        return 2;
      case 'success':
        return 3;
      case 'analyzing':
        return 4;
      default:
        return 1;
    }
  }, [status]);

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload a PDF or DOCX file.');
        setStatus('error');
        return;
      }
      if (selectedFile.size > maxSize) {
        setError('File size exceeds 5MB limit.');
        setStatus('error');
        return;
      }

      setFile(selectedFile);
      setStatus('file-selected');
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !token) {
      setError("Authentication error. Please log in again.");
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<UploadResponse>(
        'http://localhost:3001/resumes/upload',
        formData,
        {
          // 3. THIS IS THE FIX: Add the Authorization header with the token
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ?? file.size;
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
            setUploadProgress(percentCompleted);
          },
        }
      );
      setUploadedResumeId(response.data.id);
      setStatus('success');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Upload failed. Please try again.';
      setError(
        Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage
      );
      setStatus('error');
    }
  };

  const handleStartAnalysis = async () => {
    if (uploadedResumeId) {
      setStatus('analyzing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(`/resumes/${uploadedResumeId}`);
    }
  };
  
  const handleTryAgain = () => {
    setFile(null);
    setStatus('idle');
    setError(null);
  };
  
  const handleCancel = () => {
    setFile(null);
    setStatus('idle');
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      <Link
        to="/"
        className="absolute top-8 left-8 bg-primary text-white font-bold py-2 px-4 rounded-md flex items-center hover:bg-primary-hover transition-transform duration-200 hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
          Upload Your Resume
        </h1>
        <p className="text-base sm:text-lg text-text-body mt-3">
          We’ll analyze it instantly and show you where to improve.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg mx-auto text-center flex flex-col items-center justify-center min-h-[220px] p-6 bg-surface border border-gray-100 shadow-md rounded-2xl"
        >
          {status === 'idle' && (
            <div className="w-full">
              <div
                {...getRootProps()}
                className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 w-full ${isDragActive ? 'border-primary shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'border-blue-300 hover:border-primary'} hover:-translate-y-1 hover:shadow-md`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <UploadCloud className="h-16 w-16 text-primary mb-4 animate-pulse-subtle" />
                  <p className="text-gray-500 text-lg">
                    Drag & drop your resume here or click to browse
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-subtle mt-2">
                PDF & DOCX only. Max 5MB.
              </p>
            </div>
          )}

          {status === 'file-selected' && (
            <div className="w-full">
              <div className="flex items-center justify-center text-lg p-4 bg-blue-100 text-primary rounded-md border border-blue-200 shadow-sm">
                <FileIcon className="h-6 w-6 mr-3" />
                <span className="font-medium">{file?.name}</span>
                <CheckCircle className="h-6 w-6 ml-3 text-emerald-500" />
              </div>
              <div className="flex items-center gap-4 mt-6 w-full">
                <button onClick={handleCancel} className="w-full bg-gray-200 text-text-subtle font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-transform duration-200 hover:scale-105">
                  Cancel
                </button>
                <button onClick={handleUpload} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-transform duration-200 hover:scale-105">
                  Upload Resume
                </button>
              </div>
            </div>
          )}

          {status === 'uploading' && (
            <div className="w-full">
              <p className="text-center text-text-body mb-3 font-medium">
                Uploading Resume ({uploadProgress}%)
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden shadow-inner">
                <div
                  className="h-4 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <SuccessDisplay onStartAnalysis={handleStartAnalysis} />
          )}

          {status === 'analyzing' && (
             <div className="flex flex-col items-center justify-center p-6 text-center">
               <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary mb-6"></div>
               <h2 className="text-2xl font-bold text-text-heading">Analyzing...</h2>
             </div>
           )}

          {status === 'error' && (
            <div className="w-full text-center">
              <p className="text-error font-medium">{error}</p>
              <button onClick={handleTryAgain} className="mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 transition-transform duration-200 hover:scale-105">
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}