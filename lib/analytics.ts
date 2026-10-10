import { defaultThresholds, students, type Student } from "@/lib/demo-data";

export type SupportPriority = "Needs attention" | "Monitor" | "On track";

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getSupportPriority(student: Student, thresholds = defaultThresholds) {
  const factors: { title: string; evidence: string; severity: "high" | "medium" | "low" }[] = [];
  let score = 0;

  if (student.attendance < thresholds.attendance) {
    factors.push({
      title: "Attendance is below target",
      evidence: `${student.attendance}% attendance vs ${thresholds.attendance}% threshold`,
      severity: "high",
    });
    score += 32;
  }

  if (student.assignmentCompletion < thresholds.assignmentCompletion) {
    factors.push({
      title: "Assignment completion is low",
      evidence: `${student.assignmentCompletion}% completed vs ${thresholds.assignmentCompletion}% target`,
      severity: "high",
    });
    score += 28;
  }

  if (student.trend < thresholds.assessmentTrend) {
    factors.push({
      title: "Recent assessment trend is declining",
      evidence: `Average change is ${student.trend} points across recent assessment cycles`,
      severity: "medium",
    });
    score += 25;
  }

  if (student.studyHours < 3) {
    factors.push({
      title: "Study time is low",
      evidence: `${student.studyHours.toFixed(1)} hours logged in the recent week`,
      severity: "medium",
    });
    score += 15;
  }

  if (student.confidence < 60) {
    factors.push({
      title: "Confidence is low",
      evidence: `Self-reported confidence score is ${student.confidence}/100`,
      severity: "medium",
    });
    score += 10;
  }

  let label: SupportPriority = "On track";
  if (score >= 60) label = "Needs attention";
  else if (score >= 35) label = "Monitor";

  return {
    label,
    score,
    factors,
    summary:
      label === "Needs attention"
        ? "Several indicators align to suggest meaningful support may help before performance falls further."
        : label === "Monitor"
          ? "Some indicators need closer attention and a short support plan, but there is room to improve with structured follow-up."
          : "Current indicators are stable. Continue monitoring to keep momentum and address emerging issues early.",
  };
}

export function getStudentById(studentId: string) {
  return students.find((student) => student.id === studentId) ?? students[0];
}

export function getClassMetrics() {
  const totalStudents = students.length;
  const attention = students.filter((student) => getSupportPriority(student).label === "Needs attention").length;
  const improving = students.filter((student) => student.trend > 0).length;
  const averageAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
  const averageAssignment = students.reduce((sum, student) => sum + student.assignmentCompletion, 0) / totalStudents;
  const averageScore = students.reduce((sum, student) => sum + student.recentScore, 0) / totalStudents;

  return {
    totalStudents,
    attention,
    improving,
    averageAttendance,
    averageAssignment,
    averageScore,
  };
}

export function getSubjectSummary() {
  const subjectNames = Object.keys(students[0]?.subjects ?? {});
  return subjectNames.map((subject) => {
    const average = students.reduce((sum, student) => sum + (student.subjects[subject] ?? 0), 0) / students.length;
    return { subject, value: Number(average.toFixed(1)) };
  });
}

export function sortStudents(list: Student[], key: string, direction: "asc" | "desc") {
  const sorted = [...list];

  sorted.sort((a, b) => {
    const aValue = key === "name" ? a.name : key === "attendance" ? a.attendance : key === "assignmentCompletion" ? a.assignmentCompletion : key === "recentScore" ? a.recentScore : a.id;
    const bValue = key === "name" ? b.name : key === "attendance" ? b.attendance : key === "assignmentCompletion" ? b.assignmentCompletion : key === "recentScore" ? b.recentScore : b.id;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return direction === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
  });

  return sorted;
}

export function getFilteredStudents({ search = "", classId, priority, subject }: { search?: string; classId?: string; priority?: string; subject?: string }) {
  return students.filter((student) => {
    const matchesSearch = search.trim() === "" || student.name.toLowerCase().includes(search.toLowerCase()) || student.id.toLowerCase().includes(search.toLowerCase());
    const matchesClass = !classId || student.classId === classId;
    const matchesPriority = !priority || getSupportPriority(student).label === priority;
    const matchesSubject = !subject || (student.subjects[subject] !== undefined && student.subjects[subject] > 0);
    return matchesSearch && matchesClass && matchesPriority && matchesSubject;
  });
}
