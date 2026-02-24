# debug-notes.md

## Bug: Country-driven fields not clearing when country changes in Step 1

### What happened

During testing I noticed that if a user fills in Step 1 with **country = US** (which causes SSN last 4 and State fields to appear in Step 3), then goes **back to Step 1** and changes the country to **India**, the Step 3 review screen would still show the previously entered `state` and `ssnLast4` values — even though those fields were no longer visible.

This meant the **Review screen showed stale data** from the US-specific fields alongside the new PAN field, which was both confusing and incorrect.

### Root cause

The Step 3 form conditionally renders fields based on `step1.country`. When country changes, the JSX for US-specific inputs unmounts, but the underlying values (`state`, `ssnLast4`) in `WizardContext` state remain unchanged — there was no cleanup logic when the country field updates.

This is a classic "stale conditional state" bug that happens when conditional form fields share a single state object.

### Fix

I added a `useEffect` in `Step3Details.tsx` (alternatively could be handled in `updateStep1`) that watches `step1.country` and clears the country-specific fields whenever it changes:

```ts
// In Step3Details.tsx — clear country-specific fields on country change
useEffect(() => {
  updateStep3({ state: '', ssnLast4: '', pan: '', nationalId: '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [step1.country]);
```

**Why not in `updateStep1`?** Clearing there would wipe the fields every time anything in step1 changed (e.g. typing in the name field), which is undesirable. Scoping the effect to `step1.country` changes only is more precise.

**Trade-off:** The downside is that if a user accidentally changes country and then changes it back, they have to re-enter their SSN/PAN. Acceptable for a compliance-sensitive flow where stale data is a bigger risk than re-entry friction.
