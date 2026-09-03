import { useEffect, useRef, useState } from "react";

import { Html5QrcodeScanner } from "html5-qrcode";

import toast from "react-hot-toast";

import {
  scanAttendance,
} from "../../services/attendanceService";

const QRScanner = () => {
  const scannerRef =
    useRef(null);

  const [processing, setProcessing] =
    useState(false);


  useEffect(() => {

    if (scannerRef.current) {
      return;
    }


    const scanner =
      new Html5QrcodeScanner(
        "attendance-qr-reader",
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        false
      );


    scanner.render(
      async (decodedText) => {

        if (processing) return;

        try {

          setProcessing(true);


          const response =
            await scanAttendance({
              qrToken: decodedText,
            });


          const result =
            response.data || response;


          if (result.action === "time-in") {

            toast.success(
              `Time-In recorded at ${result.timeIn}`
            );

          } else if (
            result.action === "time-out"
          ) {

            toast.success(
              `Time-Out recorded at ${result.timeOut}`
            );

          } else {

            toast.success(
              result.message ||
                "Attendance recorded"
            );

          }

        } catch (error) {

          toast.error(
            error.response?.data?.message ||
              "Attendance scan failed"
          );

        } finally {

          setTimeout(() => {
            setProcessing(false);
          }, 3000);

        }

      },
      (errorMessage) => {
        // QR scanner continuously reports
        // unsuccessful frames. Don't show toast.
      }
    );


    scannerRef.current = scanner;


    return () => {

      scanner.clear().catch(
        () => {}
      );

      scannerRef.current = null;

    };

  }, [processing]);


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-900">
        Scan Attendance QR
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Scan the gym QR code to mark Time-In or Time-Out.
      </p>


      <div
        id="attendance-qr-reader"
        className="mt-6"
      />

    </div>
  );
};

export default QRScanner;