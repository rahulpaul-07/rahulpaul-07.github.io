"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { about, interests, music, person, projects, sections, skills } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { BorderBeam } from "./ui/border-beam";
import {
  FOCUS_TERMINAL_EVENT,
  MATRIX_EVENT,
  OPEN_PALETTE_EVENT,
  PLAY_MUSIC_EVENT,
  onBootDone,
  openProject,
  scrollToSection,
} from "@/lib/events";

type Line = { id: number; kind: "in" | "out"; body: React.ReactNode };

const PROMPT = "rahul@portfolio:~$";



// `nmap rahul`: skills presented as open ports. Not listed in `help`.
function Nmap() {
  const ports: [string, string][] = [
    ["22/tcp", "c++ (competitive programming, max 1858)"],
    ["80/tcp", "python / fastapi"],
    ["443/tcp", "typescript / react"],
    ["5432/tcp", "sql / sqlalchemy"],
    ["8888/tcp", "pytorch (distillation, int8)"],
    ["9090/tcp", "security (sandboxing, threat detection)"],
    ["1337/tcp", "hiring (internship jan – jun 2027, full-time 2027)"],
  ];
  return (
    <div>
      <p>Starting Nmap 7.95 ( https://nmap.org )</p>
      <p>Nmap scan report for rahul (rahulpaul-07.github.io)</p>
      <p className="mb-2">Host is up (0.0019s latency).</p>
      <p className="grid grid-cols-[6.5rem_4rem_1fr] text-muted">
        <span>PORT</span>
        <span>STATE</span>
        <span>SERVICE</span>
      </p>
      {ports.map(([port, svc]) => (
        <p key={port} className="grid grid-cols-[6.5rem_4rem_1fr]">
          <span>{port}</span>
          <span className="text-phosphor">open</span>
          <span className={port === "1337/tcp" ? "text-amber" : undefined}>{svc}</span>
        </p>
      ))}
      <p className="mt-2 text-muted">Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds</p>
    </div>
  );
}

function Neofetch() {
  const rows: [string, string, boolean?][] = [
    ["study", "B.E. CSE (Cyber Security), MSRIT"],
    ["cgpa", "9.52 / 10"],
    ["last", "Project Intern, Samsung PRISM"],
    ["focus", "backend, ML, security tooling"],
    ["leetcode", "Knight, max 1858 (top 6.13%)"],
    ["status", "open: internships + full-time", true],
  ];
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <pre aria-hidden="true" className="glow shrink-0 text-phosphor leading-tight">
{`██▀▀▄ ██▀▀▄
██▄▄▀ ██▄▄▀
██ ▀▄ ██
██  █ ██`}
      </pre>
      <div className="min-w-0">
        <p className="text-phosphor">rahul@portfolio</p>
        <p className="text-muted">───────────────</p>
        {rows.map(([k, v, hot]) => (
          <p key={k} className="grid grid-cols-[5rem_1fr]">
            <span className="text-phosphor">{k}</span>
            <span className={hot ? "text-amber" : undefined}>{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

const COMMANDS: Record<string, string> = {
  help: "list commands",
  neofetch: "system summary",
  about: "who I am",
  "ls": "list projects",
  "open <project>": "jump to a project and expand it",
  "cd <section>": "go to about, work, projects, skills, contact",
  skills: "print the skill tree",
  interests: "what I do away from the keyboard",
  music: "play my playlist",
  contact: "how to reach me",
  resume: "open my résumé (PDF)",
  "github | linkedin | leetcode": "open a profile",
  clear: "clear the screen",
  "ctrl+k": "open the command palette",
};

function run(raw: string, history: string[]): React.ReactNode | "CLEAR" {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ").toLowerCase();

  switch (cmd?.toLowerCase()) {
    case "":
    case undefined:
      return null;
    case "help":
      return (
        <div>
          {Object.entries(COMMANDS).map(([c, d]) => (
            <p key={c}>
              <span className="inline-block w-56 max-w-[55%] text-phosphor">{c}</span>
              <span className="text-muted">{d}</span>
            </p>
          ))}
        </div>
      );
    case "neofetch":
    case "whoami":
      return <Neofetch />;
    case "about":
    case "cat":
      return about.map((p) => (
        <p key={p.slice(0, 12)} className="mb-2 font-sans text-ink">
          {p}
        </p>
      ));
    case "ls":
      return (
        <div>
          {projects.map((p) => (
            <p key={p.id}>
              <span className="inline-block w-28 text-phosphor">{p.id}/</span>
              <span className="text-muted">{p.name}</span>
            </p>
          ))}
          <p className="mt-2 text-muted">
            Try <span className="text-phosphor">open sentinel</span>
          </p>
        </div>
      );
    case "open": {
      const p = projects.find((x) => x.id === arg || x.name.toLowerCase() === arg);
      if (!p) return <p>open: no project named &quot;{arg}&quot;. Run ls to see them.</p>;
      openProject(p.id);
      return <p className="text-muted">opening {p.name}…</p>;
    }
    case "cd": {
      const target = arg.replace(/^~?\/?/, "");
      if (!target || target === "~") {
        scrollToSection("top");
        return null;
      }
      if (!sections.some((s) => s.id === target))
        return <p>cd: no such section: {target}</p>;
      scrollToSection(target);
      return null;
    }
    case "skills":
      return Object.entries(skills).map(([k, v]) => (
        <p key={k}>
          <span className="text-phosphor">{k}/</span> <span className="text-muted">{v.join(", ")}</span>
        </p>
      ));
    case "contact":
    case "mail":
      return (
        <div>
          <p>
            email <a className="text-phosphor underline" href={`mailto:${person.email}`}>{person.email}</a>
          </p>
          <p>
            linkedin <a className="text-phosphor underline" href={person.links.linkedin} target="_blank" rel="noreferrer">rahul-paul</a>
          </p>
        </div>
      );
    case "resume":
      window.open(asset(person.resume), "_blank", "noopener");
      return <p className="text-muted">opening résumé in a new tab…</p>;
    case "github":
    case "linkedin":
    case "leetcode":
      window.open(person.links[cmd.toLowerCase() as keyof typeof person.links], "_blank", "noopener");
      return <p className="text-muted">opening {cmd}…</p>;
    case "history":
      return history.map((h, i) => (
        <p key={i}>
          <span className="inline-block w-8 text-muted">{i + 1}</span>
          {h}
        </p>
      ));
    case "echo":
      return <p>{args.join(" ")}</p>;
    case "sudo":
      return <p className="text-amber">rahul is not in the sudoers file. This incident will be reported.</p>;
    case "exit":
      return <p className="text-muted">Nowhere to go. Try contact instead.</p>;
    case "clear":
      return "CLEAR";
    case "interests":
      return interests.map((g) => (
        <p key={g.id}>
          <span className="text-phosphor">{g.id}/</span> <span className="text-muted">{g.items.join(", ")}</span>
        </p>
      ));
    case "music":
    case "play":
      scrollToSection("interests");
      window.dispatchEvent(new Event(PLAY_MUSIC_EVENT));
      return <p className="text-muted">shuffling {music.title.toLowerCase()} ({music.tracks} tracks)…</p>;
    case "nmap":
      return <Nmap />;
    case "matrix":
      window.dispatchEvent(new Event(MATRIX_EVENT));
      return <p className="text-phosphor">Follow the white rabbit. (press any key to come back)</p>;
    case "hack":
      return <p className="text-amber">Access denied. Try asking nicely: contact</p>;
    case "palette":
      window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
      return null;
    default:
      return (
        <p>
          command not found: {cmd}. Type <span className="text-phosphor">help</span>.
        </p>
      );
  }
}

const COMPLETIONS = [
  ...["help", "neofetch", "about", "ls", "skills", "interests", "music", "contact", "resume", "github", "linkedin", "leetcode", "clear", "history"],
  ...projects.map((p) => `open ${p.id}`),
  ...sections.map((s) => `cd ${s.id}`),
];

const SUGGESTIONS = ["help", "ls", "open sentinel", "contact"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [booting, setBooting] = useState(true);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const push = useCallback((kind: Line["kind"], body: React.ReactNode) => {
    setLines((l) => [...l, { id: idRef.current++, kind, body }]);
  }, []);

  const execute = useCallback(
    (raw: string) => {
      const result = run(raw, [...history, raw]);
      if (result === "CLEAR") {
        setLines([]);
      } else {
        push("in", raw);
        if (result) push("out", result);
      }
      if (raw.trim()) setHistory((h) => [...h, raw]);
      setCursor(null);
    },
    [history, push]
  );

  // Boot: type out `neofetch` once, then hand over to the visitor.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const word = "neofetch";
    const timers: ReturnType<typeof setTimeout>[] = [];
    const finish = () => {
      setInput("");
      push("in", word);
      push("out", <Neofetch />);
      push("out", <p className="text-muted">Type help, or pick a command below.</p>);
      setBooting(false);
    };
    const start = () => {
      if (reduce) {
        finish();
        return;
      }
      word.split("").forEach((_, i) => {
        timers.push(setTimeout(() => setInput(word.slice(0, i + 1)), 700 + i * 70));
      });
      timers.push(setTimeout(finish, 700 + word.length * 70 + 250));
    };
    // Start typing only once the boot screen has cleared, so the visitor sees it.
    const unsubscribe = onBootDone(start);
    return () => {
      unsubscribe();
      timers.forEach(clearTimeout);
    };
  }, [push]);

  // Keep the newest output in view, scrolling the terminal only, never the page.
  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // "/" focuses the terminal from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === "INPUT";
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus({ preventScroll: false });
      }
    };
    const onFocusRequest = () => {
      scrollToSection("top");
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(FOCUS_TERMINAL_EVENT, onFocusRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(FOCUS_TERMINAL_EVENT, onFocusRequest);
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      const match = COMPLETIONS.filter((c) => c.startsWith(input.toLowerCase()));
      if (input && match.length) {
        e.preventDefault();
        if (match.length === 1) setInput(match[0]);
        else push("out", <p className="text-muted">{match.join("   ")}</p>);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-panel/90 font-mono text-[0.78rem] leading-relaxed shadow-[0_0_60px_-20px_rgb(125_255_179/0.25)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-muted">
        <span>zsh: rahul@portfolio</span>
        <span className="hidden sm:inline">
          press <kbd className="text-phosphor">/</kbd> to type
        </span>
      </div>

      <div
        ref={screenRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[22rem] cursor-text overflow-y-auto px-4 py-3"
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal output"
      >
        {lines.map((l) =>
          l.kind === "in" ? (
            <p key={l.id} className="mt-2 first:mt-0">
              <span className="text-phosphor">{PROMPT}</span> {l.body}
            </p>
          ) : (
            <div key={l.id} className="mt-1 text-ink">
              {l.body}
            </div>
          )
        )}

        <label className="mt-2 flex items-center gap-2">
          <span className="shrink-0 text-phosphor">{PROMPT}</span>
          <span className="sr-only">Terminal command</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={booting}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-ink caret-phosphor outline-none focus-visible:outline-none"
          />
        </label>
      </div>

      <BorderBeam size={120} duration={9} colorFrom="#7dffb3" colorTo="#ffb454" />
      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={booting}
            onClick={() => execute(s)}
            className="rounded border border-line px-2.5 py-1 text-muted transition-colors hover:border-phosphor hover:text-phosphor disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
