import Switch from "@/components/settings-page/switch-item/Switch.tsx";

type SwitchProps = {
    ruleName: string,
    value: boolean
    onToggle: () => void
}

export default function SwitchItem({ruleName, value, onToggle}: SwitchProps) {
    return (
        <div
            key={ruleName}
            className="flex items-center justify-between p-5 bg-neutral-800
                        border-x border-neutral-700 border-t last:border-b
                        first:rounded-t-xl last:rounded-b-xl"
        >
            <span className="capitalize">{ruleName}</span>
            <Switch checked={value} onToggle={onToggle} />
        </div>
    )
}

