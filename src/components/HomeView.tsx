import React, { useState, useEffect } from "react";
import { Post } from "../types";
import { BookOpen, Eye, ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  key?: string;
  posts: Post[];
  searchQuery: string;
  onSelectPost: (postId: string) => void;
  totalViews: number;
  onShowProfile?: () => void;
}

export default function HomeView({
  posts,
  searchQuery,
  onSelectPost,
  totalViews,
  onShowProfile,
}: HomeViewProps) {
  // Filtered posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.sections?.some((s) => s.heading.toLowerCase().includes(searchQuery.toLowerCase()) || s.paragraphs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      post.paragraphs.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Dynamic state for currently reading simulation
  const [activeReaders, setActiveReaders] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReaders((prev) => {
        const rand = Math.random();
        if (rand < 0.3) return Math.max(2, prev - 1);
        if (rand < 0.6) return Math.min(6, prev + 1);
        return prev;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Find featured post (post with id "1" is always featured)
  const featuredPost = posts.find((p) => p.id === "1") || posts[0];

  return (
    <div className="space-y-10" id="home-view-container">
      {/* 1. Featured Story Card (Only show if there is no active search query) */}
      {!searchQuery && featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => onSelectPost(featuredPost.id)}
          className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300"
          id="featured-story-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Text */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mono-text mb-6">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  Featured Story
                </span>
                
                <h2 className="serif-title text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-emerald-700 leading-tight transition-colors mb-4">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                  {featuredPost.subtitle}
                </p>
              </div>

              {/* Author Row */}
              <div className="border-t border-gray-50 pt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowProfile?.();
                  }}
                  className="flex items-center gap-3 text-left hover:bg-emerald-50/40 p-2 -m-2 rounded-xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer group/author"
                  title="View Author Profile"
                >
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover/author:border-emerald-200 transition-transform"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover/author:text-emerald-700 transition-colors">
                      {featuredPost.author.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {featuredPost.date} &bull; {featuredPost.readTime}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 h-64 lg:h-auto min-h-[250px] relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Latest Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="mono-text text-xs font-bold tracking-widest text-gray-400 uppercase">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Latest from Harchana World"}
            </h3>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-500 text-sm">No articles found matching your query.</p>
              <button
                onClick={() => onSelectPost(featuredPost.id)}
                className="mt-4 text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1 mx-auto"
              >
                Read Featured Post instead <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onSelectPost(post.id)}
                  className="group cursor-pointer bg-white p-5 sm:p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex justify-between items-start gap-4"
                >
                  <div className="flex-1 space-y-3">
                    <p className="text-xs text-gray-500 font-medium">
                      {post.date}
                    </p>
                    
                    <h3 className="serif-title text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {post.subtitle}
                    </p>

                    <div className="flex items-center gap-3 pt-2 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Philosophy */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-3 shadow-2xs">
            <h4 className="mono-text text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              Reading Philosophy
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Join readers exploring cognitive stillness and thoughtful reflections in our independent digital sanctuary.
            </p>
          </div>

          {/* Card 2: Website Visitors Metrics */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <h4 className="mono-text text-[11px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Website Visitors
              </h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Total Views</span>
                <span className="text-lg font-bold text-gray-900 font-mono tracking-tight flex items-center gap-1">
                  <Eye className="w-4 h-4 text-gray-400" />
                  {totalViews.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Currently Reading</span>
                <span className="text-xs font-semibold text-gray-800 bg-gray-50 px-2 py-1 rounded-full flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {activeReaders} active
                </span>
              </div>
            </div>
          </div>



        </div>

      </div>
    </div>
  );
}
