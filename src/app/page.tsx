'use client'
import { useState, useEffect } from "react";
import { Icon } from "../components/icon";
import { Window } from "../components/window";

import WindowComponent from "../components/window";
import IconComponent from "../components/icon";
import Taskbar from "../components/taskbar";
import SelectionBox from "@/components/selectionBox";

export default function DesktopGrid() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [rows, setRows] = useState(1);
  const [windows, setWindows] = useState<Window[]>([]);

  const [icons,] = useState<Icon[]>([
    { name: "Recycle Bin", img: '/icons/recycle.png', page: null, x: 0, y: 0 },
    { name: "About", img: '/icons/default.png', page: '/static-html/src/About.html', x: 0, y: 1 },
    { name: "Projects", img: '/icons/default.png', page: '/static-html/src/Projects.html', x: 0, y: 2 },
    { name: "Contact", img: '/icons/default.png', page: '/static-html/src/Contact.html', x: 0, y: 3 },
  ]);

  const cellSize = 100; // make adjustable rather than fixed px? 
  const taskbarHeight = 50;

  // Calculate number of rows based on screen height
  useEffect(() => {

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
    if (icons[id].page != null) {
      const newWindow: Window = {
        id: windows.length + 1,
        title: icons[id].name,
        url: icons[id].page,
        x: 100,
        y: 100,
      };
      setWindows((prevWindows) => [...prevWindows, newWindow]);
    }
  };


  return (
    <div
      className="grid h-screen w-screen touch-manipulation"
      style={{
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gridAutoFlow: "column", // Fills top-to-bottom before moving right
        backgroundImage: "url('/xp-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {icons.map((icon, ind) => (
        <IconComponent
          key={ind}
          icon={icon}
          cellSize={cellSize}
          isSelected={selectedIcon === ind}
          onSingleClick={() => handleSingleClick(ind)}
          onDoubleClick={() => handleDoubleClick(ind)}
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

      <SelectionBox></SelectionBox>


      <Taskbar height={taskbarHeight} />
    </div>
  );
}

