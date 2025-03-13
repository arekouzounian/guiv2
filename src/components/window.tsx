import React from "react";

import { useRef } from "react";

import Draggable from "react-draggable";


export interface Window {
    id: number;
    title: string;
    url: string; 
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
    const nodeRef = useRef(null!);
    

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds={"body"}
        >
            <div
                className="absolute border bg-gray-400 p-4 rounded-lg shadow-md text-black pb-10"
                ref={nodeRef}
                style={{
                    top: window.y,
                    left: window.x,
                    width: "60%",
                    height: "60%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    overflow: "hidden",
                    zIndex: "2"
                }}
            >
                <div className="flex justify-between">
                    <h2 className="text-lg">{window.title}</h2>
                    <button
                        className="text-red-500 bg-gray-500 px-2"
                        onClick={onClose}
                        onTouchStart={onClose}
                        >
                        X
                    </button>
                </div>
                <iframe
                    src={window.url}
                    title={window.title}
                    className="w-full h-full mb-2 text-black font-bold object-contain touch-manipulation"
                />
            </div>
        </Draggable>
    );

};

export default WindowComponent;