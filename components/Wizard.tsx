"use client"

export default function Wizard() {
  const step = 1; // will come from context later

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto">

      {/* ZONE 1 — Fixed Header */}
      <header className="flex items-center justify-center px-4 py-4 border-b relative">
        {step > 1 && (
          <button className="absolute left-4" onClick={() => {}}>←</button>
        )}
        <h1 className="text-sm font-semibold tracking-wide">
          {['Account basics', 'Account setup', 'Details', 'Review'][step - 1]}
        </h1>
      </header>

      {/* ZONE 2 — Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Progress dots go here, inside content at top */}
        {/* Step component renders here */}
      </main>

      {/* ZONE 3 — Fixed Footer */}
      <footer className="border-t px-6 py-4">
        <p className="text-center text-xs text-gray-400 mb-3">Step {step} of 4</p>
        <div className="flex gap-3">
          {step > 1 && <button className="flex-1 border rounded-lg py-3">Back</button>}
          <button className="flex-1 bg-black text-white rounded-lg py-3">
            {step === 4 ? 'Submit' : 'Next'}
          </button>
        </div>
      </footer>

    </div>
  )
}