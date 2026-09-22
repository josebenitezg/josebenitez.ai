"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <h1 className="title">Something went wrong.</h1>
      <p className="lede">{error.message || "An unexpected error occurred."}</p>
      <button type="button" onClick={reset} className="quiet-link mt-6">
        Try again
      </button>
    </>
  );
}
