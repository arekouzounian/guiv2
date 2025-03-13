'use client'
import { useState, useEffect } from "react";
import { Icon } from "../components/icon";
import { Window } from "../components/window";

import WindowComponent from "../components/window";
import IconComponent from "../components/icon";
import Taskbar from "../components/taskbar";
import SelectionBox from "@/components/selectionBox";

/*
  TODO:
    - add start/help window (with clippy?)
    - add icons, favicon 
*/

export default function DesktopGrid() {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [rows, setRows] = useState(1);
  const [windows, setWindows] = useState<Window[]>([]);
  const [globalZ, setGlobalZ] = useState(2);


  // Credit to patorjk.com w/ the ANSI Shadow ASCII Art. This guy's website rules. 
  const [icons,] = useState<Icon[]>([
    { name: "Recycle Bin", img: '/images/recycle.png', page: null, x: 0, y: 0, out_url: 'https://github.com/arekouzounian' },
    { name: "About", img: '/images/a.png', page: '/static-html/src/About.html', x: 0, y: 1, out_url: null },
    { name: "Projects", img: '/images/p.png', page: '/static-html/src/Projects.html', x: 0, y: 2, out_url: null },
    { name: "Contact", img: '/images/c.png', page: '/static-html/src/Contact.html', x: 0, y: 3, out_url: null },
    { name: "Resume", img: '/images/notepad.png', page: null, x: 0, y: 4, out_url: '/resume.pdf'},
    { name: "Wordle", img: "/images/default.png", page: null, x: 0, y: 5, out_url: "https://arekouzounian.com/wordle"},
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
        x: Math.floor((Math.random() * window.innerWidth) / 3),
        y: Math.floor((Math.random() * window.innerWidth) / 4),
        z: globalZ+1,
      };
      setWindows((prevWindows) => [...prevWindows, newWindow]);
      setGlobalZ(globalZ + 1);
    } else if (icons[id].out_url != null) {
      window.open(icons[id].out_url, '_blank');
    }
  };

  const handleStartButton = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      const newWindow: Window = {
        id: windows.length + 1, 
        title: "Terminal", 
        url: "https://arekouzounian.com", 
        x: Math.floor((Math.random() * window.innerWidth) / 3),
        y: Math.floor((Math.random() * window.innerWidth) / 4),
        z: globalZ+1
      };
      setWindows((prv) => [...prv, newWindow]);
      setGlobalZ(globalZ + 1);
    } else {
      window.open("https://arekouzounian.com", "_blank");
    } 
  }


  return (
    <div
      className="grid h-screen w-fit touch-manipulation overflow-hidden"
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
          sendToTop={() => 
            setWindows((prevWindows) => 
            prevWindows.map((w) => {
              if (w.id === window.id && w.z < globalZ) {
                w.z = globalZ + 1;
                setGlobalZ(globalZ+1);
              } 
              return w; 
            }))
          }
        />
      ))}

      <SelectionBox></SelectionBox>


      <Taskbar height={taskbarHeight} startButtonHandle={handleStartButton}/>
    </div>
  );
}

