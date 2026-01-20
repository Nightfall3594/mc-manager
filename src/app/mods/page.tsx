"use client";
import ModCard from "../../components/mods-page/ModCard.tsx";
import {PopupModal} from "../../components/common/Popup/PopupModal.tsx";
import {useState} from "react";
import ModUploadArea from "../../components/mods-page/UploadMod.tsx";

export type Mod = {
    id: string;
    name: string;
    uploadedOn: string;
    fileSize?: number;
};

export default function ModsPage() {

    // Mock mods-page, for now.
    const mockMods: Mod[] = [
        { id: '1', name: 'Mod One', fileSize: 150, uploadedOn: '2026-01-11' },
        { id: '2', name: 'Mod Two', uploadedOn: '2026-01-12' },
        { id: '3', name: 'Mod Three', fileSize: 75, uploadedOn: '2026-01-13' },
    ]

    const [isUploadModalVisible, setUploadModalVisible] = useState<boolean>(false);

    return (
        <section className="ml-60 p-30 flex flex-col flex-1 h-screen gap-8">

            <div className="flex justify-between items-center w-full ">
                <div className="flex flex-col items-start justify-center gap-2">
                    <h1 className="text-4xl font-bold text-center ">
                        Mods
                    </h1>
                    <h2 className="text-neutral-400 text-center ">
                        Upload and manage your mods here.
                    </h2>
                </div>
                <div className="flex flex-row ">
                    <button
                        onClick={() => setUploadModalVisible(true)}
                        className="bg-cyan-700 text-white px-3 py-1.5 rounded mr-2 "
                    >
                        Add Mod
                    </button>
                    <button className="bg-teal-700 text-white px-3 py-1.5 rounded ">Refresh Mods</button>
                </div>
            </div>

            {/* Mods container */}
            <ul className="flex flex-col p-0">
                {
                    mockMods.map((mod: Mod, index) => {
                        return <ModCard key={index} mod={mod} onRemove={() => {}} onDownload={() => {}}/>
                    })
                }
            </ul>

            <PopupModal
                isOpen={isUploadModalVisible}
                onClose={() => setUploadModalVisible(false)}
                title={"Upload"}
            >
                <ModUploadArea/>
            </PopupModal>

        </section>
    );
}