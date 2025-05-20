import { useRef } from "react";

export default function Dialog({ children, className, onClose }) {
    const container = useRef(null);

    const handleClose = () => {
        if (container.current) {
            container.current.classList.add("hidden");
        }
        if (onClose) {
            onClose(); // Nếu có hàm onClose thì gọi nó
        }
    };

    return (
        <div
            ref={container}
            className={`${className} w-full h-[100vh] fixed flex justify-center items-center bg-gray-500 bg-opacity-50`}
        >
            <div className="relative border-2 border-red-500 p-4 bg-white rounded-lg">
                {children}
                <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={handleClose}
                >
                    X
                </div>
            </div>
        </div>
    );
}
