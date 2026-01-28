import { portfolioData } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function Volunteering() {
  const { volunteering } = portfolioData;

  return (
    <section>
      <SectionTitle>Volunteering</SectionTitle>

      <div className="grid gap-3">
        {volunteering.map((item) => (
          <Card key={item.title} hover as="article">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </div>
              {item.url && (
                <ExternalLink
                  href={item.url}
                  className="text-sm shrink-0"
                  showArrow
                >
                  Visit
                </ExternalLink>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
