# EduPulse AI

EduPulse AI is a demo education analytics and intervention platform built as a full-stack MVP for the HacXlerate 2026 challenge brief. The product focuses on the Explainable Success Loop: data → early signal → explanation → action → progress tracking.

## What is included

- Premium landing page with product overview and interactive preview
- Faculty dashboard with computed metrics from dataset
- Student directory with search, filters, and student profile access
- Explainable support-priority indicator using transparent rules
- AI success coach with deterministic fallback recommendation engine
- Analytics charts for attendance, assessment, assignment, and subject performance
- CSV import preview and validation workflow
- Settings page with thresholds, data-quality notes, and demo controls

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Recharts
- Zod
- Papa Parse
- Lucide icons

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

Optional AI configuration:

```bash
cp .env.example .env.local
```

Set `AI_API_KEY` only if you want to connect an external provider. If no key is configured, the app uses a deterministic fallback recommendation engine and clearly labels it as such.

## Demo workflow

1. Open the faculty dashboard.
2. Review the summary metrics for the class dataset.
3. Open the student profile for Daniel Okafor.
4. Launch the Success Coach.
5. Generate a plan for improving Maths confidence.
6. Review rationale and mark a task complete.
7. Return to the settings or analytics views to confirm the updated state.

## Build and verification

```bash
npm run build
npm run lint
```

## Notes

- The product intentionally uses demo data and does not claim real institutional performance.
- The support-priority indicator is a human-readable signal for early support, not a validated prediction of academic failure.
- This is a demo implementation that keeps the full user workflow working without external credentials.

## Suggested two-minute demo script

"EduPulse AI helps educators identify early support needs, explain why a student may be struggling, and turn that insight into a practical seven-day plan. In the faculty dashboard, we can see that the class has several students flagged for attention. Looking at Daniel’s profile, the risk indicator is driven by lower attendance, declining assessment trend, and incomplete assignments rather than a single score. From the Success Coach, we generate a personalized plan focused on Maths confidence and overdue work. Each recommendation includes a reason, a time estimate, and a completion measure. We mark a task complete and the workflow shows progress in a supportive, realistic way."

# Edupulse-AI
