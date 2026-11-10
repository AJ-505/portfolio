export const SITE_NAME = "Abasiono Mbat";

export const HOME_META = {
  title: "Abasiono Mbat | AI-Native Software Engineer",
  description:
    "AI-native software engineer. CS student at Pan-Atlantic University, Lagos. I build AI-powered products and ship them fast with teams.",
};

export const BLOG_INDEX_META = {
  title: "Writing | Abasiono Mbat",
  description: "Essays and notes on things I can't stop thinking about.",
};

/**
 * @param {{ title: string, description: string }} post
 * @returns {{ title: string, description: string }}
 */
export function postMeta(post) {
  return {
    title: `${post.title} | Abasiono Mbat's Blog`,
    description:
      post.description || `${post.title}, an essay by Abasiono Mbat.`,
  };
}

/**
 * @param {string} slug
 * @returns {{ title: string, description: string }}
 */
export function postNotFoundMeta(slug) {
  return {
    title: "Not found | Abasiono Mbat",
    description: `Nothing lives at /blog/${slug}.`,
  };
}
