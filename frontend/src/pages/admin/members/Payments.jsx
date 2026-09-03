import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Eye,
  Receipt,
  RefreshCw,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

import PaymentStatus from "../../components/payments/PaymentStatus";
import PaymentReceipt from "../../components/payments/PaymentReceipt";

import usePayments from "../../hooks/usePayments";


const Payments = () => {
  // ========================================
  // PAYMENTS
  // ========================================

  const {
    payments = [],
    loading,
    error,
    fetchPayments,
  } = usePayments({
    type: "member",
  });


  // ========================================
  // STATE
  // ========================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showReceipt, setShowReceipt] =
    useState(false);


  // ========================================
  // FETCH PAYMENTS
  // ========================================

  useEffect(() => {
    fetchPayments();
  }, []);


  // ========================================
  // FILTER PAYMENTS
  // ========================================

  const filteredPayments = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();


    return payments.filter((payment) => {

      const matchesSearch =
        !searchValue ||
        payment.receiptNumber
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.transactionId
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.membership?.name
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.membership?.planName
          ?.toLowerCase()
          .includes(searchValue);


      const matchesStatus =
        !status ||
        payment.status === status;


      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    payments,
    search,
    status,
  ]);


  // ========================================
  // TOTAL PAID
  // ========================================

  const totalPaid = useMemo(() => {

    return payments
      .filter(
        (payment) =>
          payment.status === "paid"
      )
      .reduce(
        (total, payment) =>
          total +
          Number(payment.amount || 0),
        0
      );

  }, [payments]);


  // ========================================
  // PAID COUNT
  // ========================================

  const paidCount =
    payments.filter(
      (payment) =>
        payment.status === "paid"
    ).length;


  // ========================================
  // PENDING COUNT
  // ========================================

  const pendingCount =
    payments.filter(
      (payment) =>
        payment.status === "pending"
    ).length;


  // ========================================
  // VIEW DETAILS
  // ========================================

  const handleView = (payment) => {

    setSelectedPayment(payment);

    setShowDetails(true);

    setShowReceipt(false);

  };


  // ========================================
  // VIEW RECEIPT
  // ========================================

  const handleReceipt = (payment) => {

    setSelectedPayment(payment);

    setShowReceipt(true);

    setShowDetails(false);

  };


  // ========================================
  // CLOSE
  // ========================================

  const closeModal = () => {

    setSelectedPayment(null);

    setShowDetails(false);

    setShowReceipt(false);

  };


  // ========================================
  // PRINT
  // ========================================

  const handlePrint = () => {

    window.print();

  };


  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            My Payments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your membership payment history and receipts.
          </p>

        </div>


        <button
          type="button"
          onClick={() => {
            fetchPayments();
          }}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >

          <RefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>

      )}


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="grid gap-5 sm:grid-cols-3">

        {/* Total Paid */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Amount Paid
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₹{totalPaid.toLocaleString("en-IN")}
          </p>

        </div>


        {/* Paid */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Successful Payments
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {paidCount}
          </p>

        </div>


        {/* Pending */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Pending Payments
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingCount}
          </p>

        </div>

      </div>


      {/* ======================================
          FILTERS
      ====================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-3">

          {/* Search */}

          <div className="relative md:col-span-2">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search receipt, transaction or membership..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400"
            />

          </div>


          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >

            <option value="">
              All Status
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="refunded">
              Refunded
            </option>

          </select>

        </div>

      </div>


      {/* ======================================
          PAYMENT LIST
      ====================================== */}

      <div>

        <div className="mb-4">

          <h2 className="text-xl font-bold text-slate-900">
            Payment History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredPayments.length} payment
            {filteredPayments.length !== 1
              ? "s"
              : ""}
          </p>

        </div>


        {loading ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-slate-400"
            />

            <p className="mt-3 text-sm text-slate-500">
              Loading payments...
            </p>

          </div>

        ) : !filteredPayments.length ? (

          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

            <Receipt
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-800">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your payment history will appear here.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Receipt
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Membership
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Method
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredPayments.map(
                    (payment) => (

                      <tr
                        key={payment._id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* Receipt */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-semibold text-slate-900">
                            {payment.receiptNumber ||
                              "—"}
                          </p>

                          {payment.transactionId && (

                            <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                              {payment.transactionId}
                            </p>

                          )}

                        </td>


                        {/* Membership */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-medium text-slate-800">
                            {payment.membership?.name ||
                              payment.membership?.planName ||
                              "Membership"}
                          </p>

                        </td>


                        {/* Amount */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-bold text-slate-900">
                            ₹
                            {Number(
                              payment.amount || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </td>


                        {/* Method */}

                        <td className="px-6 py-4">

                          <span className="text-sm capitalize text-slate-600">
                            {payment.paymentMethod
                              ?.replaceAll(
                                "_",
                                " "
                              ) ||
                              "—"}
                          </span>

                        </td>


                        {/* Date */}

                        <td className="px-6 py-4">

                          <span className="text-sm text-slate-600">
                            {payment.paymentDate
                              ? new Date(
                                  payment.paymentDate
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : "—"}
                          </span>

                        </td>


                        {/* Status */}

                        <td className="px-6 py-4">

                          <PaymentStatus
                            status={
                              payment.status
                            }
                          />

                        </td>


                        {/* Actions */}

                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleView(
                                  payment
                                )
                              }
                              title="View details"
                              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Eye size={17} />
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                handleReceipt(
                                  payment
                                )
                              }
                              title="View receipt"
                              className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Receipt
                                size={17}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>


      {/* ======================================
          DETAILS MODAL
      ====================================== */}

      {showDetails &&
        selectedPayment && (

          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">

            <div className="mx-auto my-8 max-w-3xl">

              <div className="mb-3 flex justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>

              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">

                <h2 className="text-xl font-bold text-slate-900">
                  Payment Details
                </h2>


                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-slate-400">
                      Receipt Number
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {selectedPayment.receiptNumber ||
                        "—"}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Status
                    </p>

                    <div className="mt-2">
                      <PaymentStatus
                        status={
                          selectedPayment.status
                        }
                      />
                    </div>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹
                      {Number(
                        selectedPayment.amount ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Payment Method
                    </p>

                    <p className="mt-1 capitalize text-slate-700">
                      {selectedPayment.paymentMethod
                        ?.replaceAll(
                          "_",
                          " "
                        ) || "—"}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Payment Date
                    </p>

                    <p className="mt-1 text-slate-700">
                      {selectedPayment.paymentDate
                        ? new Date(
                            selectedPayment.paymentDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "—"}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Transaction ID
                    </p>

                    <p className="mt-1 break-all text-sm text-slate-700">
                      {selectedPayment.transactionId ||
                        "—"}
                    </p>
                  </div>

                </div>


                {selectedPayment.description && (

                  <div className="mt-6">

                    <p className="text-xs text-slate-400">
                      Description
                    </p>

                    <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                      {selectedPayment.description}
                    </p>

                  </div>

                )}


                <div className="mt-6 flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      handleReceipt(
                        selectedPayment
                      )
                    }
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >

                    <Receipt size={17} />

                    View Receipt

                  </button>

                </div>

              </div>

            </div>

          </div>

        )}


      {/* ======================================
          RECEIPT MODAL
      ====================================== */}

      {showReceipt &&
        selectedPayment && (

          <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 p-4">

            <div className="mx-auto my-8 max-w-3xl">

              <div className="mb-3 flex justify-end print:hidden">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>

              </div>


              <PaymentReceipt
                payment={selectedPayment}
              />

            </div>

          </div>

        )}

    </div>
  );
};


export default Payments;