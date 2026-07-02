import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Calendar, MapPin, Pencil } from "lucide-react";

import { StarRating } from "@/components/farmer/reviews/StarRating";
import type { FarmerProfile } from "@/components/farmer/profile/profile.mock";

type ProfileHeroCardProps = {
  profile: FarmerProfile;
};

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="relative h-40 bg-gradient-to-r from-emerald-100 to-lime-100 sm:h-44">
        <Image alt={`${profile.farmName} cover`} className="object-cover" fill priority sizes="(min-width: 1024px) 980px, 100vw" src={profile.coverImage} />
      </div>
      <div className="relative px-5 pb-6 pt-16 sm:px-8 sm:pb-7 sm:pl-[224px] sm:pt-5">
        <span className="absolute left-5 top-[-64px] size-32 overflow-hidden rounded-full border-4 border-white bg-emerald-100 shadow-md sm:left-8 sm:size-36">
          <Image alt={`${profile.name} avatar`} className="object-cover" fill sizes="144px" src={profile.avatar} />
        </span>

        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-black tracking-tight text-slate-950">{profile.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <p className="font-black text-slate-700">{profile.farmName}</p>
            <BadgeCheck className="size-4 fill-emerald-700 text-white" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {profile.location}
            </span>
            <span className="hidden h-6 w-px bg-slate-200 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              {profile.memberSince}
            </span>
            <span className="hidden h-6 w-px bg-slate-200 sm:block" />
            <span className="inline-flex items-center gap-1.5 text-slate-800">
              <StarRating rating={profile.rating} />
              <strong>{profile.rating}</strong>
              <span className="text-slate-500">({profile.reviewCount} reviews)</span>
            </span>
          </div>

          <p className="mt-4 max-w-4xl text-sm font-medium leading-6 text-slate-600">{profile.bio}</p>
          </div>

          <Link
            className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            href="/farmer/profile/edit"
          >
            <Pencil className="size-4" />
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
