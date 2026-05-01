import { portfolioData } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Tag } from "@/components/ui/Tag";

export function OtherProjects() {
  const { otherProjects } = portfolioData;

  return (
    <section>
      <SectionTitle>Other Projects</SectionTitle>

      <div className="grid gap-3">
        {otherProjects.map((project) => (
          <Card key={project.title} hover as="article">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="font-semibold text-[var(--color-text-primary)]">
                    {project.title}
                  </h4>
                  {project.url !== "#" && (
                    <ExternalLink
                      href={project.url}
                      className="text-sm"
                      showArrow
                    >
                      Live
                    </ExternalLink>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}