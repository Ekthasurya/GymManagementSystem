import { useEffect, useState } from "react";
import { ArrowLeft, Receipt, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PaymentDetailsCard from "../../../components/payments/PaymentDetails";
import PaymentReceipt from "../../../components/payments/PaymentReceipt";

import {
  getPaymentById,
} from "../../../services/paymentService";


const PaymentDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  // ========================================
  // STATE
  // ========================================

  const [payment, setPayment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showReceipt, setShowReceipt] =
    useState(false);


  // ========================================
  // FETCH PAYMENT
  // ========================================

  useEffect(() => {

    const fetchPayment = async () => {

      try {

        setLoading(true);

        const response =
          await getPaymentById(id);


        const paymentData =
          response?.data ??
          response;


        setPayment(
          paymentData?.payment ??
          paymentData
        );

      } catch (error) {

        console.error(
          "Get payment details error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load payment"
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {
      fetchPayment();
    }

  }, [id]);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <RefreshCw
            size={30}
            className="mx-auto animate-spin text-slate-400"
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading payment details...
          </p>

        </div>

      </div>
    );

  }


  // ========================================
  // NOT FOUND
  // ========================================

  if (!payment) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <h2 className="text-xl font-bold text-slate-900">
            Payment Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The payment you're looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/payments")
            }
            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Payments
          </button>

        </div>

      </div>
    );

  }


  return (
    <div className="space-y-6">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/payments")
            }
            className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >

            <ArrowLeft size={17} />

            Back to Payments

          </button>


          <h1 className="text-3xl font-bold text-slate-900">
            Payment Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View payment and transaction information.
          </p>

        </div>


        {/* Receipt */}

        <button
          type="button"
          onClick={() =>
            setShowReceipt(true)
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >

          <Receipt size={18} />

          View Receipt

        </button>

      </div>


      {/* ==================================
          PAYMENT DETAILS
      ================================== */}

      <PaymentDetailsCard
        payment={payment}
      />


      {/* ==================================
          RECEIPT
      ================================== */}

      {showReceipt && (

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-8">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Payment Receipt
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Printable payment receipt.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                setShowReceipt(false)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>

          </div>


          <PaymentReceipt
            payment={payment}
          />

        </div>

      )}

    </div>
  );
};


export default PaymentDetails;