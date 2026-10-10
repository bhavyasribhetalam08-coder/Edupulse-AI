import { z } from "zod";

export const planRequestSchema = z.object({
  studentId: z.string().min(3),
  target: z.string().min(3),
  studyHours: z.number().min(1).max(10),
  selectedSubject: z.string().min(2),
});

export const planResponseSchema = z.object({
  summary: z.string(),
  observed_factors: z.array(z.string()),
  data_limitations: z.array(z.string()),
  recommended_actions: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
      duration_minutes: z.number().min(10).max(90),
      target_date: z.string().min(8),
      success_measure: z.string(),
    }),
  ),
  teacher_follow_up: z.array(z.string()),
  student_reflection_question: z.string(),
  source: z.enum(["deterministic-fallback", "ai-provider"]),
});

export function generateFallbackPlan(student: { name: string; id: string; subjects: Record<string, number>; attendance: number; assignmentCompletion: number; studyHours: number }, target: string, studyHours: number, selectedSubject: string) {
  const subject = selectedSubject || Object.entries(student.subjects).sort((a, b) => a[1] - b[1])[0][0];
  const tasks = [
    {
      title: `Review ${subject} notes and identify the top 3 gaps`,
      reason: `This helps convert recent uncertainty into a focused revision block before the next assessment.`,
      duration_minutes: Math.min(35, Math.max(20, Math.round(studyHours * 8))),
      target_date: "2026-10-12",
      success_measure: "Notes are updated and a short list of gaps is written down.",
    },
    {
      title: "Complete one short practice set in the selected subject",
      reason: "Regular retrieval practice strengthens understanding and reduces last-minute panic.",
      duration_minutes: 25,
      target_date: "2026-10-13",
      success_measure: "At least one timed practice set is completed and checked.",
    },
    {
      title: `Submit or resubmit overdue work linked to ${subject}`,
      reason: "Missing work compounds the challenge; closing the gap early reduces stress and improves momentum.",
      duration_minutes: 30,
      target_date: "2026-10-14",
      success_measure: "The assignment is submitted or checked off as complete.",
    },
    {
      title: "Use a 15-minute reflection check after each study session",
      reason: "A brief reflection helps the learner notice progress and improve study habits.",
      duration_minutes: 15,
      target_date: "2026-10-15",
      success_measure: "A reflection note is recorded about what improved and what to try next.",
    },
    {
      title: "Review progress and set a next-step goal for the week",
      reason: "This keeps the plan anchored to observable results rather than a vague intention.",
      duration_minutes: 20,
      target_date: "2026-10-16",
      success_measure: "A short goal and next study step are written down for the following week.",
    },
  ];

  return {
    summary: `${student.name} can benefit from a short, structured plan focused on ${target.toLowerCase()} and ${subject.toLowerCase()} improvement. The plan is intentionally realistic given the current attendance and assignment trend.`,
    observed_factors: [
      `${student.attendance}% attendance suggests a need for stronger routine and catch-up steps.`,
      `${student.assignmentCompletion}% assignment completion indicates some overdue work remains.`,
      `Recent subject performance highlights ${subject} as a priority area for support.`,
    ],
    data_limitations: [
      "This plan uses current demo data and does not replace a teacher's professional judgement.",
      "Study hours are self-reported and may change from week to week.",
    ],
    recommended_actions: tasks.map((task) => ({
      title: task.title,
      reason: task.reason,
      duration_minutes: task.duration_minutes,
      target_date: task.target_date,
      success_measure: task.success_measure,
    })),
    teacher_follow_up: [
      "Review whether the student is missing key concept explanations in the selected subject.",
      "Confirm whether teacher feedback or catch-up tasks need to be scheduled after the plan.",
    ],
    student_reflection_question: "What one change this week made the biggest difference to your confidence or understanding?",
    source: "deterministic-fallback",
  };
}

export function generatePlanResponse(student: { name: string; id: string; subjects: Record<string, number>; attendance: number; assignmentCompletion: number; studyHours: number }, target: string, studyHours: number, selectedSubject: string) {
  const parsed = planResponseSchema.safeParse(generateFallbackPlan(student, target, studyHours, selectedSubject));
  if (!parsed.success) {
    throw new Error("Fallback plan output did not pass validation.");
  }
  return parsed.data;
}
