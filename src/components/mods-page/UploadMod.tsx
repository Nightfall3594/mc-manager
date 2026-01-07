
type ModUploadAreaProps = {
    onFilesSelected?: (files: FileList) => void;
};

export default function ModUploadArea({ onFilesSelected }: ModUploadAreaProps) {
    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                onFilesSelected?.(e.dataTransfer.files);
            }}
            className="bg-neutral-800 border-2 border-dashed border-neutral-600 rounded-lg p-10 flex flex-col items-center justify-center gap-4 text-neutral-400 hover:border-cyan-600 hover:text-cyan-400 transition "
        >
            <div className="text-center">
                <p className="text-lg font-semibold text-neutral-300">
                    Upload a Minecraft Mod
                </p>
                <p className="text-sm text-neutral-500">
                    Drag & drop a <span className="text-neutral-400">.jar</span> file here
                    <br />
                    or click to browse
                </p>
            </div>

            {/* Hidden file input */}
            <label className="mt-2">
                <input
                    type="file"
                    accept=".jar"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) {
                            onFilesSelected?.(e.target.files);
                        }
                    }}
                />
                <span className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition cursor-pointer">
                    Browse Files
                </span>
            </label>
        </div>
    );
}
