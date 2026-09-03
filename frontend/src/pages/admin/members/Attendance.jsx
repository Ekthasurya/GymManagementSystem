import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import QRScanner from "../../components/attendance/QRScanner";
import AttendanceTable from "../../components/attendance/AttendanceTable";

import {
  getMyAttendance,
} from "../../services/attendanceService";

const Attendance = () => {

  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchAttendance = async () => {

    try {

      setLoading(true);

      const response =
        await getMyAttendance();

      setAttendance(
        response.data ||
          response
      );

    } catch (error) {

      toast.error(
        "Failed to load attendance"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchAttendance();
  }, []);


  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          My Attendance
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Scan the gym QR code to mark your attendance.
        </p>

      </div>


      {/* Scanner */}

      <QRScanner />


      {/* Attendance History */}

      <section className="space-y-4">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Attendance History
          </h2>

        </div>


        {loading ? (

          <div className="rounded-2xl bg-white p-10 text-center">
            Loading attendance...
          </div>

        ) : (

          <AttendanceTable
            attendance={attendance}
          />

        )}

      </section>

    </div>
  );
};

export default Attendance;