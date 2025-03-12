export default function Taskbar({height = 50}) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 flex items-center px-4"
        style={{ height: `${height}px` }}
      >
        {/* Start Button */}
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
          ~
        </div>
  
        {/* Pinned Apps */}
        <div className="flex gap-4 ml-4">
          <div className="w-8 h-8 bg-white/30 rounded"></div>
          <div className="w-8 h-8 bg-white/30 rounded"></div>
          <div className="w-8 h-8 bg-white/30 rounded"></div>
        </div>
  
        {/* System Tray & Clock */}
        <div className="ml-auto text-white text-sm pr-4">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    );
  }