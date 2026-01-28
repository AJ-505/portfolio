import { portfolioData } from "@/data/portfolio";
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

export function Footer() {
  const { name, socials } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 pt-8 border-t border-[var(--color-border-subtle)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-text-tertiary)]">
          © {year} {name}
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ platform, url, icon }) => {
            const Icon = iconMap[icon];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                aria-label={platform}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
