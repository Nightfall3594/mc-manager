"use client";
import React, { useState, useRef, useEffect } from "react";

interface TerminalProps {
    prompt?: string;
}

export default function Terminal ({ prompt = ">" } : TerminalProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const logsRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (input.trim()) {
                setHistory((prev) => [...prev, `${prompt} ${input}`]);
                setInput("");
            }
            e.preventDefault();
        }
    };

    // Auto-scroll to bottom whenever history updates
    useEffect(() => {
        if (logsRef.current) {
            logsRef.current.scrollTop = logsRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="bg-black max-w-full flex flex-1 flex-col text-white font-mono p-4 rounded-md border border-gray-700 ">

            {/* Logs */}
            <div ref={logsRef} className="flex flex-col gap-3 max-w-full overflow-y-scroll break-all mb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
                {history.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>

            {/* Input */}
            <div className="flex overflow-x-scroll overflow-y-clip [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
                <span>{prompt}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-black text-white font-mono flex-1 focus:outline-none ml-2 break-all "
                    autoFocus
                />
            </div>
        </div>
    );
};