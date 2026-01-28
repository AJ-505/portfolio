import { portfolioData } from "@/data/portfolio";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  LocationIcon,
  AcademicIcon,
} from "@/components/icons/SocialIcons";
import { Tag } from "@/components/ui/Tag";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
} as const;

export function Hero() {
  const { name, role, specialization, education, socials } = portfolioData;

  return (
    <header className="relative pb-10 border-b border-[var(--color-border-subtle)]">
      {/* Background accent */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Status badge */}
        <div className="mb-6 flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              Open to opportunities
            </span>
          </span>
        </div>

        {/* Name and title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
          {name}
        </h1>

        <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-4">
          {role} <span className="text-[var(--color-accent)]">·</span>{" "}
          {specialization}
        </p>

        {/* Info badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)]">
            <AcademicIcon className="w-4 h-4" />
            <span>
              {education.degree} · {education.year} @ {education.school}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)]">
            <LocationIcon className="w-4 h-4" />
            <span>{education.location}</span>
          </div>
        </div>

        {/* Core tech stack highlight */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"].map(
            (tech) => (
              <Tag key={tech} variant="accent" size="md">
                {tech}
              </Tag>
            ),
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socials.map(({ platform, url, icon }) => {
            const Icon = iconMap[icon];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] transition-all duration-200 group"
                aria-label={platform}
              >
                <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                <span className="text-sm font-medium">{platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
