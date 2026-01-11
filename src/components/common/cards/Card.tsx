import type {ReactNode} from 'react';

export default function Card({children, className = ""}:{children: ReactNode, className?: string}) {
    return (
        <div className={`bg-neutral-800 border border-neutral-700 rounded-lg shadow-md p-4 ${className} `}>
            {children}
        </div>
    );
}