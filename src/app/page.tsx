"use client";

import { motion, type Variants } from "framer-motion";
import { BarChart3, Bot, FileText, Network } from "lucide-react";

const navItems = ["Features", "About", "GitHub", "Login"];

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
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050608] text-white antialiased">
      <div className="pointer-events-none absolute inset-0 [animation:grid-drift_28s_linear_infinite] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      <div className="pointer-events-none absolute top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,8,0.12)_36%,#050608_78%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1 w-1 [animation:particle-float_9s_ease-in-out_infinite] rounded-full bg-cyan-200/50 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
            style={{
              left: `${8 + ((index * 19) % 86)}%`,
              top: `${18 + ((index * 23) % 68)}%`,
              animationDelay: `${index * 0.45}s`,
            }}
          />
        ))}
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
          <a href="#" className="group flex items-center gap-3" aria-label="Parallel home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
              <span className="absolute h-4 w-4 rounded-full border border-cyan-200/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
            </span>
            <span className="text-sm font-semibold tracking-[0.24em] text-white/90">PARALLEL</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((navItem) => (
              <a
                key={navItem}
                href="#"
                className="text-sm text-white/62 transition hover:text-white"
              >
                {navItem}
              </a>
            ))}
            <a
              href="#"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-cyan-100"
            >
              Get Started
            </a>
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
            className="mb-7 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-[0.32em] text-cyan-100/80 uppercase backdrop-blur"
          >
            AI-powered digital twin platform
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-5xl text-5xl font-semibold tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl"
          >
            Simulate Tomorrow.
            <br />
            <span className="text-white/72">Decide Today.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl"
          >
            Parallel is an AI-powered Digital Twin platform that lets companies simulate business
            decisions before making them in the real world.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.16)] transition hover:scale-[1.02] hover:bg-cyan-100"
            >
              Start Simulation
            </a>
            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-8 text-base font-semibold text-white backdrop-blur transition hover:scale-[1.02] hover:border-white/24 hover:bg-white/[0.08]"
            >
              Watch Demo
            </a>
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
                className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
              >
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-100 transition group-hover:border-cyan-200/35 group-hover:bg-cyan-200/[0.12]">
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-white">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/8 px-5 py-7 text-center text-sm text-zinc-500">
        Made with Next.js.
      </footer>
    </main>
  );
}
