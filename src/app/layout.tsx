import type { Metadata, Viewport } from "next";
import "./globals.css";

const site = "https://rahulpaul-07.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Rahul Paul — ML, backend and security engineering",
  description:
    "Computer Science (Cyber Security) undergraduate building where machine learning, backend systems and security meet, with the tests and measurements to show it works. Open to internships from January 2027.",
  authors: [{ name: "Rahul Paul" }],
  openGraph: {
    title: "Rahul Paul",
    description: "ML, backend and security projects, each measured against a benchmark.",
    url: site,
    type: "website",
    images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: "Rahul Paul" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/og.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Sets the theme before first paint so the page never flashes the wrong one.
const THEME_SCRIPT =
  "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Loaded at runtime so the build never needs network access */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
