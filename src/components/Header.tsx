import React from "react";
import { User, Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onGoHome: () => void;
  authorName: string;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  onGoHome,
  authorName,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
          id="header-brand-logo"
        >
          <h1 className="serif-title text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
            Harchana World
          </h1>
        </div>

        {/* Right side container with Search & CMS Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Search input field */}
          <div className="relative flex-1 sm:flex-initial w-full sm:w-64 md:w-72" id="header-search-container">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-gray-50 hover:bg-gray-100/75 focus:bg-white text-sm text-gray-800 pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* CMS Admin Button (Decap CMS) */}
          <a
            href="/admin/"
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 text-gray-700 hover:text-emerald-700 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium transition-all shrink-0 shadow-xs group"
            id="cms-admin-button"
            title="Manage with Decap CMS"
          >
            <User className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden sm:inline">{authorName}</span>
            <span className="sm:hidden font-semibold">CMS</span>
          </a>
        </div>

      </div>
    </header>
  );
}
