import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[calc(100vh-128px)]">
      <h1 className="text-9xl font-bold text-blue-400">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
        Go Home
      </Link>
    </div>
  );
}