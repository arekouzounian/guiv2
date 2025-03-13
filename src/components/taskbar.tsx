'use client'
import { useEffect, useState } from "react";


interface TaskBarIconProps {
    link: string; 
    iconURL: string; 
    title: string; 
}

function TaskBarIcon({
    link, iconURL, title
}: TaskBarIconProps) {
    return (
        <div className="h-fit w-10 rounded">
            <a href={link} target="_blank">
                <img alt={title} src={iconURL} className="rounded-lg aspect-square"/>
                {/* <p className="text-xs text-center">
                    {title}
                </p> */}
            </a>
        </div>
    );
}


export default function Taskbar({ height = 50, startButtonHandle }: {height: number, startButtonHandle: React.PointerEventHandler}) {
    const [time, setTime] = useState<string>('');
    const [icons,] = useState<TaskBarIconProps[]>([
        {link: "https://blog.arekouzounian.com", iconURL: "/icons/bloggen.svg", title: "Blog"},
        {link: "https://github.com/arekouzounian", iconURL: "/icons/gh-icon.png", title: "Github"},
        {link: "https://joshbot.xyz", iconURL: "/icons/josh.png", title: "Joshbot"},
        {link: "https://joshbot.xyz/joshle", iconURL: "/icons/hsoj.png", title: "Joshle"},
    ]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };

        const intervalId = setInterval(updateTime, 1000);
        updateTime(); 
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 flex items-center px-4"
            style={{ height: `${height}px` }}
        >
            {/* <a href="https://arekouzounian.com" target="_blank"> */}
                <div className="w-15 h-10 p-5 bg-slate-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                    onPointerDown={startButtonHandle}
                >
                    ~
                </div>
            {/* </a> */}

            <div className="flex gap-4 ml-4">
                {
                    icons.map((icon, idx) => 
                        <TaskBarIcon key={idx} {...icon}></TaskBarIcon>
                    )
                }
            </div>

            <div className="ml-auto text-white text-sm pr-4">
                {time}
            </div>
        </div>
    );
}
