import {
  Menu,
  Bell,
  LogOut,
  UserCircle,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Welcome back 👋
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            Manage your gym efficiently
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
          <UserCircle
            size={38}
            className="text-slate-400"
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {user?.name || "User"}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user?.role || "Member"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;