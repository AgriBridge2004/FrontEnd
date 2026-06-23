import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="bg-slate-50 px-6 pb-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[28px] bg-[#2e8431] px-8 py-7 text-white shadow-sm sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Still have questions?</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Our team is always available to help with any inquiries regarding the platform. We are
            here to ensure the success of your agricultural trade.
          </p>
        </div>
        <Link
          className="inline-flex h-16 shrink-0 items-center justify-center rounded-full bg-white px-12 text-lg font-black text-[#2e8431] shadow-lg shadow-emerald-950/10 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#2e8431]"
          href="#faq"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
