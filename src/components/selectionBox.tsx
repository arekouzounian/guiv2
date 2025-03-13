"use client";

import { useState } from "react";

const SelectionBox = () => {
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsSelecting(true);
        setStartPos({ x: e.clientX, y: e.clientY });
        setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isSelecting) return;
        setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };


    return (
        <div
            className="w-screen h-screen relative overflow-hidden"
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
        >
            {isSelecting && <div style={{
                left: Math.min(startPos.x, currentPos.x),
                top: Math.min(startPos.y, currentPos.y),
                width: Math.abs(currentPos.x - startPos.x),
                height: Math.abs(currentPos.y - startPos.y),
                backgroundColor: "rgba(0, 122, 255, 0.3)",
                border: "1px solid rgba(0, 122, 255, 0.6)",
                position: "absolute",
                pointerEvents: "none",
                zIndex:"0",
            }} />}
        </div>
    );
};

export default SelectionBox;