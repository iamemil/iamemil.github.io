"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { TypedTitle } from "./TypedTitle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Desktop: side by side | Mobile: stacked */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Title - centered on mobile */}
          <div className="flex justify-center sm:justify-start">
            <TypedTitle />
          </div>

          {/* Social links + Theme toggle - centered on mobile */}
          <nav className="flex items-center justify-center sm:justify-end gap-1">
            <a
              href="https://github.com/iamemil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/ismayilzada"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:ismailzadeh.emil@gmail.com"
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Resume"
            >
              <FileText className="h-5 w-5" />
            </a>
            <div className="w-px h-6 bg-border mx-1" />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
