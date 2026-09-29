// Window events that let separate parts of the page talk to each other
// without sharing state: the terminal, dock and command palette all fire these.
export const OPEN_PROJECT_EVENT = "rp:open-project"; // detail: project id
export const FOCUS_TERMINAL_EVENT = "rp:focus-terminal";
export const MATRIX_EVENT = "rp:matrix";
export const OPEN_PALETTE_EVENT = "rp:open-palette";
export const BOOT_DONE_EVENT = "rp:boot-done";
export const PLAY_MUSIC_EVENT = "rp:play-music";

declare global {
  interface Window {
    __rpBootDone?: boolean;
  }
}

export function markBootDone() {
  window.__rpBootDone = true;
  window.dispatchEvent(new Event(BOOT_DONE_EVENT));
}

// Runs `cb` once the boot screen is gone (immediately if it already is).
// Returns an unsubscribe function for use as an effect cleanup.
export function onBootDone(cb: () => void) {
  if (window.__rpBootDone) {
    cb();
    return () => {};
  }
  window.addEventListener(BOOT_DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(BOOT_DONE_EVENT, cb);
}

export function openProject(id: string) {
  document.getElementById("projects")?.scrollIntoView({ block: "start" });
  setTimeout(() => window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id })), 350);
}

export function scrollToSection(id: string) {
  if (id === "top") window.scrollTo({ top: 0 });
  else document.getElementById(id)?.scrollIntoView({ block: "start" });
}
