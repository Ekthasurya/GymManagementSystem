import { useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";

import {
  getAttendanceQR,
} from "../../services/attendanceService";

const QRGenerator = () => {
  const [qrData, setQrData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  const fetchQR = async () => {
    try {
      setLoading(true);

      const response =
        await getAttendanceQR();

      setQrData(
        response.data || response
      );

    } catch (error) {
      console.error(
        "QR loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchQR();
  }, []);


  const downloadQR = () => {
    const canvas =
      document.querySelector(
        "#gym-attendance-qr"
      );

    if (!canvas) return;

    const link =
      document.createElement("a");

    link.download =
      "gym-attendance-qr.png";

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  };


  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        Loading QR...
      </div>
    );
  }


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

      <h2 className="text-xl font-bold text-slate-900">
        Gym Attendance QR
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Members can scan this QR code to mark attendance.
      </p>


      <div className="mx-auto mt-8 flex w-fit rounded-2xl border bg-white p-5">

        {/* QR will be added here */}
        <div
          id="gym-attendance-qr"
          className="flex h-64 w-64 items-center justify-center"
        >
          <p className="text-sm text-slate-400">
            QR Code
          </p>
        </div>

      </div>


      <div className="mt-6 flex justify-center gap-3">

        <button
          onClick={fetchQR}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

        <button
          onClick={downloadQR}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <Download size={17} />
          Download
        </button>

      </div>

    </div>
  );
};

export default QRGenerator;