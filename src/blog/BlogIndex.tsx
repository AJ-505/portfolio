import { useEffect } from "react";
import { posts, formatDate } from "./posts";
import { Tag } from "@/components/ui/Tag";
import { ArrowUpRightIcon } from "@/components/icons/SocialIcons";

export function BlogIndex() {
  useEffect(() => {
    document.title = "Writing | Abasiono Mbat";
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <main className="relative max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <div className="opacity-0 animate-fade-in">
          <a
            href="/"
            className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
          >
            &larr; Back to portfolio
          </a>

          <header className="mt-8 pb-10 border-b border-[var(--color-border-subtle)]">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
              Writing
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Essays and notes on things I can't stop thinking about.
            </p>
          </header>
        </div>

        <div className="mt-10 space-y-4">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`opacity-0 animate-fade-in animate-delay-${Math.min(i + 2, 6)}`}
            >
              <a
                href={`/blog/${post.slug}`}
                className="block group p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] transition-all duration-200"
              >
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)] mb-2">
                  <time>{formatDate(post.date)}</time>
                  <span className="text-[var(--color-border)]">|</span>
                  <span>{post.readingMinutes > 0 ? `${post.readingMinutes} min read` : "coming soon"}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>

                <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Tag key={tag} size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <ArrowUpRightIcon className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
