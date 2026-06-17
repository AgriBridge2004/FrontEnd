import Image from "next/image";

const members = [
  {
    name: "أحمد منصور",
    role: "الرئيس التنفيذي",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "سارة الخطيب",
    role: "رئيس التقنيات",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "عمر زيدان",
    role: "مدير المنتجات",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "ليلى حسن",
    role: "أخصائي عمليات",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "يوسف عبدالله",
    role: "مدير الجودة",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
];

export function TeamSection() {
  return (
    <section className="bg-[#f3f4f3] py-16 sm:py-20" id="team">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black text-emerald-950 sm:text-5xl">فريقنا</h2>
          <p className="mt-4 text-sm font-medium text-slate-600">
            نخبة من الخبراء في التكنولوجيا والزراعة
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <article
              className="rounded-xl bg-white px-5 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
              key={member.name}
            >
              <div className="relative mx-auto size-20 overflow-hidden rounded-full border-4 border-emerald-950/90 bg-emerald-50">
                <Image
                  alt={member.name}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={member.image}
                />
              </div>
              <h3 className="mt-6 text-xl font-black text-emerald-950">{member.name}</h3>
              <p className="mt-1 text-sm font-bold text-emerald-700">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
