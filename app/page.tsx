import Link from "next/link";
import { ArrowRight, BarChart3, BookCheck, BrainCircuit, ShieldCheck, Sparkles, Users } from "lucide-react";

const benefits = [
  { title: "Early support signals", description: "Turn attendance, assessment trends, and assignment completion into a transparent support-priority indicator." },
  { title: "Explainable insight", description: "Show the factors that contributed to a warning, and the evidence behind each recommendation." },
  { title: "Actionable plans", description: "Generate realistic seven-day next steps for students and teachers, then track completion." },
];

const workflow = [
  "Analyze the student data and flag any risk indicators.",
  "Explain the observed facts and missing data behind each alert.",
  "Generate a practical support plan and track progress over time.",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/15 p-2 text-violet-300">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-violet-300">EduPulse AI</div>
              <div className="text-xl font-semibold text-white">Spot the struggle. Understand the why.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/faculty" className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white">Explore the Demo</Link>
          </div>
        </header>

        <main className="space-y-10">
          <section className="grid gap-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-teal-200">
                <Sparkles className="h-3.5 w-3.5" />
                Explainable student support
              </div>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Translate student data into a timely, supportive action plan.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-300">
                EduPulse AI helps educators spot early warning signs, explain the contributing factors, and empower the next step before minor difficulties become harder to solve.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/faculty" className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400">
                  Explore the Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/coach" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 font-medium text-slate-200">See the Success Coach</Link>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5 shadow-2xl shadow-violet-950/20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Live preview</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Support-priority overview</h2>
                </div>
                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-200">Needs attention</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Daniel Okafor</span>
                    <span className="text-violet-200">74 risk</span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-slate-200">
                    <div className="flex justify-between"><span>Attendance</span><span className="text-red-200">76%</span></div>
                    <div className="flex justify-between"><span>Assignments</span><span className="text-amber-200">71%</span></div>
                    <div className="flex justify-between"><span>Assessment trend</span><span className="text-red-200">-8 pts</span></div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
                  <div className="font-medium text-white">Why this matters</div>
                  <p className="mt-2 text-slate-300">Low attendance, rising assessment decline, and missed work suggest the student may benefit from a structured support plan.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 inline-flex rounded-xl bg-violet-500/15 p-2 text-violet-300">
                  {benefit.title.includes("support") ? <ShieldCheck className="h-5 w-5" /> : benefit.title.includes("Explain") ? <BarChart3 className="h-5 w-5" /> : <BookCheck className="h-5 w-5" />}
                </div>
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-teal-500/15 p-2 text-teal-300"><Users className="h-5 w-5" /></div>
              <h2 className="text-2xl font-semibold text-white">Explainable success loop</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-violet-300">Step {index + 1}</div>
                  <p className="text-sm text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Example insight</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">&ldquo;Daniel&apos;s attendance has fallen, assignment completion has slipped, and assessment scores have declined over the last three cycles.&rdquo;</h3>
            <p className="mt-3 max-w-3xl text-slate-300">This evidence does not define the student. It highlights the conditions where a short, supportive academic intervention may create momentum.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
