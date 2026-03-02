"use client";
import ServerStatusCard from "@/components/dashboard-page/ServerStatusCard.tsx";
import ServerMetricCard from "@/components/dashboard-page/ServerMetricCard.tsx";
import PeopleIcon from "@/components/common/icons/server-stats/PeopleIcon.tsx";
import ClockIcon from "@/components/common/icons/server-stats/ClockIcon.tsx";
import PulseIcon from "@/components/common/icons/server-stats/PulseIcon.tsx";
import CpuIcon from "@/components/common/icons/server-stats/CpuIcon.tsx";
import ServerMetricBarCard from "@/components/dashboard-page/ServerMetricBarCard.tsx";
import DiskIcon from "@/components/common/icons/server-stats/DiskIcon.tsx";
import TitledCard from "@/components/common/cards/TitledCard.tsx";
import {useState, useEffect} from "react";
import {Client} from "@stomp/stompjs";
import {ServerControlButton, ServerControlButtonState} from "@/components/dashboard-page/ServerControlButton.tsx";

type ServerMetric = {
    online: boolean;
    cpu: number;
    disk: number;
    players: number;
    ram: number;

    tps: number;
    uptime: number;

    maxCpu: number;
    maxDisk: number;
    maxPlayers: number;
    maxRam: number;
}

type Event = {
    timestamp: string,
    message: string,
}

type Player = {
    name: string,
    joinTime: string
}

/**
 * Minor helper function to format seconds to readable text
 */
function formatDuration(seconds: number): string {

    const d: number = Math.floor(seconds/86400);
    seconds = seconds % 86400;
    const h = Math.floor(seconds/3600);
    seconds = seconds % 3600;
    const m = Math.floor(seconds/60);

    let output: string = "";
    if(d !== 0) output += d + "d ";
    if(h !== 0) output += h + "h ";
    output += m + "m";

    return output;
}

/**
 * Minor helper function to format timestamp
 */
function formatTimeAgo (timestamp: string) {
    const [h, m, s] = timestamp.split(':').map(Number);
    const now = new Date();
    const past = new Date(now);
    past.setHours(h, m, s, 0);

    // note: if the timestamp is in the "future," it's actually yesterday
    // this is because latest.log only focuses on last day
    if (past > now) past.setDate(past.getDate() - 1);

    const diffMs = now.getTime() - past.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMin / 60);

    if (diffHrs > 0) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    return "Just now";
}

/**
 * Minor helper function to format playtime
 */
function formatPlaytime(timestamp: string) {

    const [h, m, s] = timestamp.split(':').map(Number);
    const now = new Date();
    const past = new Date(now);
    past.setHours(h, m, s, 0);

    // note: if the timestamp is in the "future," it's actually yesterday
    // this is because latest.log only focuses on last day
    if (past > now) past.setDate(past.getDate() - 1);

    const secondsPlaytime = (now.getTime() - past.getTime()) / 1000;
    const hoursPlaytime = Math.floor(secondsPlaytime / 3600);
    const minutesPlaytime = Math.floor((hoursPlaytime % 3600) / 60);

    if(hoursPlaytime === 0 && minutesPlaytime === 0) {
        return "Just now";
    }

    let output = "";
    if(hoursPlaytime !== 0) output += `${hoursPlaytime}h `;
    if(minutesPlaytime !== 0) output += `${minutesPlaytime}m `;
    return output;
}


