import { TypedTitle } from "@/components/TypedTitle";
import { Chat } from "@/components/Chat";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <TypedTitle />
          <nav className="flex items-center gap-2">
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        <Chat />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data Analyst & Software Developer at BMW Group</p>
          <p className="mt-1">Debrecen, Hungary</p>
        </div>
      </footer>
    </div>
  );
}
