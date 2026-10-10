import { AppShell } from "@/components/app-shell";
import { ValidationMessage } from "@/components/ui";
import { defaultThresholds } from "@/lib/demo-data";

const thresholds = [
  { label: "Attendance threshold", value: defaultThresholds.attendance, unit: "%" },
  { label: "Assignment completion threshold", value: defaultThresholds.assignmentCompletion, unit: "%" },
  { label: "Assessment decline threshold", value: defaultThresholds.assessmentTrend, unit: "pts" },
  { label: "Risk score threshold", value: defaultThresholds.riskScore, unit: "pts" },
];

export default function SettingsPage() {
  return (
    <AppShell title="Settings and responsible AI" subtitle="Review thresholds, data-quality checks, and the rules that shape the support-priority indicator." current="Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">Indicator configuration</h3>
          <div className="mt-5 space-y-4">
            {thresholds.map((threshold) => (
              <div key={threshold.label} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{threshold.label}</span>
                  <span className="font-medium text-white">{threshold.value}{threshold.unit}</span>
                </div>
                <input type="range" min={0} max={100} defaultValue={threshold.value} className="w-full accent-violet-500" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">Load Demo Data</button>
            <button className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200">Reset Demo</button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">Responsible AI and data notes</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <p>Data freshness: last updated 2026-10-06. Current dataset includes demo records for multiple classes and representative scenarios.</p>
            <p>This support-priority indicator is a transparent rule-based method designed to help educators spot areas where additional attention may be useful.</p>
            <p>It should not replace professional judgement and must not be used for high-stakes decisions like admissions, grading, scholarships, or discipline.</p>
            <p>Real student data should only be used with institutional approval, clear consent or legal basis, and appropriate privacy safeguards.</p>
          </div>
          <ValidationMessage type="warning" message="AI provider status: deterministic demo fallback active. No secret keys are exposed in the client bundle." />
        </div>
      </div>
    </AppShell>
  );
}
