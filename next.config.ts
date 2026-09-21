import type { NextConfig } from "next";

// The site is exported as plain static files so it can live on GitHub Pages.
// BASE_PATH is empty for the user site (rahulpaul-07.github.io) and set to
// "/<repo-name>" when deploying from any other repo (project site).
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
