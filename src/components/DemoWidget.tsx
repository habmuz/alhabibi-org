import { useState } from "react";

interface Props {
  demoType: "iframe" | "embed" | "none";
  demoUrl?: string;
  agentName: string;
}

export default function DemoWidget({ demoType, demoUrl, agentName }: Props) {
  const [started, setStarted] = useState(false);

  if (demoType === "none") {
    return (
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-5xl mb-4">🚧</div>
        <p className="text-slate-300 font-medium mb-2">Demo Coming Soon</p>
        <p className="text-sm text-slate-500">
          {agentName} is still being wired up. Check back soon!
        </p>
      </div>
    );
  }

  if (demoType === "iframe" && demoUrl) {
    return (
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
        {!started ? (
          <div
            className="p-10 text-center cursor-pointer group"
            style={{ background: "rgba(139,92,246,0.08)" }}
            onClick={() => setStarted(true)}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
              style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.4)" }}
            >
              <span className="text-2xl">▶</span>
            </div>
            <p className="text-slate-200 font-semibold mb-1">Launch Demo</p>
            <p className="text-sm text-slate-500">Click to open {agentName} in an interactive sandbox</p>
          </div>
        ) : (
          <iframe
            src={demoUrl}
            title={`${agentName} demo`}
            className="w-full"
            style={{ height: "560px", border: "none" }}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        )}
      </div>
    );
  }

  // embed type — generic placeholder for custom UIs
  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p className="text-slate-400 text-sm text-center">Custom embed UI coming soon for {agentName}</p>
    </div>
  );
}
