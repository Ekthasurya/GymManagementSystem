import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  IndianRupee,
} from "lucide-react";

const TrainerDetails = ({
  trainer,
}) => {
  return (
    <div className="space-y-6">

      {/* Profile */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <UserCircle
            size={85}
            className="text-slate-300"
          />

          <div className="flex-1">

            <h2 className="text-2xl font-bold text-slate-900">
              {trainer.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {trainer.specialization}
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                trainer.status ===
                "active"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {trainer.status}
            </span>

          </div>

        </div>

      </div>


      {/* Information */}
      <div className="grid gap-5 md:grid-cols-2">

        <Info
          icon={Mail}
          label="Email"
          value={trainer.email}
        />

        <Info
          icon={Phone}
          label="Phone"
          value={trainer.phone}
        />

        <Info
          icon={Award}
          label="Qualification"
          value={trainer.qualification}
        />

        <Info
          icon={Calendar}
          label="Experience"
          value={
            trainer.experience
              ? `${trainer.experience} years`
              : "—"
          }
        />

        <Info
          icon={IndianRupee}
          label="Salary"
          value={
            trainer.salary
              ? `₹${trainer.salary}`
              : "—"
          }
        />

        <Info
          icon={MapPin}
          label="Address"
          value={trainer.address}
        />

      </div>

    </div>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>

        <div>

          <p className="text-xs font-medium uppercase text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-sm font-medium text-slate-800">
            {value || "—"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default TrainerDetails;