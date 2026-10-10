import { CheckCircle2, TriangleAlert, XCircle } from "lucide-react";

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}

export function MetricCard({ label, value, delta, tone = "violet" }: { label: string; value: string; delta?: string; tone?: "violet" | "teal" | "amber" | "red" | "green" }) {
  const toneClasses = {
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    teal: "border-teal-500/30 bg-teal-500/10 text-teal-200",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    red: "border-red-500/30 bg-red-500/10 text-red-200",
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  };

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-300">{label}</div>
      <div className="text-3xl font-semibold text-white">{value}</div>
      {delta ? <div className="mt-2 text-xs text-slate-300">{delta}</div> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const upper = status.toLowerCase();
  const palette =
    upper.includes("needs") || upper.includes("red")
      ? "border-red-500/30 bg-red-500/10 text-red-200"
      : upper.includes("monitor") || upper.includes("amber")
        ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${palette}`}>{status}</span>;
}

export function ValidationMessage({ type, message }: { type: "success" | "warning" | "error"; message: string }) {
  const config = {
    success: { icon: CheckCircle2, className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" },
    warning: { icon: TriangleAlert, className: "border-amber-500/30 bg-amber-500/10 text-amber-200" },
    error: { icon: XCircle, className: "border-red-500/30 bg-red-500/10 text-red-200" },
  };

  const { icon: Icon, className } = config[type];
  return (
    <div className={`mt-4 flex items-start gap-3 rounded-xl border p-3 ${className}`}>
      <Icon className="mt-0.5 h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
