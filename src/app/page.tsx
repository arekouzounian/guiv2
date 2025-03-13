'use client'
import { useState, useEffect } from "react";
import { Icon } from "../components/icon";
import { Window } from "../components/window";


import WindowComponent from "../components/window";
import IconComponent from "../components/icon";
import Taskbar from "../components/taskbar";



export default function DesktopGrid() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [rows, setRows] = useState(1);
  const [icons, setIcons] = useState<Icon[]>([
    { id: 1, name: "My Computer", img: '/icons/default.png', x: 0, y: 0 },
    { id: 2, name: "Recycle Bin", img: '/icons/default.png', x: 0, y: 1 },
    { id: 3, name: "Documents", img: '/icons/default.png', x: 0, y: 2 },
    { id: 4, name: "Browser", img: '/icons/default.png', x: 0, y: 3 },
    { id: 5, name: "Settings", img: '/icons/default.png', x: 0, y: 4 },
    { id: 6, name: "Games", img: '/icons/default.png', x: 0, y: 5 },
  ]);
  const [windows, setWindows] = useState<Window[]>([]);

  const cellSize = 100; // make adjustable rather than fixed px? 
  const taskbarHeight = 60;

  // Calculate number of rows based on screen height
  useEffect(() => {
    if (!icons || icons.length === 0) {
      setIcons([{ id: 0, name: "Placeholder", img: 'icons/default.png', x: 0, y: 0 }]); // Fallback if icons are not loaded
    }
    const updateGrid = () => setRows(Math.floor(window.innerHeight / cellSize));
    updateGrid(); // Initial calculation
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [icons]);

  const handleSingleClick = (id: number) => {
    if (selectedIcon === id) {
      setSelectedIcon(null); // Deselect if clicked again
    } else {
      setSelectedIcon(id); // Select the clicked icon
    }
  };

  const handleDoubleClick = (id: number) => {
    const newWindow: Window = {
      id: Date.now(), // Unique window ID
      title: `Window ${id}`,
      url: "/static-html/src/About.html", // Replace with your static HTML URL or path
      x: 100, // Initial X position of the window
      y: 100, // Initial Y position of the window
    };
    setWindows((prevWindows) => [...prevWindows, newWindow]);
  };


  return (
    <div
      className="grid h-screen w-screen bg-blue-900"
      style={{
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gridAutoFlow: "column", // Fills top-to-bottom before moving right
      }}
    >
      {icons.map((icon) => (
        <IconComponent
          key={icon.id}
          icon={icon}
          cellSize={cellSize}
          isSelected={selectedIcon === icon.id}
          onSingleClick={() => handleSingleClick(icon.id)}
          onDoubleClick={() => handleDoubleClick(icon.id)}
        />
      ))}

      {/* Opened Windows */}
      {windows.map((window) => (
        <WindowComponent
          key={window.id}
          window={window}
          onClose={() =>
            setWindows((prevWindows) =>
              prevWindows.filter((w) => w.id !== window.id)
            )
          }
        />
      ))}


      <Taskbar height={taskbarHeight} />
    </div>
  );
}

