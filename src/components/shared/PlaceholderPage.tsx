import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 lg:px-8" dir="ltr">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">AgriBridge</p>
        <h1 className="mt-4 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          This page is ready for future development.
        </p>
        <Link
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-bold text-white transition hover:bg-emerald-800"
          href="/"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
