import React, { useEffect, useState } from "react";
import { getMyAttendance } from "../../services/attendanceService";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getMyAttendance();
        setAttendance(data?.attendance || data || []);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <div className="p-6">Loading attendance...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

      {attendance.length === 0 ? (
        <p className="text-gray-500">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time In</th>
                <th className="p-4 text-left">Time Out</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4">
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    {item.timeIn || "-"}
                  </td>

                  <td className="p-4">
                    {item.timeOut || "-"}
                  </td>

                  <td className="p-4">
                    {item.status || "Present"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;