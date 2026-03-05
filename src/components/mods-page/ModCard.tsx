import TrashcanIcon from "../common/icons/Trashcan.tsx";
import BoxIcon from "@/components/common/icons/mods-page/BoxIcon.tsx";
import DownloadIcon from "@/components/common/icons/common/DownloadIcon.tsx";



type ModCardProps = {
    name: string;
    version: string;
    fileName: string;
    fileSize: string;
    onRemove: (fileName: string) => void;
};

export default function ModCard({ name, version, fileSize, fileName, onRemove}: ModCardProps) {

    return (
        <li className="relative flex justify-between items-center p-5 bg-neutral-800
             border-x border-t last:border-b
             first:rounded-t-xl last:rounded-b-xl border-neutral-600"
        >
            <div className="flex flex-row items-center gap-4">
                {/* Mod image / logo */}
                <BoxIcon className={"text-blue-500 h-16 w-16 "}/>

                {/* Mod info */}
                <div className="flex flex-col justify-center gap-2 ">
                    <h3 className="text-lg font-semibold text-white leading-tight">
                        {name}
                    </h3>

                    <div className="flex flex-row gap-3">
                        {fileSize !== undefined && (
                            <span className="text-xs text-neutral-400">
                                {fileSize}
                            </span>
                        )}
                        <span className="text-xs text-neutral-400">
                            {`version ${version}`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Download/Delete buttons */}
            <div className="flex flex-row gap-7 mr-4">

                <a
                    href={`${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods/download?fileName=${fileName}`}
                    title="Remove mod"
                    className="text-neutral-400 hover:text-blue-500 hover:scale-120 cursor-pointer transition"
                >
                    <DownloadIcon className="w-5 h-5"/>
                </a>

                <button
                    onClick={() => onRemove(fileName)}
                    title="Remove mod"
                    className="text-neutral-400 hover:text-red-500 hover:scale-120 cursor-pointer transition"
                >
                    <TrashcanIcon className="w-5 h-5"/>
                </button>
            </div>
        </li>
    );
}
