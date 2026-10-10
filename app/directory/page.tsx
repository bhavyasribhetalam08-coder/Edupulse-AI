"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/ui";
import { getFilteredStudents, getSupportPriority } from "@/lib/analytics";
import { classes, students } from "@/lib/demo-data";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const availableSubjects = useMemo(() => Array.from(new Set(students.flatMap((student) => Object.keys(student.subjects)))), []);

  const visibleStudents = useMemo(
    () =>
      getFilteredStudents({
        search: query,
        classId: classFilter === "All" ? undefined : classFilter,
        priority: priorityFilter === "All" ? undefined : priorityFilter,
        subject: subjectFilter === "All" ? undefined : subjectFilter,
      }),
    [query, classFilter, priorityFilter, subjectFilter],
  );

  return (
    <AppShell title="Student directory" subtitle="Search, filter, and review support-priority indicators without exposing unnecessary personal details." current="Student directory">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center gap-2 text-violet-200">
            <SlidersHorizontal className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-[0.18em]">Directory filters</span>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <label className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                <Search className="h-4 w-4" /> Search
              </div>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Student ID or name" className="w-full bg-transparent text-white outline-none placeholder:text-slate-500" />
            </label>

            <label className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              <div className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-400">Class</div>
              <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="w-full bg-transparent text-white outline-none">
                <option value="All">All</option>
                {classes.map((classInfo) => (
                  <option key={classInfo.id} value={classInfo.id}>{classInfo.name}</option>
                ))}
              </select>
            </label>

            <label className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              <div className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-400">Priority</div>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="w-full bg-transparent text-white outline-none">
                <option value="All">All</option>
                <option value="Needs attention">Needs attention</option>
                <option value="Monitor">Monitor</option>
                <option value="On track">On track</option>
              </select>
            </label>

            <label className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              <div className="mb-2 text-xs uppercase tracking-[0.15em] text-slate-400">Subject</div>
              <select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} className="w-full bg-transparent text-white outline-none">
                <option value="All">All</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Student records</h3>
            <div className="text-sm text-slate-300">{visibleStudents.length} results</div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="pb-3 pr-5">Student</th>
                  <th className="pb-3 pr-5">Class</th>
                  <th className="pb-3 pr-5">Attendance</th>
                  <th className="pb-3 pr-5">Recent score</th>
                  <th className="pb-3 pr-5">Assignments</th>
                  <th className="pb-3 pr-5">Priority</th>
                  <th className="pb-3 pr-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((student) => {
                  const priority = getSupportPriority(student);
                  return (
                    <tr key={student.id} className="border-t border-slate-800">
                      <td className="py-3 pr-5 text-white">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-slate-400">{student.id}</div>
                      </td>
                      <td className="py-3 pr-5">{student.classId}</td>
                      <td className="py-3 pr-5">{student.attendance}%</td>
                      <td className="py-3 pr-5">{student.recentScore}%</td>
                      <td className="py-3 pr-5">{student.assignmentCompletion}%</td>
                      <td className="py-3 pr-5"><StatusBadge status={priority.label} /></td>
                      <td className="py-3 pr-5">
                        <Link href="/profile" className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200">View profile</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
