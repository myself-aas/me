import type { Metadata } from 'next';
import AdsInfoContent from './AdsInfoContent';

export const metadata: Metadata = {
  title: 'Advertising Information | My App',
  description: 'Learn about our advertising policy and commitment to a clean user experience.',
};

export default function AdsInfoPage() {
  return <AdsInfoContent />;
}
