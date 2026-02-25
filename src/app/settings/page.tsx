"use client";
import { useState } from "react";
import IntItem from "@/components/settings-page/int-item/IntItem.tsx";
import StringItem from "@/components/settings-page/string-item/StringItem.tsx";
import SwitchItem from "@/components/settings-page/switch-item/SwitchItem.tsx";
import EnumItem from "@/components/settings-page/enum-item/EnumItem.tsx";

type GameRule = {
    key: string;
    options?: string[];
    type: string;
    value: string;
};

export default function SettingsPage() {

    // Mock for now, but this is going to be fetched from API
    const [fetchedGameRules, setFetchedGameRules] = useState([
           {
               "key": "gamemode",
               "options": [
                   "survival",
                   "creative",
                   "adventure",
                   "spectator"
               ],
               "type": "ENUM",
               "value": "survival"
           },
           {
               "key": "motd",
               "type": "STRING",
               "value": "A Minecraft Server of a couple friends"
           },
           {
               "key": "pause-when-empty-seconds",
               "type": "INTEGER",
               "value": "400"
           },
           {
               "key": "generate-structures",
               "type": "BOOLEAN",
               "value": "true"
           },
           {
               "key": "difficulty",
               "options": [
                   "peaceful",
                   "easy",
                   "normal",
                   "hard"
               ],
               "type": "ENUM",
               "value": "hard"
           },
           {
               "key": "max-players",
               "type": "INTEGER",
               "value": "20"
           },
           {
               "key": "enable-status",
               "type": "BOOLEAN",
               "value": "true"
           },
           {
               "key": "allow-flight",
               "type": "BOOLEAN",
               "value": "true"
           },
           {
               "key": "view-distance",
               "type": "INTEGER",
               "value": "10"
           },
           {
               "key": "hide-online-players",
               "type": "BOOLEAN",
               "value": "false"
           },
           {
               "key": "entity-broadcast-range-percentage",
               "type": "INTEGER",
               "value": "100"
           },
           {
               "key": "simulation-distance",
               "type": "INTEGER",
               "value": "10"
           },
           {
               "key": "player-idle-timeout",
               "type": "INTEGER",
               "value": "0"
           },
           {
               "key": "force-gamemode",
               "type": "BOOLEAN",
               "value": "false"
           },
           {
               "key": "hardcore",
               "type": "BOOLEAN",
               "value": "false"
           },
           {
               "key": "white-list",
               "type": "BOOLEAN",
               "value": "false"
           },
           {
               "key": "enforce-whitelist",
               "type": "BOOLEAN",
               "value": "false"
           },
           {
               "key": "spawn-protection",
               "type": "INTEGER",
               "value": "16"
           },
           {
               "key": "max-world-size",
               "type": "INTEGER",
               "value": "29999984"
           }
       ])

    // parse JSON string into actual JS values
    const gameRuleArray = fetchedGameRules.map(gameRule => {
        let value;
        switch (gameRule.type) {
            case "BOOLEAN":
                value = gameRule.value === "true";
                break;
            case "INTEGER":
                value = parseInt(gameRule.value, 10);
                break;
            default:
                value = gameRule.value;
        }
        return [gameRule.key, value];
    })

    const initialGamerules = Object.fromEntries(gameRuleArray);
    const [gamerules, setGamerules] = useState(Object.fromEntries(gameRuleArray));

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
                    fetchedGameRules.map((rule) => {
                        switch(rule.type) {
                            case "INTEGER":
                                return (
                                    <IntItem
                                        key={rule.key}
                                        ruleName={rule.key.replace(/-/g, ' ')}
                                        value={gamerules[rule.key]}
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
                                        value={gamerules[rule.key]}
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
                                        value={gamerules[rule.key]}
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
                                        value={gamerules[rule.key]}
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
