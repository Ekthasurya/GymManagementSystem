import {
  Users,
  UserRoundCheck,
  CalendarCheck,
  IndianRupee,
  Clock,
} from "lucide-react";

const icons = {
  members: Users,
  activeMembers: UserRoundCheck,
  attendance: CalendarCheck,
  revenue: IndianRupee,
  expiring: Clock,
};

const StatCard = ({
  title,
  value,
  type,
  description,
}) => {
  const Icon = icons[type] || Users;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={23} />
        </div>

      </div>
    </div>
  );
};

export default StatCard;