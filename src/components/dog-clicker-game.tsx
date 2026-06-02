"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { dogClickerTreats, getDogClickerMascot, getDogClickerRank, getUnlockedTreat } from "@/lib/dog-clicker";
import { DogTreatIcon } from "@/components/dog-treat-icon";

const ROUND_SECONDS = 60;
const COMBO_WINDOW_MS = 850;

type GameState = "idle" | "playing" | "finished";

type FloatingScore = {
  id: number;
  x: number;
  y: number;
  text: string;
  tone: "normal" | "combo" | "golden";
};

type GoldenTreat = {
  id: number;
  x: number;
  y: number;
  expiresAt: number;
};

const missions = [
  { label: "Score 125 treats", target: 125 },
  { label: "Hit a 15x combo", target: 15 },
  { label: "Catch a golden treat", target: 1 },
];

export function DogClickerGame() {
  const mascot = getDogClickerMascot();
  const [gameState, setGameState] = useState<GameState>("idle");
  const [treats, setTreats] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [highScore, setHighScore] = useState(0);
  const [goldenTreat, setGoldenTreat] = useState<GoldenTreat | null>(null);
  const [goldenCaught, setGoldenCaught] = useState(0);
  const [floaters, setFloaters] = useState<FloatingScore[]>([]);
  const [dogPulse, setDogPulse] = useState(false);
  const lastFeedAt = useRef(0);
  const floaterId = useRef(0);
  const goldenId = useRef(0);
  const roundScoreRef = useRef(0);

  const unlockedTreat = getUnlockedTreat(treats);
  const nextTreat = dogClickerTreats.find((treat) => treat.unlockAt > treats);
  const progress = nextTreat ? Math.min(100, Math.round((treats / nextTreat.unlockAt) * 100)) : 100;
  const roundRank = getDogClickerRank(roundScore);
  const floatingTreats = useMemo(() => Array.from({ length: 10 }, (_, index) => index), []);
  const multiplier = Math.min(8, 1 + Math.floor(combo / 8));
  const topComboMissionProgress = Math.min(combo, missions[1].target);
  const missionProgress = [Math.min(roundScore, missions[0].target), topComboMissionProgress, Math.min(goldenCaught, missions[2].target)];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedScore = window.localStorage.getItem("schwebels-treat-rush-high-score");
      if (storedScore) setHighScore(Number(storedScore) || 0);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setGameState("finished");
          setGoldenTreat(null);
          setHighScore((currentHighScore) => {
            const nextHighScore = Math.max(currentHighScore, roundScoreRef.current);
            window.localStorage.setItem("schwebels-treat-rush-high-score", String(nextHighScore));
            return nextHighScore;
          });
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [gameState]);


  useEffect(() => {
    if (!goldenTreat) return;

    const timeout = window.setTimeout(() => {
      setGoldenTreat((current) => (current?.id === goldenTreat.id ? null : current));
    }, Math.max(0, goldenTreat.expiresAt - Date.now()));

    return () => window.clearTimeout(timeout);
  }, [goldenTreat]);

  function startRound() {
    setGameState("playing");
    setTreats(0);
    setRoundScore(0);
    roundScoreRef.current = 0;
    setCombo(0);
    setTimeLeft(ROUND_SECONDS);
    setGoldenTreat(null);
    setGoldenCaught(0);
    setFloaters([]);
    lastFeedAt.current = 0;
  }

  function addFloater(text: string, tone: FloatingScore["tone"], x = 62, y = 38) {
    const id = floaterId.current + 1;
    floaterId.current = id;
    setFloaters((current) => [...current.slice(-7), { id, x, y, text, tone }]);
    window.setTimeout(() => {
      setFloaters((current) => current.filter((item) => item.id !== id));
    }, 950);
  }

  function maybeSpawnGoldenTreat() {
    if (goldenTreat || Math.random() > 0.14) return;

    goldenId.current += 1;
    setGoldenTreat({
      id: goldenId.current,
      x: 58 + Math.random() * 30,
      y: 16 + Math.random() * 48,
      expiresAt: Date.now() + 2500,
    });
  }

  function feedDog() {
    if (gameState !== "playing") {
      startRound();
      return;
    }

    const now = Date.now();
    const nextCombo = now - lastFeedAt.current <= COMBO_WINDOW_MS ? combo + 1 : 1;
    const nextMultiplier = Math.min(8, 1 + Math.floor(nextCombo / 8));
    const earned = nextMultiplier;
    lastFeedAt.current = now;

    setCombo(nextCombo);
    setTreats((current) => current + earned);
    roundScoreRef.current += earned;
    setRoundScore(roundScoreRef.current);
    setDogPulse(true);
    window.setTimeout(() => setDogPulse(false), 150);
    addFloater(nextMultiplier > 1 ? `+${earned} combo` : "+1 treat", nextMultiplier > 1 ? "combo" : "normal");
    maybeSpawnGoldenTreat();
  }

  function catchGoldenTreat() {
    if (gameState !== "playing" || !goldenTreat) return;

    const bonus = 25;
    setTreats((current) => current + bonus);
    roundScoreRef.current += bonus;
    setRoundScore(roundScoreRef.current);
    setGoldenCaught((current) => current + 1);
    addFloater("+25 golden", "golden", goldenTreat.x, goldenTreat.y);
    setGoldenTreat(null);
  }

  return (
    <div className="relative overflow-hidden rounded-[2.8rem] border-[4px] border-black bg-[#fff7e8] p-5 shadow-[10px_12px_0_#17130f] md:p-8">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        {floatingTreats.map((item) => (
          <span
            key={item}
            className="absolute flex h-10 w-14 items-center justify-center rounded-full border-2 border-black bg-yellow-100 shadow-[3px_4px_0_#17130f]"
            style={{
              left: `${(item * 17 + 8) % 92}%`,
              top: `${(item * 23 + 10) % 88}%`,
              rotate: `${(item % 2 === 0 ? 1 : -1) * (8 + item * 2)}deg`,
            }}
          >
            <DogTreatIcon icon="bone" className="h-7 w-7" />
          </span>
        ))}
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="marker-script inline-flex rotate-[-1deg] rounded-full border-[3px] border-black bg-pink-200 px-4 py-2 text-sm uppercase text-black shadow-[4px_5px_0_#17130f]">
            Schwebels Treat Rush
          </p>
          <h1 className="brand-display mt-5 text-6xl uppercase leading-none text-black md:text-8xl">
            Beat the treat clock
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-black/68 md:text-xl">{mascot.tagline}</p>

          <div className="mt-7 grid gap-4 sm:grid-cols-4">
            <ScoreCard label="Timer" value={`${timeLeft}s`} tone="bg-pink-200" />
            <ScoreCard label="Score" value={roundScore} tone="bg-cyan-200" />
            <ScoreCard label="Combo" value={`x${Math.max(1, combo)}`} tone="bg-yellow-200" />
            <ScoreCard label="Best" value={highScore} tone="bg-lime-200" />
          </div>

          <div className="mt-7 rounded-3xl border-[3px] border-black bg-white p-4 shadow-[5px_6px_0_#17130f]">
            <div className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/60 sm:flex-row sm:items-center sm:justify-between">
              <span>{unlockedTreat.rewardText}</span>
              <span>{nextTreat ? `${Math.max(0, nextTreat.unlockAt - treats)} to ${nextTreat.name}` : "All treats unlocked"}</span>
            </div>
            <div className="mt-3 h-5 overflow-hidden rounded-full border-[3px] border-black bg-[#f6f0e4]">
              <div className="h-full rounded-full bg-gradient-to-r from-pink-300 via-yellow-200 to-cyan-300 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {missions.map((mission, index) => {
              const done = missionProgress[index] >= mission.target;
              return (
                <div key={mission.label} className="rounded-2xl border-[3px] border-black bg-[#fffaf0] p-3 shadow-[4px_5px_0_#17130f]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-black/65">{mission.label}</p>
                    <span className={`h-4 w-4 rounded-full border-2 border-black ${done ? "bg-lime-300" : "bg-white"}`} aria-label={done ? "Mission complete" : "Mission incomplete"} />
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-black bg-white">
                    <div className="h-full bg-pink-300" style={{ width: `${Math.min(100, Math.round((missionProgress[index] / mission.target) * 100))}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-3 top-8 z-30 flex max-w-[70%] items-center rounded-full border-[3px] border-black bg-yellow-200 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-black shadow-[5px_6px_0_#17130f] sm:-left-6 sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.16em]">
            <DogTreatIcon icon={unlockedTreat.icon} className="mr-2 h-6 w-6 shrink-0" />
            <span className="truncate">{unlockedTreat.name}</span>
          </div>

          <button
            type="button"
            onClick={feedDog}
            className="group relative block w-full rounded-[3rem] border-[5px] border-black bg-pink-200 p-5 shadow-[12px_14px_0_#17130f] transition active:translate-x-1 active:translate-y-1 active:shadow-[7px_8px_0_#17130f]"
            aria-label={gameState === "playing" ? `Feed ${mascot.name} a treat` : "Start Schwebels Treat Rush"}
          >
            <span className="absolute right-4 top-4 z-20 rounded-full border-[3px] border-black bg-white px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-black shadow-[4px_5px_0_#17130f] sm:right-5 sm:top-5 sm:px-4 sm:text-xs">
              {gameState === "playing" ? `x${multiplier} power` : "Start round"}
            </span>
            <span className="absolute -bottom-4 left-1/2 z-20 inline-flex w-[88%] max-w-[20rem] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-black bg-cyan-200 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-black shadow-[5px_6px_0_#17130f] sm:text-sm sm:tracking-[0.18em]">
              {gameState === "playing" ? "Tap fast for tail-wag combos" : gameState === "finished" ? "Play again" : "Start Treat Rush"}
            </span>
            <div className="relative aspect-square overflow-hidden rounded-[2.3rem] border-[4px] border-black bg-white">
              <Image
                src={mascot.image}
                alt={mascot.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`object-cover transition duration-200 group-hover:scale-[1.03] ${dogPulse ? "scale-[1.05]" : "scale-100"}`}
                priority
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.4rem] border-[3px] border-black bg-white/85 px-4 py-3 text-center shadow-[4px_5px_0_#17130f] backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Current rank</p>
                <p className="brand-display text-3xl uppercase leading-none text-black">{roundRank.name}</p>
              </div>
            </div>
          </button>

          {goldenTreat ? (
            <button
              type="button"
              onClick={catchGoldenTreat}
              className="absolute z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-black bg-yellow-200 shadow-[6px_7px_0_#17130f] transition hover:scale-105 active:translate-x-[-48%] active:translate-y-[-48%]"
              style={{ left: `${goldenTreat.x}%`, top: `${goldenTreat.y}%` }}
              aria-label="Catch golden treat bonus"
            >
              <DogTreatIcon icon="spark" className="h-12 w-12" />
            </button>
          ) : null}

          {floaters.map((item) => (
            <span
              key={item.id}
              className={`pointer-events-none absolute z-50 -translate-x-1/2 rounded-full border-[3px] border-black px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-black shadow-[4px_5px_0_#17130f] transition-all ${
                item.tone === "golden" ? "bg-yellow-200" : item.tone === "combo" ? "bg-lime-200" : "bg-white"
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.text}
            </span>
          ))}

          {gameState === "finished" ? (
            <div className="absolute inset-5 z-50 flex items-center justify-center rounded-[2.3rem] border-[4px] border-black bg-[#fff7e8]/95 p-5 text-center shadow-[8px_9px_0_#17130f] backdrop-blur-sm">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/55">Round complete</p>
                <h2 className="brand-display mt-3 text-5xl uppercase leading-none text-black">{roundRank.name}</h2>
                <p className="mt-3 font-black text-black/70">{roundRank.message}</p>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-black/55">Score {roundScore} / Best {Math.max(highScore, roundScore)}</p>
                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={startRound} className="rounded-full border-[3px] border-black bg-yellow-200 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black shadow-[4px_5px_0_#17130f] transition hover:-translate-y-1">
                    Play again
                  </button>
                  <a href="/book" className="rounded-full border-[3px] border-black bg-pink-300 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black shadow-[4px_5px_0_#17130f] transition hover:-translate-y-1">
                    Book the humans
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value, tone }: { label: string; value: string | number; tone: string }) {
  return (
    <div className={`rounded-3xl border-[3px] border-black ${tone} p-4 text-center shadow-[5px_6px_0_#17130f]`}>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-black/60">{label}</p>
      <p className="brand-display text-4xl text-black md:text-5xl">{value}</p>
    </div>
  );
}
