import { Search, RotateCcw } from "lucide-react";

const AttendanceFilters = ({
  search,
  setSearch,
  date,
  setDate,
  status,
  setStatus,
  onReset,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">

        {/* Search */}
        <div className="relative md:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
          />
        </div>


        {/* Date */}
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
          />
        </div>


        {/* Status */}
        <div>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >
            <option value="">
              All Status
            </option>

            <option value="checked-in">
              Checked In
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>

      </div>


      {/* Reset */}
      <div className="mt-4 flex justify-end">

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>

      </div>
    </div>
  );
};

export default AttendanceFilters;