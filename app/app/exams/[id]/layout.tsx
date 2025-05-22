'use client';

import Header from '@/components/layout/Headers/Header';
import { AppSidebar } from '@/components/layout/sidebar';
import { Dialog } from '@/components/ui/dialog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SubjectsProvider } from '@/context/SubjectContext';

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <header className='w-full'>
          <Header/>
        </header>
        <main className='w-[70vw] m-auto mt-10'>
          {children}
        </main>
      </>
  );
}
