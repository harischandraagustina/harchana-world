export interface Author {
  name: string;
  avatar: string;
  title: string;
  bio?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar?: string;
  timestamp: string; // e.g. '2 hours ago', 'Yesterday', 'Apr 16, 2026'
  content: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  contentHtml?: string; // rich format if needed
  contentMarkdown?: string; // raw markdown loaded from .md file
  paragraphs: string[]; // dynamic structured content blocks
  sections?: { heading: string; paragraphs: string[] }[]; // detailed sections
  date: string;
  readTime: string;
  author: Author;
  image: string;
}
