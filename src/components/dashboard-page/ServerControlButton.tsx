"use client"
import StopIcon from "@/components/common/icons/server-controls/StopIcon.tsx";
import StartIcon from "@/components/common/icons/server-controls/StartIcon.tsx";

export enum ServerControlButtonState {
    ONLINE,
    OFFLINE,
    PENDING
}

type ServerControlButtonProps = {
    state: ServerControlButtonState,
    onClick: () => void
    onError: () => void;
}

export function ServerControlButton({state, onClick, onError}: ServerControlButtonProps) {
    switch(state) {
        case ServerControlButtonState.ONLINE:
            return (
                <button
                    onClick={() => {
                        onClick();
                        fetch("http://localhost:8080/server/status", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                isOnline: false
                            })
                        }).catch(onError);
                    }}
                    className="px-4 py-3 bg-rose-600 saturate-80 rounded-md font-bold flex justify-around items-center gap-3 cursor-pointer hover:bg-rose-500 active:bg-rose-700"
                >
                    <StopIcon className={"w-5 h-5 shrink-0"}/>
                    <span>Stop Server</span>
                </button>)

        case ServerControlButtonState.OFFLINE:
            return (
                <button
                    onClick={() => {
                        onClick()
                        fetch("http://localhost:8080/server/status", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                isOnline: true
                            })
                        }).catch(onError)
                    }}
                    className="px-4 py-3 bg-green-600/80 saturate-80 rounded-md font-bold flex justify-around items-center gap-3 cursor-pointer hover:bg-green-600 active:bg-green-700"
                >
                    <StartIcon className={"w-5 h-5 shrink-0"}/>
                    <span>Start Server</span>
                </button>)

        case ServerControlButtonState.PENDING:
            return (
                <button
                    className="px-4 py-3 bg-gray-500 rounded-md font-bold flex justify-around items-center gap-3"
                >
                    <StartIcon className={"w-5 h-5 shrink-0"}/>
                    <span>Pending...</span>
                </button>)
    }
}
