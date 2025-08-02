import Link from "next/link"

// Move articles data outside component to reduce processing time
const articles = [
  {
    id: 1,
    headline: "The Evolution of Linux Kernel",
    subheadline: "From Linus's bedroom project to powering the world's servers",
    author: "Shayan GeeDook",
    date: "January 15, 2025",
    content:
      "What started as a hobby project by a Finnish computer science student has become the backbone of modern computing...",
    category: "Operating Systems",
    featured: true,
  },
  {
    id: 2,
    headline: "Mastering the Command Line",
    subheadline: "Why terminal skills are essential for every developer",
    author: "Shayan GeeDook",
    date: "January 12, 2025",
    content:
      "In an age of graphical interfaces and drag-and-drop simplicity, the command line remains the most powerful tool...",
    category: "Terminal & CLI",
  },
  {
    id: 3,
    headline: "The Art of Clean Code",
    subheadline: "Writing code that humans can read and maintain",
    author: "Shayan GeeDook",
    date: "January 10, 2025",
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand...",
    category: "Programming",
  },
  {
    id: 4,
    headline: "Docker and Containerization",
    subheadline: "Revolutionizing software deployment and development",
    author: "Shayan GeeDook",
    date: "January 8, 2025",
    content: "Containers have fundamentally changed how we think about software deployment...",
    category: "DevOps",
  },
  {
    id: 5,
    headline: "The Future of AI and Programming",
    subheadline: "How machine learning is reshaping software development",
    author: "Shayan GeeDook",
    date: "January 5, 2025",
    content: "As AI tools like GitHub Copilot and ChatGPT become mainstream, the role of programmers is evolving...",
    category: "Artificial Intelligence",
  },
]

const featuredArticle = articles.find((article) => article.featured)
const regularArticles = articles.filter((article) => !article.featured)

