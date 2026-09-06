"use client";

import { useRef, useState, useSyncExternalStore } from "react";

function findAmharicVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang.toLowerCase().startsWith("am")) ?? null;
}

function subscribeToVoices(onChange: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return () => {};
  }
  window.speechSynthesis.addEventListener("voiceschanged", onChange);
  return () =>
    window.speechSynthesis.removeEventListener("voiceschanged", onChange);
}

function getServerSnapshot() {
  return false;
}

// Shared across every SpeakButton on the page so the "no voice" notice
// always renders as one bottom-of-screen toast, rather than a tiny tooltip
// next to whichever button was tapped — those get clipped or hidden when
// the button sits in a cramped corner (e.g. quiz option grids).
type HintListener = (show: boolean) => void;
const hintListeners = new Set<HintListener>();
let hintTimer: ReturnType<typeof setTimeout> | null = null;

function announceNoVoice() {
  hintListeners.forEach((l) => l(true));
  if (hintTimer) clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    hintListeners.forEach((l) => l(false));
  }, 5000);
}

export function NoVoiceToast() {
  const [show, setShow] = useState(false);
  useState(() => {
    hintListeners.add(setShow);
  });

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="bubble-card max-w-sm border-orange-dark bg-white p-4 text-center shadow-lg">
        <p className="font-bold text-orange-dark">🔇 No Amharic voice found</p>
        <p className="mt-1 text-sm text-foreground/70">
          On Windows: Settings → Time &amp; Language → Language &amp; region →
          Add a language → Amharic. Then restart your browser.
        </p>
      </div>
    </div>
  );
}

export function SpeakButton({
  text,
  size = "md",
  className = "",
}: {
  text: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const hasVoice = useSyncExternalStore(
    subscribeToVoices,
    () => !!findAmharicVoice(),
    getServerSnapshot,
  );
  const clickedRef = useRef(false);

  function speak(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    clickedRef.current = true;

    const voice = findAmharicVoice();
    if (!voice) {
      announceNoVoice();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  const dims = size === "sm" ? "h-8 w-8 text-base" : "h-11 w-11 text-xl";

  return (
    <button
      type="button"
      onClick={speak}
      aria-label="Hear pronunciation"
      className={`chunky-btn flex items-center justify-center border-2 border-foreground/15 bg-white ${
        hasVoice ? "" : "opacity-50"
      } ${dims} ${className}`}
    >
      🔊
    </button>
  );
}
