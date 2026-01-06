import type {ReactNode} from "react";
import CloseIcon from "../icons/CloseIcon.tsx";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export function PopupModal({ isOpen, onClose, title, children }: ModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose}/>

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-neutral-700 text-white shadow-xl">

                <div className="flex items-center justify-between px-5 py-4 border-b border-b-neutral-500 ">

                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-md p-1 text-neutral-300 hover:bg-neutral-600 hover:text-white"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="px-5 py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
