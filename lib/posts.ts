import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      headline: data.title,
      subheadline: data.subheadline ?? "",
      author: data.author ?? "Unknown",
      date: data.date ?? "",
      category: data.category ?? "General",
      featured: data.featured ?? false,
      tags: data.tags ?? [],
    };
  });
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    slug,
    contentText: processedContent.toString(),
    ...data,
  };
}
