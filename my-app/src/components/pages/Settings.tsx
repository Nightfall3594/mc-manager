import { useState } from "react";
import Switch from "../components/settings-page/Switch";


export default function SettingsPage() {

    // Mock for now, but this is going to be fetched from API
    // TODO: convert this to state
    const initialRules: Record<string, boolean> = {
        doDaylightCycle: true,
        keepInventory: false,
        mobGriefing: true,
        fireSpread: false,
    };

    const [rules, setRules] = useState<Record<string, boolean>>(initialRules);
    const [pending, setPending] = useState(false);

    function toggleRule(ruleName: string) {
        setRules((prev) => ({
            ...prev,
            [ruleName]: !prev[ruleName],
        }));
        setPending(true);
    }

    function confirmChanges() {
        // TODO: POST request the rules to server
        setPending(false);
    }

    function resetChanges() {
        setRules(initialRules);
        setPending(false);
    }

    return (
        <section className="ml-60 p-30 flex flex-col flex-1 h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Minecraft Gamerules</h1>

            <div className="flex flex-col gap-4 ">
                {Object.entries(rules).map(([ruleName, value]) => (
                    <div
                        key={ruleName}
                        className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg"
                    >
                        <span className="capitalize">{ruleName}</span>
                        <Switch checked={value} onToggle={() => toggleRule(ruleName)} />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={resetChanges}
                    disabled={!pending}
                    className={`px-6 py-2 rounded-md transition
                        ${ pending
                            ? "bg-neutral-600 hover:bg-neutral-500"
                            : "opacity-50 cursor-not-allowed"
                        }`
                    }
                >
                    Reset
                </button>

                <button
                    onClick={confirmChanges}
                    disabled={!pending}
                    className={`px-6 py-2 rounded-md font-medium transition
                        ${ pending
                            ? "bg-blue-500 hover:bg-blue-400"
                            : "bg-neutral-600 opacity-50 cursor-not-allowed"
                        }`
                    }
                >
                    Confirm
                </button>
            </div>
        </section>
    );
}
