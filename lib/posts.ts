import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { assertUniqueSlugs, parseArticleFile } from "./article-validation.js";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".md"));
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return parseArticleFile(fileName, fileContents);
  });
  assertUniqueSlugs(posts);

  return posts.map(({ slug, title, subheadline, author, date, category, featured, tags }) => ({
    slug,
    headline: title,
    subheadline,
    author,
    date,
    category,
    featured,
    tags,
  }));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const post = parseArticleFile(`${slug}.md`, fileContents);

  const processedContent = await remark()
    .use(html)
    .process(post.content);

  return {
    contentText: processedContent.toString(),
    ...post,
  };
}
