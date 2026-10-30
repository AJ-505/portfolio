import { portfolioData } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";

export function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section>
      <SectionTitle>Certifications</SectionTitle>

      <div className="grid grid-cols-1 gap-2">
        {certifications.map((cert) => (
          <Card key={cert.title} className="py-3.5 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-[var(--color-text-primary)] sm:truncate sm:min-w-0">
                  {cert.title}
                </span>
                {cert.source && (
                  <span className="text-sm text-[var(--color-text-tertiary)] shrink-0">
                    · {cert.source}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 sm:shrink-0">
                {cert.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
