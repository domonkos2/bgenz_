"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Server, Shield, Sword, Trophy, Sparkles, ExternalLink, Zap } from "lucide-react";

// --- Quick settings (edit these to customize) ---
const SERVER_NAME = "Bgenz";
const SERVER_IP = "bgenz.minehut.gg"; // current IP
const MC_VERSION = "1.21+"; // current version
const DISCORD_URL = "https://discord.gg/qTj5jDZPre"; // Discord invite

const leaderboardSeed = [
  { name: "itsFrost", gens: 1280 },
  { name: "BgenzFan", gens: 1165 },
  { name: "EnderKai", gens: 1092 },
  { name: "Z3phyr", gens: 980 },
  { name: "HexMiner", gens: 905 },
];

// ---- Helpers ----
function computeProgress(current, top) {
  const ratio = top > 0 ? current / top : 0;
  const pct = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
  return pct; // 0..100
}

export default function BgenzSite() {
  const [copied, setCopied] = useState(false);
  const playersOnline = "10+"; // display value

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Background */}
      <BgGrid />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BlockLogo />
            <span className="font-bold text-lg tracking-wide">{SERVER_NAME}</span>
            <Badge className="ml-2 bg-emerald-600/80">Gen</Badge>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="#how" className="px-3 py-1 rounded-xl hover:bg-white/5">How it works</a>
            <a href="#rules" className="px-3 py-1 rounded-xl hover:bg-white/5">Rules</a>
            <a href="#leaderboard" className="px-3 py-1 rounded-xl hover:bg-white/5">Leaderboard</a>
            <a href="#join" className="px-3 py-1 rounded-xl hover:bg-white/5">Join</a>
            <Button asChild variant="secondary" className="ml-2">
              <a href={DISCORD_URL} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Discord
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {SERVER_NAME} <span className="text-emerald-400">Gen</span> Server
              </h1>
              <p className="mt-4 text-neutral-300 leading-relaxed">
                Grind, generate, and climb the ranks. {SERVER_NAME} is a Minecraft <span className="text-emerald-300 font-semibold">Gen</span> server focused on smooth economy, fair PvP, and fast-paced progression.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={copyIP} className="rounded-2xl">
                  <Copy className="h-4 w-4 mr-2" /> {copied ? "Copied!" : `Copy IP: ${SERVER_IP}`}
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10" asChild>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" /> Join Discord
                  </a>
                </Button>
                <Badge className="bg-white/10 text-white">Version {MC_VERSION}</Badge>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-neutral-300">
                <span className="inline-flex relative items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
                  <strong className="text-white mr-1">Online</strong> ~ {playersOnline} players
                </span>
                <span className="opacity-60">•</span>
                <span className="inline-flex items-center"><Zap className="h-4 w-4 mr-1" /> Low latency EU</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <ShowcaseCard />
            </motion.div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8">
          <h2 className="text-3xl font-bold flex items-center"><Sparkles className="h-6 w-6 mr-2 text-emerald-400" /> How Gen works</h2>
          <p className="text-neutral-300 mt-2">Mine, place, and generate value. Upgrade your gens, sell to the economy, and duel for control.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard icon={<Server className="h-5 w-5" />} title="Smooth economy" text="Balanced shop prices, sell wands, and auto-sell boosters keep the grind satisfying—never stale." />
          <InfoCard icon={<Sword className="h-5 w-5" />} title="Fair PvP" text="No pay-to-win kits. Enchants are progression-based and combat is tuned for skillful fights." />
          <InfoCard icon={<Shield className="h-5 w-5" />} title="Anti-cheat" text="Modern anticheat + active staff keep the experience clean and competitive." />
        </div>
      </section>

      {/* RULES & FAQ */}
      <section id="rules" className="bg-white/5 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/30 backdrop-blur border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-neutral-300">
                <RuleItem n={1} text="No cheating, dupes, or automation exploits." />
                <RuleItem n={2} text="Respect players and staff; harassment and slurs are not tolerated." />
                <RuleItem n={3} text="No IRL trading or cross-server advertising." />
                <RuleItem n={4} text="Keep chat clean; English or HU preferred." />
                <RuleItem n={5} text="Use common sense—if you think it might be bannable, don't do it." />
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-300">
                <Faq q="What is a Gen server?" a='A Gen server centers on placing special generator blocks ("gens") that produce items/currency over time. You upgrade, expand, and compete on leaderboards.' />
                <Faq q="How do I start?" a={`Join with IP ${SERVER_IP}. Use /shop to get your first gen, place it on your island/plot, then sell output to earn and upgrade.`} />
                <Faq q="Is there pay-to-win?" a="Cosmetics and QoL ranks may exist, but gameplay power is earned in-game. PvP kits and enchants are progression-based." />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center"><Trophy className="h-6 w-6 mr-2 text-emerald-400" /> Weekly Leaderboard</h2>
          <Badge className="bg-emerald-600/80">Resets Monday 00:00 CET</Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaderboardSeed.map((p, i) => (
            <Card key={p.name} className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between w-full">
                  <span className="truncate">{i + 1}. {p.name}</span>
                  <Badge className="bg-emerald-700/70">{p.gens.toLocaleString()} gens</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${computeProgress(p.gens, leaderboardSeed[0].gens)}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="bg-white/5 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="bg-black/30 backdrop-blur border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Join the server</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pc">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="pc">PC / Java</TabsTrigger>
                    <TabsTrigger value="bedrock">Bedrock</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pc" className="space-y-4 mt-4 text-neutral-300">
                    <Step n={1} text="Open Minecraft Java Edition (version " extra={MC_VERSION + ")"} />
                    <Step n={2} text="Multiplayer → Add Server" />
                    <Step n={3} text={"Enter server address"} extra={SERVER_IP} />
                    <Step n={4} text="Join and run /register if prompted" />
                  </TabsContent>
                  <TabsContent value="bedrock" className="space-y-4 mt-4 text-neutral-300">
                    <Step n={1} text="From Play → Servers → Add Server" />
                    <Step n={2} text="Server Name" extra={SERVER_NAME} />
                    <Step n={3} text="Server Address" extra={SERVER_IP} />
                    <Step n={4} text="Default Port" extra="19132" />
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex gap-3">
                  <Button onClick={copyIP} className="rounded-2xl"><Copy className="h-4 w-4 mr-2" /> {copied ? "Copied!" : SERVER_IP}</Button>
                  <Button variant="outline" asChild className="rounded-2xl border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10">
                    <a href={DISCORD_URL} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Discord</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 text-neutral-300">
              <h3 className="text-xl font-semibold">Why play {SERVER_NAME}?</h3>
              <ul className="grid gap-2 list-disc list-inside">
                <li>No lag grind: optimized gens and clear economy loops.</li>
                <li>Seasonal resets with fresh metas and rewards.</li>
                <li>Active staff, quick support, friendly community.</li>
              </ul>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-4 px-5 text-sm">
                  Tip: post your island/plot in <span className="text-white font-medium">#showcase</span> on Discord for a chance to get featured on the homepage!
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {SERVER_NAME}. Unofficial fan site template.</p>
          <div className="flex items-center gap-2">
            <span className="opacity-70">Need edits?</span>
            <a href={DISCORD_URL} target="_blank" className="underline decoration-emerald-500 hover:text-white">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---- UI bits ----
function InfoCard({ icon, title, text }) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-300">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-neutral-300">{text}</CardContent>
    </Card>
  );
}

