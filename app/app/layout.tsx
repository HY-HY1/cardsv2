// app/app/layout.tsx
'use client';

import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StacksProvider } from '@/context/StackContext';
import { SubjectsProvider } from '@/context/SubjectContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SubjectsProvider>
        <StacksProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 w-full">{children}</main>
        </div>
        </StacksProvider>
      </SubjectsProvider>
    </SidebarProvider>
  );
}
