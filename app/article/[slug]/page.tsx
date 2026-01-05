// app/article/[slug]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";

type Article = {
  slug: string;
  title: string;
  subheadline?: string;
  author: string;
  date: string;
  category: string;
  contentText: string;
  featured?: boolean;
  tags?: string[];
};

// Generate dynamic routes for all posts
export async function generateStaticParams() {
  const fs = await import("fs");
  const path = await import("path");

  const postsDirectory = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDirectory);

  return files.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

// Server Component
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = (await getPostBySlug(params.slug)) as Article;

  return (
    <div className="min-h-screen bg-[#f5f2e8] p-4 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-b-4 border-black mb-6 pb-4">
          <Link href="/" className="inline-flex items-center space-x-2 text-black hover:underline mb-4">
            <ArrowLeft size={20} />
            <span className="font-bold tracking-wider">BACK TO MAIN EDITION</span>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-black tracking-wider mb-2">THE GEEK CHRONICLE</h1>
            <div className="text-sm uppercase tracking-wider">Full Article • {article.date}</div>
          </div>
        </header>

        {/* Article */}
        <article className="border-2 border-black p-8 bg-[#f5f2e8]">
          <div className="text-sm uppercase tracking-wider mb-2 font-bold">{article.category}</div>

          <h1 className="text-4xl font-black leading-tight mb-3 tracking-wide">{article.title}</h1>

          {article.subheadline && <div className="text-xl italic font-light mb-6 leading-relaxed">{article.subheadline}</div>}

          <div className="text-sm border-b border-black pb-4 mb-6">
            By <span className="font-bold">{article.author}</span> • {article.date}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-4">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-block bg-black text-white px-2 py-1 mr-2 text-xs uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.contentText }} />
        </article>

        {/* Footer */}
        <footer className="border-t-4 border-black mt-8 pt-4 text-center">
          <div className="text-xs uppercase tracking-wider mb-2">
            <span className="font-bold">The Geek Chronicle</span> • Published Weekly
          </div>
          <div className="text-xs space-y-1">
            <div>© 2025 Shayan GeeDook • All Rights Reserved</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
