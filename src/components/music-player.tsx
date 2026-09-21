"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, AudioLines, Play, Shuffle } from "lucide-react";
import { music } from "@/data/portfolio";
import { PLAY_MUSIC_EVENT } from "@/lib/events";

// Click-to-load YouTube playlist. Nothing from YouTube loads until the visitor presses play,
// so the page stays fast and no YouTube cookies are set for people who never use it.
export function MusicPlayer() {
  const [index, setIndex] = useState<number | null>(null);

  const play = (shuffle: boolean) => setIndex(shuffle ? 1 + Math.floor(Math.random() * music.tracks) : 1);

  // the terminal's `music` command
  useEffect(() => {
    const onPlay = () => setIndex(1 + Math.floor(Math.random() * music.tracks));
    window.addEventListener(PLAY_MUSIC_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_MUSIC_EVENT, onPlay);
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/videoseries?list=${music.playlistId}&index=${index ?? 1}&autoplay=1&rel=0`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/70">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[0.72rem] text-muted">
        <span>
          <span className="text-phosphor-dim">$</span> mpv ~/music/{music.title.toLowerCase()}
        </span>
        {index !== null && (
          <span className="flex items-end gap-[2px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="eq-bar w-[3px] rounded-sm bg-phosphor"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
      </div>

      {index === null ? (
        <div className="flex flex-1 flex-col justify-between gap-8 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-phosphor/40 text-phosphor shadow-[0_0_24px_-6px_rgb(125_255_179/0.5)]">
              <AudioLines className="h-6 w-6" />
            </div>
            <div>
              <p className="font-mono text-lg text-ink">{music.title}</p>
              <p className="text-[0.9rem] text-muted">
                My YouTube playlist, {music.tracks} tracks and counting.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 font-mono text-[0.78rem]">
            <button
              type="button"
              onClick={() => play(false)}
              className="inline-flex items-center gap-2 rounded-md bg-phosphor px-3.5 py-2 text-void transition-shadow hover:shadow-[0_0_24px_rgb(125_255_179/0.5)]"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" /> Play
            </button>
            <button
              type="button"
              onClick={() => play(true)}
              className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-ink transition-colors hover:border-phosphor hover:text-phosphor"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" /> Shuffle
            </button>
            <a
              href={music.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-1 py-2 text-muted hover:text-phosphor"
            >
              Open on YouTube <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <div className="aspect-video w-full">
          <iframe
            key={index}
            src={src}
            title={`${music.title} playlist on YouTube`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  );
}
