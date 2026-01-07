import TrashcanIcon from "../common/icons/Trashcan.tsx";

export type Mod = {
    id: string;
    name: string;
    version: string;
    fileSize?: number;
    imageUrl?: string;
};

type ModCardProps = {
    mod: Mod;
    onRemove: (id: string) => void;
};

export default function ModCard({ mod, onRemove }: ModCardProps) {
    return (
        <div className="relative bg-neutral-800 rounded-lg border border-neutral-700 p-4 flex gap-4 shadow-sm">

            {/* Remove (trash) button */}
            <button
                onClick={() => onRemove(mod.id)}
                title="Remove mod"
                className="absolute top-2 right-2 text-neutral-400 hover:text-red-500 transition"
            >
                <TrashcanIcon className="w-6 h-6"/>
            </button>

            {/* Mod image / logo */}
            <div className="w-16 h-16 rounded bg-neutral-700 flex items-center justify-center overflow-hidden shrink-0">
                {mod.imageUrl
                    ? <img src={mod.imageUrl}
                        alt={mod.name}
                        className="w-full h-full object-cover"/>

                    : <span className="text-neutral-400 text-xs">No Image</span>
                }
            </div>

            {/* Mod info */}
            <div className="flex flex-col justify-center gap-1">
                <h3 className="text-lg font-semibold text-white leading-tight">
                    {mod.name}
                </h3>

                <span className="text-sm text-neutral-400">
                  Version {mod.version}
                </span>

                {mod.fileSize !== undefined && (
                    <span className="text-xs text-neutral-500">
                        {(mod.fileSize / 1024).toFixed(2)} MB
                    </span>
                )}
            </div>
        </div>
    );
}
