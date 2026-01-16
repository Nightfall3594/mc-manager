import ZippedFolderIcon from "@/components/common/icons/backups/ZippedFolderIcon.tsx";
import Card from "@/components/common/cards/Card.tsx";
import DownloadIcon from "@/components/common/icons/backups/DownloadIcon.tsx";


// mock world data
const world = {
    name: "world",
    server: "Creative Build",
    size: "1.87 GB",
    lastModified: "2026-01-14",
    seed: "-4589128118707775879",
};


export default function BackupsPage() {
    return (
        <section className="ml-60 p-30 flex flex-col justify-center items-center flex-1 h-screen gap-8 bg-neutral-950 text-white ">
            <div className="flex flex-col gap-3 ">
                <div className="flex flex-col items-start gap-1">
                    <h1 className="text-3xl font-bold">World Download</h1>
                    <p className="text-neutral-400">Download your server world files</p>
                </div>

                <Card className="max-w-3xl p-8 flex flex-col gap-6 bg-neutral-900 border border-neutral-800 rounded-2xl">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-xl">
                            <ZippedFolderIcon className="w-10 h-10 text-blue-400" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xl font-semibold">{world.name}</span>
                            <span className="text-neutral-400">Server: {world.server}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-neutral-800/60 rounded-xl p-4">
                            <p className="text-sm text-neutral-400">World Size</p>
                            <p className="text-lg font-semibold">{world.size}</p>
                        </div>

                        <div className="bg-neutral-800/60 rounded-xl p-4">
                            <p className="text-sm text-neutral-400">Last Modified</p>
                            <p className="text-lg font-semibold">{world.lastModified}</p>
                        </div>

                        <div className="bg-neutral-800/60 rounded-xl p-4">
                            <p className="text-sm text-neutral-400">World Seed</p>
                            <p className="text-sm font-mono break-all">{world.seed}</p>
                        </div>
                    </div>

                    {/* Download section */}
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 transition rounded-xl py-3 font-semibold">
                            <DownloadIcon className="w-5 h-5" />
                            Download World Files
                        </button>

                        <p className="text-center text-sm text-neutral-500">
                            This will download a compressed archive of your entire world folder
                        </p>
                    </div>
                </Card>
            </div>
        </section>
    );
}
