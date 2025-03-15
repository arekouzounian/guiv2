import React, { useState } from "react";
import { useRef } from "react";
import { VT323 } from "next/font/google";

import Draggable from "react-draggable";


export interface Window {
    id: number;
    title: string;
    url: string;
    x: number;
    y: number;
    z: number;
}

interface WindowComponentProps {
    window: Window;
    onClose: () => void;
    sendToTop: React.PointerEventHandler<HTMLDivElement>
}

const xpFont = VT323({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-xp',
});

const WindowComponent: React.FC<WindowComponentProps> = ({
    window, onClose, sendToTop
}) => {
    const nodeRef = useRef(null!);
    const [isDragging, setIsDragging] = useState(false);


    return (
        <Draggable
            nodeRef={nodeRef}
            bounds={"body"}
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
        >
            <div
                className={`${xpFont.variable} absolute bg-blue-600 px-2 pb-10 rounded-lg text-black w-full md:w-6/10 h-6/10 radGrad border border-blue-600`}
                ref={nodeRef}
                style={{
                    top: window.y,
                    left: window.x,
                    overflow: "hidden",
                    zIndex: window.z,
                }}
                onPointerDown={sendToTop}
            >
                <div className="flex justify-between">
                    <h2 className={`text-2xl pl-1 font-bold text-white`}>{window.title}</h2>
                    <button
                        className="text-white bold px-2 my-1 border border-white rounded-sm exitButtonGrad"
                        onClick={onClose}
                        onTouchStart={onClose}
                    >
                        X
                    </button>
                </div>
                {isDragging && (
                <div style={{ position: 'absolute', zIndex: window.z+1 }} className="w-full h-full"></div>
                )}
                <iframe
                    src={window.url}
                    className="w-full h-full text-black font-bold object-contain touch-manipulation rounded-xs"
                />
            </div>
        </Draggable>
    );

};

export default WindowComponent;