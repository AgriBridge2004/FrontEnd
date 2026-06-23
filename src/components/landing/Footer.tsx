import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Leaf, Play, Send } from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: ["Browse Products", "Categories", "RFQ & Quotations", "All Listings"],
  },
  {
    title: "For Farmers",
    links: ["List Your Products", "How It Works", "Pricing", "Resources"],
  },
  {
    title: "For Buyers",
    links: ["Browse Suppliers", "How It Works", "Shipping & Delivery", "Buyer Guide"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Contact Us"],
  },
  {
    title: "Support",
    links: ["Help Center", "Terms & Conditions", "Privacy Policy", "FAQs"],
  },
];

const socials = [BadgeCheck, Leaf, Send, Play];

const footerLinkHrefs: Record<string, string> = {
  "All Listings": "/marketplace",
  "Browse Products": "/marketplace",
  "Browse Suppliers": "/marketplace",
  Categories: "/marketplace",
  "Contact Us": "#faq",
  FAQs: "#faq",
  "How It Works": "#how-it-works",
  "List Your Products": "/farmer/listings/create",
  "RFQ & Quotations": "/buyer/rfqs/create",
  Resources: "#faq",
};

export function Footer() {
  return (
    <footer className="bg-[#075934] px-6 py-10 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-9 lg:grid-cols-[1.9fr_repeat(5,1fr)]">
          <div>
            <Link className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/50" href="/">
              <span className="relative block h-10 w-[151px]">
                <Image
                  alt="AgriBridge logo"
                  className="object-contain"
                  fill
                  sizes="151px"
                  src="/images/brand/agribridge-logo.png"
                />
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-base font-medium leading-7 text-white/70">
              AgriBridge is a secure B2B marketplace connecting farmers and commercial buyers for
              transparent and efficient agricultural trade.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((Icon, index) => (
                <Link
                  aria-label={`Social link ${index + 1}`}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                  href="#faq"
                  key={index}
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-black">{column.title}</h2>
              <div className="mt-6 grid gap-4 text-sm font-medium text-white/55">
                {column.links.map((link) => (
                  <Link
                    className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    href={footerLinkHrefs[link] ?? "#faq"}
                    key={link}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="pt-7 text-center text-xs font-semibold text-white/45">
          © 2024 AgriBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
