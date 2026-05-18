"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Play, X, Loader, CheckCircle, AlertCircle, Maximize2, Terminal as TerminalIcon } from "lucide-react";

// 📥 Direct Font Stream Injection
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

// 🚀 GSAP Core and Next.js Engine Animations Import
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface InventoryAsset {
  url: string;
  status: string | number;
  stack: string;
}

// 🛠️ ACTIVE TOOLKIT REGISTRY (Commented out unused modules smoothly)
const TOOLS = [
  "Subfinder", 
  "Assetfinder", 
  // "Amass", 
  "HTTPX", 
  // "HTTPProbe", 
  "WhatWeb", 
  "Waybackurls", 
  "GAU", 
  "CloudEnum", 
  "Nmap", 
  // "Dirsearch"
];

export default function AetherRecon() {
  const [target, setTarget] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [systemLoading, setSystemLoading] = useState(false);
  const [toolStatus, setToolStatus] = useState<Record<string, string>>({});

  // Stats Counters
  const [discoveredAssets, setDiscoveredAssets] = useState(0);
  const [activeHosts, setActiveHosts] = useState(0);
  const [exposedPorts, setExposedPorts] = useState(0);
  const [cloudBuckets, setCloudBuckets] = useState(0); // 🔥 Dynamic state for CloudEnum metrics

  const [inventoryTable, setInventoryTable] = useState<InventoryAsset[]>([]);
  
  // Refs for Premium GSAP Targeted Streams
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialStatus: Record<string, string> = {};
    TOOLS.forEach(t => { initialStatus[t.toLowerCase()] = "idle"; });
    setToolStatus(initialStatus);
  }, []);

  // 🎬 GSAP Master Intro Entry Sequence
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Background blur subtle entry glow
    tl.fromTo(".ambient-glow", 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 0.95, scale: 1, duration: 1.8 }
    );

    // Top navigation, title header elements staggered reveal
    tl.from(".animate-header", { opacity: 0, y: -15, duration: 0.6 }, "-=1.2")
      .from(".animate-title", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .from(".animate-input", { opacity: 0, scale: 0.98, y: 10, duration: 0.6 }, "-=0.5");

    // Toolkit Pills Smooth Re-entry Sequence
    tl.fromTo(".animate-pill", 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.02, duration: 0.4, ease: "power2.out" }, 
      "-=0.3"
    );

    // Lower dashboard content framework slide
    tl.from(".animate-grid", { opacity: 0, y: 15, duration: 0.8 }, "-=0.3");
  }, { scope: containerRef });

  // ⚡ GSAP Realtime Pulse Trigger whenever numeric metrics alter
  useEffect(() => {
    if (discoveredAssets > 0 || activeHosts > 0 || exposedPorts > 0 || cloudBuckets > 0) {
      gsap.fromTo(".metric-card", 
        { scale: 0.96, filter: "brightness(1.1)" }, 
        { scale: 1, filter: "brightness(1)", duration: 0.4, ease: "back.out(1.7)", stagger: 0.04 }
      );
    }
  }, [discoveredAssets, activeHosts, exposedPorts, cloudBuckets]);

  const handleClearAll = () => {
    setTarget("");
    setTerminalOutput([]);
    setActiveTool(null);
    setSystemLoading(false);
    setDiscoveredAssets(0);
    setActiveHosts(0);
    setExposedPorts(0);
    setCloudBuckets(0);
    setInventoryTable([]);
    const resetStatus: Record<string, string> = {};
    TOOLS.forEach(t => { resetStatus[t.toLowerCase()] = "idle"; });
    setToolStatus(resetStatus);
  };

  const handleSystemScan = async (tool: string | null = null, pipeline = false) => {
    if (!target.trim()) return;

    setSystemLoading(true);
    const opContext = pipeline ? "pipeline Master" : tool || "core";
    const currentToolId = tool ? tool.toLowerCase() : "pipeline";
    
    setActiveTool(opContext);
    setToolStatus(prev => ({ ...prev, [currentToolId]: "running" }));
    setTerminalOutput([`>> Deploying: ${opContext.toUpperCase()} reconnaissance module for ${target}...`]);

    try {
      // 🚀 Clean and absolute protocol sanitization layer
      let apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      
      // Variable cleanups to actively discard structural typos like http://http//
      if (apiBaseUrl.startsWith("http://http//")) {
        apiBaseUrl = apiBaseUrl.replace("http://http//", "http://");
      } else if (apiBaseUrl.startsWith("http//")) {
        apiBaseUrl = apiBaseUrl.replace("http//", "http://");
      }
      
      // Final security check: ensure it starts cleanly with a single protocol if not relative
      if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://") && !apiBaseUrl.startsWith("/")) {
        apiBaseUrl = `http://${apiBaseUrl}`;
      }

      const endpoint = pipeline
        ? `${apiBaseUrl}/scan?target=${target}`
        : `${apiBaseUrl}/scan/${tool?.toLowerCase()}?target=${target}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      if (!res.ok) throw new Error(`${opContext} failure`);

      const resultsList = Array.isArray(data.results) ? data.results : [];
      
      // Update Terminal Panel Content
      if (resultsList.length > 0) {
        setTerminalOutput(resultsList);
      } else {
        setTerminalOutput([`[+] ${opContext.toUpperCase()} execution completed successfully, but returned 0 results.`]);
      }
      
      setToolStatus(prev => ({ ...prev, [currentToolId]: "done" }));

      if (resultsList.length > 0) {
        const totalCount = resultsList.length;
        const normalizedTool = tool ? tool.toLowerCase() : "";

        // 🔥 Case-Insensitive State Mapping Rules Execution Engine
        if (normalizedTool === "subfinder" || normalizedTool === "assetfinder") {
          setDiscoveredAssets(prev => prev + totalCount); 
          const mappedAssets = resultsList.map((sub: string) => ({ 
            url: sub, 
            status: 200, 
            stack: `${tool?.toUpperCase() || "RECON"}` 
          }));
          setInventoryTable(prev => [...mappedAssets, ...prev]);

        } else if (normalizedTool === "httpx") {
          setActiveHosts(prev => prev + totalCount);
          const mappedHosts = resultsList.map((line: string) => ({ 
            url: line.split(" ")[0], 
            status: "Active", 
            stack: "HTTP Stream" 
          }));
          setInventoryTable(prev => [...mappedHosts, ...prev]);

        // 🔥 CLOUDENUM LIVE COUNTER STREAM INTEGRATION
        } else if (normalizedTool === "cloudenum") {
          setCloudBuckets(prev => prev + totalCount);
          const mappedBuckets = resultsList.map((bucket: string) => ({
            url: bucket,
            status: "Exposed",
            stack: "CLOUD-STORAGE"
          }));
          setInventoryTable(prev => [...mappedBuckets, ...prev]);

        } else if (normalizedTool === "nmap") {
          setExposedPorts(totalCount);
        } else if (normalizedTool === "whatweb" || normalizedTool === "waybackurls" || normalizedTool === "gau") {
          setDiscoveredAssets(prev => prev + totalCount);
        }
      }
    } catch (err) {
      setToolStatus(prev => ({ ...prev, [currentToolId]: "error" }));
      setTerminalOutput([`[-] CRITICAL: Execution failure on backend pipeline link.`, String(err)]);
    } finally {
      setSystemLoading(false);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput, systemLoading]);

  return (
    <div ref={containerRef} className={`min-h-screen w-full bg-[#f4f4f5] text-[#09090b] flex flex-col antialiased relative overflow-x-hidden selection:bg-zinc-200 ${plusJakarta.className}`}>
      
      {/* Ambient Premium White Studio Glow Backdrop */}
      <div className="ambient-glow absolute top-[12%] left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-white rounded-full blur-[150px] pointer-events-none z-0 opacity-95" />

      {/* Floating Top Navbar Container */}
      <header className="animate-header w-full max-w-5xl mx-auto px-6 py-7 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-zinc-400" />
          <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">Aether / Recon Suite</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span className="hover:text-black cursor-pointer transition-colors font-semibold">Core</span>
          <span className="text-zinc-300">/</span>
          <span className="hover:text-black cursor-pointer transition-colors font-semibold">Pipeline</span>
        </div>
      </header>

      {/* Primary Infrastructure Module Layout */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center px-6 pt-12 pb-24 z-10">
        
        {/* Massive Luxury Heading Layout */}
        <h1 className={`animate-title ${playfair.className} text-5xl md:text-6xl font-medium text-[#09090b] text-center tracking-tight leading-[1.12] max-w-2xl mb-5`}>
          Effortless infrastructure discovery by Aether.
        </h1>
        <p className="animate-title text-[13px] text-zinc-400 text-center max-w-md mb-12 leading-relaxed font-medium tracking-normal">
          Streamline your reconnaissance process with premium automation models tailored for deep network vectors.
        </p>

        {/* Target Input Command Pill */}
        <div className="animate-input w-full max-w-lg mb-14">
          <div className="relative flex items-center bg-white border border-zinc-200 rounded-full p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus-within:border-zinc-400 transition-all">
            <input
              type="text"
              placeholder="Enter core target (e.g., domain.com)"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSystemScan(null, true)}
              className={`${playfair.className} w-full pl-6 pr-4 py-2.5 bg-transparent text-base text-zinc-900 placeholder:text-zinc-300 focus:outline-none`}
            />
            <button
              onClick={() => handleSystemScan(null, true)}
              disabled={systemLoading}
              className="font-bold text-xs bg-[#09090b] text-white rounded-full px-6 py-3.5 hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-30 flex items-center gap-2 cursor-pointer shadow-sm tracking-wide"
            >
              {systemLoading ? <Loader className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
              Scan
            </button>
            {target && (
              <button onClick={handleClearAll} className="p-2 mr-1 text-zinc-300 hover:text-zinc-600 rounded-full transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* System Toolkit Registry Badges */}
        <div className="w-full flex flex-wrap justify-center gap-1.5 mb-16">
          {TOOLS.map((tool, idx) => {
            const currentStatus = toolStatus[tool.toLowerCase()];
            return (
              <button
                key={idx}
                onClick={() => handleSystemScan(tool)}
                disabled={systemLoading}
                className={`animate-pill opacity-0 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-tight transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${
                  currentStatus === "running"
                    ? "border-black bg-black text-white shadow-sm"
                    : currentStatus === "done"
                    ? "border-zinc-300 bg-zinc-200 text-zinc-900"
                    : "border-zinc-200/80 bg-white hover:border-zinc-400 text-zinc-500 shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                }`}
              >
                {tool}
              </button>
            );
          })}
        </div>

        {/* Horizontal Flat Metric Counter Sections */}
        <div className="animate-grid w-full grid grid-cols-4 gap-4 mb-16 border-t border-b border-zinc-200/70 py-9">
          {[
            { label: "Subdomains Discovered", value: discoveredAssets },
            { label: "Live Active Hosts", value: activeHosts },
            { label: "Exposed TCP Ports", value: exposedPorts },
            { label: "Cloud Buckets Mapped", value: cloudBuckets },
          ].map((stat, idx) => (
            <div key={idx} className="metric-card text-center will-change-transform">
              <div className={`${playfair.className} text-4xl md:text-5xl font-normal text-[#09090b] mb-1.5 tracking-tight`}>{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Output Stream Panel Grid Sections */}
        <div className="animate-grid w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Shell Log Output Terminal */}
          <div className="md:col-span-7 flex flex-col bg-[#09090b] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-950">
            <div className="bg-[#18181b] px-4 py-3 flex items-center justify-between border-b border-zinc-900">
              <span className="text-[10px] font-bold text-zinc-400 tracking-wider flex items-center gap-2">
                <TerminalIcon className="w-3 h-3 text-zinc-500" /> OUTPUT CONSOLE
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>
            </div>
            <div ref={terminalRef} className="h-64 p-5 overflow-y-auto space-y-1.5 bg-[#09090b] font-mono text-[11px] text-zinc-300 leading-relaxed scrollbar-none">
              {terminalOutput.length === 0 ? (
                <div className={`text-zinc-600 italic text-center pt-24 ${playfair.className} text-xs tracking-wide`}>Terminal pipeline idle...</div>
              ) : (
                terminalOutput.map((line, idx) => (
                  <div key={idx} className="truncate border-l border-zinc-800 pl-2.5 text-zinc-300 select-text">{line}</div>
                ))
              )}
            </div>
          </div>

          {/* Database Live Log Rows Inventory Table */}
          <div className="md:col-span-5 flex flex-col bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_16_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200/80 flex justify-between items-center">
              <span className="text-[10px] font-bold text-zinc-400 tracking-wider">INVENTORY ASSETS</span>
              <span className="text-[9px] px-2 py-0.5 bg-zinc-200 text-zinc-700 font-bold rounded-full">{inventoryTable.length} items</span>
            </div>
            <div className="h-64 overflow-y-auto divide-y divide-zinc-100 text-xs">
              {inventoryTable.length === 0 ? (
                <div className={`text-zinc-400 italic text-center pt-24 ${playfair.className} text-xs tracking-wide`}>Database empty.</div>
              ) : (
                inventoryTable.map((asset, idx) => (
                  <div key={idx} className="p-3.5 hover:bg-zinc-50/80 flex items-center justify-between gap-4 transition-colors">
                    <span className="font-mono text-zinc-800 truncate flex-1 font-medium">{asset.url}</span>
                    <span className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded border border-zinc-200/30 font-semibold tracking-tight">{asset.stack}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}