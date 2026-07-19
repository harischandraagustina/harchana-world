/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import PostDetail from "./components/PostDetail";
import InfoModal from "./components/InfoModal";
import { defaultPosts, defaultAuthor } from "./data";
import { Post } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // 1. App State
  const [posts] = useState<Post[]>(defaultPosts);

  const [totalViews, setTotalViews] = useState<number>(() => {
    const saved = localStorage.getItem("harchana_views");
    return saved ? parseInt(saved, 10) : 25480;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [infoModalType, setInfoModalType] = useState<"about" | "terms" | "privacy" | "profile" | null>(null);

  // 2. Persist Views to localStorage
  useEffect(() => {
    localStorage.setItem("harchana_views", totalViews.toString());
  }, [totalViews]);

  // 3. Action Handlers
  const handleSelectPost = (postId: string) => {
    setActivePostId(postId);
    
    // Increment total views on click (realistic tracking)
    setTotalViews((prev) => prev + 1);
    
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setActivePostId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activePost = posts.find((p) => p.id === activePostId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 selection:bg-emerald-100 selection:text-emerald-900" id="harchana-root">
      
      {/* Dynamic persistent Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          // If searching, go back to home feed to show filtered results immediately!
          if (activePostId) {
            setActivePostId(null);
          }
        }}
        onGoHome={handleBackToHome}
        authorName={defaultAuthor.name}
      />

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          {activePostId && activePost ? (
            <PostDetail
              key={`detail-${activePostId}`}
              post={activePost}
              onBack={handleBackToHome}
              onShowProfile={() => setInfoModalType("profile")}
            />
          ) : (
            <HomeView
              key="home-feed"
              posts={posts}
              searchQuery={searchQuery}
              onSelectPost={handleSelectPost}
              totalViews={totalViews}
              onShowProfile={() => setInfoModalType("profile")}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer containing custom credit and interactive links */}
      <Footer onOpenModal={(type) => setInfoModalType(type)} />

      {/* Modals for About, Terms, and Privacy */}
      <AnimatePresence>
        {infoModalType && (
          <InfoModal
            type={infoModalType}
            onClose={() => setInfoModalType(null)}
          />
        )}
      </AnimatePresence>
      
    </div>
  );
}
