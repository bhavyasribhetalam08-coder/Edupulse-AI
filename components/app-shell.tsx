import Link from "next/link";
import { Activity, BarChart3, BrainCircuit, BookOpenCheck, Database, GraduationCap, Settings, Users } from "lucide-react";

const navItems = [
  { href: "/", label: "Landing", icon: BrainCircuit },
  { href: "/faculty", label: "Faculty dashboard", icon: Activity },
  { href: "/directory", label: "Student directory", icon: Users },
  { href: "/profile", label: "Student profile", icon: GraduationCap },
  { href: "/student", label: "Student portal", icon: BookOpenCheck },
  { href: "/coach", label: "Success coach", icon: BookOpenCheck },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/import", label: "Data import", icon: Database },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({
  title,
  subtitle,
  current,
  children,
}: {
  title: string;
  subtitle: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-violet-500/20 bg-slate-900/80 px-5 py-4 shadow-xl shadow-violet-950/20 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/15 p-2 text-violet-300">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-300">EduPulse AI</p>
                  <h1 className="text-2xl font-semibold text-white">{title}</h1>
                </div>
              </div>
              <p className="text-sm text-slate-300">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = current === label;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition ${
                      active
                        ? "border-violet-400 bg-violet-500/15 text-violet-100"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
