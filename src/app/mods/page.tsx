"use client";
import ModCard from "../../components/mods-page/ModCard.tsx";
import UploadIcon from "@/components/common/icons/mods-page/UploadIcon.tsx";
import {useEffect, useState} from "react";

export type Mod = {
    name: string;
    version: string;
    fileSize: number;
    fileName: string;
};

function formatFileSize (fileSize: number): string {
    // 1 GB = 1073741824 bytes
    if(fileSize >= 1073741824) {
        return `${(fileSize/1073741824).toFixed(2)} GB`;

    // 1 MB = 1048576 bytes
    } else if (fileSize >= 1048576) {
        return `${(fileSize/1048576).toFixed(2)} MB`;

    // 1 KB = 1024 bytes
    } else {
        return `${(fileSize/1024).toFixed(2)} KB`;
    }
}


export default function ModsPage() {

    const [mods, setMods] = useState<Mod[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods`)
            .then(res => res.json())
            .then(mods => setMods(mods));
    }, [])

    return (
        <section className="ml-60 p-30 flex flex-col flex-1 h-screen gap-8">

            <div className="flex justify-between items-end w-full ">
                <div className="flex flex-col items-start justify-center gap-2">
                    <h1 className="text-4xl font-bold text-center ">
                        Mods
                    </h1>
                    <h2 className="text-neutral-400 text-center ">
                        Upload and manage your mods here.
                    </h2>
                </div>
                <div className="flex flex-row gap-2">
                    <label className="bg-blue-500/60 px-3 py-2 rounded-lg flex flex-row gap-3 items-center">
                        <input
                            type="file"
                            hidden
                            accept=".jar"
                            onChange={ async (e) => {
                                if (e.target.files) {

                                    const formData = new FormData();
                                    formData.append('file', e.target.files[0]);

                                    const result = await fetch(
                                        `${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods`,
                                        {method: "POST", body: formData})

                                    if(result.ok) {
                                        fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods`)
                                            .then(res => res.json())
                                            .then(mods => setMods(mods));
                                    }

                                    e.target.value = '';
                                }
                            }}
                        />

                        <UploadIcon className="w-4 h-4 "/>

                        <p className="text-white text-md ">Upload Mod (.jar)</p>
                    </label>
                </div>
            </div>

            {/* Mods container */}
            <ul className="flex flex-col p-0">
                {
                    mods.map((mod: Mod, index) => {
                        return <ModCard
                            fileName={mod.fileName}
                            name={mod.name}
                            version={mod.version}
                            fileSize={formatFileSize(mod.fileSize)}
                            key={index}
                            onRemove={async () => {
                                const result = await fetch(
                                    `${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods?fileName=${mod.fileName}`,
                                    {method: 'DELETE'})

                                if(result.ok) {
                                    fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}/mods`)
                                        .then(res => res.json())
                                        .then(mods => setMods(mods))
                                }
                            }}
                        />
                    })
                }
            </ul>
        </section>
    );
}