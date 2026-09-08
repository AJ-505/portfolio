import { useEffect, useMemo } from "react";
import { getPost, renderMarkdown, formatDate } from "./posts";
import { Tag } from "@/components/ui/Tag";

export function PostPage({ slug }: { slug: string }) {
  const post = getPost(slug);

  useEffect(() => {
    document.title = post
      ? `${post.title} | Abasiono Mbat`
      : "Not found | Abasiono Mbat";
  }, [post]);

  const html = useMemo(
    () => (post ? renderMarkdown(post.body) : ""),
    [post],
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Post not found</h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Nothing lives at <code className="font-mono">/blog/{slug}</code>.
          </p>
          <a
            href="/blog"
            className="inline-block px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            All posts
          </a>
        </div>
      </div>
    );
  }

  const isEmpty = post.body.length === 0;

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

      <main className="relative max-w-2xl mx-auto px-6 py-16 sm:py-24">
        <div className="opacity-0 animate-fade-in">
          <a
            href="/blog"
            className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
          >
            &larr; All writing
          </a>
        </div>

        <header className="mt-8 mb-10 pb-8 border-b border-[var(--color-border-subtle)] opacity-0 animate-fade-in animate-delay-1">
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)] mb-4">
            <time>{formatDate(post.date)}</time>
            <span className="text-[var(--color-border)]">|</span>
            {isEmpty ? (
              <span className="text-[var(--color-accent)]">coming soon</span>
            ) : (
              <span>{post.readingMinutes} min read</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} variant="outline">
                {tag}
              </Tag>
            ))}
          </div>
        </header>

        {isEmpty ? (
          <p className="text-[var(--color-text-tertiary)] italic mb-10">
            This one is still in my head. It lands here when it's ready.
          </p>
        ) : (
          <article
            className="post-prose opacity-0 animate-fade-in animate-delay-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {!isEmpty && (
          <footer className="mt-16 pt-8 border-t border-[var(--color-border-subtle)] opacity-0 animate-fade-in animate-delay-3">
            <p className="text-[var(--color-text-secondary)] mb-4">
              Thanks for reading. If you want to argue with me about it, my
              inbox is open.
            </p>
            <a
              href="/blog"
              className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              &larr; Back to all writing
            </a>
          </footer>
        )}
        {isEmpty && (
          <div className="mt-16 opacity-0 animate-fade-in animate-delay-3">
            <a
              href="/blog"
              className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              &larr; Back to all writing
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
