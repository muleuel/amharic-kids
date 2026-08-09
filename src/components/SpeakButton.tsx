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
  const [showHint, setShowHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function speak(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const voice = findAmharicVoice();
    if (!voice) {
      setShowHint(true);
      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setShowHint(false), 4000);
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
    <span className="relative inline-block">
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
      {showHint && (
        <span className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-xl border-2 border-foreground/15 bg-white p-2 text-center text-xs font-semibold text-foreground/70 shadow-lg">
          No Amharic voice found on this device. On Windows, add it via
          Settings → Time & Language → Language → Amharic.
        </span>
      )}
    </span>
  );
}
