import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import articles from "@/lib/data/articles.json";

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }))
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id) || articles[0]

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

          <h1 className="text-4xl font-black leading-tight mb-3 tracking-wide">{article.headline}</h1>

          <div className="text-xl italic font-light mb-6 leading-relaxed">{article.subheadline}</div>

          <div className="text-sm border-b border-black pb-4 mb-6">
            By <span className="font-bold">{article.author}</span> • {article.date}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="float-left mr-4 mb-2">
              <span
                className="text-8xl font-black leading-none block"
                style={{
                  fontFamily: "Old English Text MT, serif",
                }}
              >
                {article.headline.charAt(0)}
              </span>
            </div>

            <div
              className="text-base leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Footer */}
        <footer className="border-t-4 border-black mt-8 pt-4 text-center">
          <div className="text-xs uppercase tracking-wider mb-2">
            <span className="font-bold">The Geek Chronicle</span> • Published Weekly
          </div>
          <div className="text-xs space-y-1">
            <div>© 2025 Shayan GeeDook • All Rights Reserved</div>
            <div className="flex justify-center space-x-4">
              <a href="https://x.com/geedook13" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
              </a>
              <span>•</span>
              <a
                href="https://t.me/shayangeedook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Telegram
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/shayan-kahangi-282abb334"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://github.com/GeeDook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
