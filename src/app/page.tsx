
export default function UserDashboard() {

    return (
        <section className="ml-60 px-30 pt-55 flex flex-1 flex-col items-center min-h-screen">
            <div className="min-h-full w-3/4 bg-neutral-700 rounded-lg flex flex-col justify-center items-center ">
                <div className="flex justify-center items-center flex-col m-12">
                    <h1 className="font-bold text-3xl m-3">Server Title Here</h1>
                    <h2 className="text-xl text-neutral-200">192.168.1.5:3306</h2>
                </div>
                <p className="w-full bg-emerald-600 rounded-b-lg flex items-center justify-center py-2 font-bold">
                    Active
                </p>
            </div>
            <div className="mt-6 w-full flex flex-row items-center justify-center gap-12">
                {/*<button className="px-6 py-3 bg-emerald-600 rounded-md">Start</button>*/}
                <button className="px-6 py-3 w-30 bg-rose-600 saturate-80 font-bold rounded-md">Stop</button>
                <button className="px-6 py-3 w-30 bg-sky-600 saturate-80  rounded-md font-bold ">Restart</button>
            </div>
        </section>
    )
}