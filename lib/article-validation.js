const matter = require("gray-matter");
const { z } = require("zod");

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const nonEmptyString = z.string().refine((value) => value.trim().length > 0, "must not be empty");

const articleMetadataSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    title: nonEmptyString,
    subheadline: z.string().default(""),
    author: nonEmptyString.default("Unknown"),
    date: z.string().default(""),
    category: nonEmptyString.default("General"),
    featured: z.boolean().default(false),
    tags: z.array(z.string().min(1)).default([]),
    description: nonEmptyString.optional(),
    updatedAt: z.string().optional(),
    coverImage: nonEmptyString.optional(),
    canonicalUrl: z.string().url().optional(),
    draft: z.boolean().optional(),
    publishedAt: z.string().optional(),
    socialDistribution: z.record(z.boolean()).optional(),
  })
  .strict();

/**
 * @typedef {object} ParsedArticle
 * @property {string} slug
 * @property {string | number | undefined} id
 * @property {string} title
 * @property {string} subheadline
 * @property {string} author
 * @property {string} date
 * @property {string} category
 * @property {boolean} featured
 * @property {string[]} tags
 * @property {string | undefined} description
 * @property {string | undefined} updatedAt
 * @property {string | undefined} coverImage
 * @property {string | undefined} canonicalUrl
 * @property {boolean | undefined} draft
 * @property {string | undefined} publishedAt
 * @property {Record<string, boolean> | undefined} socialDistribution
 * @property {string} content
 */

/**
 * @param {string} fileName
 * @param {string} fileContents
 * @returns {ParsedArticle}
 */
function parseArticleFile(fileName, fileContents) {
  if (!fileName.endsWith(".md")) {
    throw new Error(`Invalid article filename "${fileName}": expected a .md file`);
  }

  const slug = fileName.slice(0, -".md".length);
  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid article filename "${fileName}": slug must use lowercase letters, numbers, and hyphens`);
  }

  let parsed;
  try {
    parsed = matter(fileContents);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid article "${slug}" frontmatter: ${message}`);
  }

  const metadata = articleMetadataSchema.safeParse(parsed.data);
  if (!metadata.success) {
    const issues = metadata.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid article "${slug}" frontmatter: ${issues}`);
  }

  if (typeof parsed.content !== "string" || parsed.content.trim().length === 0) {
    throw new Error(`Invalid article "${slug}" body: expected non-empty Markdown content`);
  }

  return {
    slug,
    ...metadata.data,
    content: parsed.content,
  };
}

/**
 * @param {Array<{ slug: string }>} articles
 */
function assertUniqueSlugs(articles) {
  const seen = new Set();
  for (const article of articles) {
    if (seen.has(article.slug)) {
      throw new Error(`Duplicate article slug "${article.slug}"`);
    }
    seen.add(article.slug);
  }
}

module.exports = { parseArticleFile, assertUniqueSlugs };
