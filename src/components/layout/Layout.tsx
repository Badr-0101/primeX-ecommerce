import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950  overflow-hidden ">
      {/* Decorative gradients */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] pointer-events-none" /> */}

      <Navbar />

      <main className="pt-0 pb-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}
