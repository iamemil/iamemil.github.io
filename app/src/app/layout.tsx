import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emil Ismayilzada",
  description:
    "Data Analyst and Software Developer with experience at BMW Group. Specializing in Python, React, ASP.NET, and data analytics.",
  keywords: [
    "Emil Ismayilzada",
    "Data Analyst",
    "Software Developer",
    "BMW Group",
    "React",
    "Python",
    "ASP.NET",
  ],
  authors: [{ name: "Emil Ismayilzada" }],
  openGraph: {
    title: "Emil Ismayilzada",
    description:
      "Data Analyst and Software Developer with experience at BMW Group.",
    url: "https://iamemil.github.io",
    siteName: "Emil Ismayilzada",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Emil Ismayilzada",
    description:
      "Data Analyst and Software Developer with experience at BMW Group.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'light') {
                    // Light mode explicitly set
                  } else if (stored === 'dark' || prefersDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
