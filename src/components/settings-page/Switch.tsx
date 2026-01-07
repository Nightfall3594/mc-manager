type SwitchProps = {
    checked: boolean;
    onToggle: () => void;
};

export default function Switch({ checked, onToggle }: SwitchProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`relative h-7 w-14 rounded-full transition-colors duration-300
                ${checked
                    ? "bg-blue-500" 
                    : "bg-neutral-600"
            }`}
        >
            <span
                className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow-md
                transition-transform duration-300
                ${checked ? "translate-x-7" : "translate-x-0"}`}
            />
        </button>
    );
}
