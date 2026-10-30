import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import type { ProjectCategoryId, ProjectGroup } from "@/types";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs } from "@/components/ui/Tabs";
import { Tag } from "@/components/ui/Tag";

const TAB_PARAM = "tab";
const DEFAULT_CATEGORY: ProjectCategoryId = "work";

function isCategoryId(value: string | null): value is ProjectCategoryId {
  return value === "work" || value === "personal" || value === "school";
}

function readCategory(): ProjectCategoryId {
  const value = new URLSearchParams(window.location.search).get(TAB_PARAM);
  return isCategoryId(value) ? value : DEFAULT_CATEGORY;
}

function writeCategory(id: ProjectCategoryId) {
  const url = new URL(window.location.href);
  if (id === DEFAULT_CATEGORY) {
    url.searchParams.delete(TAB_PARAM);
  } else {
    url.searchParams.set(TAB_PARAM, id);
  }
  window.history.replaceState(window.history.state, "", url);
}

function groupCount(groups: ProjectGroup[]) {
  return groups.reduce((total, group) => total + group.projects.length, 0);
}

function ProjectGroupBlock({ group }: { group: ProjectGroup }) {
  const meta = [group.period, group.location].filter(Boolean).join(" · ");

  return (
    <section aria-label={group.label}>
      {group.label && (
        <header className="mb-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {group.url ? (
                <ExternalLink
                  href={group.url}
                  className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                >
                  {group.label}
                </ExternalLink>
              ) : (
                group.label
              )}
            </h3>
            {group.role && (
              <span className="text-sm text-[var(--color-text-secondary)]">
                {group.role}
              </span>
            )}
          </div>
          {meta && (
            <p className="mt-1 font-mono text-xs text-[var(--color-text-tertiary)]">
              {meta}
            </p>
          )}
        </header>
      )}

      <div className="grid grid-cols-1 gap-3">
        {group.projects.map((project) => (
          <Card key={project.title} hover as="article">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-[var(--color-text-primary)]">
                {project.title}
              </h4>
              {project.url && (
                <ExternalLink href={project.url} className="text-sm" showArrow>
                  Live
                </ExternalLink>
              )}
            </div>
            <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
              {project.description}
            </p>
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const { projectCategories } = portfolioData;
  const [active, setActive] = useState<ProjectCategoryId>(readCategory);

  useEffect(() => {
    const syncFromUrl = () => setActive(readCategory());
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const activeCategory =
    projectCategories.find((category) => category.id === active) ??
    projectCategories[0];

  const selectCategory = (id: string) => {
    const next = isCategoryId(id) ? id : DEFAULT_CATEGORY;
    setActive(next);
    writeCategory(next);
  };

  return (
    <section>
      <SectionTitle>Projects</SectionTitle>

      <Tabs
        label="Project categories"
        tabs={projectCategories.map((category) => ({
          id: category.id,
          label: category.label,
          count: groupCount(category.groups),
        }))}
        value={activeCategory.id}
        onChange={selectCategory}
      >
        {(id) => {
          const category =
            projectCategories.find((item) => item.id === id) ??
            projectCategories[0];

          return (
            <div className={id === activeCategory.id ? "tab-enter" : undefined}>
              <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
                {category.blurb}
              </p>

              <div className="space-y-8">
                {category.groups.map((group, index) => (
                  <ProjectGroupBlock
                    key={group.label ?? `group-${index}`}
                    group={group}
                  />
                ))}
              </div>
            </div>
          );
        }}
      </Tabs>
    </section>
  );
}
