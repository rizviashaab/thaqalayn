"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Users } from "lucide-react";
import cardData from "../data/cards.json";

const CARDS = cardData;

function CornerMotif({ className = "", color = "#A8843A" }) {
  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 17 L17 1 L33 17" stroke={color} strokeWidth="1" opacity="0.55" />
      <path d="M1 17 L17 33 L33 17" stroke={color} strokeWidth="1" opacity="0.25" />
      <circle cx="17" cy="17" r="2.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function SectionBadge({ section }) {
  const isQuran = section === "quran";
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase font-mono"
      style={{
        backgroundColor: isQuran ? "#1C4D3E" : "#9C5B4A",
        color: "#F2EBDD",
        letterSpacing: "0.12em",
      }}
    >
      {isQuran ? <BookOpen size={12} /> : <Users size={12} />}
      {isQuran ? "Quran" : "Ahl al-Bayt"}
    </div>
  );
}

function Card({ card, section }) {
  const accent = section === "quran" ? "#1C4D3E" : "#9C5B4A";

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#F2EBDD",
        border: `1px solid ${accent}22`,
        boxShadow: "0 1px 2px rgba(31,36,33,0.04), 0 8px 24px rgba(31,36,33,0.10)",
      }}
    >
      <CornerMotif className="absolute top-3 left-3" color={accent} />
      <CornerMotif className="absolute top-3 right-3" color={accent} />
      <div style={{ transform: "rotate(180deg)" }} className="contents">
        <CornerMotif className="absolute bottom-3 right-3" color={accent} />
        <CornerMotif className="absolute bottom-3 left-3" color={accent} />
      </div>

      <div className="px-8 pt-10 pb-8 sm:px-12 sm:pt-12 sm:pb-10 max-h-[70vh] overflow-y-auto">
        <SectionBadge section={section} />

        <p
          className="mt-5 text-xs uppercase font-mono"
          style={{ color: accent, letterSpacing: "0.1em" }}
        >
          {card.ref}
        </p>

        <h2 className="mt-2 text-2xl sm:text-3xl leading-snug font-display" style={{ color: "#1F2421" }}>
          {card.title}
        </h2>

        <blockquote
          className="mt-6 text-lg sm:text-xl leading-relaxed font-body italic"
          style={{ color: "#1F2421" }}
        >
          &ldquo;{card.text}&rdquo;
        </blockquote>

        <div className="my-6 h-px w-full" style={{ backgroundColor: `${accent}33` }} />

        <p className="text-base leading-relaxed font-body" style={{ color: "#3A3F3A" }}>
          {card.lesson}
        </p>

        <div className="mt-7 pt-4" style={{ borderTop: `1px dashed ${accent}40` }}>
          <p
            className="text-[10px] uppercase mb-1.5 font-mono"
            style={{ color: "#8A8275", letterSpacing: "0.12em" }}
          >
            Sources
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {card.sources.map((s, i) => (
              <span key={i} className="text-xs font-mono" style={{ color: "#5C5547" }}>
                {s}
                {i < card.sources.length - 1 ? " ·" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThaqalaynApp() {
  const [section, setSection] = useState("quran");
  const [index, setIndex] = useState({ quran: 0, ahlulbayt: 0 });
  const [dragX, setDragX] = useState(0);
  const startX = useRef(null);
  const dragging = useRef(false);

  const cards = CARDS[section];
  const current = cards[index[section]];

  function go(delta) {
    setIndex((prev) => {
      const len = CARDS[section].length;
      const next = (prev[section] + delta + len) % len;
      return { ...prev, [section]: next };
    });
  }

  function handlePointerDown(e) {
    dragging.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
  }
  function handlePointerMove(e) {
    if (!dragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    setDragX(x - startX.current);
  }
  function handlePointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragX > 80) go(-1);
    else if (dragX < -80) go(1);
    setDragX(0);
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center font-body"
      style={{
        backgroundColor: "#EAE1CF",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(31,36,33,0.04), transparent 60%)",
      }}
    >
      <div className="w-full max-w-md px-6 pt-8 pb-4 text-center">
        <h1 className="text-3xl tracking-wide font-display" style={{ color: "#1F2421" }}>
          Thaqalayn
        </h1>
        <p
          className="mt-1 text-xs uppercase font-mono"
          style={{ color: "#8A8275", letterSpacing: "0.15em" }}
        >
          The Two Weighty Things
        </p>
      </div>

      <div className="w-full max-w-md px-6 flex gap-2 mb-6">
        {[
          { key: "quran", label: "Quran", Icon: BookOpen },
          { key: "ahlulbayt", label: "Ahl al-Bayt", Icon: Users },
        ].map(({ key, label, Icon }) => {
          const active = section === key;
          const accent = key === "quran" ? "#1C4D3E" : "#9C5B4A";
          return (
            <button
              key={key}
              onClick={() => setSection(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all font-mono"
              style={{
                backgroundColor: active ? accent : "transparent",
                color: active ? "#F2EBDD" : "#5C5547",
                border: `1px solid ${active ? accent : "#1F242122"}`,
                letterSpacing: "0.04em",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-md px-6 flex-1 flex flex-col items-center">
        <div
          className="w-full select-none touch-none"
          style={{
            transform: `translateX(${dragX}px) rotate(${dragX / 40}deg)`,
            transition: dragging.current ? "none" : "transform 0.25s ease",
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Card card={current} section={section} />
        </div>

        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={() => go(-1)}
            className="p-2.5 rounded-full"
            style={{ backgroundColor: "#1F242110", color: "#1F2421" }}
            aria-label="Previous card"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-xs font-mono" style={{ color: "#8A8275" }}>
            {index[section] + 1} / {cards.length}
          </span>

          <button
            onClick={() => go(1)}
            className="p-2.5 rounded-full"
            style={{ backgroundColor: "#1F242110", color: "#1F2421" }}
            aria-label="Next card"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="mt-3 text-[11px] text-center font-mono" style={{ color: "#8A8275" }}>
          swipe or use arrows
        </p>
      </div>

      <div className="h-10" />
    </div>
  );
}
