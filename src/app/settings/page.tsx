"use client";
import { useState, useEffect } from "react";
import IntItem from "@/components/settings-page/int-item/IntItem.tsx";
import StringItem from "@/components/settings-page/string-item/StringItem.tsx";
import SwitchItem from "@/components/settings-page/switch-item/SwitchItem.tsx";
import EnumItem from "@/components/settings-page/enum-item/EnumItem.tsx";

type GameruleMetadata = {
    key: string;
    options?: string[];
    type: string;
    value: string;
};

type GameruleSet = Record<string, unknown>

export default function SettingsPage() {

    const [gameruleMetadata, setGameruleMetadata] = useState<GameruleMetadata[]>([]);
    const [gamerules, setGamerules] = useState<GameruleSet>({});
    const [initialGamerules, setInitialGamerules] = useState<GameruleSet>({});

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}/server-properties`)
            .then(res => res.json())
            .then((data: GameruleMetadata[]) => {

                const result = data.reduce((acc, item: GameruleMetadata) => {
                    let value;
                    switch (item.type) {
                        case "BOOLEAN":
                            value = item.value === "true";
                            break;
                        case "INTEGER":
                            value = parseInt(item.value, 10);
                            break;
                        default:
                            value = item.value;
                    }
                    acc[item.key] = value;
                    return acc;
                    
                }, {} as GameruleSet);

                setGameruleMetadata(data);
                setGamerules(result);
                setInitialGamerules(result);
            })

    }, [])


    const [pending, setPending] = useState(false);

    function confirmChanges() {
        // TODO: POST request the rules to server
        setPending(false);
    }

    function resetChanges() {
        setGamerules({...initialGamerules})
        setPending(false);
    }

    return (
        <section className="ml-60 p-30 flex flex-col flex-1 h-screen text-white">
            <div className="flex flex-col gap-1.5 mb-6">
                <h1 className="text-3xl font-bold">Minecraft Gamerules</h1>
                <h2 className="text-lg text-neutral-300">Configure and Modify Server Rules</h2>
            </div>
            <div className="flex flex-col ">
                {
                    gameruleMetadata.map((rule) => {
                        switch(rule.type) {
                            case "INTEGER":
                                return (
                                    <IntItem
                                        key={rule.key}
                                        ruleName={rule.key.replace(/-/g, ' ')}
                                        value={gamerules[rule.key] as number}
                                        onEdit={(newValue) => {
                                            const updatedRules = {...gamerules, [rule.key]: newValue}
                                            setGamerules(updatedRules);
                                            setPending(JSON.stringify(initialGamerules) !== JSON.stringify(updatedRules));
                                        }}
                                    />
                                )
                            case "STRING":
                                return (
                                    <StringItem
                                        key={rule.key}
                                        ruleName={rule.key.replace(/-/g, ' ')}
                                        value={gamerules[rule.key] as string}
                                        onEdit={(newValue) => {
                                            const updatedRules = {...gamerules, [rule.key]: newValue}
                                            setGamerules(updatedRules);
                                            setPending(JSON.stringify(initialGamerules) !== JSON.stringify(updatedRules));
                                        }}
                                    />
                                )
                            case "BOOLEAN":
                                return (
                                    <SwitchItem
                                        key={rule.key}
                                        ruleName={rule.key.replace(/-/g, ' ')}
                                        value={gamerules[rule.key] as boolean}
                                        onToggle={() => {
                                            const updatedRules = {...gamerules, [rule.key]: !gamerules[rule.key]};
                                            setGamerules(updatedRules);
                                            setPending(JSON.stringify(initialGamerules) !== JSON.stringify(updatedRules));
                                        }}
                                    />
                                )
                            case "ENUM":
                                return (
                                    <EnumItem
                                        key={rule.key}
                                        ruleName={rule.key.replace(/-/g, ' ')}
                                        value={gamerules[rule.key] as string}
                                        items={rule.options!}
                                        onEdit={(newValue) => {
                                            const updatedRules = {...gamerules, [rule.key]: newValue}
                                            setGamerules(updatedRules);
                                            setPending(JSON.stringify(initialGamerules) !== JSON.stringify(updatedRules));
                                        }}
                                    />
                                )
                        }
                    })
                }
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
