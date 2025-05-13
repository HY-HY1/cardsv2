// app/app/layout.tsx
'use client';

import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SubjectsProvider } from '@/context/SubjectContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SubjectsProvider>
        <div className="flex">
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </SubjectsProvider>
    </SidebarProvider>
  );
}
