// Falling-glyph "digital rain" drawn on a canvas. Shared by the landing screen
// and the terminal's `matrix` easter egg. Returns a function that stops it.
const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789<>/{}[]#$%&*+=";

// `fill: true` scatters the first glyphs over the whole screen so it looks full from the first frame.
export function startMatrixRain(canvas: HTMLCanvasElement, { size = 16, fps = 22, fill = false } = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let drops: number[] = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // start columns at random heights above the screen so the rain doesn't begin as a flat line
    const rows = canvas.height / size;
    drops = Array.from({ length: Math.ceil(canvas.width / size) }, () =>
      fill ? Math.random() * rows : Math.random() * -40
    );
  };
  resize();

  let raf = 0;
  let last = 0;
  const frameMs = 1000 / fps;
  const draw = (t: number) => {
    raf = requestAnimationFrame(draw);
    if (t - last < frameMs) return; // a low frame rate reads as "terminal", not "video"
    last = t;
    // a translucent fill instead of clearing leaves the fading trail behind each glyph
    ctx.fillStyle = "rgba(3, 7, 10, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${size}px monospace`;
    drops.forEach((y, i) => {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#7dffb3";
      ctx.fillText(ch, i * size, y * size);
      drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  };
  raf = requestAnimationFrame(draw);
  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}
