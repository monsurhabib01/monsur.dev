"use client";

import React, { useEffect, useState } from "react";

// ---- Editable content -------------------------------------------------
const ROLE_WORDS = [
  "Fraud Detection",
  "N8N Automations",
  "Secure Fintech APIs",
  "PWA Architecture",
];

const TRANSACTIONS = [
  { id: "TX-88213", amount: "৳ 42,500", channel: "bKash", risk: "flagged", score: 0.94 },
  { id: "TX-88214", amount: "৳ 1,200", channel: "Nagad", risk: "safe", score: 0.06 },
  { id: "TX-88215", amount: "৳ 118,000", channel: "Bank Transfer", risk: "flagged", score: 0.88 },
  { id: "TX-88216", amount: "৳ 3,050", channel: "bKash", risk: "safe", score: 0.11 },
  { id: "TX-88217", amount: "৳ 76,400", channel: "Nagad", risk: "review", score: 0.62 },
];

// Update these after your next production Lighthouse run
const METRICS = [
  { label: "Performance", value: 96 },
  { label: "Accessibility", value: 90 },
  { label: "Best Practices", value: 96 },
  { label: "SEO", value: 91 },
];
// -------------------------------------------------------------------------

function useTypedWord(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

function riskColor(risk: string) {
  if (risk === "flagged") return "text-red-400 bg-red-500/10 border-red-500/30";
  if (risk === "review") return "text-amber-400 bg-amber-500/10 border-amber-500/30";
  return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
}

function FraudDashboardCard() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TRANSACTIONS.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 550);
    return () => clearTimeout(t);
  }, [visibleCount]);

  const flaggedCount = TRANSACTIONS.slice(0, visibleCount).filter(
    (t) => t.risk === "flagged"
  ).length;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-emerald-500/5 backdrop-blur">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs font-medium text-slate-500">
          fraud-monitor.live
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-3 gap-px border-b border-slate-800 bg-slate-800/50">
        <div className="bg-slate-900/80 px-4 py-3">
          <div className="text-xs text-slate-500">Scanned</div>
          <div className="text-lg font-semibold text-slate-100">{visibleCount}</div>
        </div>
        <div className="bg-slate-900/80 px-4 py-3">
          <div className="text-xs text-slate-500">Flagged</div>
          <div className="text-lg font-semibold text-red-400">{flaggedCount}</div>
        </div>
        <div className="bg-slate-900/80 px-4 py-3">
          <div className="text-xs text-slate-500">Avg. Latency</div>
          <div className="text-lg font-semibold text-emerald-400">82ms</div>
        </div>
      </div>

      {/* transaction feed */}
      <div className="space-y-2 p-4">
        {TRANSACTIONS.slice(0, visibleCount).map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm animate-[fadeIn_0.4s_ease-out]"
          >
            <div className="flex flex-col">
              <span className="font-mono text-xs text-slate-500">{tx.id}</span>
              <span className="text-slate-200">
                {tx.amount} <span className="text-slate-500">· {tx.channel}</span>
              </span>
            </div>
            <span
              className={`rounded-full border px-2 py-1 text-xs font-medium capitalize ${riskColor(
                tx.risk
              )}`}
            >
              {tx.risk} · {tx.score.toFixed(2)}
            </span>
          </div>
        ))}
        {visibleCount < TRANSACTIONS.length && (
          <div className="flex items-center gap-2 px-1 py-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-slate-500" />
            scanning next transaction…
          </div>
        )}
      </div>
    </div>
  );
}

function WorkflowStrip() {
  const nodes = ["Webhook", "AML Rules", "Risk Score", "Alert / N8N"];
  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4">
      {nodes.map((n, i) => (
        <React.Fragment key={n}>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-500">{n}</span>
          </div>
          {i < nodes.length - 1 && (
            <div className="mx-1 mb-4 h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-slate-700" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ProofCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 ${className}`}
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  const typed = useTypedWord(ROLE_WORDS);

  return (
    <main className="min-h-screen bg-slate-900 px-6 py-16 text-slate-100 md:px-12 lg:px-20">
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* left: copy */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-800/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for freelance & remote work
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              I build systems that stop fraud
            </span>
            <br />
            <span className="text-slate-100">before it happens.</span>
          </h1>

          <p className="mt-5 h-7 font-mono text-lg text-slate-400">
            <span className="text-slate-300">{"> "}</span>
            {typed}
            <span className="ml-0.5 animate-pulse text-emerald-400">▌</span>
          </p>

          <p className="mt-4 max-w-md text-slate-400">
            Full-stack engineer specializing in AML/fraud detection for
            Bangladesh&apos;s MFS ecosystem, N8N-powered workflow automation,
            and installable PWA products.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-emerald-400">
              View Projects
            </button>
            <button className="rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-800">
              Read Blog Archive
            </button>
          </div>
        </div>

        {/* right: live mockup */}
        <div>
          <FraudDashboardCard />
          <WorkflowStrip />
        </div>
      </section>

      {/* PROOF / BENTO GRID */}
      <section className="mx-auto mt-24 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Proof, not promises
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">
            What that actually looks like
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* lighthouse scores - spans 2 */}
          <ProofCard title="Lighthouse Audit — This Site" className="md:col-span-2">
            <div className="grid grid-cols-4 gap-3">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {m.value}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </ProofCard>

          {/* PWA */}
          <ProofCard title="PWA Ready">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                ⬇
              </span>
              <span className="text-sm">Installable · Offline-capable</span>
            </div>
          </ProofCard>

          {/* Gumroad product */}
          <ProofCard title="Shipped Product">
            <div className="text-sm text-slate-200">
              Python AML &amp; Fraud Detection Toolkit
            </div>
            <div className="mt-1 text-xs text-slate-500">Live on Gumroad</div>
          </ProofCard>

          {/* N8N */}
          <ProofCard title="Automation" className="md:col-span-2">
            <div className="text-sm text-slate-200">
              N8N workflows connecting webhook intake → rule engine → risk
              scoring → alerting, replacing manual review steps.
            </div>
          </ProofCard>

          {/* domain */}
          <ProofCard title="Domain Focus" className="md:col-span-2">
            <div className="text-sm text-slate-200">
              Bangladesh MFS ecosystem — bKash, Nagad, BFIU-aligned
              compliance patterns.
            </div>
          </ProofCard>
        </div>
      </section>
    </main>
  );
}
