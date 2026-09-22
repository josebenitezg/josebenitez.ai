import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="title">Page not found.</h1>
      <Link href="/" className="quiet-link">
        ← Home
      </Link>
    </>
  );
}
