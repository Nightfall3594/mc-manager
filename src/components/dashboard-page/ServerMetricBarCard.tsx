import {ComponentType} from "react";
import Card from "@/components/common/cards/Card.tsx";

interface ServerMetricBarCardProps {
    title: string;
    Icon: ComponentType<{className? : string}>;
    value: number;
    maxValue: number;
    iconColor: string;
    barColor: string;
}

export default function ServerMetricBarCard({title, Icon, value, maxValue, iconColor, barColor}: ServerMetricBarCardProps) {

    // note: this ternary is to handle division by 0
    const percentage = maxValue === 0
        ? 0
        : value / maxValue * 100;

    return (
        <Card className={`flex flex-col gap-2 p-4 flex-1 `}>
            <div className="flex flex-row justify-start items-center gap-2 mb-1 ">
                <Icon className={`h-5 w-5 ${iconColor}`}/>
                <p className={`text-sm text-neutral-400`}>{title}</p>
            </div>
            <div className="flex items-center justify-between gap-3">
                <div className={`bg-neutral-700 rounded-full h-2 w-20 flex-1`}>
                    <div className={`${barColor} rounded-full h-2 w-20`} style={{width: `${percentage}%`}}/>
                </div>
                <p className="">{percentage.toFixed(0) + "%"}</p>
            </div>
        </Card>
    )
}