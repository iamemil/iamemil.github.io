import { Chat } from "@/components/Chat";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content - flex-1 with min-h-0 to allow shrinking */}
      <main className="flex-1 min-h-0 w-full max-w-4xl mx-auto px-4 py-4">
        <Chat />
      </main>

      {/* Footer - fixed at bottom */}
      <footer className="shrink-0 w-full border-t border-border py-3">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data Analyst & Software Developer at BMW Group</p>
          <p className="mt-0.5">Debrecen, Hungary</p>
        </div>
      </footer>
    </div>
  );
}
