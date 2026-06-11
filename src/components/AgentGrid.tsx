import { useState } from "react";

interface Agent {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  category: string;
  status: "active" | "beta" | "coming-soon";
  techStack: string[];
}

const STATUS_CONFIG = {
  active: { label: "Active", cls: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" },
  beta: { label: "Beta", cls: "bg-amber-500/20 text-amber-300 border border-amber-500/30" },
  "coming-soon": { label: "Coming Soon", cls: "bg-slate-500/20 text-slate-400 border border-slate-500/30" },
} as const;

const CATEGORY_COLOR: Record<string, string> = {
  productivity: "bg-blue-500/15 text-blue-300",
  creative: "bg-pink-500/15 text-pink-300",
  research: "bg-teal-500/15 text-teal-300",
  utility: "bg-orange-500/15 text-orange-300",
};

const CATEGORIES = ["all", "productivity", "creative", "research", "utility"];

function AgentCardReact({ agent }: { agent: Agent }) {
  const sc = STATUS_CONFIG[agent.status];
  const [lifted, setLifted] = useState(false);

  return (
    <a
      href={`/agents/${agent.slug}`}
      className="block p-6 group cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: lifted ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: "1.25rem",
        boxShadow: lifted ? "0 0 30px rgba(139,92,246,0.15)" : "none",
        transform: lifted ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={() => setLifted(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{agent.icon}</div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sc.cls}`}>
          {sc.label}
        </span>
      </div>
      <h3 className={`text-lg font-semibold mb-1 transition-colors ${lifted ? "text-violet-300" : "text-white"}`}>
        {agent.name}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{agent.tagline}</p>
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium ${CATEGORY_COLOR[agent.category]}`}>
          {agent.category}
        </span>
        <div className="flex gap-1">
          {agent.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded border text-slate-400"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function AgentGrid({ agents }: { agents: Agent[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? agents : agents.filter((a) => a.category === active);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="capitalize text-sm px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer"
            style={{
              background: active === cat ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)",
              border: active === cat ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.1)",
              color: active === cat ? "#c4b5fd" : "#94a3b8",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((agent) => (
          <AgentCardReact key={agent.slug} agent={agent} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-16">No agents in this category yet.</p>
      )}
    </div>
  );
}
