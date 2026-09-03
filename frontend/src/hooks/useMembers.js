import { useCallback, useEffect, useState } from "react";

import {
  getMembers,
  deleteMember,
} from "../services/memberService";

const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMembers();

      setMembers(
        response.data || response
      );
    } catch (error) {
      console.error(
        "Fetch members error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch members"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const removeMember = async (id) => {
    await deleteMember(id);

    setMembers((prev) =>
      prev.filter(
        (member) => member._id !== id
      )
    );
  };

  return {
    members,
    loading,
    error,
    fetchMembers,
    removeMember,
  };
};

export default useMembers;