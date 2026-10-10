import { AppShell } from "@/components/app-shell";
import { MetricCard, SectionHeader, StatusBadge } from "@/components/ui";
import { getClassMetrics, getFilteredStudents, getSupportPriority } from "@/lib/analytics";
import { classes, students } from "@/lib/demo-data";

export default function FacultyPage() {
  const metrics = getClassMetrics();
  const needsAttention = getFilteredStudents({ priority: "Needs attention" });
  const recentActivity = [
    { student: "Daniel Okafor", action: "Support plan generated", date: "Today" },
    { student: "Mason Patel", action: "Follow-up note recorded", date: "Yesterday" },
    { student: "Sofia Chen", action: "Task progress updated", date: "2 days ago" },
  ];

  return (
    <AppShell title="Faculty dashboard" subtitle="Track class readiness, review support-priority indicators, and monitor progress over time." current="Faculty dashboard">
      <div className="space-y-8">
        <SectionHeader eyebrow="Overview" title="Class-level snapshot" description="Displayed metrics are computed from the current demo dataset and refreshed as data changes." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total students" value={String(metrics.totalStudents)} delta="Across all selected classes" tone="violet" />
          <MetricCard label="Need attention" value={String(metrics.attention)} delta="Priority review list" tone="red" />
          <MetricCard label="Improving" value={String(metrics.improving)} delta="Positive assessment trend" tone="green" />
          <MetricCard label="Average attendance" value={`${Math.round(metrics.averageAttendance)}%`} delta="Current term snapshot" tone="teal" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Students requiring review</h3>
              <StatusBadge status="Needs attention" />
            </div>
            <div className="space-y-3">
              {needsAttention.slice(0, 6).map((student) => {
                const priority = getSupportPriority(student);
                return (
                  <div key={student.id} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 p-3">
                    <div>
                      <div className="font-medium text-white">{student.name}</div>
                      <div className="text-sm text-slate-300">{student.id} • {student.classId}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-violet-200">{priority.score} risk</div>
                      <div className="text-xs text-slate-400">{priority.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Recent support-plan activity</h3>
            <div className="space-y-3">
              {recentActivity.map((entry) => (
                <div key={entry.student + entry.action} className="rounded-xl border border-slate-700 bg-slate-950 p-3">
                  <div className="font-medium text-white">{entry.student}</div>
                  <div className="text-sm text-slate-300">{entry.action}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-400">{entry.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Current class mix</h3>
            <div className="text-sm text-slate-300">{classes.length} classes in view</div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="pb-3 pr-5">Class</th>
                  <th className="pb-3 pr-5">Students</th>
                  <th className="pb-3 pr-5">Attendance</th>
                  <th className="pb-3 pr-5">Assignments</th>
                  <th className="pb-3 pr-5">Priority</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classInfo) => {
                  const classStudents = students.filter((student) => student.classId === classInfo.id);
                  const attendance = classStudents.reduce((sum, student) => sum + student.attendance, 0) / classStudents.length;
                  const assignment = classStudents.reduce((sum, student) => sum + student.assignmentCompletion, 0) / classStudents.length;
                  const priority = classStudents.filter((student) => getSupportPriority(student).label === "Needs attention").length;
                  return (
                    <tr key={classInfo.id} className="border-t border-slate-800">
                      <td className="py-3 pr-5 text-white">{classInfo.name}</td>
                      <td className="py-3 pr-5">{classStudents.length}</td>
                      <td className="py-3 pr-5">{Math.round(attendance)}%</td>
                      <td className="py-3 pr-5">{Math.round(assignment)}%</td>
                      <td className="py-3 pr-5"><span className="text-red-200">{priority} needs attention</span></td>
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
