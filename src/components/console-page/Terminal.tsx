"use client";
import { useEffect, useRef, useState } from "react";

interface TerminalProps {
    prompt?: string;
}

export default function Terminal({ prompt = ">" }: TerminalProps) {
    const [input, setInput] = useState("");

    // Mock logs, for now. TODO: fetch from API
    const [history, setHistory] = useState<string[]>([
        "[2026-01-11 14:23:45] Server started successfully",
        "[2026-01-11 14:23:46] Loading world data...",
        "[2026-01-11 14:23:47] World loaded: HelloWorld",
        "[2026-01-11 14:23:48] Server is running on 192.168.1.5:3306",
    ]);

    const logsRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!input.trim()) return;

            setHistory(prev => [
                ...prev,
                `${prompt} ${input}`,
                `[${new Date().toISOString().replace("T", " ").slice(0, 19)}] Command executed: ${input}`,
            ]);

            setInput("");
            e.preventDefault();
        }
    };

    useEffect(() => {
        logsRef.current?.scrollTo({
            top: logsRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    return (
        // Terminal
        <div className="flex flex-col bg-black text-white font-mono rounded-xl border border-white/20 shadow-inner w-full">
            {/* Logs */}
            <div
                ref={logsRef}
                className="flex-1 p-4 space-y-2 overflow-y-auto break-all [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {history.map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap">
                        {line}
                    </p>
                ))}
            </div>

            {/* Divider */}
            <hr className="border-t-white/20" />

            {/* Input */}
            <div className="flex items-center px-4 py-3">
                <span className="mr-2">{prompt}</span>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-black outline-none text-white font-mono"
                    placeholder="Enter command..."
                    autoFocus
                />
            </div>
        </div>
    );
}
