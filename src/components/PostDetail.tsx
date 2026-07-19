import React, { useState, useEffect, useRef } from "react";
import { Post, Comment } from "../types";
import { ArrowLeft, Share2, Heart, MessageSquare, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PostDetailProps {
  key?: string;
  post: Post;
  onBack: () => void;
  onShowProfile?: () => void;
}

export default function PostDetail({
  post,
  onBack,
  onShowProfile,
}: PostDetailProps) {
  // Share notification state
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };



  // Helper to safely render text with bold formatting for specific keywords & standard markdown bold/italic
  const formatText = (text: string) => {
    const keywords = [
      "Haris Chandra Agustina",
      "prasastiku sendiri",
      "Harry Potter",
    ];
    let formatted = text;

    // Convert Markdown bold (**text**) to <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Convert Markdown italic (*text*) to <em>text</em>
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

    keywords.forEach((keyword) => {
      // Escape for regex
      const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "g");
      formatted = formatted.replace(regex, `<strong>$1</strong>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  // Custom parser and renderer for raw Markdown blocks
  const renderMarkdown = (markdown: string) => {
    const normalized = markdown.replace(/\r\n/g, "\n");
    const blocks = normalized.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H3 Heading
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-950 mt-6 mb-3">
            {formatText(trimmed.replace("### ", ""))}
          </h3>
        );
      }
      // H2 Heading
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-gray-950 mt-8 mb-4">
            {formatText(trimmed.replace("## ", ""))}
          </h2>
        );
      }
      // H1 Heading
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-bold text-gray-950 mt-10 mb-4">
            {formatText(trimmed.replace("# ", ""))}
          </h1>
        );
      }

      // Unordered list
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const lines = trimmed.split(/\n/);
        return (
          <ul key={idx} className="list-disc pl-6 my-4 space-y-2 text-base sm:text-lg text-gray-800">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[-*]\s+/, "");
              return <li key={lIdx}>{formatText(cleanLine)}</li>;
            })}
          </ul>
        );
      }

      // Ordered list
      if (/^\d+\.\s+/.test(trimmed)) {
        const lines = trimmed.split(/\n/);
        return (
          <ol key={idx} className="list-decimal pl-6 my-4 space-y-2 text-base sm:text-lg text-gray-800">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^\d+\.\s+/, "");
              return <li key={lIdx}>{formatText(cleanLine)}</li>;
            })}
          </ol>
        );
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        const quoteContent = trimmed.replace(/^>\s?/gm, "");
        return (
          <blockquote key={idx} className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-6 text-base sm:text-lg">
            {formatText(quoteContent)}
          </blockquote>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="leading-relaxed text-base sm:text-lg text-gray-800">
          {formatText(trimmed)}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8"
      id={`post-detail-${post.id}`}
    >
      {/* Navigation and Actions Row */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-emerald-700 uppercase tracking-wider mono-text transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Harchana World
        </button>

        <div className="relative">
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer flex items-center gap-1 text-xs uppercase mono-text font-bold"
            title="Share Link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 animate-scale-up" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 leading-tight">
          {post.title}
        </h1>

        {/* Subtitle / Blockquote style */}
        <p className="serif-title text-base sm:text-lg md:text-xl text-gray-500 italic font-normal leading-relaxed border-y border-gray-100 py-4 px-2">
          "{post.subtitle}"
        </p>

        {/* Date and Read time info */}
        <div className="text-xs text-gray-400 font-medium">
          {post.date} &bull; {post.readTime}
        </div>

        {/* Author details card */}
        <div className="flex items-center justify-center p-4">
          <button
            onClick={onShowProfile}
            className="inline-flex items-center gap-3 bg-white hover:bg-emerald-50/40 border border-gray-100 hover:border-emerald-100 rounded-xl px-5 py-3 shadow-xs max-w-sm text-left transition-all hover:scale-[1.02] active:scale-95 cursor-pointer group/author"
            title="View Author Profile"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-gray-200 group-hover/author:border-emerald-200 transition-colors"
            />
            <div className="text-left">
              <h4 className="text-sm font-bold text-gray-900 group-hover/author:text-emerald-700 transition-colors leading-none">
                {post.author.name}
              </h4>
              <p className="mono-text text-[9px] font-bold text-emerald-700 tracking-wider mt-1">
                {post.author.title}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="aspect-[16:9] sm:aspect-[21:9] w-full rounded-2xl overflow-hidden shadow-xs border border-gray-100">
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <article className="prose prose-emerald max-w-none serif-title text-gray-800 leading-relaxed text-base sm:text-lg space-y-6">
        {post.contentMarkdown ? (
          renderMarkdown(post.contentMarkdown)
        ) : (
          <>
            {/* Render main introductory paragraph blocks */}
            {post.paragraphs.map((p, index) => (
              <p key={index} className="indent-0">
                {formatText(p)}
              </p>
            ))}

            {/* Render headings and sub-paragraphs from data sections */}
            {post.sections &&
              post.sections.map((section, idx) => (
                <div key={idx} className="space-y-4 pt-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mt-8 mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((sp, sIdx) => (
                    <p key={sIdx}>
                      {formatText(sp)}
                    </p>
                  ))}
                </div>
              ))}
          </>
        )}
      </article>


    </motion.div>
  );
}
