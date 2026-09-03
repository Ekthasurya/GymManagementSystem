const MembershipStatus = ({
  startDate,
  endDate,
  status,
}) => {
  const today = new Date();

  const expiry = endDate
    ? new Date(endDate)
    : null;


  let currentStatus = status;


  if (
    expiry &&
    expiry < today
  ) {
    currentStatus = "expired";
  }


  if (
    expiry &&
    expiry >= today &&
    status !== "inactive"
  ) {
    currentStatus = "active";
  }


  const styles = {
    active:
      "bg-green-50 text-green-600",

    expired:
      "bg-red-50 text-red-600",

    inactive:
      "bg-slate-100 text-slate-600",

    pending:
      "bg-yellow-50 text-yellow-600",
  };


  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[currentStatus] ||
        styles.inactive
      }`}
    >
      {currentStatus || "inactive"}
    </span>
  );
};

export default MembershipStatus;