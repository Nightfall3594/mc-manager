
type IntItemProps = {
    ruleName: string;
    value: number;
    onEdit: (newValue: number) => void;
}
export default function IntItem({ruleName, value, onEdit}: IntItemProps) {
    return (
        <div
            key={ruleName}
            className="flex items-center justify-between p-5 bg-neutral-800
                        border-x border-neutral-700 border-t last:border-b
                        first:rounded-t-xl last:rounded-b-xl"
        >
            <span className="capitalize">{ruleName}</span>

            <input
                type="number"
                onChange={(e) => onEdit(parseInt(e.target.value))}
                value={value}
                className="flex items-center justify-center px-3 py-1 border-neutral-200 bg-neutral-900/60 rounded-lg w-1/5
                 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
        </div>
    )
}