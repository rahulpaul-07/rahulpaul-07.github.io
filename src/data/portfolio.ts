// Every piece of text on the site lives here.
// Edit this file to update the portfolio; components only handle layout.

export const person = {
  name: "Rahul Paul",
  role: "Computer Science (Cyber Security) undergraduate",
  summary:
    "I build where machine learning, backend systems and security meet, and I stay with a problem through the unglamorous parts: the tests, the CI, and the bug that quietly halves your scores.",
  location: "Bengaluru, India",
  status: "Open to internships (Jan – Jun 2027) and full-time roles",
  email: "rpaul1b78@gmail.com",
  phone: "+91 91631 30524",
  resume: "/Rahul_Paul_Resume.pdf",
  links: {
    github: "https://github.com/rahulpaul-07",
    linkedin: "https://www.linkedin.com/in/rahul-paul-554225251",
    leetcode: "https://leetcode.com/u/rahul_paul07/",
  },
};

export const about = [
  "Most of what I know, I learned by building. My projects sit where machine learning, backend engineering and security overlap: a reconciliation engine that has to explain every record it can't match, a DNS threat detector tuned against a real false-positive budget, and an on-device captioning model cut down to 146 MB.",
  "I care about shipping things that actually run and about measuring them honestly, so most of my repos come with an evaluation harness and a CI check that fails when the numbers regress. I'm looking for software engineering, machine learning and security roles: internships from January to June 2027, and full-time positions after I graduate in 2027.",
];

export const education = [
  {
    school: "MS Ramaiah Institute of Technology",
    detail: "B.E. Computer Science and Engineering (Cyber Security)",
    period: "2023 – 2027",
    score: "CGPA 9.52 / 10",
  },
  {
    school: "Bhavan's Gangabux Kanoria Vidyamandir, Kolkata",
    detail: "Class XII (AISSCE)",
    period: "2021 – 2022",
    score: "96.33%",
  },
];

export const experience = [
  {
    role: "Project Intern",
    org: "Samsung PRISM, Samsung R&D Institute India",
    period: "Dec 2025 – Jul 2026",
    points: [
      "Took EmoCapNet from research prototype to an on-device build. Distilled a ViT + GPT-2 captioner into a TinyCLIP-ViT-8M + DistilGPT-2 student, then used quantization-aware training for INT8: 6.8x smaller at 146 MB and about 450 ms per caption on CPU, with KV-cache decoding written from scratch and an ONNX/TorchScript export path.",
      "Designed the model to be steered by a continuous valence-arousal-dominance (VAD) vector instead of discrete emotion labels, using cross-attention fusion and VAD-FiLM conditioning trained multi-task on an emotion-augmented Flickr30k corpus. Continuous control halved directional error against a discrete-label baseline.",
    ],
  },
];

// The EmoCapNet path from research model to phone, drawn as an animated pipeline
export const pipeline = [
  { id: "teacher", title: "Teacher", detail: "ViT + GPT-2 captioner" },
  { id: "distill", title: "Distil", detail: "soft-logit + feature losses" },
  { id: "student", title: "Student", detail: "TinyCLIP-ViT-8M + DistilGPT-2" },
  { id: "int8", title: "INT8", detail: "quantization-aware training" },
  { id: "device", title: "On-device", detail: "146 MB, ~450 ms on CPU" },
];

export const TAGS = ["Security", "ML", "Backend", "Full-stack", "Algorithms", "Control"] as const;
export type Tag = (typeof TAGS)[number];

export type Project = {
  id: string; // used by the terminal: `open <id>`
  name: string;
  tagline: string;
  period?: string;
  tags: Tag[]; // drives the filter on the projects list
  points: string[];
  // `text` is the plain version (screen readers, no-JS); the rest drives the count-up animation
  metric?: {
    text: string;
    label: string;
    before?: string;
    from?: number;
    to: number;
    decimals?: number;
    after?: string;
  };
  stack: string[];
  links: { label: string; href: string }[];
  image?: string; // path under public/
  diagram?: "recon";
};

