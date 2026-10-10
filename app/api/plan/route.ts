import { NextResponse } from "next/server";
import { getStudentById } from "@/lib/analytics";
import { generatePlanResponse, planRequestSchema } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = planRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { studentId, target, studyHours, selectedSubject } = parsed.data;
    const student = getStudentById(studentId);

    const payload = generatePlanResponse(
      student,
      target,
      Number.isFinite(studyHours) ? studyHours : 3,
      selectedSubject,
    );

    return NextResponse.json({ plan: payload, source: payload.source });
  } catch (error) {
    return NextResponse.json(
      {
        error: "The plan service could not create a recommendation.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
