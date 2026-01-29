import { TypedTitle } from "@/components/TypedTitle";
import { Chat } from "@/components/Chat";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

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
