import { Earth, Library, Radar, Trophy } from "lucide-react";
import { interests } from "@/data/portfolio";
import { Section } from "./section";
import { MagicCard } from "./ui/magic-card";
import { MusicPlayer } from "./music-player";

const ICONS = { trophy: Trophy, earth: Earth, radar: Radar, library: Library } as const;

export function Interests() {
  return (
    <Section id="interests" command="ls ~/interests/" title="Beyond the code">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {interests.map((group) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS];
            return (
              <li key={group.id} className="list-none">
                <MagicCard
                  className="h-full rounded-xl"
                  gradientSize={220}
                  gradientColor="rgb(125 255 179 / 0.06)"
                  gradientFrom="#7dffb3"
                  gradientTo="#2f7a57"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-phosphor" aria-hidden="true" />
                      <h3 className="font-mono text-[0.9rem] text-ink">{group.title}</h3>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-full border border-line px-3 py-1 text-[0.85rem] text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MagicCard>
              </li>
            );
          })}
        </ul>

        <MusicPlayer />
      </div>
    </Section>
  );
}