export default function VintageNewspaper() {
  return (
    <div className="min-h-screen bg-[#f5f2e8] p-4 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <header className="border-b-4 border-black mb-6 pb-4">
          {/* Top Banner */}
          <div className="flex flex-wrap justify-between items-start text-[10px] sm:text-xs uppercase tracking-wider mb-2 pb-2 border-b border-black gap-2">
            {/* Author Info */}
            <div className="max-w-[40%] min-w-[120px]">
              <span className="font-bold block">By Shayan GeeDook</span>
              <div className="mt-1 leading-tight">
                Computer Science enthusiast sharing insights
                <br />
                on Linux, programming, and geek culture
              </div>
            </div>

            {/* Center Title */}
            <div className="text-center flex-1 min-w-[140px]">
              <div
                className="font-bold tracking-wider mb-1 text-lg sm:text-2xl"
                style={{ fontFamily: '"Old English Text MT", serif' }}
              >
                The Geek Chronicle
              </div>
            </div>

            {/* Right Box */}
            <div className="hidden md:block text-right border-2 border-black p-2 min-w-[100px]">
              <div className="font-bold">WEEKLY EDITION</div>
              <div className="text-[10px]">CODE & CREATIVITY</div>
            </div>
          </div>

          {/* Main Masthead */}
          <div className="text-center mb-4">
            <h1
              className="font-black tracking-wider mb-2 text-5xl md:text-7xl"
              style={{ fontFamily: '"Old English Text MT", serif', textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              COMPUTER WORLD NEWS
            </h1>
            <div className="text-xl italic font-light tracking-wide">
              Exploring the depths of computer science, programming, and digital innovation
            </div>
          </div>

          {/* Date and Info Bar */}
          <div className="flex justify-between items-center text-xs py-1 border-t border-b border-black">
            <span>VOLUME XIII, NO. 3</span>
            <span className="font-bold">JANUARY 15, 2025</span>
            <span>PRICE: FREE</span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-3">
            {/* Featured Small Article */}
            <article className="border-2 border-black p-4 bg-black text-[#f5f2e8]">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 tracking-wide">GEEK QUOTE</h3>
                <div className="text-sm leading-relaxed">
                  "Talk is cheap. Show me the code."
                  <div className="mt-2 text-xs italic">— Linus Torvalds</div>
                </div>
              </div>
            </article>

            {/* Side Articles */}
            {regularArticles.slice(0, 2).map((article) => (
              <article key={article.id} className="pb-4 border-b-2 border-black">
                <div className="text-xs uppercase tracking-wider mb-1 font-bold">{article.category}</div>
                <h3 className="text-lg font-bold leading-tight mb-2">
                  <Link href={`/article/${article.id}`} className="hover:underline">
                    {article.headline}
                  </Link>
                </h3>
                <div className="text-sm italic mb-2">{article.subheadline}</div>
                <div className="text-xs mb-2">
                  By {article.author} • {article.date}
                </div>
                <p className="text-sm leading-relaxed text-justify">{article.content.substring(0, 200)}...</p>
              </article>
            ))}
          </div>

          {/* Center Column - Featured Article */}
          <div className="lg:col-span-6">
            {featuredArticle && (
              <article className="mb-6">
                <div className="text-sm uppercase tracking-wider mb-2 font-bold">
                  {featuredArticle.category} • FEATURED STORY
                </div>
                <h2 className="text-5xl font-black leading-tight mb-3 tracking-wide">
                  <Link href={`/article/${featuredArticle.id}`} className="hover:underline">
                    {featuredArticle.headline}
                  </Link>
                </h2>
                <div className="text-2xl italic font-light mb-4 leading-relaxed">{featuredArticle.subheadline}</div>

                {/* Large Decorative Initial */}
                <div className="float-left mr-4 mb-2">
                  <span
                    className="text-8xl font-black leading-none block"
                    style={{ fontFamily: '"Old English Text MT", serif' }}
                  >
                    W
                  </span>
                </div>

                <div className="text-base leading-relaxed text-justify mb-4">
                  <p className="mb-4">{featuredArticle.content}</p>
                  <p className="mb-4">
                    The beauty of Linux lies not just in its technical excellence, but in its philosophy of openness and
                    collaboration. Every line of code is scrutinized by thousands of developers worldwide.
                  </p>
                </div>

                <div className="text-sm pt-2 border-t border-black">
                  By <span className="font-bold">{featuredArticle.author}</span> • {featuredArticle.date}
                </div>
              </article>
            )}

            {/* Secondary Articles */}
            <div className="grid gap-6 md:grid-cols-2 pt-6 border-t-2 border-black">
              {regularArticles.slice(2, 4).map((article) => (
                <article key={article.id}>
                  <div className="text-xs uppercase tracking-wider mb-1 font-bold">{article.category}</div>
                  <h3 className="text-xl font-bold leading-tight mb-2">
                    <Link href={`/article/${article.id}`} className="hover:underline">
                      {article.headline}
                    </Link>
                  </h3>
                  <div className="text-sm italic mb-2">{article.subheadline}</div>
                  <div className="text-xs mb-2">
                    By {article.author} • {article.date}
                  </div>
                  <p className="text-sm leading-relaxed text-justify">{article.content.substring(0, 150)}...</p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-3">
            {/* About Section */}
            <div className="border-2 border-black p-4">
              <h3 className="text-xl font-bold mb-3 text-center tracking-wide">ABOUT THE CREATOR</h3>
              <div className="text-center mb-3">
                <div className="w-24 h-24 mx-auto border-2 border-black rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">SG</span>
                </div>
                <div className="font-bold">Shayan GeeDook</div>
                <div className="text-xs italic">Computer Science Enthusiast</div>
              </div>
              <p className="text-sm leading-relaxed text-justify mb-3">
                Hey there! I'm a 23-year-old computer science enthusiast who's deeply passionate about Linux,
                programming, and the endless possibilities of technology.
              </p>

              {/* Social Links */}
              <div className="pt-3 border-t border-black">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-center">Connect With Me</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Twitter:</span>
                    <a
                      href="https://x.com/geedook13"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @geedook13
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>Telegram:</span>
                    <a
                      href="https://t.me/shayangeedook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @shayangeedook
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>LinkedIn:</span>
                    <a
                      href="https://www.linkedin.com/in/shayan-kahangi-282abb334"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Shayan Kahangi
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span>GitHub:</span>
                    <a
                      href="https://github.com/GeeDook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GeeDook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Articles */}
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold mb-3 text-center tracking-wide pb-2 border-b border-black">
                RECENT ARTICLES
              </h3>
              <div className="space-y-3">
                {regularArticles.slice(-3).map((article) => (
                  <div key={article.id} className="text-sm">
                    <div className="font-bold leading-tight mb-1">
                      <Link href={`/article/${article.id}`} className="hover:underline">
                        {article.headline}
                      </Link>
                    </div>
                    <div className="text-xs text-gray-600">{article.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border-2 border-black p-4">
              <h3 className="text-lg font-bold mb-3 text-center tracking-wide pb-2 border-b border-black">
                CATEGORIES
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Operating Systems</span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Programming</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>DevOps</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Artificial Intelligence</span>
                  <span className="font-bold">6</span>
                </div>
                <div className="flex justify-between">
                  <span>Terminal & CLI</span>
                  <span className="font-bold">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 text-center border-t-4 border-black">
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
