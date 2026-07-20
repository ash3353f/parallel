"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BarChart3, Bot, FileText, Moon, Network, Sun } from "lucide-react";

const navItems = ["Features", "About", "GitHub"];

const features = [
  {
    icon: BarChart3,
    title: "Executive Overview",
    description: "See every strategic signal in one calm command center.",
  },
  {
    icon: Network,
    title: "Infinite Canvas",
    description: "Map markets, teams, and operations without artificial limits.",
  },
  {
    icon: Bot,
    title: "AI Simulation",
    description: "Stress-test decisions against dynamic digital twin scenarios.",
  },
  {
    icon: FileText,
    title: "Executive Reports",
    description: "Turn complex simulations into board-ready decision briefs.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  const isLight = theme === "light";

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 antialiased ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#050608] text-white"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 [animation:grid-drift_28s_linear_infinite] bg-[size:72px_72px] ${
          isLight
            ? "bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] opacity-60"
            : "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] opacity-40"
        }`}
      />
      <div
        className={`pointer-events-none absolute top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl sm:h-[34rem] sm:w-[34rem] ${
          isLight ? "bg-sky-400/20" : "bg-cyan-300/10"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.12)_36%,#f8fafc_78%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,8,0.12)_36%,#050608_78%)]"
        }`}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={`absolute h-1 w-1 [animation:particle-float_9s_ease-in-out_infinite] rounded-full ${
              isLight
                ? "bg-sky-500/40 shadow-[0_0_14px_rgba(14,165,233,0.4)]"
                : "bg-cyan-200/50 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
            }`}
            style={{
              left: `${8 + ((index * 19) % 86)}%`,
              top: `${18 + ((index * 23) % 68)}%`,
              animationDelay: `${index * 0.45}s`,
            }}
          />
        ))}
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-4 shadow-2xl backdrop-blur-xl transition-colors duration-300 sm:px-6 ${
            isLight
              ? "border-slate-200/80 bg-white/80 shadow-slate-200/50 text-slate-900"
              : "border-white/10 bg-white/[0.055] shadow-black/20 text-white"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="Parallel home">
            <span
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border shadow-sm ${
                isLight
                  ? "border-slate-200 bg-slate-100 text-sky-600"
                  : "border-cyan-200/20 bg-white/10 text-cyan-200"
              }`}
            >
              <span className="absolute h-4 w-4 rounded-full border border-current opacity-60" />
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-md" />
            </span>
            <span className="text-sm font-semibold tracking-[0.24em]">PARALLEL</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((navItem) => (
              <a
                key={navItem}
                href={`#${navItem.toLowerCase()}`}
                className={`text-sm transition ${
                  isLight ? "text-slate-600 hover:text-slate-950" : "text-white/62 hover:text-white"
                }`}
              >
                {navItem}
              </a>
            ))}

            {/* Apple/Stripe-style Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition hover:scale-[1.03] ${
                isLight
                  ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-100 shadow-slate-200/60"
                  : "border-white/15 bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle light and dark theme"
            >
              {isLight ? (
                <>
                  <Moon className="h-3.5 w-3.5 text-sky-600" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-300" />
                  <span>Light</span>
                </>
              )}
            </button>

            <Link
              href="/dashboard"
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition hover:scale-[1.02] ${
                isLight
                  ? "bg-slate-950 text-white hover:bg-slate-800 shadow-md shadow-slate-950/20"
                  : "bg-white text-black hover:bg-cyan-100"
              }`}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 pt-32 pb-16 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-5xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className={`mb-7 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.32em] uppercase backdrop-blur ${
              isLight
                ? "border-sky-200 bg-sky-50 text-sky-700"
                : "border-white/10 bg-white/[0.06] text-cyan-100/80"
            }`}
          >
            AI-powered digital twin platform
          </motion.p>

          <motion.h1
            variants={item}
            className={`max-w-5xl text-5xl font-semibold tracking-[-0.07em] sm:text-7xl lg:text-8xl ${
              isLight ? "text-slate-950" : "text-white"
            }`}
          >
            Simulate Tomorrow.
            <br />
            <span className={isLight ? "text-slate-500" : "text-white/72"}>Decide Today.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className={`mt-8 max-w-3xl text-lg leading-8 sm:text-xl ${
              isLight ? "text-slate-600" : "text-zinc-300"
            }`}
          >
            Parallel is an AI-powered Digital Twin platform that lets companies simulate business
            decisions before making them in the real world.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Link
              href="/dashboard"
              className={`inline-flex h-14 items-center justify-center rounded-full px-8 text-base font-semibold shadow-lg transition hover:scale-[1.02] ${
                isLight
                  ? "bg-slate-950 text-white hover:bg-slate-800 shadow-slate-950/20"
                  : "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.16)] hover:bg-cyan-100"
              }`}
            >
              Enter Parallel
            </Link>
            <Link
              href="/dashboard"
              className={`inline-flex h-14 items-center justify-center rounded-full border px-8 text-base font-semibold backdrop-blur transition hover:scale-[1.02] ${
                isLight
                  ? "border-slate-300 bg-white/80 text-slate-800 hover:bg-white hover:border-slate-400"
                  : "border-white/12 bg-white/[0.04] text-white hover:border-white/24 hover:bg-white/[0.08]"
              }`}
            >
              Start Simulation
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="mt-20 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
                  isLight
                    ? "border-slate-200/90 bg-white/90 shadow-slate-200/50 hover:border-slate-300"
                    : "border-white/10 bg-white/[0.045] shadow-black/20 hover:border-white/20"
                }`}
              >
                <div
                  className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                    isLight
                      ? "border-sky-200 bg-sky-50 text-sky-600 group-hover:border-sky-300 group-hover:bg-sky-100"
                      : "border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-100 group-hover:border-cyan-200/35 group-hover:bg-cyan-200/[0.12]"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h2
                  className={`text-lg font-semibold tracking-tight ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  {feature.title}
                </h2>
                <p className={`mt-3 text-sm leading-6 ${isLight ? "text-slate-600" : "text-zinc-400"}`}>
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <footer
        className={`relative z-10 border-t px-5 py-7 text-center text-sm transition-colors duration-300 ${
          isLight ? "border-slate-200 text-slate-500" : "border-white/8 text-zinc-500"
        }`}
      >
        Parallel Platform — Simulate Tomorrow. Decide Today.
      </footer>
    </main>
  );
}
