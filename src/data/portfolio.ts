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
            "Exam prep platform for secondary school students practicing for JAMB. Built for CSP training program.",
          url: "https://pau-cbt-platform.vercel.app",
          tech: ["Next.js", "React", "TypeScript"],
        },
        {
          title: "TIC Website",
          description: "Official website for the Tech Innovation Club.",
          url: "https://techinnovationclub.com",
          tech: ["Next.js", "React", "TypeScript"],
        },
        {
          title: "AI Campus Chatbot",
          description:
            "Interactive bot answering queries about school policies, staff, lecturers.",
          url: "#",
          tech: ["AI/LLM", "React", "Node.js"],
        },
      ],
    },
  ],
  volunteering: [
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
    {
      title: "Codespark Event",
      description:
        "Organized first edition. Connected student builders with industry leaders, mentoring, funding.",
    },
  ],
  technologies: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "SQL", "Python"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Express.js", "Node.js", "PostgreSQL", "Prisma", "Drizzle"],
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
