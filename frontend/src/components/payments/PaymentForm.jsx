import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

import {
  createPayment,
  updatePayment,
} from "../../services/paymentService";

const PaymentForm = ({
  payment = null,
  members = [],
  memberships = [],
  onSuccess,
  onCancel,
}) => {
  const isEdit = Boolean(payment);

  const [formData, setFormData] = useState({
    member: "",
    membership: "",
    amount: "",
    paymentMethod: "cash",
    transactionId: "",
    paymentDate: new Date()
      .toISOString()
      .split("T")[0],
    status: "paid",
    description: "",
  });

  const [loading, setLoading] =
    useState(false);


  // ========================================
  // LOAD PAYMENT DATA FOR EDIT
  // ========================================

  useEffect(() => {

    if (payment) {

      setFormData({
        member:
          payment.member?._id ||
          payment.member ||
          "",

        membership:
          payment.membership?._id ||
          payment.membership ||
          "",

        amount:
          payment.amount || "",

        paymentMethod:
          payment.paymentMethod ||
          "cash",

        transactionId:
          payment.transactionId ||
          "",

        paymentDate:
          payment.paymentDate
            ? new Date(
                payment.paymentDate
              )
                .toISOString()
                .split("T")[0]
            : new Date()
                .toISOString()
                .split("T")[0],

        status:
          payment.status ||
          "paid",

        description:
          payment.description ||
          "",
      });

    }

  }, [payment]);


  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.member) {

      toast.error(
        "Please select a member"
      );

      return;

    }


    if (!formData.amount) {

      toast.error(
        "Please enter payment amount"
      );

      return;

    }


    try {

      setLoading(true);


      const payload = {
        ...formData,

        amount: Number(
          formData.amount
        ),
      };


      let response;


      if (isEdit) {

        response =
          await updatePayment(
            payment._id,
            payload
          );

      } else {

        response =
          await createPayment(
            payload
          );

      }


      toast.success(
        response?.message ||
          (
            isEdit
              ? "Payment updated successfully"
              : "Payment recorded successfully"
          )
      );


      if (onSuccess) {
        onSuccess(
          response?.data ||
            response
        );
      }

    } catch (error) {

      console.error(
        "Payment save error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save payment"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >

      {/* ==================================
          HEADER
      ================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {isEdit
              ? "Edit Payment"
              : "Record Payment"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEdit
              ? "Update payment information."
              : "Add a new payment record."}
          </p>

        </div>


        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        )}

      </div>


      {/* ==================================
          MEMBER + MEMBERSHIP
      ================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* Member */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Member
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <select
            name="member"
            value={formData.member}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >

            <option value="">
              Select Member
            </option>

            {members.map((member) => (

              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
                {member.email
                  ? ` - ${member.email}`
                  : ""}
              </option>

            ))}

          </select>

        </div>


        {/* Membership */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Membership
          </label>

          <select
            name="membership"
            value={formData.membership}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >

            <option value="">
              Select Membership
            </option>

            {memberships.map(
              (membership) => (

                <option
                  key={membership._id}
                  value={membership._id}
                >
                  {membership.name ||
                    membership.planName}

                {membership.price
                  ? ` - ₹${membership.price}`
                  : ""}
                </option>

              )
            )}

          </select>

        </div>

      </div>


      {/* ==================================
          AMOUNT + DATE
      ================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* Amount */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Amount
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ₹
            </span>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
              className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-slate-400"
            />

          </div>

        </div>


        {/* Payment Date */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Date
          </label>

          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
          />

        </div>

      </div>


      {/* ==================================
          METHOD + STATUS
      ================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* Payment Method */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >

            <option value="cash">
              Cash
            </option>

            <option value="upi">
              UPI
            </option>

            <option value="card">
              Card
            </option>

            <option value="bank_transfer">
              Bank Transfer
            </option>

            <option value="online">
              Online
            </option>

          </select>

        </div>


        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payment Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          >

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


      {/* ==================================
          TRANSACTION ID
      ================================== */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Transaction ID
        </label>

        <input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          placeholder="Enter transaction ID (optional)"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
        />

        <p className="mt-1 text-xs text-slate-400">
          Required for UPI, card or online payments if available.
        </p>

      </div>


      {/* ==================================
          DESCRIPTION
      ================================== */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add payment notes..."
          rows="4"
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
        />

      </div>


      {/* ==================================
          BUTTONS
      ================================== */}

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}


        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading && (
            <Loader2
              size={17}
              className="animate-spin"
            />
          )}

          {loading
            ? "Saving..."
            : isEdit
              ? "Update Payment"
              : "Record Payment"}

        </button>

      </div>

    </form>
  );
};


export default PaymentForm;