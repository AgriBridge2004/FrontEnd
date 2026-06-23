"use client";

import { BadgeCheck, ChevronDown, ClipboardList, Truck, UserPlus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I register as a seller on AgriBridge?",
    answer: "Create an account, choose supplier access, and complete the verification details.",
    icon: UserPlus,
  },
  {
    question: "What guarantees does the platform provide for buyers?",
    answer: "Verified suppliers, escrow workflows, and digital contract records help protect each trade.",
    icon: BadgeCheck,
  },
  {
    question: "How are agricultural products shipped?",
    answer: "Shipping terms are agreed during the deal, with logistics details captured before payment release.",
    icon: Truck,
  },
  {
    question: "Are there fees for posting Requests for Quotation (RFQ)?",
    answer: "RFQ posting can be configured by plan; the landing page currently keeps pricing informational.",
    icon: ClipboardList,
  },
];

export function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 px-6 py-10 pb-8 lg:px-10" id="faq">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <span className="mx-auto mt-5 block h-1.5 w-20 rounded-full bg-emerald-700" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {faqs.map((faq) => {
            const Icon = faq.icon;
            const isOpen = openQuestion === faq.question;

            return (
              <article
                className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5"
                key={faq.question}
              >
                <button
                  className="flex w-full items-center gap-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-600/40 sm:gap-5"
                  onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                  type="button"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="size-6" strokeWidth={2.2} />
                  </span>
                  <span className="flex-1 text-lg font-black leading-7 text-slate-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-6 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-500 sm:pl-[68px]">
                    {faq.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