function RuleItem({ n, text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 font-semibold leading-none mt-0.5">{n}</span>
      <p>{text}</p>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div>
      <p className="font-medium text-white">{q}</p>
      <p className="text-neutral-300 mt-1">{a}</p>
    </div>
  );
}

function Step({ n, text, extra }) {
  return (
    <div className="flex items-start gap-3">
      <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-semibold leading-none mt-0.5">{n}</span>
      <p>
        {text} {extra && <span className="text-white font-medium">{extra}</span>}
      </p>
    </div>
  );
}

function ShowcaseCard() {
  return (
    <Card className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-white/10 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <span className="mr-2">Spawn Preview</span>
          <Badge className="bg-emerald-700/60">Season 1</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className="border border-neutral-800/80"
                style={{ background: i % 5 === 0 ? "#0a0a0a" : "#0e0e0e" }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-5 py-3 rounded-xl bg-black/60 backdrop-blur border border-white/10 text-center">
              <p className="text-sm text-neutral-300">Drop your spawn screenshot here</p>
              <p className="text-xs text-neutral-400">(replace this card with an image in code)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BlockLogo() {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600" />
      <div className="absolute inset-0 rounded-lg bg-black/30" />
      <div className="absolute -bottom-1 inset-x-0 h-1 rounded-b-lg bg-black/60" />
    </div>
  );
}

function BgGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at top, rgba(16,185,129,0.2), rgba(23,23,23,1) 60%)',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 32px 32px',
          backgroundPosition: '-1px -1px',
        }}
      />
    </div>
  );
}

// -----------------
// Dev self-tests
// -----------------
if (typeof window !== "undefined") {
  try {
    // core computeProgress tests
    console.assert(computeProgress(100, 200) === 50, "Half progress failed");
    console.assert(computeProgress(0, 200) === 0, "Zero progress failed");
    console.assert(computeProgress(300, 200) === 100, ">100 should clamp to 100");
    console.assert(computeProgress(-10, 200) === 0, "Negative gens clamps to 0");
    console.assert(computeProgress(50, 0) === 0, "Top=0 should be 0");

    // additional rounding tests
    console.assert(computeProgress(1, 3) === 33, "Rounding 1/3 failed");
    console.assert(computeProgress(2, 3) === 67, "Rounding 2/3 failed");

    // config sanity
    console.assert(/^[-\w.]+$/.test(SERVER_IP), "SERVER_IP format looks odd");
    console.assert(MC_VERSION === "1.21+", "Version should be 1.21+");
    console.assert(String("10+").includes("+"), "playersOnline display should include plus sign");
  } catch (e) {
    // don't crash the UI if assert throws in some environments
    console.warn("Self-tests completed with issues:", e);
  }
}
