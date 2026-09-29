import type { Metadata, Viewport } from "next";
import "./globals.css";

const site = "https://rahulpaul-07.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Rahul Paul",
  description:
    "Computer Science (Cyber Security) undergraduate building at the intersection of machine learning, web engineering and security. Open to internships from January 2027.",
  authors: [{ name: "Rahul Paul" }],
  openGraph: {
    title: "Rahul Paul",
    description: "ML, full-stack and security projects by Rahul Paul.",
    url: site,
    type: "website",
    images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: "Rahul Paul" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#03070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Loaded at runtime so the build never needs network access */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Martian+Mono:wdth,wght@75..112.5,300..700&display=swap"
        />
        {/* Runs before first paint so the boot screen never flashes on repeat visits */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('rp-booted')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('booted')}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
