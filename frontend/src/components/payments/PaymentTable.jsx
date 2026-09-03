import { Eye, Pencil, Trash2 } from "lucide-react";

import PaymentStatus from "./PaymentStatus";


const PaymentTable = ({
  payments = [],
  onView,
  onEdit,
  onDelete,
  showActions = true,
}) => {

  // ========================================
  // EMPTY STATE
  // ========================================

  if (!payments.length) {

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <p className="font-semibold text-slate-800">
          No payments found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Payment records will appear here.
        </p>

      </div>
    );

  }


  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          {/* ==================================
              HEADER
          ================================== */}

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Receipt
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Member
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

              {showActions && (
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}

            </tr>

          </thead>


          {/* ==================================
              BODY
          ================================== */}

          <tbody className="divide-y divide-slate-100">

            {payments.map((payment) => (

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
                    <p className="mt-1 text-xs text-slate-400">
                      TXN: {payment.transactionId}
                    </p>
                  )}

                </td>


                {/* Member */}

                <td className="px-6 py-4">

                  <p className="text-sm font-semibold text-slate-900">
                    {payment.member?.name ||
                      "Unknown Member"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {payment.member?.email ||
                      ""}
                  </p>

                </td>


                {/* Membership */}

                <td className="px-6 py-4">

                  <p className="text-sm text-slate-700">
                    {payment.membership?.name ||
                      payment.membership?.planName ||
                      "—"}
                  </p>

                </td>


                {/* Amount */}

                <td className="px-6 py-4">

                  <p className="text-sm font-bold text-slate-900">
                    ₹
                    {Number(
                      payment.amount || 0
                    ).toLocaleString("en-IN")}
                  </p>

                </td>


                {/* Payment Method */}

                <td className="px-6 py-4">

                  <span className="text-sm capitalize text-slate-600">
                    {payment.paymentMethod
                      ?.replace("_", " ") ||
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

                {showActions && (

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      {/* View */}

                      {onView && (
                        <button
                          type="button"
                          onClick={() =>
                            onView(payment)
                          }
                          title="View payment"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={17} />
                        </button>
                      )}


                      {/* Edit */}

                      {onEdit && (
                        <button
                          type="button"
                          onClick={() =>
                            onEdit(payment)
                          }
                          title="Edit payment"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>
                      )}


                      {/* Delete */}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            onDelete(payment)
                          }
                          title="Delete payment"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}

                    </div>

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};


export default PaymentTable;