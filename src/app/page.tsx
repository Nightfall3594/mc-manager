"use client";
import ServerStatusCard from "@/components/dashboard-page/ServerStatusCard.tsx";

export default function UserDashboard() {

    // TODO: convert to state later
    const isOnline = true;
    // const [isOnline, setOnline] = useState(true);

    return (
        <section className="ml-60 p-30 flex flex-1 flex-col min-h-screen">

            {/* Server header */}
            <div className="flex flex-row items-center justify-between gap-4 mb-6 ">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-4xl font-bold ">Chillingmc</h1>
                    <p className="text-md text-neutral-400 ">192.168.56.13:6543</p>
                </div>

                <div className="flex flex-row items-center justify-center gap-6 ">
                    <button className="px-4 py-2 w-30 bg-rose-600 saturate-80 rounded-md font-bold ">Stop</button>
                    <button className="px-4 py-2 w-30 bg-sky-600 saturate-80  rounded-md font-bold ">Restart</button>
                </div>
            </div>

            <ServerStatusCard isOnline={isOnline}/>

        </section>
    )
}