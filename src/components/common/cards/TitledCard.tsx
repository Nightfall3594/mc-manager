import React, {ComponentType, ReactNode} from 'react';
import Card from "@/components/common/cards/Card.tsx";

interface TitledCardProps {
    className?: string;
    title: string;
    Icon?: ComponentType<{className?: string}>;
    children: ReactNode;
}

export default function TitledCard ({ className, title, Icon, children }: TitledCardProps)  {
    return (
        <Card className={`flex flex-1 flex-col ${className}`}>
            <div className="flex items-center space-x-3">
                {Icon && <Icon className="h-6 w-6"/>}
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </Card>
    );
};