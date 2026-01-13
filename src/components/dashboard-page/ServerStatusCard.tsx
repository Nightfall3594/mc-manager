import Card from "@/components/common/cards/Card.tsx";


export default function ServerStatusCard({isOnline}: {isOnline: boolean}) {

    if (isOnline) return (
        <Card className="self-start text-md px-4 py-3 flex flex-row items-center gap-4 ">
            <div className="min-w-2 min-h-2 bg-green-500 rounded-full"/>
            <span>Server online</span>
        </Card>
    );

    return (
        <Card className="self-start text-md px-4 py-3 flex flex-row items-center gap-4 ">
            <div className="min-w-2 min-h-2 bg-gray-500 rounded-full"/>
            <span>Server offline</span>
        </Card>
    );

}