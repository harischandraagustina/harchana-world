import React from "react";

interface FooterProps {
  onOpenModal: (type: "about" | "terms" | "privacy") => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-4 sm:px-6 md:px-8 mt-16 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="serif-title text-lg font-bold text-gray-800">
          Harchana World
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <button 
            onClick={() => onOpenModal("about")} 
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => onOpenModal("terms")} 
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Terms
          </button>
          <button 
            onClick={() => onOpenModal("privacy")} 
            className="hover:text-emerald-600 transition-colors cursor-pointer"
          >
            Privacy
          </button>
        </div>

        {/* Copyright and Blogger Credit */}
        <div className="text-center md:text-right space-y-1">
          <p>© 2026 Harchana World. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
