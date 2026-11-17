const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { assertUniqueSlugs, parseArticleFile } = require("../lib/article-validation.js");

const postsDirectory = path.join(__dirname, "..", "content/posts");

test("existing article filenames continue to define the same article URLs", () => {
  const files = fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".md"));
  const posts = files.map((fileName) =>
    parseArticleFile(fileName, fs.readFileSync(path.join(postsDirectory, fileName), "utf8")),
  );
  assertUniqueSlugs(posts);

  assert.deepEqual(
    posts.map(({ slug }) => slug).sort(),
    [
      "1-the-evolution-of-linux-kernel",
      "2-mastering-the-command-line",
      "3-the-art-of-clean-code",
      "4-docker-and-containerization",
      "5-the-future-of-ai-and-programming",
      "6-the-alters",
      "test",
      "test3",
      "test4",
    ],
  );
});

test("legacy numeric article ids are accepted without changing filename slugs", () => {
  const post = parseArticleFile(
    "legacy-post.md",
    '---\nid: "12"\ntitle: "Legacy post"\ndate: "2025/26/03"\n---\nContent\n',
  );

  assert.equal(post.slug, "legacy-post");
  assert.equal(post.id, "12");
  assert.equal(post.date, "2025/26/03");
});

test("blueprint metadata is optional and accepts legacy date strings", () => {
  const post = parseArticleFile(
    "planned-fields.md",
    [
      "---",
      'title: "Planned fields"',
      'date: "2025/26/03"',
      'description: "A short summary"',
      'updatedAt: "2025/26/03"',
      'coverImage: "/images/planned-fields.jpg"',
      'canonicalUrl: "https://example.com/articles/planned-fields"',
      "draft: true",
      'publishedAt: "2025/26/03"',
      "socialDistribution:",
      "  x: true",
      "  linkedin: false",
      "---",
      "Content",
      "",
    ].join("\n"),
  );

  assert.equal(post.date, "2025/26/03");
  assert.equal(post.updatedAt, "2025/26/03");
  assert.equal(post.publishedAt, "2025/26/03");
  assert.deepEqual(post.socialDistribution, { x: true, linkedin: false });
  assert.equal(post.draft, true);
});

test("invalid frontmatter fields and empty bodies fail with article context", () => {
  assert.throws(
    () => parseArticleFile("bad-metadata.md", '---\ntitle: ""\nunknown: true\n---\nBody\n'),
    /Invalid article "bad-metadata" frontmatter: .*title.*unknown/,
  );
  assert.throws(
    () => parseArticleFile("empty-body.md", '---\ntitle: "Empty"\n---\n  \n'),
    /Invalid article "empty-body" body: expected non-empty Markdown content/,
  );
  assert.throws(
    () => parseArticleFile("broken.md", '---\ntitle: ["unterminated\n---\nBody\n'),
    /Invalid article "broken" frontmatter:/,
  );
  assert.throws(
    () =>
      parseArticleFile(
        "bad-planned-fields.md",
        '---\ntitle: "Invalid"\ndraft: "yes"\nsocialDistribution:\n  x: "yes"\n---\nBody\n',
      ),
    /Invalid article "bad-planned-fields" frontmatter:/,
  );
});

test("duplicate article slugs fail clearly", () => {
  assert.throws(
    () => assertUniqueSlugs([{ slug: "same-slug" }, { slug: "same-slug" }]),
    /Duplicate article slug "same-slug"/,
  );
});
