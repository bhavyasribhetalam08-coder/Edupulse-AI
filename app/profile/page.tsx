import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, TrendingDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MetricCard, SectionHeader, StatusBadge } from "@/components/ui";
import { getStudentById, getSupportPriority } from "@/lib/analytics";

const student = getStudentById("STU-002");
const priority = getSupportPriority(student);

export default function ProfilePage() {
  return (
    <AppShell title="Individual student profile" subtitle="Review the evidence behind a support-priority indicator, coach actions, and the available plan history." current="Student profile">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-violet-300">Student</div>
            <h2 className="mt-2 text-3xl font-semibold text-white">{student.name}</h2>
            <div className="mt-2 text-sm text-slate-300">{student.id} • {student.classId}</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={priority.label} />
            <Link href="/directory" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200"><ArrowLeft className="h-4 w-4" /> Directory</Link>
            <Link href="/coach" className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white"><BookOpenCheck className="h-4 w-4" /> Success coach <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Attendance" value={`${student.attendance}%`} delta="Term-to-date" tone="teal" />
          <MetricCard label="Recent score" value={`${student.recentScore}%`} delta="Most recent assessment" tone="violet" />
          <MetricCard label="Assignments" value={`${student.assignmentCompletion}%`} delta="Completed work" tone="amber" />
          <MetricCard label="Assessment trend" value={`${student.trend} pts`} delta="Across two recent cycles" tone="red" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <SectionHeader eyebrow="Evidence" title="Support-priority explanation" description="Observed facts are distinguished from model-generated interpretation to keep the indicator transparent." />
            <div className="space-y-4">
              {priority.factors.map((factor) => (
                <div key={factor.title} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-white">{factor.title}</div>
                    <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">{factor.severity}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{factor.evidence}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-100">
              {priority.summary}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">Teacher actions</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>• Check whether the student has missing notes from recent lessons.</li>
              <li>• Ask about the most challenging concept in Maths and plan a brief intervention.</li>
              <li>• Set a follow-up review for assignment submissions and revision habits.</li>
              <li>• Share a short weekly goal and monitor completion in the next 7 days.</li>
            </ul>
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              <div className="mb-2 flex items-center gap-2 font-medium"><TrendingDown className="h-4 w-4" /> Data quality note</div>
              {student.selfReported}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <SectionHeader eyebrow="Academic summary" title="Subject performance" description="Subject-wise summaries are shown as observed values, not as a permanent judgement of ability." />
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(student.subjects).map(([subject, score]) => (
              <div key={subject} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">{subject}</div>
                  <span className="text-violet-200">{score}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-teal-400" style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