export default function UserDashboard() {

    const [serverData, setServerData] = useState<ServerMetric>({
        online: false,
        cpu: 0,
        disk: 0,
        players: 0,
        ram: 0,

        tps: 0,
        uptime: 0,

        maxCpu: 1,
        maxDisk: 1,
        maxPlayers: 20,
        maxRam: 1
    });

    const [serverControlButtonState, setServerControlButtonState] = useState<ServerControlButtonState>(
            serverData.online
                ? ServerControlButtonState.ONLINE
                : ServerControlButtonState.OFFLINE
        );


    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                client.subscribe('/topic/metrics/live', message => {
                    console.log('Connected to ' + message.body);
                    setServerData(JSON.parse(message.body));
                });
            },
        });
        client.activate();
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setServerControlButtonState(
            serverData.online
                ? ServerControlButtonState.ONLINE
                : ServerControlButtonState.OFFLINE
        )
    }, [serverData.online]);

    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/metrics/players")
            .then(res => res.json())
            .then(players => setPlayers(players));
    }, [])

    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/metrics/events")
            .then(res => res.json())
            .then(data => setEvents(data))
    }, []);


    return (
        <section className="ml-60 p-30 flex flex-1 flex-col min-h-screen ">

            {/* Server header */}
            <div className="flex flex-row items-center justify-between gap-4 mb-6 ">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-4xl font-bold ">Chillingmc</h1>
                    <p className="text-md text-neutral-400 ">192.168.56.13:6543</p>
                </div>
                <ServerControlButton
                    state={serverControlButtonState}
                    onClick={() => setServerControlButtonState(ServerControlButtonState.PENDING)}
                    onError={() => setServerControlButtonState(
                        serverData.online
                            ? ServerControlButtonState.ONLINE
                            : ServerControlButtonState.OFFLINE
                    )}
                />
            </div>

            <ServerStatusCard isOnline={serverData.online}/>

            {/* Server main status */}
            <div className="mt-8 flex flex-row gap-2 ">
                <ServerMetricCard
                    title={"Players Online"}
                    value={`${serverData.players}/${serverData.maxPlayers}`}
                    Icon={PeopleIcon}
                    color={"bg-green-900"}
                    highlight={"text-green-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"Uptime"}
                    value={formatDuration(serverData.uptime)}
                    Icon={ClockIcon}
                    color={"bg-blue-900"}
                    highlight={"text-blue-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"TPS"}
                    value={serverData.tps.toFixed(0)}
                    Icon={PulseIcon}
                    color={"bg-yellow-900"}
                    highlight={"text-yellow-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"CPU"}
                    value={`${serverData.cpu.toFixed(2)} core(s)`}
                    Icon={CpuIcon}
                    color={"bg-red-900"}
                    highlight={"text-red-300"}
                    className={"w-full"}
                />
            </div>


            {/* Server server bar metrics */}
            <div className="mt-5 w-full flex flex-row gap-2 ">
                <ServerMetricBarCard
                    title={"CPU"}
                    Icon={CpuIcon}
                    value={serverData.cpu}
                    maxValue={serverData.maxCpu}
                    iconColor={"text-orange-500"}
                    barColor={"bg-orange-400"}
                />
                <ServerMetricBarCard
                    title={"Ram"}
                    Icon={PulseIcon}
                    value={serverData.ram}
                    maxValue={serverData.maxRam}
                    iconColor={"text-blue-500"}
                    barColor={"bg-blue-500"}
                />
                <ServerMetricBarCard
                    title={"Disk"}
                    Icon={DiskIcon}
                    value={serverData.disk}
                    maxValue={serverData.maxDisk}
                    iconColor={"text-green-600"}
                    barColor={"bg-green-600"}
                />
            </div>

            {/* Server players and events */}
            <div className="flex flex-row mt-6 gap-2">
                <TitledCard title={"Online Players"} Icon={PeopleIcon}>
                    <ul className="flex flex-col gap-1.5">
                        {serverData.online
                            ? players.map((player, index) => {
                                return (
                                    <li className="px-3 py-2 rounded-md flex justify-between items-center bg-neutral-700/60" key={index}>
                                        <p>{player.name}</p>
                                        <p className={"text-xs text-neutral-400"}>
                                            {formatPlaytime(player.joinTime)}
                                        </p>
                                    </li>
                                )
                            })
                            : ""
                        }
                    </ul>
                </TitledCard>

                <TitledCard title={"Recent Activity"} Icon={DiskIcon}>
                    <ul className="flex flex-col gap-2" >
                        {serverData.online
                            ? events.map(({timestamp, message}, index) => {
                                return (
                                    <li className="px-3 py-2 rounded-md flex items-start gap-2 " key={index}>
                                        <div className="w-2 h-2 rounded-full bg-green-400/60 mt-1.5 "/>
                                        <div className="flex flex-col justify-center gap-1">
                                            <p className={"text-sm"}>{message}</p>
                                            <p className={"text-xs text-neutral-500"}>
                                                {formatTimeAgo(timestamp)}
                                            </p>
                                        </div>
                                    </li>
                                )})
                            : ""
                        }
                    </ul>
                </TitledCard>
            </div>

        </section>
    )
}