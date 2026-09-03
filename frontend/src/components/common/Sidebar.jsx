import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRoundCog,
  CreditCard,
  CalendarCheck,
  IndianRupee,
  Dumbbell,
  Utensils,
  TrendingUp,
  FileText,
  X,
} from "lucide-react";

const adminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Members",
    path: "/admin/members",
    icon: Users,
  },
  {
    name: "Trainers",
    path: "/admin/trainers",
    icon: UserRoundCog,
  },
  {
    name: "Memberships",
    path: "/admin/memberships",
    icon: CreditCard,
  },
  {
    name: "Attendance",
    path: "/admin/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: IndianRupee,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: FileText,
  },
];

const trainerLinks = [
  {
    name: "Dashboard",
    path: "/trainer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Members",
    path: "/trainer/members",
    icon: Users,
  },
  {
    name: "Workouts",
    path: "/trainer/workouts",
    icon: Dumbbell,
  },
  {
    name: "Diet Plans",
    path: "/trainer/diet-plans",
    icon: Utensils,
  },
  {
    name: "Progress",
    path: "/trainer/progress",
    icon: TrendingUp,
  },
];

const memberLinks = [
  {
    name: "Dashboard",
    path: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Membership",
    path: "/member/membership",
    icon: CreditCard,
  },
  {
    name: "Attendance",
    path: "/member/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Payments",
    path: "/member/payments",
    icon: IndianRupee,
  },
  {
    name: "Workout",
    path: "/member/workout",
    icon: Dumbbell,
  },
  {
    name: "Diet",
    path: "/member/diet",
    icon: Utensils,
  },
  {
    name: "Progress",
    path: "/member/progress",
    icon: TrendingUp,
  },
];

const Sidebar = ({
  role,
  isOpen,
  onClose,
}) => {
  let links = [];

  if (role === "admin") {
    links = adminLinks;
  } else if (role === "trainer") {
    links = trainerLinks;
  } else if (role === "member") {
    links = memberLinks;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950">
              <Dumbbell size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                FitManager
              </h1>

              <p className="text-xs capitalize text-slate-400">
                {role} Panel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />

                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <p className="text-center text-xs text-slate-500">
            FitManager © 2026
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;