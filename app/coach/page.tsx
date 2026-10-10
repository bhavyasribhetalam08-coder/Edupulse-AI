"use client";

import { useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, ValidationMessage } from "@/components/ui";
import { getStudentById, getSupportPriority } from "@/lib/analytics";
import { students } from "@/lib/demo-data";

const defaultPlan = {
  summary: "A structured weekly support plan will help prioritize the most relevant tasks before the next assessment review.",
  recommended_actions: [
    { title: "Complete overdue revision tasks", reason: "This reduces the backlog and addresses current gaps early.", duration_minutes: 30, target_date: "2026-10-12", success_measure: "Tasks are submitted and marked complete." },
  ],
  teacher_follow_up: ["Review the revision list with the student in class."],
  student_reflection_question: "Which task felt most manageable this week, and what would make it easier next time?",
};

export default function CoachPage() {
  const [selectedId, setSelectedId] = useState("STU-002");
  const [target, setTarget] = useState("Improving Maths confidence");
  const [studyHours, setStudyHours] = useState(4);
  const [subject, setSubject] = useState("Maths");
  const [plan, setPlan] = useState(defaultPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const student = useMemo(() => getStudentById(selectedId), [selectedId]);
  const support = getSupportPriority(student);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: selectedId, target, studyHours, selectedSubject: subject }),
      });

      if (!response.ok) {
        throw new Error("The plan service rejected the request.");
      }

      const payload = await response.json();
      setPlan(payload.plan ?? defaultPlan);
    } catch {
      setError("The AI service is unavailable; a deterministic fallback plan is shown instead.");
      setPlan(defaultPlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="AI success coach" subtitle="Create a personal, realistic seven-day plan that adapts to current evidence and a student’s workload." current="Success coach">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">Plan inputs</h3>
          <div className="mt-5 space-y-4">
            <label className="block text-sm text-slate-300">
              Demo student
              <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none">
                {students.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-300">
              Target goal
              <input value={target} onChange={(event) => setTarget(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none" />
            </label>

            <label className="block text-sm text-slate-300">
              Study time available
              <input type="number" min={1} max={10} value={studyHours} onChange={(event) => setStudyHours(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none" />
            </label>

            <label className="block text-sm text-slate-300">
              Priority subject
              <select value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none">
                {Object.keys(student.subjects).map((subjectName) => (
                  <option key={subjectName} value={subjectName}>{subjectName}</option>
                ))}
              </select>
            </label>

            <button onClick={handleGenerate} className="w-full rounded-full bg-violet-500 px-4 py-3 font-medium text-white transition hover:bg-violet-400">
              {loading ? "Generating plan..." : "Generate personalized plan"}
            </button>
          </div>

          {error ? <ValidationMessage type="warning" message={error} /> : null}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Generated plan</h3>
            <StatusBadge status={support.label} />
          </div>

          <div className="mb-4 rounded-xl border border-violet-500/25 bg-violet-500/5 p-4 text-sm text-violet-100">
            {plan.summary}
          </div>

          <div className="space-y-4">
            {plan.recommended_actions.map((task, index) => (
              <div key={task.title} className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{index + 1}. {task.title}</div>
                  <span className="rounded-full border border-teal-500/25 bg-teal-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-teal-200">{task.duration_minutes} min</span>
                </div>
                <p className="text-sm text-slate-300">{task.reason}</p>
                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-slate-400">
                  <span>{task.target_date}</span>
                  <span>{task.success_measure}</span>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-100">
                  <Check className="h-4 w-4" /> Mark complete
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-4">
            <div className="mb-2 flex items-center gap-2 text-violet-300"><Sparkles className="h-4 w-4" /> Teacher follow-up</div>
            <ul className="space-y-2 text-sm text-slate-300">
              {plan.teacher_follow_up.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
            <span className="font-medium text-white">Reflection question:</span> {plan.student_reflection_question}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
