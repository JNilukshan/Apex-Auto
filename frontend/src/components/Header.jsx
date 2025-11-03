import { Bell } from "lucide-react";

export default function Header({ onNavigate }) {
  return (
    <header className="flex flex-col bg-gray-100">
      {/* 🔹 Top Content */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* 🔹 Left - APEX Logo */}
        <button
          onClick={() => onNavigate && onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-3 h-3 bg-cyan-400 rounded-sm"></div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">APEX</span>
        </button>

        {/* 🔹 Right - Notification Bell */}
        <button className="flex items-center gap-2 p-2 px-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition shadow-md hover:shadow-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800 text-sm font-medium">3</span>
        </button>
      </div>

      {/* 🔹 Bottom Thin White Line (not full width) */}
      <div className="mx-auto w-3/4 h-[1px] bg-gray-200 opacity-60"></div>
    </header>
  );
}
