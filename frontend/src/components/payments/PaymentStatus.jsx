const PaymentStatus = ({ status }) => {
  const statusConfig = {
    paid: {
      label: "Paid",
      className:
        "bg-green-50 text-green-700 border-green-200",
    },

    pending: {
      label: "Pending",
      className:
        "bg-yellow-50 text-yellow-700 border-yellow-200",
    },

    failed: {
      label: "Failed",
      className:
        "bg-red-50 text-red-700 border-red-200",
    },

    refunded: {
      label: "Refunded",
      className:
        "bg-purple-50 text-purple-700 border-purple-200",
    },
  };


  const config =
    statusConfig[status?.toLowerCase()] || {
      label: status || "Unknown",
      className:
        "bg-slate-50 text-slate-600 border-slate-200",
    };


  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};


export default PaymentStatus;