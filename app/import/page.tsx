"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import { AppShell } from "@/components/app-shell";
import { ValidationMessage } from "@/components/ui";

const requiredColumns = ["student_id", "attendance", "recent_score", "assignment_completion", "class_id"];

export default function ImportPage() {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "preview" | "ready">("idle");

  const previewSummary = useMemo(() => {
    if (!rows.length) return "No rows imported yet.";
    return `${rows.length} rows ready for review.`;
  }, [rows]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data.filter((row) => Object.keys(row).length > 0);
        const missing = requiredColumns.filter((column) => !Object.keys(parsedRows[0] ?? {}).includes(column));
        const validationErrors: string[] = [];

        if (missing.length) {
          validationErrors.push(`Missing required columns: ${missing.join(", ")}`);
        }

        parsedRows.forEach((row, index) => {
          const studentId = row.student_id ?? "";
          const attendance = Number(row.attendance ?? "");
          const recentScore = Number(row.recent_score ?? "");
          const assignmentCompletion = Number(row.assignment_completion ?? "");

          if (!studentId) validationErrors.push(`Row ${index + 2}: student_id is required.`);
          if (Number.isNaN(attendance) || attendance < 0 || attendance > 100) validationErrors.push(`Row ${index + 2}: attendance must be a valid percentage between 0 and 100.`);
          if (Number.isNaN(recentScore) || recentScore < 0 || recentScore > 100) validationErrors.push(`Row ${index + 2}: recent_score must be a valid percentage.`);
          if (Number.isNaN(assignmentCompletion) || assignmentCompletion < 0 || assignmentCompletion > 100) validationErrors.push(`Row ${index + 2}: assignment_completion must be a valid percentage.`);
        });

        setErrors(validationErrors);
        setRows(parsedRows);
        setStatus(parsedRows.length ? "preview" : "idle");
      },
      error: () => {
        setErrors(["The CSV could not be parsed. Please check that the file is valid UTF-8 text."]);
        setRows([]);
        setStatus("idle");
      },
    });
  };

  return (
    <AppShell title="Data import and quality" subtitle="Upload a CSV, validate the schema, review errors, and confirm the data before it feeds a dashboard calculation." current="Data import">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">Upload CSV</h3>
          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-500/40 bg-slate-950 px-6 py-10 text-center text-sm text-slate-300">
            <span className="mb-2 rounded-full bg-violet-500/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-violet-200">Choose file</span>
            CSV with columns: student_id, attendance, recent_score, assignment_completion, class_id
            <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
          </label>

          {status === "preview" ? (
            <ValidationMessage type="success" message={previewSummary} />
          ) : null}

          {errors.length ? (
            <ValidationMessage type="error" message={errors[0]} />
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">Preview</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="pb-3 pr-5">student_id</th>
                  <th className="pb-3 pr-5">attendance</th>
                  <th className="pb-3 pr-5">recent_score</th>
                  <th className="pb-3 pr-5">assignment_completion</th>
                  <th className="pb-3 pr-5">class_id</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 5).map((row, index) => (
                  <tr key={`${row.student_id ?? index}`} className="border-t border-slate-800">
                    <td className="py-3 pr-5 text-white">{row.student_id ?? "—"}</td>
                    <td className="py-3 pr-5">{row.attendance ?? "—"}</td>
                    <td className="py-3 pr-5">{row.recent_score ?? "—"}</td>
                    <td className="py-3 pr-5">{row.assignment_completion ?? "—"}</td>
                    <td className="py-3 pr-5">{row.class_id ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
