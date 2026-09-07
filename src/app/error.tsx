"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="state-room">
      <p className="observatory-label">Error</p>
      <h1>Something went wrong.</h1>
      <p className="mt-4 max-w-md text-stone-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button type="button" onClick={reset} className="button mt-7">
        Try again
      </button>
    </div>
  );
}
