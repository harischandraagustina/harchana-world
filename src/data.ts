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
    
    let currentKey: string | null = null;
    let currentValue: string = "";

    const flushAttribute = () => {
      if (currentKey) {
        let val = currentValue.trim();
        // Remove enclosing quotes if any
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        result.attributes[currentKey] = val;
      }
    };

    yaml.split(/\r?\n/).forEach((line) => {
      const keyMatch = line.match(/^([a-zA-Z0-9_-]+):\s*([\s\S]*)$/);
      if (keyMatch) {
        flushAttribute();
        currentKey = keyMatch[1];
        currentValue = keyMatch[2];
      } else if (currentKey !== null) {
        currentValue += "\n" + line;
      }
    });

    flushAttribute();
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

// Helper function to turn strings/titles into URL-friendly slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    // Replace non-alphanumeric characters (except spaces and hyphens) with nothing
    .replace(/[^\w\s-]/g, "")
    // Replace spaces and underscores with a single hyphen
    .replace(/[\s_]+/g, "-")
    .trim()
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "");
}

