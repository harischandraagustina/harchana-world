import fs from 'fs';
import path from 'path';

// Helper function to turn strings/titles into URL-friendly slugs
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
}

function parseFrontmatter(rawContent) {
  const result = { attributes: {}, body: "" };
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (match) {
    const yaml = match[1];
    const body = match[2];
    let currentKey = null;
    let currentValue = "";

    const flushAttribute = () => {
      if (currentKey) {
        let val = currentValue.trim();
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

const postsDir = path.join(process.cwd(), 'content', 'posts');
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

try {
  const files = fs.readdirSync(postsDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Home page
  xml += `  <!-- Main Page -->\n`;
  xml += `  <url>\n`;
  xml += `    <loc>https://harchanaworld.com/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n\n`;

  mdFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { attributes } = parseFrontmatter(content);
    
    const title = attributes.title || "Untitled Article";
    const slug = slugify(title);
    
    xml += `  <!-- Post: ${title} -->\n`;
    xml += `  <url>\n`;
    xml += `    <loc>https://harchanaworld.com/post/${encodeURIComponent(slug)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n\n`;
  });

  xml += `</urlset>\n`;

  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`Successfully generated sitemap.xml with ${mdFiles.length} posts!`);
} catch (err) {
  console.error("Error generating sitemap:", err);
  process.exit(1);
}
