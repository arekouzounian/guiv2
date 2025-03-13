import React from "react";

export interface Icon {
    name: string;
    img: string;
    page: string | null;
    x: number;
    y: number;
}

interface IconComponentProps {
    icon: Icon;
    cellSize: number;
    isSelected: boolean;
    onSingleClick: () => void;
    onDoubleClick: () => void;
    
}

const IconComponent: React.FC<IconComponentProps> = ({
    icon,
    cellSize,
    isSelected,
    onSingleClick,
    onDoubleClick,
}) => {
    return (
        <div
            onClick={onSingleClick}
            onDoubleClick={onDoubleClick}
            onTouchEnd={onDoubleClick}
            className="absolute flex flex-col items-center justify-center"
            style={{
                top: icon.y * cellSize,
                left: icon.x * cellSize,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                cursor: "pointer",
                userSelect: "none",
                border:
                    isSelected ? "2px solid rgba(128, 128, 128, 0.5)" : "none",
                transition: "border 0.2s ease",
            }}
        >
            <img
                src={icon.img}
                alt={icon.name}
                className="w-12 h-12 object-contain"
            />
            <span className="mt-1 text-xs">{icon.name}</span>
        </div>
    );
};

export default IconComponent;

// export function IconComponent({
// }: IconComponentProps) {
// }