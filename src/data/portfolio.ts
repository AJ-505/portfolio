import type { PortfolioData } from "@/types";

export const portfolioData: PortfolioData = {
  name: "Abasiono Mbat",
  role: "AI-Native Software Engineer",
  tagline: "Delivering tech solutions, with excellence.",
  education: {
    degree: "Computer Science",
    year: "2nd Year",
    school: "Pan-Atlantic University",
    location: "Lagos, Nigeria",
  },
  experience: [
    {
      role: "Intern (Artificial Intelligence & Back-End Web Development)",
      organization: "EY",
      organizationUrl: "https://www.ey.com/en_ng",
      period: "Jul – Aug 2026 · 2 mos",
      location: "Lagos, Nigeria · Hybrid",
      projects: [
        {
          title: "Client System Prototype → Production",
          description:
            "Developed a client system from prototype to production alongside the engineering team. Worked closely with data & AI teams as well as QA to deliver high-quality internal and external software solutions.",
          url: "#",
          tech: ["Back-End Web Development", "AI", "QA"],
        },
      ],
    },
    {
      role: "Software Lead",
      organization: "Tech Innovation Club",
      organizationUrl: "https://techinnovationclub.com",
      projects: [
        {
          title: "AI Campus Chatbot",
          description:
            "AI assistant for students. Answers questions about school policies, staff, and lecturers — built with Microsoft Copilot Studio and wired straight into the club's site.",
          url: "#",
          tech: ["Microsoft Copilot Studio", "LLM", "Prompt Engineering"],
        },
        {
          title: "CBT Platform",
          description:
            "300+ students practicing JAMB with verified past questions. Integrated with PAU Archive so students can move from past questions to university course discovery.",
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
      ],
    },
  ],
  otherProjects: [
    {
      title: "PAU Archive",
      description:
        "AI-powered study tutor for Pan-Atlantic University: 800+ monthly active students ask questions and get answers grounded in the university's own course materials and past questions.",
      url: "https://pauarchive.com",
      tech: ["Astro", "TypeScript", "PostgreSQL", "AI"],
    },
    {
      title: "LifeOS",
      description:
        "Personal operating system: one place for projects, tasks, focus, timeline, and calendar sync. Collaborative Spaces with live sync when you want to work with others.",
      url: "https://lifeos-track.vercel.app",
      tech: ["TanStack Start", "React", "Convex", "Clerk", "Google Calendar"],
    },
    {
      title: "Yankee Stores",
      description:
        "E-commerce for a raw honey & beeswax business: full product catalogue, ordering flow, and an admin dashboard for the team to manage orders.",
      url: "https://yankeestores.com",
      tech: ["TanStack Start", "Drizzle ORM", "libSQL", "Resend"],
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
      category: "AI",
      items: ["Copilot Studio", "Prompt Engineering", "NVIDIA Deep Learning"],
    },
    {
      category: "Languages",
      items: ["TypeScript", "Go", "SQL", "Python"],
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
      title: "Practical Prompt Engineering",
      source: "Frontend Masters",
      tags: ["AI", "Prompt Engineering"],
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
