interface MCWorld {
    name: string,
    size: string,
    version: string,
    last_backup: string,
}

const mockMCWorld : MCWorld | undefined = {
    name: "ChillingMC",
    size: "1.9 GB",
    version: "1.21.10",
    last_backup: "2026-01-05 03:12 UTC"
}

export default function BackupsPage() {

    // TODO: Fetch world data, store here
    // const [world, setWorld] = useState([]);

    // mock mc world for now
    const world = mockMCWorld;

    return (
        <section className="ml-60 p-30 flex flex-col flex-1 h-screen gap-8">
            <div className="flex flex-1 flex-col gap-6 max-w-2xl">
                <div className="rounded-lg border w p-6 flex flex-col gap-2">
                    <div className="mb-3 ">
                        <h1 className="text-4xl font-bold mb-1 ">{world?.name}</h1>
                        <h2 className="text-2xl ">{world?.version}</h2>
                    </div>
                    <div className="text-lg space-y-1 ">
                        <p>{`File size: ${world?.size}`}</p>
                        <p>{`Last backup: ${world?.last_backup}`}</p>
                        <p>Format: .zip</p>
                    </div>
                </div>

                <button className="self-start px-6 py-3 w-auto rounded-md bg-emerald-700 backdrop-saturate-50 ">
                    Download World
                </button>
            </div>
        </section>
    )
}