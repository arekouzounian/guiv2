'use client'
import { useEffect, useState } from "react";

export default function Taskbar({ height = 50 }) {

    const [time, setTime] = useState<string>('');

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
            <a href="https://arekouzounian.com">
                <div className="w-15 h-10 p-5 bg-slate-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                    ~
                </div>
            </a>

            <div className="flex gap-4 ml-4">
                {/* <div className="w-8 h-8 bg-white/30 rounded"></div>
                <div className="w-8 h-8 bg-white/30 rounded"></div>
                <div className="w-8 h-8 bg-white/30 rounded"></div> */}
            </div>

            <div className="ml-auto text-white text-sm pr-4">
                {time}
            </div>
        </div>
    );
}
