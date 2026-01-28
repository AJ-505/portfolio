export interface Project {
  title: string;
  description: string;
  url: string;
  tech: string[];
}

export interface Experience {
  role: string;
  organization: string;
  organizationUrl?: string;
  projects: Project[];
}

export interface Volunteering {
  title: string;
  description: string;
  url?: string;
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
  specialization: string;
  education: {
    degree: string;
    year: string;
    school: string;
    location: string;
  };
  experience: Experience[];
  volunteering: Volunteering[];
  technologies: {
    category: string;
    items: string[];
  }[];
  certifications: Certification[];
  socials: SocialLink[];
}
