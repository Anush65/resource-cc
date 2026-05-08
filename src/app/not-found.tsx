import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-5xl font-bold text-ink/10">404</p>
      <h1 className="text-xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-xs text-sm text-ink/40">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-4 py-2 font-mono text-xs text-white transition-opacity hover:opacity-85"
      >
        Back to Hub
      </Link>
    </div>
  );
}