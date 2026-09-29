import { credentials, skills } from "@/data/portfolio";
import { Section } from "./section";

// Printed like the output of `tree`, which is how a terminal shows nested things.
export function Skills() {
  const groups = Object.entries(skills);

  return (
    <Section id="skills" command="tree skills/" title="Skills">
      <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="font-mono text-[0.8rem] leading-7">
          <p className="text-phosphor">skills/</p>
          {groups.map(([group, items], gi) => {
            const lastGroup = gi === groups.length - 1;
            return (
              <div key={group}>
                <p>
                  <span className="whitespace-pre text-muted/50">{lastGroup ? "└── " : "├── "}</span>
                  <span className="text-phosphor">{group}/</span>
                </p>
                <p className="grid grid-cols-[auto_1fr]">
                  <span className="whitespace-pre text-muted/50">{lastGroup ? "    └── " : "│   └── "}</span>
                  <span className="text-ink">{items.join(", ")}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <p className="font-mono text-[0.75rem] text-muted">
            <span className="text-phosphor-dim">$</span> ls certs/
          </p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {credentials.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block text-ink group-hover:text-phosphor">{c.name}</span>
                    <span className="text-[0.85rem] text-muted">{c.issuer}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.7rem] text-phosphor-dim group-hover:text-phosphor">{c.url.includes("leetcode") ? "profile" : "verify"}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
