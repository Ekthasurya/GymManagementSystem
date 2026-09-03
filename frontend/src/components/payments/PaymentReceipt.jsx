import {
  CheckCircle2,
  Printer,
} from "lucide-react";

const PaymentReceipt = ({
  payment,
}) => {

  if (!payment) {
    return null;
  }


  const member =
    payment.member || {};

  const membership =
    payment.membership || {};


  const formatDate = (date) => {

    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  const formatAmount = (amount) => {

    return Number(
      amount || 0
    ).toLocaleString("en-IN");

  };


  const handlePrint = () => {

    window.print();

  };


  return (
    <div className="mx-auto max-w-2xl">

      {/* Print Button */}

      <div className="mb-5 flex justify-end print:hidden">

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Printer size={17} />

          Print Receipt
        </button>

      </div>


      {/* Receipt */}

      <div
        id="payment-receipt"
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none"
      >

        {/* Header */}

        <div className="border-b border-slate-200 pb-6 text-center">

          <h1 className="text-2xl font-bold text-slate-900">
            GYM MANAGEMENT SYSTEM
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Payment Receipt
          </p>

        </div>


        {/* Success */}

        <div className="flex flex-col items-center py-8 text-center">

          <CheckCircle2
            size={48}
            className="text-green-500"
          />

          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Payment Successful
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Thank you for your payment.
          </p>

        </div>


        {/* Receipt Info */}

        <div className="grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-2">

          <div>

            <p className="text-xs text-slate-400">
              Receipt Number
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {payment.receiptNumber ||
                "—"}
            </p>

          </div>


          <div className="sm:text-right">

            <p className="text-xs text-slate-400">
              Payment Date
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatDate(
                payment.paymentDate
              )}
            </p>

          </div>

        </div>


        {/* Member */}

        <div className="py-6">

          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
            Member Details
          </h3>

          <div className="space-y-2">

            <div className="flex justify-between gap-5">

              <span className="text-sm text-slate-500">
                Name
              </span>

              <span className="text-right text-sm font-semibold text-slate-900">
                {member.name ||
                  "Unknown Member"}
              </span>

            </div>


            <div className="flex justify-between gap-5">

              <span className="text-sm text-slate-500">
                Email
              </span>

              <span className="text-right text-sm text-slate-700">
                {member.email || "—"}
              </span>

            </div>


            <div className="flex justify-between gap-5">

              <span className="text-sm text-slate-500">
                Phone
              </span>

              <span className="text-right text-sm text-slate-700">
                {member.phone || "—"}
              </span>

            </div>

          </div>

        </div>


        {/* Payment */}

        <div className="border-t border-slate-200 py-6">

          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
            Payment Details
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between gap-5">

              <span className="text-sm text-slate-500">
                Membership
              </span>

              <span className="text-right text-sm font-semibold text-slate-900">
                {membership.name ||
                  membership.planName ||
                  "—"}
              </span>

            </div>


            <div className="flex justify-between gap-5">

              <span className="text-sm text-slate-500">
                Payment Method
              </span>

              <span className="text-right text-sm capitalize text-slate-700">
                {payment.paymentMethod
                  ?.replaceAll("_", " ") ||
                  "—"}
              </span>

            </div>


            {payment.transactionId && (

              <div className="flex justify-between gap-5">

                <span className="text-sm text-slate-500">
                  Transaction ID
                </span>

                <span className="max-w-[250px] break-all text-right text-sm text-slate-700">
                  {payment.transactionId}
                </span>

              </div>

            )}

          </div>

        </div>


        {/* Total */}

        <div className="border-t-2 border-slate-900 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-lg font-bold text-slate-900">
              Total Paid
            </span>

            <span className="text-2xl font-bold text-slate-900">
              ₹{formatAmount(
                payment.amount
              )}
            </span>

          </div>

        </div>


        {/* Footer */}

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">

          <p className="text-xs text-slate-400">
            This is a computer-generated receipt.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Thank you for choosing our gym.
          </p>

        </div>

      </div>

    </div>
  );
};

export default PaymentReceipt;