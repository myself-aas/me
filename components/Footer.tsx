import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-6 py-8 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-black/30 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</Link>
          <Link href="/accessibility" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accessibility</Link>
          <Link href="/ads-info" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ads info</Link>
        </div>
        
        <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          © {currentYear} Ashif Ahmed Shuvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
