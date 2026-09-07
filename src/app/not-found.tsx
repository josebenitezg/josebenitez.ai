import Link from "next/link";

export default function NotFound() {
  return (
    <div className="state-room">
      <p className="observatory-label">404</p>
      <h1>A path yet to be drawn.</h1>
      <p className="mt-4 text-stone-400">
        This page isn’t in the observatory. There’s more to explore back at the
        beginning.
      </p>
      <Link href="/" className="observatory-link">
        Return home
      </Link>
    </div>
  );
}
