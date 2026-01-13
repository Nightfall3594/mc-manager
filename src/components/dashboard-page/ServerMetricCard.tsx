import Card from "@/components/common/cards/Card.tsx";
import {ComponentType} from "react";

interface ServerMetricCardProps {
    title: string;
    value: string;
    Icon: ComponentType<{className?: string}>;
    color: string;
    highlight: string;
    className?: string;
}

export default function ServerMetricCard({title, value, Icon, color, highlight, className = ""}: ServerMetricCardProps) {
    return (
        <Card className={`flex flex-row justify-start items-center gap-4 ${className}`}>
            <div className={`flex items-center justify-center p-3 ${color} rounded-lg `}>
                <Icon className={`${highlight} h-8 w-8 ${color} `}/>
            </div>
            <div>
                <p className="text-sm text-neutral-400">{title}</p>
                <p className="text-lg font-bold ">{value}</p>
            </div>
        </Card>
    )
}