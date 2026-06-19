const stats = [
  { value: "+10,000", label: "مزارع" },
  { value: "+5,000", label: "مشتري" },
  { value: "+50,000", label: "صفقة" },
  { value: "+20,000", label: "طن منتجات" },
  { value: "95%", label: "نسبة رضا" },
  { value: "15", label: "محافظة" },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black text-emerald-950 sm:text-5xl">تأثيرنا بالأرقام</h2>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <p className="text-4xl font-black leading-none text-emerald-800 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-bold text-slate-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 h-8 bg-emerald-950" />
    </section>
  );
}
