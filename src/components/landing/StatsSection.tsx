import Image from "next/image";

const stats = [
  { value: "12,500+", label: "Verified Suppliers" },
  { value: "3,200+", label: "Active Buyers" },
  { value: "8,500+", label: "Products Listed" },
  { value: "45+", label: "Countries Connected" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-24 text-white">
      <Image
        alt="Commercial agriculture professional in a field"
        className="object-cover object-center"
        fill
        sizes="100vw"
        src="/images/landing/stats-background.png"
      />
      <div className="absolute inset-0 bg-[#0A4D2E80] " />
      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="text-4xl font-black tracking-tight sm:text-5xl">{item.value}</div>
            <div className="mt-5 text-[11px] font-black uppercase tracking-[0.14em] text-white/70">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
