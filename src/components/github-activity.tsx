"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitBranch, GitCommitHorizontal, GitFork } from "lucide-react";
import { person } from "@/data/portfolio";

const USER = "rahulpaul-07";
const CACHE_KEY = "rp-gh-activity";
const CACHE_MS = 10 * 60 * 1000;

type Item = { id: string; repo: string; text: string; href: string; at: string; kind: "commit" | "branch" | "repo" };
type State = { status: "loading" } | { status: "ready"; items: Item[] } | { status: "error" };

function timeAgo(iso: string) {
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  const steps: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [30, "d"],
    [12, "mo"],
  ];
  let v = s;
  for (const [size, unit] of steps) {
    if (v < size) return `${Math.floor(v)}${unit} ago`;
    v /= size;
  }
  return `${Math.floor(v)}y ago`;
}

// Loosely typed on purpose: GitHub has changed event payloads before, so every field is optional.
type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    ref?: string;
    ref_type?: string;
    head?: string;
    commits?: { sha: string; message: string }[];
  };
};

function fromEvents(events: GhEvent[]): Item[] {
  const items: Item[] = [];
  for (const e of events) {
    const repo = e.repo.name.split("/")[1] ?? e.repo.name;
    const repoUrl = `https://github.com/${e.repo.name}`;
    const p = e.payload ?? {};
    if (e.type === "PushEvent") {
      const latest = p.commits?.[p.commits.length - 1];
      const sha = latest?.sha ?? p.head;
      const branch = p.ref?.replace("refs/heads/", "");
      items.push({
        id: e.id,
        repo,
        kind: "commit",
        text: latest ? latest.message.split("\n")[0] : `pushed to ${branch ?? "a branch"}`,
        href: sha ? `${repoUrl}/commit/${sha}` : repoUrl,
        at: e.created_at,
      });
    } else if (e.type === "CreateEvent" && p.ref_type === "repository") {
      items.push({ id: e.id, repo, kind: "repo", text: "created repository", href: repoUrl, at: e.created_at });
    } else if (e.type === "CreateEvent" && p.ref_type === "branch") {
      items.push({ id: e.id, repo, kind: "branch", text: `created branch ${p.ref}`, href: repoUrl, at: e.created_at });
    } else if (e.type === "PublicEvent") {
      items.push({ id: e.id, repo, kind: "repo", text: "made public", href: repoUrl, at: e.created_at });
    }
    if (items.length === 6) break;
  }
  return items;
}

type GhRepo = { id: number; name: string; html_url: string; pushed_at: string; description: string | null; fork: boolean };

function fromRepos(repos: GhRepo[]): Item[] {
  return repos
    .filter((r) => !r.fork)
    .slice(0, 6)
    .map((r) => ({
      id: String(r.id),
      repo: r.name,
      kind: "repo" as const,
      text: r.description ? `pushed: ${r.description}` : "pushed",
      href: r.html_url,
      at: r.pushed_at,
    }));
}

async function load(): Promise<Item[]> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
    if (cached && Date.now() - cached.t < CACHE_MS) return cached.items;
  } catch {}

  // Unauthenticated GitHub API: 60 requests per hour per visitor, so cache and fall back.
  let items: Item[] = [];
  const ev = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=40`);
  if (ev.ok) items = fromEvents(await ev.json());
  if (items.length === 0) {
    const rp = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=10`);
    if (!rp.ok) throw new Error(`GitHub responded ${rp.status}`);
    items = fromRepos(await rp.json());
  }
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items }));
  } catch {}
  return items;
}

const ICON = { commit: GitCommitHorizontal, branch: GitBranch, repo: GitFork };

export function GithubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    load()
      .then((items) => alive && setState(items.length ? { status: "ready", items } : { status: "error" }))
      .catch(() => alive && setState({ status: "error" }));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="mt-16">
      <p className="flex items-center gap-2 font-mono text-[0.75rem] text-muted">
        <span className="text-phosphor-dim">$</span> git log --all --author=rahul
        {state.status === "ready" && (
          <span className="ml-2 inline-flex items-center gap-1.5 text-phosphor">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor motion-safe:animate-pulse" /> live
          </span>
        )}
      </p>

      <ul className="mt-4 divide-y divide-line border-y border-line font-mono text-[0.8rem]" aria-live="polite">
        {state.status === "loading" &&
          Array.from({ length: 4 }, (_, i) => (
            <li key={i} className="py-3.5">
              <span className="block h-3 w-2/3 animate-pulse rounded bg-line" />
            </li>
          ))}

        {state.status === "error" && (
          <li className="py-4 text-muted">
            Couldn&apos;t reach GitHub just now (its public API allows 60 requests an hour).{" "}
            <a href={person.links.github} target="_blank" rel="noreferrer" className="text-phosphor underline underline-offset-4">
              See recent work on GitHub
            </a>
          </li>
        )}

        {state.status === "ready" &&
          state.items.map((it, i) => {
            const Icon = ICON[it.kind];
            return (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-3 py-3.5 sm:grid-cols-[auto_13rem_1fr_auto]"
                >
                  <Icon className="h-3.5 w-3.5 translate-y-0.5 text-phosphor-dim" aria-hidden="true" />
                  <span className="truncate text-phosphor">{it.repo}</span>
                  <span className="col-span-3 col-start-2 row-start-2 truncate text-ink group-hover:text-phosphor sm:col-span-1 sm:col-start-3 sm:row-start-1">
                    {it.text}
                  </span>
                  <span className="text-[0.7rem] text-muted">{timeAgo(it.at)}</span>
                </a>
              </motion.li>
            );
          })}
      </ul>
    </div>
  );
}
