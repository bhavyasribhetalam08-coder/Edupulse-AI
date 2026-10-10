"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/ui";
import { getSubjectSummary } from "@/lib/analytics";
import { students } from "@/lib/demo-data";

const attendanceTrend = [
  { label: "Week 1", value: 78 },
  { label: "Week 2", value: 81 },
  { label: "Week 3", value: 79 },
  { label: "Week 4", value: 84 },
  { label: "Week 5", value: 87 },
];

const scoreTrend = [
  { label: "Cycle 1", value: 65 },
  { label: "Cycle 2", value: 68 },
  { label: "Cycle 3", value: 72 },
  { label: "Cycle 4", value: 76 },
  { label: "Cycle 5", value: 74 },
];

const completionTrend = [
  { label: "Week 1", value: 62 },
  { label: "Week 2", value: 67 },
  { label: "Week 3", value: 64 },
  { label: "Week 4", value: 75 },
  { label: "Week 5", value: 81 },
];

const priorities = [
  { name: "Needs attention", value: students.filter((student) => student.assignmentCompletion < 70 || student.attendance < 80).length },
  { name: "Monitor", value: students.filter((student) => student.assignmentCompletion >= 70 && student.assignmentCompletion < 85).length },
  { name: "On track", value: students.filter((student) => student.assignmentCompletion >= 85 && student.attendance >= 80).length },
];

const pieColors = ["#f87171", "#fbbf24", "#34d399"];

export default function AnalyticsPage() {
  const subjectSummary = getSubjectSummary();

  return (
    <AppShell title="Analytics and insights" subtitle="Review trends, support-priority distribution, and success-plan completion using the current dataset." current="Analytics">
      <div className="space-y-8">
        <SectionHeader eyebrow="Metrics" title="Trend analysis" description="Charts use the demo dataset only and are intended to support professional review rather than act as causal proof." />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Attendance trend</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrend}>
                  <defs>
                    <linearGradient id="attendanceFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[60, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#attendanceFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Assessment performance</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreTrend}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[50, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2dd4bf" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Assignment completion</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={completionTrend}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[50, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.12} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Support-priority distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={priorities} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {priorities.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              {priorities.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index] }} /> {item.name}</span>
                  <span>{item.value} students</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Subject-wise performance</h3>
          <div className="space-y-3">
            {subjectSummary.map((subject) => (
              <div key={subject.subject}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                  <span>{subject.subject}</span>
                  <span>{subject.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-teal-400" style={{ width: `${subject.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