// Every claim below is taken from the project's own README or results files.
export const projects: Project[] = [
  {
    id: "recon",
    name: "Three-Way Reconciliation Engine",
    tagline: "Matches the order ledger, gateway report and bank statement, and explains every record it can't",
    period: "Aug – Sep 2026",
    tags: ["Backend", "Algorithms"],
    diagram: "recon",
    points: [
      "Tiered deterministic matchers reconcile a merchant order ledger against a payment-gateway report and a bank statement. On the 141-entity benchmark, 90.8% of entities resolve at 100% accuracy across 14 defect classes, graded against a ground-truth answer key the engine never reads; 92.7% ± 0.4% across 12 independent batches.",
      "Every unresolved record lands in a categorised exception report with its reason. Nothing is silently dropped, and 26 of 26 planted defects of unseen classes were flagged.",
      "The Hungarian algorithm, written from scratch, resolves contested bank-to-settlement matches jointly instead of greedily, behind a verification gate that encodes paise-exact money, method-dependent MDR and T+1 working-day settlement.",
      "Roughly 230K–290K entities per second from 141 to 5,022 entities, at linear cost. 168 tests (the original suite verified by mutation) and a CI check that fails the build if measured accuracy moves.",
    ],
    metric: { text: "90.8%", to: 90.8, decimals: 1, after: "%", label: "resolved at 100% accuracy" },
    stack: ["Python", "FastAPI", "Hungarian algorithm", "pytest", "Mutation testing", "Render"],
    links: [
      { label: "Live dashboard", href: "https://rahulpaul-07.github.io/Three-Way-Financial-Reconciliation-Engine/" },
      { label: "Walkthrough video", href: "https://youtu.be/NjFKpmBX1Zk" },
      { label: "Source", href: "https://github.com/rahulpaul-07/Three-Way-Financial-Reconciliation-Engine" },
    ],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "An AppSec agent whose findings count only once an exploit has run the exact line it accused",
    period: "Jun – Sep 2026",
    tags: ["Security", "ML"],
    points: [
      "An LLM proposes candidate vulnerabilities. Each is tested by a generated exploit that must import and drive the real code, in a Docker sandbox with no network, a read-only root, every capability dropped and a 20-second kill, while a line tracer records what executed.",
      "Findings are graded on a five-tier evidence ladder: an exploit that succeeds without running the accused line is class-only and never counted. Fixes are verified by replaying the proving exploit against the patched code.",
      "Measured on a five-bug benchmark plus a clean control: strict recall 60–80% and precision 75–100% over three runs. Two runs had a false proof on the control, published with the results and listed as the top open issue.",
      "A security audit of its own pipeline fixed a critical bypass where an exploit could grade itself, each fix pinned by a regression test. 340 offline tests plus 15 against a real Docker daemon.",
    ],
    metric: { text: "60–80%", before: "60–", to: 80, after: "%", label: "strict recall, line-proven, 3 runs" },
    stack: ["Python", "Docker", "LiteLLM", "AST taint analysis", "SARIF", "pytest", "GitHub Actions"],
    links: [
      { label: "Project page", href: "https://rahulpaul-07.github.io/Sentinel-Autonomous-AppSec-Agent/" },
      { label: "Source", href: "https://github.com/rahulpaul-07/Sentinel-Autonomous-AppSec-Agent" },
    ],
  },
  {
    id: "dnsentinel",
    name: "DNSentinel",
    tagline: "Real-time DNS threat detection with containment that can't wedge the network",
    period: "Apr – Jun 2026",
    tags: ["Security", "ML", "Full-stack"],
    image: "/assets/dnsentinel.jpg",
    points: [
      "A FastAPI service streams to a React analyst dashboard over SSE and classifies DNS traffic for DGA domains, tunnelling and exfiltration with a 22-feature Random Forest and an Isolation Forest, with SHAP attribution for every flagged query.",
      "Traced 407 false positives to the default 0.5 decision threshold rather than the features, and recalibrated against an explicit false-positive budget: 407 to 21 at unchanged 100% recall on a family-stratified benchmark of 12,000 domains across 4 DGA families.",
      "Block and sinkhole rules auto-expire after 24 hours so a false positive can't wedge the network, and a liveness probe returns 503 when the database degrades.",
    ],
    metric: { text: "407 → 21", before: "407 → ", to: 21, label: "false positives, same recall" },
    stack: ["Python", "FastAPI", "SQLAlchemy", "React", "scikit-learn", "SHAP", "Docker", "CodeQL"],
    links: [
      { label: "Live demo", href: "https://dns-sentinel.vercel.app" },
      { label: "Source", href: "https://github.com/rahulpaul-07/dns-sentinel" },
    ],
  },
  {
    id: "courses",
    name: "Smart Course Generator",
    tagline: "Generates full courses and streams them lesson by lesson",
    period: "May – Jun 2026",
    tags: ["Full-stack", "ML"],
    image: "/assets/smart-course-generator.jpg",
    points: [
      "A multi-provider AI router (Gemini, then Groq, then OpenRouter) with per-provider circuit breakers, retry with backoff, timeouts and key rotation, so one upstream outage degrades the response instead of failing it.",
      "Courses stream lesson by lesson over SSE, so users see output in seconds instead of waiting on a long generation. Every generation is schema-validated before it is saved.",
      "Ten MongoDB collections with indexes chosen per access pattern and a TTL index bounding telemetry growth. Unit, integration and Playwright end-to-end tests run in CI, along with an eval harness that checks the output contract.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "SSE", "Zod", "Playwright"],
    links: [
      { label: "Live demo", href: "https://smart-course-generator.vercel.app" },
      { label: "Source", href: "https://github.com/rahulpaul-07/smart-course-generator" },
    ],
  },
  {
    id: "cube",
    name: "Rubik's Cube Studio",
    tagline: "Kociemba's two-phase solver, written from scratch, with webcam scanning",
    tags: ["Algorithms", "Full-stack"],
    image: "/assets/rubiks-cube-studio.jpg",
    points: [
      "Cubie model, coordinate reduction, BFS-built pruning tables and IDA* search in TypeScript: about 20.6 moves on average and every cube within 26 moves across 1,500+ random scrambles, each re-verified by an independent engine.",
      "The 0.7-second table build and the search run in a Web Worker so the Three.js render loop never blocks.",
      "Webcam scanning classifies stickers with an HSV colour pipeline, and the app installs as an offline PWA. 66 unit tests plus Playwright end-to-end tests.",
    ],
    metric: { text: "~20.6", before: "~", to: 20.6, decimals: 1, label: "average moves, 1,500+ cubes" },
    stack: ["TypeScript", "Three.js", "Web Workers", "Vitest", "Playwright", "PWA"],
    links: [
      { label: "Live demo", href: "https://rubiks-cube-studio.vercel.app" },
      { label: "Source", href: "https://github.com/rahulpaul-07/rubiks-cube-studio" },
    ],
  },
  {
    id: "choke",
    name: "Autonomous Choke Controller",
    tagline: "Constrained MPC for a production choke on a flowing oil well, which says when a target is unsafe",
    tags: ["Control", "Algorithms"],
    points: [
      "A model predictive controller picks the choke position every hour to reach a requested oil rate within wellhead, flowline and bottom-hole pressure limits. When a rate is not safely reachable, it names the limit in the way and produces the most it can.",
      "Zero constraint violations across 30 nominal runs, and +5.6% oil over a cautious operator at the same zero violations; a conventional PI controller violates on 69% of intervals. Under randomised model error in the hardest scenario, 7 of 150 runs brushed a limit, the worst by 1.16 psi on 2,850.",
      "Written for Honeywell Campus Connect (hackathon round 2), with an executed notebook and an interactive simulator.",
    ],
    metric: { text: "+5.6%", before: "+", to: 5.6, decimals: 1, after: "%", label: "oil vs a cautious operator, 0 violations" },
    stack: ["Python", "Model predictive control", "Streamlit"],
    links: [
      { label: "Live demo", href: "https://autonomous-choke-controller-v1.streamlit.app" },
      { label: "Source", href: "https://github.com/rahulpaul-07/autonomous-choke-controller" },
    ],
  },
];

export const moreRepos = [
  { name: "Rubiks-Cube-Solver", lang: "C++", desc: "IDA* with pattern-database heuristics on a bitboard; solves scrambles in under a second.", url: "https://github.com/rahulpaul-07/Rubiks-Cube-Solver" },
  { name: "multi-source-candidate-transformer", lang: "Python", desc: "Merges conflicting candidate data into one deduplicated profile with provenance on every field.", url: "https://github.com/rahulpaul-07/multi-source-candidate-transformer" },
  { name: "AI-Botnet-Traffic-Detection", lang: "Python", desc: "XGBoost/LightGBM on live Scapy captures, with a FastAPI + Streamlit dashboard and SHAP.", url: "https://github.com/rahulpaul-07/AI-Botnet-Traffic-Detection" },
  { name: "AI-Help-Extension", lang: "JavaScript", desc: "A Gemini tutor inside a CP platform that reads the problem and your code to give hints.", url: "https://github.com/rahulpaul-07/AI-Help-Extension" },
];

export const writing = [
  {
    title: "Applications of Quantum Computing for Internet of Things",
    venue: "Springer Nature, book chapter, pp. 79–121, 2025",
    desc: "A 43-page co-authored survey of 70+ papers across quantum ML, post-quantum cryptography and quantum sensing for IoT.",
    url: "https://link.springer.com/chapter/10.1007/978-981-95-6276-3_3",
  },
];

// Rendered as a `tree` listing
export const skills: Record<string, string[]> = {
  languages: ["C / C++", "Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  foundations: ["Data structures & algorithms", "Object-oriented design", "Operating systems", "Computer networks", "DBMS"],
  backend: ["FastAPI", "Node.js / Express", "REST", "SSE", "SQLAlchemy", "SQLite", "MongoDB", "React", "Three.js"],
  "testing-and-ops": ["pytest", "Jest", "Vitest", "Playwright", "autocannon", "Mutation testing", "Docker", "GitHub Actions", "CodeQL"],
  "ml-and-security": ["PyTorch", "ViT / GPT-2", "Knowledge distillation", "INT8 quantization", "ONNX", "scikit-learn", "SHAP", "LiteLLM", "Sandboxed execution", "Threat detection"],
};

export const credentials = [
  { issuer: "IBM", name: "Threat Intelligence & Hunting", url: "https://www.credly.com/badges/d973a340-5ddd-49d3-bda6-c90b5bc82f2b" },
  { issuer: "IBM", name: "Security Operations in Practice", url: "https://drive.google.com/file/d/1VPYKnCyhQOloXV3urAZihbwFMKYOWd4f/view" },
  { issuer: "Infosys Springboard", name: "Data Structures & Algorithms", url: "https://drive.google.com/file/d/1Ef33ABXVbxE5kVSE1aSBLS805-bxT-1o/view" },
  { issuer: "Kshitij, IIT Kharagpur", name: "Campus Ambassador", url: "https://drive.google.com/file/d/1JfqzSKolcQtHw-9cKlz9MjxJQ-6qsqJg/view" },
  { issuer: "LeetCode", name: "Knight, max rating 1858 (top 6.13%, 22 contests)", url: "https://leetcode.com/u/rahul_paul07/" },
];

// Rendered in the "Beyond the code" section
export const interests = [
  { id: "sport", title: "Sport", icon: "trophy", items: ["European football", "Cricket", "Tennis"] },
  { id: "world", title: "The world", icon: "earth", items: ["Geopolitics", "Politics", "Current affairs"] },
  { id: "intel", title: "Intelligence", icon: "radar", items: ["Intelligence operations", "Espionage history"] },
  { id: "humanities", title: "Humanities", icon: "library", items: ["History", "Art", "Culture"] },
];

export const music = {
  title: "Songs",
  tracks: 377, // update now and then; the player picks a random start within this range
  playlistId: "PLT18kL3REqq6xjF97Ib2gZGZao-T1128d",
  url: "https://www.youtube.com/playlist?list=PLT18kL3REqq6xjF97Ib2gZGZao-T1128d",
};

