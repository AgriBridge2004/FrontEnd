import { BadgeCheck, FileCheck, ShieldCheck, Tractor } from "lucide-react";

import type { DigitalContract } from "@/components/farmer/deals/contract/contract.types";

type ContractDocumentProps = {
  contract: DigitalContract;
};

export function ContractDocument({ contract }: ContractDocumentProps) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white shadow-sm print:rounded-none print:border-0 print:bg-white print:shadow-none">
      <header className="border-b border-emerald-100 px-6 py-8 text-center">
        <div className="inline-flex items-center gap-2 text-2xl font-black text-emerald-800">
          <Tractor className="size-7" />
          AgriBridge
        </div>
        <h2 className="mt-5 font-serif text-xl font-black uppercase tracking-[0.22em] text-slate-700">
          Agricultural Sales Agreement
        </h2>
        <p className="mt-3 text-sm font-medium text-slate-600">Contract ID: {contract.contractId}</p>
      </header>

      <div className="space-y-8 px-6 py-7">
        <ContractPartiesSection contract={contract} />
        <ContractCommoditySection contract={contract} />
        <ContractTermsSection />
        <ContractSignatureSection contract={contract} />
      </div>
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-emerald-200 pb-2 text-xs font-black uppercase tracking-wider text-emerald-800">
      {children}
    </h3>
  );
}

function ContractPartiesSection({ contract }: ContractDocumentProps) {
  return (
    <section className="break-inside-avoid">
      <SectionTitle>1. Parties Involved</SectionTitle>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <PartyCard
          details={[`Authorized: ${contract.seller.authorizedBy}`, contract.seller.address]}
          name={contract.seller.farmName}
          title="The Seller (Farmer)"
        />
        <PartyCard
          details={[`Authorized: ${contract.buyer.authorizedBy}`, contract.buyer.address]}
          name={contract.buyer.companyName}
          title="The Buyer"
        />
      </div>
    </section>
  );
}

type PartyCardProps = {
  details: string[];
  name: string;
  title: string;
};

function PartyCard({ details, name, title }: PartyCardProps) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-slate-50/60 p-4">
      <p className="text-xs font-black text-slate-600">{title}</p>
      <p className="mt-2 text-lg font-black text-slate-950">{name}</p>
      {details.map((detail) => (
        <p className="mt-1 text-sm font-medium text-slate-600" key={detail}>
          {detail}
        </p>
      ))}
    </div>
  );
}

function ContractCommoditySection({ contract }: ContractDocumentProps) {
  return (
    <section className="break-inside-avoid">
      <SectionTitle>2. Commodity & Pricing</SectionTitle>
      <div className="mt-4 overflow-hidden rounded-xl border border-emerald-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="bg-slate-50 text-sm font-black text-slate-600">
              <tr>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Quantity</th>
                <th className="px-4 py-4">Unit Price</th>
                <th className="px-4 py-4">Total Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-emerald-100">
                <td className="px-4 py-4 font-black text-slate-950">{contract.commodity.description}</td>
                <td className="px-4 py-4 font-medium text-slate-700">{contract.commodity.quantity}</td>
                <td className="px-4 py-4 font-medium text-slate-700">{contract.commodity.unitPrice}</td>
                <td className="px-4 py-4 font-black text-emerald-800">{contract.commodity.totalValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid gap-4 border-t border-emerald-100 bg-slate-50/40 px-4 py-4 text-sm font-medium text-slate-700 md:grid-cols-2">
          <p>
            Date: <span className="font-semibold text-slate-950">{contract.commodity.deliveryDate}</span>
          </p>
          <p>
            Delivery Location: <span className="font-semibold text-slate-950">{contract.commodity.deliveryLocation}</span>
          </p>
          <p>
            Terms: <span className="font-semibold text-slate-950">{contract.commodity.terms}</span>
          </p>
          <p>
            Logistics: <span className="font-semibold text-slate-950">{contract.commodity.logistics}</span>
          </p>
          {contract.commodity.insured ? (
            <span className="w-fit rounded bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-800">
              Insured
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ContractTermsSection() {
  return (
    <section className="break-inside-avoid">
      <SectionTitle>3. Terms & Conditions</SectionTitle>
      <div className="mt-4 space-y-4 text-sm font-semibold leading-6 text-slate-700">
        <p>
          <strong>3.1 Quality Assurance:</strong> The Seller guarantees that all produce meets the organic standards
          specified in the AgriBridge quality manual for Grade A export vegetables.
        </p>
        <p>
          <strong>3.2 Escrow Payment:</strong> Funds (7,000 USD) are currently held by AgriBridge Escrow. Release of
          funds will occur within 24 hours of documented delivery and buyer confirmation.
        </p>
        <p>
          <strong>3.3 Dispute Resolution:</strong> Any disagreements regarding product quality shall be mediated by the
          AgriBridge Agricultural Arbitration Board within 48 hours of delivery.
        </p>
      </div>
    </section>
  );
}

function ContractSignatureSection({ contract }: ContractDocumentProps) {
  return (
    <section className="grid break-inside-avoid gap-6 pt-8 md:grid-cols-[1fr_auto_1fr] md:items-end">
      <SignatureBlock signature={contract.signatures.seller} />
      <div className="mx-auto grid size-28 place-items-center rounded-full border-4 border-emerald-100 text-center">
        <div>
          <ShieldCheck className="mx-auto size-8 text-emerald-800" />
          <p className="mt-1 text-[10px] font-black text-emerald-900">AGRIBRIDGE SECURED</p>
          <span className="mt-1 inline-block rounded-full bg-emerald-800 px-2 py-0.5 text-[9px] font-black text-white">
            IMMUTABLE LOG
          </span>
        </div>
      </div>
      <SignatureBlock alignRight signature={contract.signatures.buyer} />
    </section>
  );
}

type SignatureBlockProps = {
  alignRight?: boolean;
  signature: {
    name: string;
    timestamp: string;
  };
};

function SignatureBlock({ alignRight = false, signature }: SignatureBlockProps) {
  return (
    <div className={alignRight ? "text-right" : ""}>
      <div className="mb-3 h-px bg-slate-400" />
      <p className="inline-flex items-center gap-2 text-sm font-black text-emerald-800">
        <BadgeCheck className="size-5" />
        Verified Digital Signature
      </p>
      <p className="mt-3 font-serif text-3xl italic text-emerald-700">{signature.name}</p>
      <p className="font-black text-slate-950">{signature.name}</p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">{signature.timestamp}</p>
      <FileCheck className={alignRight ? "ml-auto mt-2 size-5 text-emerald-800" : "mt-2 size-5 text-emerald-800"} />
    </div>
  );
}
