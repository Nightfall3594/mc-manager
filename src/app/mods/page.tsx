"use client";
import ModCard from "../../components/mods-page/ModCard.tsx";
import UploadIcon from "@/components/common/icons/mods-page/UploadIcon.tsx";

export type Mod = {
    id: string;
    name: string;
    uploadedOn: string;
    fileSize?: number;
};

// TODO: handle file upload
function handleFileUpload(file: File) {
    console.log(file)
}

export default function ModsPage() {

    // Mock mods-page, for now.
    const mockMods: Mod[] = [
        { id: '1', name: 'Mod One', fileSize: 150, uploadedOn: '2026-01-11' },
        { id: '2', name: 'Mod Two', uploadedOn: '2026-01-12' },
        { id: '3', name: 'Mod Three', fileSize: 75, uploadedOn: '2026-01-13' },
    ]

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
                            onChange={(e) => {
                                if (e.target.files) {
                                    handleFileUpload(e.target.files[0])
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
                    mockMods.map((mod: Mod, index) => {
                        return <ModCard
                            key={index}
                            mod={mod}
                            onRemove={() => {}}
                            onDownload={() => {}}
                        />
                    })
                }
            </ul>
        </section>
    );
}