import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAllPayments,
  getMemberPayments,
  getMyPayments,
} from "../services/paymentService";


const usePayments = ({
  type = "all",
  memberId = null,
  autoFetch = true,
} = {}) => {

  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  // ========================================
  // FETCH PAYMENTS
  // ========================================

  const fetchPayments = useCallback(
    async (params = {}) => {

      try {

        setLoading(true);
        setError(null);

        let response;


        // Admin - all payments
        if (type === "all") {

          response =
            await getAllPayments(params);

        }


        // Admin - member payments
        else if (
          type === "member" &&
          memberId
        ) {

          response =
            await getMemberPayments(
              memberId,
              params
            );

        }


        // Member - own payments
        else if (type === "my") {

          response =
            await getMyPayments(params);

        }


        const data =
          response?.data ??
          response ??
          [];


        // Handle different backend responses
        if (Array.isArray(data)) {

          setPayments(data);

        } else {

          setPayments(
            data.payments || []
          );

        }


        return data;

      } catch (err) {

        console.error(
          "Payment error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load payments"
        );

        setPayments([]);

      } finally {

        setLoading(false);

      }

    },
    [type, memberId]
  );


  // ========================================
  // AUTO FETCH
  // ========================================

  useEffect(() => {

    if (
      autoFetch &&
      (type !== "member" || memberId)
    ) {

      fetchPayments();

    }

  }, [
    autoFetch,
    type,
    memberId,
    fetchPayments,
  ]);


  return {
    payments,
    loading,
    error,
    fetchPayments,
    setPayments,
  };
};


export default usePayments;