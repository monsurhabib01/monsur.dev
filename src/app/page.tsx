import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-slate-100">
      <div className="max-w-3xl text-center">
        
        {/* সমাধান: <p> ট্যাগের বদলে এখানে আমরা <div> ব্যবহার করে সেফ নেস্টিং করছি */}
        <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Welcome to my Portfolio
        </div>

        {/* আপনার সেই মাস্টারপিস ট্যাগলাইন */}
        <h1 className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Full-Stack Engineer Specializing in PWA Architecture, N8N/AI Automations, and Secure Fintech Ecosystems Solutions.
        </h1>

        {/* সাব-টেক্সটটিকেও একটি নিরাপদ <div> এর ভেতর রাখছি */}
        <div className="mt-6 text-base text-slate-400 md:text-lg">
          Building high-performance web applications, architecting intelligent workflows, and ensuring technical compliance.
        </div>

        {/* বাটনসমূহ */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-emerald-400">
            View Projects
          </button>
          <button className="rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-800">
            Read Blog Archive
          </button>
        </div>

      </div>
    </main>
  );
}
