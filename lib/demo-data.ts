export type Student = {
  id: string;
  name: string;
  classId: string;
  attendance: number;
  recentScore: number;
  assignmentCompletion: number;
  studyHours: number;
  trend: number;
  confidence: number;
  selfReported: string;
  subjects: Record<string, number>;
  lastUpdated: string;
};

export type ClassInfo = {
  id: string;
  name: string;
  academicPeriod: string;
};

export const classes: ClassInfo[] = [
  { id: "CLS-9A", name: "Year 9A", academicPeriod: "Term 1" },
  { id: "CLS-9B", name: "Year 9B", academicPeriod: "Term 1" },
  { id: "CLS-10A", name: "Year 10A", academicPeriod: "Term 1" },
];

export const students: Student[] = [
  { id: "STU-001", name: "Aisha Rahman", classId: "CLS-9A", attendance: 91, recentScore: 82, assignmentCompletion: 94, studyHours: 4.8, trend: 6, confidence: 82, selfReported: "Feels confident in maths and science.", subjects: { Maths: 84, Science: 88, English: 79, Geography: 81 }, lastUpdated: "2026-10-04" },
  { id: "STU-002", name: "Daniel Okafor", classId: "CLS-9A", attendance: 76, recentScore: 68, assignmentCompletion: 71, studyHours: 2.6, trend: -8, confidence: 56, selfReported: "Struggles with algebra and misses revision sessions.", subjects: { Maths: 62, Science: 74, English: 69, Geography: 72 }, lastUpdated: "2026-10-05" },
  { id: "STU-003", name: "Priya Nair", classId: "CLS-9A", attendance: 83, recentScore: 78, assignmentCompletion: 67, studyHours: 3.2, trend: -5, confidence: 66, selfReported: "Assignments are late when there are multiple deadlines.", subjects: { Maths: 70, Science: 75, English: 81, Geography: 77 }, lastUpdated: "2026-10-03" },
  { id: "STU-004", name: "Leo Martins", classId: "CLS-9A", attendance: 95, recentScore: 87, assignmentCompletion: 93, studyHours: 5.3, trend: 4, confidence: 89, selfReported: "Very motivated and enjoys research tasks.", subjects: { Maths: 88, Science: 90, English: 83, Geography: 86 }, lastUpdated: "2026-10-04" },
  { id: "STU-005", name: "Sofia Chen", classId: "CLS-9A", attendance: 88, recentScore: 74, assignmentCompletion: 81, studyHours: 3.4, trend: -3, confidence: 64, selfReported: "Needs more structure for revision and writing practice.", subjects: { Maths: 78, Science: 76, English: 67, Geography: 75 }, lastUpdated: "2026-10-06" },
  { id: "STU-006", name: "Mason Patel", classId: "CLS-9B", attendance: 69, recentScore: 58, assignmentCompletion: 52, studyHours: 2.1, trend: -12, confidence: 42, selfReported: "Missed several lessons and finds catching up difficult.", subjects: { Maths: 55, Science: 63, English: 52, Geography: 59 }, lastUpdated: "2026-10-04" },
  { id: "STU-007", name: "Ivy Thompson", classId: "CLS-9B", attendance: 90, recentScore: 86, assignmentCompletion: 89, studyHours: 4.4, trend: 7, confidence: 85, selfReported: "Prefers short, focused study sessions.", subjects: { Maths: 86, Science: 87, English: 83, Geography: 88 }, lastUpdated: "2026-10-05" },
  { id: "STU-008", name: "Noah Lewis", classId: "CLS-9B", attendance: 72, recentScore: 61, assignmentCompletion: 58, studyHours: 2.4, trend: -10, confidence: 49, selfReported: "Low confidence in reading tasks and missing notes.", subjects: { Maths: 58, Science: 66, English: 57, Geography: 63 }, lastUpdated: "2026-10-03" },
  { id: "STU-009", name: "Zara Ali", classId: "CLS-9B", attendance: 94, recentScore: 91, assignmentCompletion: 97, studyHours: 5.2, trend: 9, confidence: 92, selfReported: "Enjoys challenge tasks and checking her progress.", subjects: { Maths: 92, Science: 88, English: 94, Geography: 91 }, lastUpdated: "2026-10-04" },
  { id: "STU-010", name: "Omar Hassan", classId: "CLS-9B", attendance: 81, recentScore: 70, assignmentCompletion: 63, studyHours: 3.1, trend: -4, confidence: 60, selfReported: "Needs help with time management and revision planning.", subjects: { Maths: 68, Science: 72, English: 69, Geography: 71 }, lastUpdated: "2026-10-06" },
  { id: "STU-011", name: "Ella Johnson", classId: "CLS-10A", attendance: 88, recentScore: 80, assignmentCompletion: 82, studyHours: 3.9, trend: 2, confidence: 75, selfReported: "Shows steady progress after a structured plan.", subjects: { Maths: 83, Science: 78, English: 82, Geography: 80 }, lastUpdated: "2026-10-05" },
  { id: "STU-012", name: "Theo Walker", classId: "CLS-10A", attendance: 77, recentScore: 73, assignmentCompletion: 65, studyHours: 2.8, trend: -6, confidence: 58, selfReported: "Feeling overwhelmed by science content and quick deadlines.", subjects: { Maths: 74, Science: 63, English: 75, Geography: 78 }, lastUpdated: "2026-10-04" },
  { id: "STU-013", name: "Harper Moore", classId: "CLS-10A", attendance: 92, recentScore: 89, assignmentCompletion: 96, studyHours: 5.6, trend: 8, confidence: 90, selfReported: "Strong weekly habits and clear learning goals.", subjects: { Maths: 90, Science: 89, English: 88, Geography: 87 }, lastUpdated: "2026-10-05" },
  { id: "STU-014", name: "Lucas Rivera", classId: "CLS-10A", attendance: 65, recentScore: 60, assignmentCompletion: 46, studyHours: 1.8, trend: -15, confidence: 38, selfReported: "Needs regular check-ins and practical catch-up support.", subjects: { Maths: 57, Science: 59, English: 62, Geography: 61 }, lastUpdated: "2026-10-03" },
  { id: "STU-015", name: "Mila Petrova", classId: "CLS-10A", attendance: 86, recentScore: 77, assignmentCompletion: 88, studyHours: 4.1, trend: 5, confidence: 73, selfReported: "Improving after organizing revision tasks.", subjects: { Maths: 78, Science: 74, English: 81, Geography: 76 }, lastUpdated: "2026-10-04" },
  { id: "STU-016", name: "Ethan Brooks", classId: "CLS-9A", attendance: 74, recentScore: 66, assignmentCompletion: 61, studyHours: 2.7, trend: -7, confidence: 52, selfReported: "Missed some assignments while balancing outside commitments.", subjects: { Maths: 64, Science: 72, English: 58, Geography: 68 }, lastUpdated: "2026-10-05" },
  { id: "STU-017", name: "Grace Kim", classId: "CLS-9B", attendance: 89, recentScore: 84, assignmentCompletion: 90, studyHours: 4.2, trend: 3, confidence: 81, selfReported: "Consistent study routine supports steady progress.", subjects: { Maths: 81, Science: 87, English: 88, Geography: 82 }, lastUpdated: "2026-10-04" },
  { id: "STU-018", name: "Nathan Hall", classId: "CLS-10A", attendance: 84, recentScore: 75, assignmentCompletion: 77, studyHours: 3.6, trend: -2, confidence: 68, selfReported: "Needs more support on science vocabulary and retrieval practice.", subjects: { Maths: 79, Science: 69, English: 80, Geography: 72 }, lastUpdated: "2026-10-06" },
  { id: "STU-019", name: "Lily Scott", classId: "CLS-9B", attendance: 96, recentScore: 93, assignmentCompletion: 98, studyHours: 5.8, trend: 12, confidence: 95, selfReported: "Enjoys working ahead and checking feedback.", subjects: { Maths: 95, Science: 91, English: 94, Geography: 90 }, lastUpdated: "2026-10-05" },
  { id: "STU-020", name: "Arjun Singh", classId: "CLS-9A", attendance: 80, recentScore: 72, assignmentCompletion: 70, studyHours: 2.9, trend: -4, confidence: 63, selfReported: "Needs help improving English writing and completing rough drafts.", subjects: { Maths: 76, Science: 73, English: 65, Geography: 75 }, lastUpdated: "2026-10-04" },
  { id: "STU-021", name: "Chloe Evans", classId: "CLS-10A", attendance: 93, recentScore: 88, assignmentCompletion: 91, studyHours: 4.9, trend: 4, confidence: 86, selfReported: "Strong self-review routine is helping her stay organized.", subjects: { Maths: 86, Science: 90, English: 85, Geography: 89 }, lastUpdated: "2026-10-05" },
  { id: "STU-022", name: "Isaac Ford", classId: "CLS-9B", attendance: 71, recentScore: 64, assignmentCompletion: 54, studyHours: 2.3, trend: -9, confidence: 46, selfReported: "Feels out of step and needs a clear catch-up plan.", subjects: { Maths: 60, Science: 68, English: 59, Geography: 66 }, lastUpdated: "2026-10-03" },
  { id: "STU-023", name: "Ruby Nguyen", classId: "CLS-10A", attendance: 89, recentScore: 83, assignmentCompletion: 86, studyHours: 4.5, trend: 6, confidence: 79, selfReported: "Very receptive to short feedback loops.", subjects: { Maths: 85, Science: 80, English: 84, Geography: 82 }, lastUpdated: "2026-10-04" },
  { id: "STU-024", name: "Henry Foster", classId: "CLS-9B", attendance: 68, recentScore: 59, assignmentCompletion: 49, studyHours: 1.6, trend: -18, confidence: 35, selfReported: "Signs of disengagement and missed support conversations.", subjects: { Maths: 53, Science: 62, English: 54, Geography: 60 }, lastUpdated: "2026-10-06" },
];

export const defaultThresholds = {
  attendance: 80,
  assignmentCompletion: 70,
  assessmentTrend: -8,
  riskScore: 50,
};

export const defaultDemoRole = "Faculty";
