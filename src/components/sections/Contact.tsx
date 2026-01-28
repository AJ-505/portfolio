import { portfolioData } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/SocialIcons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
} as const;

export function Contact() {
  const { socials } = portfolioData;

  return (
    <section className="relative mt-16 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)] overflow-hidden">
      {/* Accent glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-accent)] opacity-[0.08] rounded-full blur-3xl" />

      <div className="relative">
        <SectionTitle className="mb-2">Let&apos;s Connect</SectionTitle>
        <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
          Open to internships, collaborations, and interesting projects. Reach
          out on any platform.
        </p>

        <div className="flex flex-wrap gap-3">
          {socials.map(({ platform, url, icon }) => {
            const Icon = iconMap[icon];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-secondary)] transition-all duration-200 group"
              >
                <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                <span className="font-medium">{platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
