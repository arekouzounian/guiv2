'use client'
import { useEffect, useState } from "react";

export default function Taskbar({ height = 50 }) {

    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString()); // Update time to locale time string
        };

        // Update the time every second
        const intervalId = setInterval(updateTime, 1000);

        // Set the initial time
        updateTime();

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 flex items-center px-4"
            style={{ height: `${height}px` }}
        >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                ~
            </div>

            <div className="flex gap-4 ml-4">
                <div className="w-8 h-8 bg-white/30 rounded"></div>
                <div className="w-8 h-8 bg-white/30 rounded"></div>
                <div className="w-8 h-8 bg-white/30 rounded"></div>
            </div>

            <div className="ml-auto text-white text-sm pr-4">
                {time}
            </div>
        </div>
    );
}
