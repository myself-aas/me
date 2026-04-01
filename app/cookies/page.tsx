import type { Metadata } from 'next';
import CookieContent from './CookieContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | My App',
  description: 'Understand how we use cookies to improve your browsing experience and manage your preferences.',
};

export default function CookiePage() {
  return <CookieContent />;
}
