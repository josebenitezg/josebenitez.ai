"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 text-4xl font-semibold text-stone-100">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-stone-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button type="button" onClick={reset} className="button mt-7">
        Try again
      </button>
    </div>
  );
}
