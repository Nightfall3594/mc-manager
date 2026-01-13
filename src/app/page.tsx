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
import StopIcon from "@/components/common/icons/server-controls/StopIcon.tsx";
import RestartIcon from "@/components/common/icons/server-controls/RestartIcon.tsx";

export default function UserDashboard() {

    // TODO: convert to state later
    const isOnline = true;
    // const [isOnline, setOnline] = useState(true);

    // more mock data
    const currentOnlinePlayers = [
        {
            name: "HelloWorld",
            totalDuration: "20m"
        },
        {
            name: "HelloWorld2",
            totalDuration: "1m"
        },
        {
            name: "HelloWorld3",
            totalDuration: "2h 30m"
        },
    ]

    // more mock data
    const mockEventData = [
        {
            event: "HelloWorld1 left the game",
            time: "20m ago"
        },
        {
            event: "HelloWorld1 joined the game",
            time: "20m ago"
        },
        {
            event: "HelloWorld2 joined the game",
            time: "1m ago"
        },
        {
            event: "HelloWorld3 joined the game",
            time: "2h 30m ago"
        },
    ]

    return (
        <section className="ml-60 p-30 flex flex-1 flex-col min-h-screen ">

            {/* Server header */}
            <div className="flex flex-row items-center justify-between gap-4 mb-6 ">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-4xl font-bold ">Chillingmc</h1>
                    <p className="text-md text-neutral-400 ">192.168.56.13:6543</p>
                </div>

                <div className="flex flex-row items-center justify-center gap-6 ">
                    <button className="px-4 py-2 w-30 bg-rose-600 saturate-80 rounded-md font-bold flex justify-around items-center ">
                        <StopIcon className={"w-5 h-5 shrink-0"}/>
                        <span>Stop</span>
                    </button>
                    <button className="px-4 py-2 w-30 bg-sky-600 saturate-80 rounded-md font-bold flex justify-around items-center ">
                        <RestartIcon className={"w-4 h-4 shrink-0"}/>
                        <span>Restart</span>
                    </button>
                </div>
            </div>

            <ServerStatusCard isOnline={isOnline}/>

            <div className="mt-8 flex flex-row gap-2 ">
                <ServerMetricCard
                    title={"Players Online"}
                    value={"2/20"}
                    Icon={PeopleIcon}
                    color={"bg-green-900"}
                    highlight={"text-green-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"Uptime"}
                    value={"5d 6h 27m"}
                    Icon={ClockIcon}
                    color={"bg-blue-900"}
                    highlight={"text-blue-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"TPS"}
                    value={"20"}
                    Icon={PulseIcon}
                    color={"bg-yellow-900"}
                    highlight={"text-yellow-300"}
                    className={"w-full"}
                />

                <ServerMetricCard
                    title={"CPU"}
                    value={"60%"}
                    Icon={CpuIcon}
                    color={"bg-red-900"}
                    highlight={"text-red-300"}
                    className={"w-full"}
                />
            </div>


            <div className="mt-5 w-full flex flex-row gap-2 ">
                <ServerMetricBarCard
                    title={"CPU"}
                    Icon={CpuIcon}
                    value={"60%"}
                    percent={60}
                    iconColor={"text-orange-500"}
                    barColor={"bg-orange-400"}
                />
                <ServerMetricBarCard
                    title={"Ram"}
                    Icon={PulseIcon}
                    value={"30%"}
                    percent={30}
                    iconColor={"text-blue-500"}
                    barColor={"bg-blue-500"}
                />
                <ServerMetricBarCard
                    title={"Disk"}
                    Icon={DiskIcon}
                    value={"10%"}
                    percent={10}
                    iconColor={"text-green-600"}
                    barColor={"bg-green-600"}
                />
            </div>

            <div className="flex flex-row mt-6 gap-2">
                <TitledCard title={"Online Players"} Icon={PeopleIcon}>
                    <ul className="flex flex-col gap-1.5">
                        {
                            currentOnlinePlayers.map((player, index) => {
                                return (
                                    <li className="px-3 py-2 rounded-md flex justify-between items-center bg-neutral-700/60" key={index}>
                                        <p>{player.name}</p>
                                        <p className={"text-xs text-neutral-400"}>
                                            {player.totalDuration}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </TitledCard>

                <TitledCard title={"Recent Activity"} Icon={DiskIcon}>
                    <ul className="flex flex-col gap-2" >
                        {mockEventData.map(({event, time}, index) => {
                            return (
                                <li className="px-3 py-2 rounded-md flex items-start gap-2 " key={index}>
                                    <div className="w-2 h-2 rounded-full bg-green-400/60 mt-1.5 "/>
                                    <div className="flex flex-col justify-center gap-1">
                                        <p className={"text-sm"}>{event}</p>
                                        <p className={"text-xs text-neutral-500"}>
                                            {time}
                                        </p>
                                    </div>
                                </li>
                            )})}
                    </ul>
                </TitledCard>
            </div>

        </section>
    )
}