import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-stone-100">
        Page not found.
      </h1>
      <p className="mt-4 text-stone-400">
        The page you&apos;re looking for does not exist.
      </p>
      <Link href="/" className="button mt-7">
        Return home
      </Link>
    </div>
  );
}
