import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AuthDecorativeDots } from "@/components/auth/AuthDecorativeDots";

type AuthSidePanelProps = {
  imageAlt: string;
  imageSrc: string;
  imageSizes: string;
  title: ReactNode;
  description: string;
  sectionClassName?: string;
  overlayClassName?: string;
  gradientClassName?: string;
  contentClassName?: string;
  logoClassName?: string;
  bottomClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showDecorativeDots?: boolean;
  children?: ReactNode;
};

export function AuthSidePanel({
  imageAlt,
  imageSrc,
  imageSizes,
  title,
  description,
  sectionClassName = "",
  overlayClassName = "bg-emerald-950/30",
  gradientClassName = "bg-gradient-to-b from-emerald-900/5 via-emerald-950/5 to-emerald-950/70",
  contentClassName = "px-9 py-8 xl:px-12 xl:py-9",
  logoClassName = "h-7 w-[109px]",
  bottomClassName = "pb-10",
  titleClassName = "max-w-sm text-4xl font-black leading-tight tracking-tight text-white xl:text-[42px]",
  descriptionClassName = "mt-3 text-sm font-medium text-white/85 xl:text-base",
  showDecorativeDots = true,
  children,
}: AuthSidePanelProps) {
  return (
    <section
      className={`relative hidden h-screen overflow-hidden bg-emerald-950 text-white lg:block ${sectionClassName}`}
    >
      <Image
        alt={imageAlt}
        className="object-cover"
        fill
        priority
        sizes={imageSizes}
        src={imageSrc}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className={`absolute inset-0 ${gradientClassName}`} />
      {children}

      <div className={`relative z-10 flex h-full flex-col justify-between ${contentClassName}`}>
        <Link className={`relative block ${logoClassName}`} href="/">
          <Image
            alt="AgriBridge logo"
            className="object-contain"
            fill
            sizes="136px"
            src="/images/brand/agribridge-logo.png"
          />
        </Link>

        <div className={bottomClassName}>
          <h1 className={titleClassName}>{title}</h1>
          <p className={descriptionClassName}>{description}</p>
          {showDecorativeDots ? <AuthDecorativeDots /> : null}
        </div>
      </div>
    </section>
  );
}
