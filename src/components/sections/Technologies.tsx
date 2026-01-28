import { portfolioData } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tag } from "@/components/ui/Tag";

export function Technologies() {
  const { technologies } = portfolioData;

  return (
    <section>
      <SectionTitle>Technologies</SectionTitle>

      <div className="space-y-4">
        {technologies.map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              {category.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <Tag key={tech} size="md" variant="outline">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
