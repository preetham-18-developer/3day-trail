import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CollegeHunt Admin Panel',
  description: 'Admin panel for managing CollegeHunt platform',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
