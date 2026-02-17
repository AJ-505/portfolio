import type { PortfolioData } from "@/types";

export const portfolioData: PortfolioData = {
  name: "Abasiono Mbat",
  role: "Software Engineer",
  specialization: "Web Technologies",
  education: {
    degree: "Computer Science",
    year: "2nd Year",
    school: "Pan-Atlantic University",
    location: "Lagos, Nigeria",
  },
  experience: [
    {
      role: "Software Lead",
      organization: "Tech Innovation Club",
      organizationUrl: "https://techinnovationclub.com",
      projects: [
        {
          title: "CBT Platform",
          description:
            "50+ students practicing JAMB with verified past questions. Integrated with School Pathfinder for university course discovery.",
          url: "https://pau-cbt-platform.vercel.app",
          tech: ["Next.js", "Prisma", "tRPC"],
        },
        {
          title: "Codespark",
          description:
            "Official site for student tech event. 100+ members, 3 sponsorships secured, 5+ startups emerged.",
          url: "https://codesparkhub.vercel.app",
          tech: ["Next.js", "React", "TypeScript"],
        },
        {
          title: "TIC Website",
          description:
            "Official club website. Achieved 10.5% CTR through SEO optimization.",
          url: "https://techinnovationclub.com",
          tech: ["Next.js", "React", "TypeScript"],
        },
        {
          title: "AI Campus Chatbot",
          description:
            "Handles student queries about school policies, staff, and lecturers.",
          url: "#",
          tech: ["Microsoft Copilot Studio"],
        },
      ],
    },
  ],
  volunteering: [
    {
      title: "Codespark Event",
      description:
        "Organized inaugural edition. 100+ members, 3 sponsorships, 5+ startups emerged.",
      url: "https://codesparkhub.vercel.app",
    },
    {
      title: "SST Makerspace Website",
      description: "Built website for student makerspace club.",
      url: "https://sst-makerspace.vercel.app",
    },
    {
      title: "Living Green Club Website",
      description: "Built website for environmental club.",
      url: "https://living-green-pau.netlify.app",
    },
  ],
  technologies: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "SQL", "Python"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "tRPC"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Vercel"],
    },
  ],
  certifications: [
    {
      title: "Fundamentals of Deep Learning",
      source: "NVIDIA",
      tags: ["AI", "Deep Learning", "Python"],
    },
    {
      title: "The Last Algorithms Course",
      source: "Frontend Masters",
      tags: ["DSA", "TypeScript"],
    },
    {
      title: "API Design in Node.js",
      source: "Frontend Masters",
      tags: ["Backend", "Express.js", "TypeScript"],
    },
    {
      title: "Blazingly Fast JavaScript",
      source: "Frontend Masters",
      tags: ["JavaScript", "Performance"],
    },
    {
      title: "Practical Prompt Engineering",
      source: "Frontend Masters",
      tags: ["AI", "Prompt Engineering"],
    },
    {
      title: "State Management in React",
      source: "Frontend Masters",
      tags: ["React", "State", "Scalability"],
    },
  ],
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/AJ-505",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/abasionombat/",
      icon: "linkedin",
    },
    {
      platform: "X",
      url: "https://x.com/Abasiono_Mbat",
      icon: "twitter",
    },
  ],
};
