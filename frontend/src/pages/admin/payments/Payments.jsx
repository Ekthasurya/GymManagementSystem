import { useEffect, useState } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import PaymentTable from "../../../components/payments/PaymentTable";
import PaymentForm from "../../../components/payments/PaymentForm";
import PaymentDetails from "../../../components/payments/PaymentDetails";
import PaymentReceipt from "../../../components/payments/PaymentReceipt";

import usePayments from "../../../hooks/usePayments";

import {
  deletePayment,
} from "../../../services/paymentService";

import {
  getAllMembers,
} from "../../../services/memberService";

import {
  getMembershipPlans,
} from "../../../services/membershipService";


const Payments = () => {

  // ========================================
  // PAYMENT DATA
  // ========================================

  const {
    payments,
    loading,
    error,
    fetchPayments,
  } = usePayments({
    type: "all",
  });


  // ========================================
  // MEMBERS & MEMBERSHIP PLANS
  // ========================================

  const [members, setMembers] =
    useState([]);

  const [memberships, setMemberships] =
    useState([]);

  const [dataLoading, setDataLoading] =
    useState(false);


  // ========================================
  // UI STATE
  // ========================================

  const [showForm, setShowForm] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showReceipt, setShowReceipt] =
    useState(false);


  // ========================================
  // FILTERS
  // ========================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");


  // ========================================
  // FETCH MEMBERS & MEMBERSHIPS
  // ========================================

  useEffect(() => {

    const loadData = async () => {

      try {

        setDataLoading(true);

        const [
          memberResponse,
          membershipResponse,
        ] = await Promise.all([
          getAllMembers(),
          getMembershipPlans(),
        ]);


        const memberData =
          memberResponse?.data ??
          memberResponse ??
          [];

        const membershipData =
          membershipResponse?.data ??
          membershipResponse ??
          [];


        setMembers(
          Array.isArray(memberData)
            ? memberData
            : memberData.members || []
        );


        setMemberships(
          Array.isArray(membershipData)
            ? membershipData
            : membershipData.memberships ||
              membershipData.plans ||
              []
        );

      } catch (err) {

        console.error(
          "Failed to load payment form data:",
          err
        );

        toast.error(
          "Failed to load members or memberships"
        );

      } finally {

        setDataLoading(false);

      }

    };


    loadData();

  }, []);


  // ========================================
  // FILTER PAYMENTS
  // ========================================

  const filteredPayments =
    payments.filter((payment) => {

      const searchValue =
        search.trim().toLowerCase();


      const matchesSearch =
        !searchValue ||
        payment.receiptNumber
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.transactionId
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.member?.name
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.member?.email
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


  // ========================================
  // VIEW PAYMENT
  // ========================================

  const handleView = (payment) => {

    setSelectedPayment(payment);

    setShowDetails(true);

    setShowReceipt(false);

  };


  // ========================================
  // EDIT PAYMENT
  // ========================================

  const handleEdit = (payment) => {

    setSelectedPayment(payment);

    setShowForm(true);

    setShowDetails(false);

    setShowReceipt(false);

  };


  // ========================================
  // DELETE PAYMENT
  // ========================================

  const handleDelete = async (payment) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete payment ${payment.receiptNumber || ""}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      await deletePayment(
        payment._id
      );

      toast.success(
        "Payment deleted successfully"
      );

      await fetchPayments();

    } catch (err) {

      console.error(
        "Delete payment error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to delete payment"
      );

    }

  };


  // ========================================
  // FORM SUCCESS
  // ========================================

  const handleFormSuccess = async () => {

    setShowForm(false);

    setSelectedPayment(null);

    await fetchPayments();

  };


  // ========================================
  // CLOSE MODALS
  // ========================================

  const closeAll = () => {

    setShowForm(false);

    setShowDetails(false);

    setShowReceipt(false);

    setSelectedPayment(null);

  };


  // ========================================
  // TOTAL REVENUE
  // ========================================

  const totalRevenue =
    filteredPayments
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


  const paidCount =
    filteredPayments.filter(
      (payment) =>
        payment.status === "paid"
    ).length;


  const pendingCount =
    filteredPayments.filter(
      (payment) =>
        payment.status === "pending"
    ).length;


  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Payment Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage membership payments and receipts.
          </p>

        </div>


        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => fetchPayments()}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
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


          <button
            type="button"
            onClick={() => {

              setSelectedPayment(null);

              setShowForm(true);

              setShowDetails(false);

              setShowReceipt(false);

            }}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >

            <Plus size={18} />

            Record Payment

          </button>

        </div>

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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>

        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Paid Payments
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {paidCount}
          </p>

        </div>


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
              placeholder="Search by member, receipt or transaction ID..."
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
          PAYMENT TABLE
      ====================================== */}

      <section>

        <div className="mb-4">

          <h2 className="text-xl font-bold text-slate-900">
            Payments
          </h2>

          <p className="text-sm text-slate-500">
            {filteredPayments.length} payment
            {filteredPayments.length !== 1
              ? "s"
              : ""} found
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

        ) : (

          <PaymentTable
            payments={filteredPayments}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        )}

      </section>


      {/* ======================================
          PAYMENT FORM MODAL
      ====================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">

          <div className="mx-auto my-8 max-w-3xl">

            <PaymentForm
              payment={selectedPayment}
              members={members}
              memberships={memberships}
              onSuccess={handleFormSuccess}
              onCancel={closeAll}
            />

          </div>

        </div>

      )}


      {/* ======================================
          PAYMENT DETAILS MODAL
      ====================================== */}

      {showDetails &&
        selectedPayment && (

          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">

            <div className="mx-auto my-8 max-w-3xl">

              <PaymentDetails
                payment={selectedPayment}
                onClose={closeAll}
              />

              <div className="mt-4 flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setShowReceipt(true)
                  }
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  View Receipt
                </button>

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

              <div className="mb-3 flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setShowReceipt(false)
                  }
                  className="rounded-lg bg-white p-2 text-slate-500 hover:text-slate-900"
                >
                  <X size={20} />
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