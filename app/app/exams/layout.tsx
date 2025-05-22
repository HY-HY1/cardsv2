// app/app/layout.tsx
'use client';


export default function ExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <header className='w-full'>
        </header>
        <main className='w-full '>
          {children}
        </main>
      </>
  );
}
