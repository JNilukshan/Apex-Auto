import { Home, Car, MessageSquare, Clipboard, Settings } from "lucide-react";

export default function Sidenav({ signOut, onNavigate }) {
  return (
    <aside className="w-24 bg-black rounded-3xl m-4 flex flex-col items-center py-8">
    

      <nav className="flex flex-col gap-8 text-gray-400 flex-1">
        <button className="hover:text-white transition p-3 bg-white/10 rounded-xl">
          <Home className="w-6 h-6" />
        </button>
        <button className="hover:text-white transition p-3 rounded-xl">
          <Car className="w-6 h-6" />
        </button>
        <button className="hover:text-white transition p-3 rounded-xl">
          <Clipboard className="w-6 h-6" />
        </button>
        <button className="hover:text-white transition p-3 rounded-xl">
          <MessageSquare className="w-6 h-6" />
        </button>
        <button 
          onClick={signOut}
          className="hover:text-white transition p-3 rounded-xl hover:bg-red-500/20"
          title="Logout"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>

      {/* Profile Image at Bottom with Gap */}
      <div className="mt-80">
        <button
          onClick={() => onNavigate('home')}
          className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden hover:bg-gray-600 transition-colors"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
}
