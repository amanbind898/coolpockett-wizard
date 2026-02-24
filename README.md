# CoolPockett — Account Opening Wizard

A mobile-first, 4-step account opening wizard built with Next.js, TypeScript, and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | React Context (`WizardContext`) |
| Persistence | `localStorage` via custom hook |
| Validation | Custom pure functions (`utils/validators.ts`) |

---

## Approach & Key Decisions

### State management — Context + localStorage
I chose React Context over Redux because the state is simple (one flat wizard object), and global state is only needed to share data between step components. All state is persisted to `localStorage` on every update via a custom `useLocalStorage` hook, which also includes an SSR guard (`typeof window === 'undefined'`) since this runs on Next.js.

### Validation — No form library
Validation is implemented as pure functions in `utils/validators.ts`. Each step has a `validateStepN(data) → errors` function that returns an object of field-keyed error strings (empty object = valid). This keeps validation logic testable, colocated, and completely decoupled from the UI. I deliberately avoided Formik or React Hook Form to demonstrate the fundamentals.

### Error ownership — lifted to Wizard.tsx
Error state lives in `Wizard.tsx` (the parent), not in each step. This ensures the Next button can gate navigation without needing refs or callbacks from children. Step components receive errors as props and are purely presentational.

### Step 3 conditional logic — two independent dimensions
Step 3 has two independent conditional sections: one driven by `accountType` (Individual/Business) and one driven by `country` (US/IN/Other). They are rendered as separate blocks in the JSX, making the logic straightforward to read and test.

### No validation library
A small regex is sufficient for email/phone. Using `validator.js` would add a dependency without meaningful benefit for this scope.

---

## Features

- ✅ 4-step wizard with Next/Back navigation
- ✅ Progress dot indicator (active step = pill shape)
- ✅ Step-level validation — errors shown inline, Next blocked until valid
- ✅ Resume after reload — localStorage persists step and all form data
- ✅ Mobile-first layout (fixed header + footer, scrollable content)
- ✅ Step 3 conditional fields by account type (Individual/Business)
- ✅ Step 3 conditional fields by country (US → State + SSN / IN → PAN / Other → National ID)
- ✅ Password strength indicator (Weak/Fair/Strong/Very Strong)
- ✅ Mock document upload widget showing filename
- ✅ Account preview widget (6 combinations of type × goal)
- ✅ Submit → confirmation screen with reference number
- ✅ Smooth fade-slide animation between steps

---

## What I Would Improve Next

**Animated field transitions in Step 3** — currently when the user switches account type (Individual → Business), the fields swap instantly. I'd add a CSS transition (opacity + height) or a library like Framer Motion so the conditional fields animate in/out smoothly, improving the perceived quality of the conditional UX.

---

## Project Structure

```
app/               → Next.js App Router entry
components/
  steps/           → Step1–Step4 components
  ui/              → Reusable primitives (Input, PasswordField, SelectCard, Chip, etc.)
context/           → WizardContext (state + updaters)
hooks/             → useLocalStorage (SSR-safe)
types/             → TypeScript interfaces
utils/             → validators.ts
```
