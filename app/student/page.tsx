import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/ui";
import { getStudentById, getSupportPriority } from "@/lib/analytics";

const student = getStudentById("STU-002");
const priority = getSupportPriority(student);

const tasks = [
  { title: "Complete algebra revision set", status: "Done", time: "20 min" },
  { title: "Submit missing Geography worksheet", status: "In progress", time: "25 min" },
  { title: "Review science flashcards", status: "Planned", time: "15 min" },
];

export default function StudentPortalPage() {
  return (
    <AppShell title="Student portal" subtitle="View progress, goals, and helpful next steps in a way that supports agency and confidence." current="Student portal">
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{student.name}</h2>
            </div>
            <StatusBadge status={priority.label} />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Current goal</div>
              <div className="mt-2 text-xl font-semibold text-white">Improve Maths confidence</div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Study time</div>
              <div className="mt-2 text-xl font-semibold text-white">4 hours this week</div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Weekly progress</div>
              <div className="mt-2 text-xl font-semibold text-white">68%</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">Daily study tasks</h3>
            <div className="mt-5 space-y-3">
              {tasks.map((task) => (
                <div key={task.title} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-4">
                  <div>
                    <div className="font-medium text-white">{task.title}</div>
                    <div className="text-sm text-slate-300">{task.time}</div>
                  </div>
                  <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200">{task.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">Suggested next action</h3>
            <div className="mt-4 rounded-xl border border-teal-500/25 bg-teal-500/10 p-4 text-sm text-teal-100">
              Review the most difficult algebra concept from today’s lesson and complete one short practice set before your next class.
            </div>
            <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-100">
              Reflection: What strategy helped me feel more confident this week?
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
