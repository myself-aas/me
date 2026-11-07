import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 text-center">
      <h1 className="text-4xl font-serif font-bold mb-4">404 - Page Not Found</h1>
      <p className="datum mb-8">The page you are looking for does not exist.</p>
      <Link href="/" className="text-signal hover:underline">
        Return Home
      </Link>
    </div>
  );
}
