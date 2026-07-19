import { Post, Comment } from "./types";

// Dynamic relative paths to the generated images from assets
export const AUTHOR_IMAGE = "/images/foto_profile.jpg";
export const POST_IMAGE = "/images/foto_desk.jpg";

export const defaultAuthor = {
  name: "Haris Chandra Agustina",
  avatar: AUTHOR_IMAGE,
  title: "SENIOR CULTURAL CRITIC & AUTHOR",
  bio: "Halo semua perkenalkan namaku Haris Chandra Agustina. Sebuah tulisan perkenalan tentang impian menjadi terkenal, motivasi membuat prasasti digital, dan gairah menulis yang terinspirasi oleh kisah Harry Potter."
};

// Dynamic markdown loader for Decap CMS compatibility
function parseFrontmatter(rawContent: string) {
  const result: { attributes: Record<string, string>; body: string } = {
    attributes: {},
    body: "",
  };

  // Match the frontmatter block at the start of the file
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (match) {
    const yaml = match[1];
    const body = match[2];
    
    yaml.split(/\r?\n/).forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(":").trim();
        // Remove enclosing quotes if any
        let cleanVal = val;
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          cleanVal = val.substring(1, val.length - 1);
        }
        result.attributes[key] = cleanVal;
      }
    });
    result.body = body.trim();
  } else {
    result.body = rawContent.trim();
  }
  return result;
}

// Load all .md files from /content/posts/
const markdownFiles = import.meta.glob("/content/posts/*.md", { query: "?raw", eager: true }) as Record<string, { default: string }>;

const parsedMarkdownPosts: Post[] = Object.entries(markdownFiles).map(([path, file]) => {
  const rawContent = file.default;
  const { attributes, body } = parseFrontmatter(rawContent);
  const fileName = path.split("/").pop()?.replace(".md", "") || Math.random().toString();
  
  return {
    id: attributes.id || fileName,
    title: attributes.title || "Untitled Article",
    subtitle: attributes.subtitle || "",
    date: attributes.date || "Apr 8, 12:00",
    readTime: attributes.readTime || "5 min read",
    author: defaultAuthor,
    image: attributes.image || POST_IMAGE,
    contentMarkdown: body,
    paragraphs: [],
    sections: []
  };
});

export const defaultPosts: Post[] = parsedMarkdownPosts.sort((a, b) => {
  const idA = Number(a.id);
  const idB = Number(b.id);
  if (!isNaN(idA) && !isNaN(idB)) {
    return idA - idB;
  }
  return a.id.localeCompare(b.id);
});
