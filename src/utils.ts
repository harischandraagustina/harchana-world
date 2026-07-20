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
