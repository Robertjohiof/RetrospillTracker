import React from "react";
import { LinkButton } from "./ui/LinkButton";

type ButtonLink = {
  label: string;
  href: string;
};

export interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  primary?: ButtonLink;
  secondary?: ButtonLink;
}

export default function Hero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  primary,
  secondary,
}: Readonly<HeroProps>) {
  return (
    // Hero med bilde som bakgrunn og tekst oppå
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Fyll over bildet så tekst synes bedre */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
        aria-hidden="true"
      />

      {/* Tekst og knapper */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center min-h-[360px] sm:min-h-[420px]">
        <h1 className="text-glow-pink text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-glow-cyan max-w-prose">{subtitle}</p>
        )}

        <div className="mt-6 flex gap-3">
          {primary && (
            <LinkButton
              href={primary.href}
              variant="glow"
              size="none"
              className="h-9 rounded-[0.4rem]"
            >
              {primary.label}
            </LinkButton>
          )}

          {secondary && (
            <LinkButton
              href={secondary.href}
              variant="ghost"
              size="md"
              className="rounded-xl"
            >
              {secondary.label}
            </LinkButton>
          )}
        </div>
      </div>

      {/* Litt kulere kanter */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/40"
        aria-hidden="true"
      />
    </section>
  );
}
