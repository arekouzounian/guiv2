import React from "react";

export interface Window {
    id: number;
    title: string;
    url: string; // The URL of the content to load in the iframe
    x: number;
    y: number;
}

interface WindowComponentProps {
    window: Window;
    onClose: () => void;
}

const WindowComponent: React.FC<WindowComponentProps> = ({
    window, onClose
}) => {
    return (
        <div
            className="absolute border bg-gray-400 p-4 rounded-lg shadow-md text-black pb-10"
            style={{
                top: window.y,
                left: window.x,
                width: "60%",
                height: "60%",
                overflow: "hidden",
            }}
        >
            <div className="flex justify-between">
                <h2 className="text-lg">{window.title}</h2>
                <button
                    className="text-red-500 bg-gray-500 px-2"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
            {/* <div className=""> */}
            <iframe
                src={window.url}
                title={window.title}
                className="w-full h-full mb-2 text-black object-contain"
            // frameBorder={'0'}
            />
            {/* </div> */}
        </div>
    );

};

export default WindowComponent;