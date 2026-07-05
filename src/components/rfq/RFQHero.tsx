export function RFQHero() {
  return (
    <section
      className="relative overflow-hidden bg-emerald-950 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/rfq/rfq-hero.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-950/20" />
      <div className="relative mx-auto flex min-h-[230px] max-w-[1280px] items-center px-5 py-10 sm:min-h-[245px] sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-normal text-white">Request for Quotation</h1>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-white/90">
            Browse active requests from institutional buyers or submit your competitive offers to bridge the gap between farm and market.
          </p>
        </div>
      </div>
    </section>
  );
}
