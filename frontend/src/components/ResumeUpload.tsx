import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface UploadResponse {
  id: string;
  filename: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function ResumeUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { token } = useAuth();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!token) {
        setError("You must be logged in to upload a resume.");
        return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<UploadResponse>(
        `${API_BASE_URL}/resumes`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
      console.log('Upload successful:', response.data);
      navigate(`/dashboard/${response.data.id}`);

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-blue-50' : 'border-gray-400 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center text-text-body">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
            <p>Analyzing your resume...</p>
          </div>
        ) : (
          <p className="text-gray-500">
            {isDragActive
              ? 'Drop your resume here...'
              : "Drag 'n' drop your resume here, or click to select a file (PDF or DOCX)"}
          </p>
        )}
      </div>

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
}