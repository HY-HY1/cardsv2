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
        <main className='w-[70vw] m-auto mt-10'>
          {children}
        </main>
      </>
  );
}
