import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const RecentPayments = ({
  payments = [],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 p-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Payments
          </h2>

          <p className="text-sm text-slate-500">
            Latest membership payments
          </p>
        </div>

        <Link
          to="/admin/payments"
          className="text-sm font-semibold text-slate-900 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="divide-y divide-slate-100">

        {payments.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            No payments found.
          </p>
        ) : (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <IndianRupee size={18} />
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    {payment.member?.name ||
                      "Member"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {payment.paymentMethod ||
                      "Payment"}
                  </p>
                </div>

              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  ₹{payment.amount}
                </p>

                <p className="text-xs text-green-600">
                  {payment.status || "Paid"}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default RecentPayments;