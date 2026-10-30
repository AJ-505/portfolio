export type ProjectCategoryId = "work" | "personal" | "school";

export interface Project {
  title: string;
  description: string;
  url?: string;
  tech: string[];
}

export interface ProjectGroup {
  label?: string;
  role?: string;
  period?: string;
  location?: string;
  url?: string;
  projects: Project[];
}

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
  blurb: string;
  groups: ProjectGroup[];
}

export interface Certification {
  title: string;
  source?: string;
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: "github" | "linkedin" | "twitter";
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline?: string;
  education: {
    degree: string;
    year: string;
    school: string;
    location: string;
  };
  projectCategories: ProjectCategory[];
  technologies: {
    category: string;
    items: string[];
  }[];
  certifications: Certification[];
  socials: SocialLink[];
}
