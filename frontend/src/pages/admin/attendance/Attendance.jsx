import { useMemo, useState } from "react";

import QRGenerator from "../../../components/attendance/QRGenerator";
import AttendanceTable from "../../../components/attendance/AttendanceTable";
import AttendanceCard from "../../../components/attendance/AttendanceCard";
import AttendanceFilters from "../../../components/attendance/AttendanceFilters";

import useAttendance from "../../../hooks/useAttendance";

const Attendance = () => {

  const {
    attendance,
    loading,
    error,
    fetchAttendance,
  } = useAttendance({
    type: "today",
  });


  const [search, setSearch] =
    useState("");

  const [date, setDate] =
    useState("");

  const [status, setStatus] =
    useState("");


  const handleFilter = async () => {

    await fetchAttendance({
      search,
      date,
      status,
    });

  };


  const handleReset = async () => {

    setSearch("");
    setDate("");
    setStatus("");

    await fetchAttendance();

  };


  const filteredAttendance =
    useMemo(() => {

      let result = [...attendance];


      if (search.trim()) {

        const searchValue =
          search.toLowerCase();


        result = result.filter(
          (item) =>
            item.member?.name
              ?.toLowerCase()
              .includes(searchValue) ||
            item.member?.email
              ?.toLowerCase()
              .includes(searchValue)
        );

      }


      if (status === "checked-in") {

        result = result.filter(
          (item) => !item.timeOut
        );

      }


      if (status === "completed") {

        result = result.filter(
          (item) => item.timeOut
        );

      }


      return result;

    }, [
      attendance,
      search,
      status,
    ]);


  const checkedIn =
    filteredAttendance.filter(
      (item) => !item.timeOut
    ).length;


  const completed =
    filteredAttendance.filter(
      (item) => item.timeOut
    ).length;


  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }


  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Attendance Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage gym attendance and QR-based check-ins.
        </p>
      </div>


      {/* QR Generator */}

      <QRGenerator />


      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <AttendanceCard
          title="Today's Attendance"
          value={filteredAttendance.length}
          description="Total attendance records"
        />

        <AttendanceCard
          title="Currently Inside"
          value={checkedIn}
          description="Members who haven't checked out"
        />

        <AttendanceCard
          title="Completed"
          value={completed}
          description="Members who checked out"
        />

      </div>


      {/* Filters */}

      <AttendanceFilters
        search={search}
        setSearch={setSearch}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        onReset={handleReset}
      />


      {/* Attendance */}

      <section className="space-y-4">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Attendance Records
          </h2>

          <p className="text-sm text-slate-500">
            View and filter attendance records.
          </p>
        </div>


        {loading ? (

          <div className="rounded-2xl bg-white p-10 text-center">
            Loading attendance...
          </div>

        ) : (

          <AttendanceTable
            attendance={filteredAttendance}
          />

        )}

      </section>

    </div>
  );
};

export default Attendance;