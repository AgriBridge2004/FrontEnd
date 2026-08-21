export function MarketplaceHero() {
  return (
    <section
      className="relative overflow-hidden bg-slate-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/marketplace/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-emerald-50/90 to-white/10" />
      <div className="relative mx-auto flex min-h-[205px] max-w-[1320px] items-center px-4 py-10 sm:min-h-[220px] sm:px-6 lg:px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-normal text-emerald-900 sm:text-5xl">Marketplace</h1>
          <p className="mt-4 text-lg font-semibold leading-7 text-emerald-950/80">
            Browse verified products from local farmers
          </p>
        </div>
      </div>
    </section>
  );
}
