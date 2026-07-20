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
import { defaultPosts, defaultAuthor, slugify } from "./data";
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

  // Synchronize activePostId with URL (deep linking & popstate) using clean paths or query params
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      let postParam = params.get("post") || params.get("id");

      // Extract from clean URL pathname /post/slug-name
      if (!postParam && path.startsWith("/post/")) {
        postParam = path.substring(6); // Get everything after "/post/"
      }

      if (postParam) {
        // Decode URI component to handle spaces or special characters safely
        const decodedParam = decodeURIComponent(postParam);
        // Find matching post by checking ID or the slug of the title
        const matchedPost = posts.find((p) => p.id === decodedParam || slugify(p.title) === decodedParam);
        if (matchedPost) {
          setActivePostId(matchedPost.id);
          
          // Seamlessly replace legacy query param URL in browser history with the clean URL format
          const postSlug = slugify(matchedPost.title);
          const cleanUrl = `${window.location.protocol}//${window.location.host}/post/${encodeURIComponent(postSlug)}`;
          if (window.location.pathname !== `/post/${postSlug}` || window.location.search !== "") {
            window.history.replaceState({ path: cleanUrl }, "", cleanUrl);
          }
        } else {
          setActivePostId(null);
        }
      } else {
        setActivePostId(null);
      }
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [posts]);

  // 3. Action Handlers
  const handleSelectPost = (postId: string) => {
    setActivePostId(postId);
    
    // Increment total views on click (realistic tracking)
    setTotalViews((prev) => prev + 1);

    // Get the post to find its slugified title
    const post = posts.find((p) => p.id === postId);
    const postSlug = post ? slugify(post.title) : postId;

    // Update browser URL using clean pathname /post/slug
    const newUrl = `${window.location.protocol}//${window.location.host}/post/${encodeURIComponent(postSlug)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setActivePostId(null);

    // Reset URL to base path
    const newUrl = `${window.location.protocol}//${window.location.host}/`;
    window.history.pushState({ path: newUrl }, "", newUrl);

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
            handleBackToHome();
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
