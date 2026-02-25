
type EnumItemProps = {
    ruleName: string;
    value: string;
    onEdit: (newValue: string) => void;
    items: string[];
}

export default function EnumItem({ ruleName, value, items, onEdit }: EnumItemProps) {
    return (
        <div
            key={ruleName}
            className="flex items-center justify-between p-5 bg-neutral-800
                        border-x border-neutral-700 border-t last:border-b
                        first:rounded-t-xl last:rounded-b-xl"
        >
            <span className="capitalize">{ruleName}</span>

            <select
                onChange={(e) => onEdit(e.target.value)}
                value={value}
                className="flex items-center justify-center px-3 py-1 border-neutral-200 bg-neutral-900/60 rounded-lg w-1/4"
            >
                {items.map((item) => {
                    return (
                        <option
                            key={item}
                            value={item}
                            className="bg-neutral-800 hover:bg-neutral-300"
                        >
                            {item}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}