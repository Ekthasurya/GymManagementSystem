import {
  CalendarDays,
  CreditCard,
  FileText,
  Hash,
  User,
  Wallet,
  X,
} from "lucide-react";

import PaymentStatus from "./PaymentStatus";

const PaymentDetails = ({
  payment,
  onClose,
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
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 p-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Payment Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View complete payment information.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        )}

      </div>


      {/* Payment Summary */}

      <div className="border-b border-slate-100 p-6">

        <div className="grid gap-4 md:grid-cols-3">

          {/* Amount */}

          <div className="rounded-xl bg-slate-50 p-5">

            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <Wallet size={18} />

              <span className="text-sm">
                Amount
              </span>
            </div>

            <p className="text-2xl font-bold text-slate-900">
              ₹{formatAmount(payment.amount)}
            </p>

          </div>


          {/* Method */}

          <div className="rounded-xl bg-slate-50 p-5">

            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <CreditCard size={18} />

              <span className="text-sm">
                Payment Method
              </span>
            </div>

            <p className="text-lg font-semibold capitalize text-slate-900">
              {payment.paymentMethod
                ?.replaceAll("_", " ") || "—"}
            </p>

          </div>


          {/* Status */}

          <div className="rounded-xl bg-slate-50 p-5">

            <div className="mb-3 text-sm text-slate-500">
              Payment Status
            </div>

            <PaymentStatus
              status={payment.status}
            />

          </div>

        </div>

      </div>


      {/* Information */}

      <div className="grid gap-8 p-6 lg:grid-cols-2">

        {/* Member Information */}

        <div>

          <h3 className="mb-4 text-base font-bold text-slate-900">
            Member Information
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3">

              <User
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {member.name ||
                    "Unknown Member"}
                </p>
              </div>

            </div>


            <div className="flex items-start gap-3">

              <FileText
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {member.email || "—"}
                </p>
              </div>

            </div>


            <div className="flex items-start gap-3">

              <FileText
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {member.phone || "—"}
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Payment Information */}

        <div>

          <h3 className="mb-4 text-base font-bold text-slate-900">
            Payment Information
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3">

              <Hash
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Receipt Number
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {payment.receiptNumber ||
                    "—"}
                </p>
              </div>

            </div>


            <div className="flex items-start gap-3">

              <Hash
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Transaction ID
                </p>

                <p className="mt-1 break-all text-sm text-slate-700">
                  {payment.transactionId ||
                    "—"}
                </p>
              </div>

            </div>


            <div className="flex items-start gap-3">

              <CalendarDays
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Payment Date
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(
                    payment.paymentDate
                  )}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Membership */}

      <div className="border-t border-slate-100 p-6">

        <h3 className="mb-4 text-base font-bold text-slate-900">
          Membership
        </h3>

        <div className="rounded-xl bg-slate-50 p-5">

          <p className="text-sm font-semibold text-slate-800">
            {membership.name ||
              membership.planName ||
              "Membership"}
          </p>

          {membership.duration && (
            <p className="mt-1 text-sm text-slate-500">
              Duration: {membership.duration}
            </p>
          )}

        </div>

      </div>


      {/* Description */}

      {payment.description && (

        <div className="border-t border-slate-100 p-6">

          <h3 className="mb-3 text-base font-bold text-slate-900">
            Description
          </h3>

          <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {payment.description}
          </p>

        </div>

      )}

    </div>
  );
};

export default PaymentDetails;