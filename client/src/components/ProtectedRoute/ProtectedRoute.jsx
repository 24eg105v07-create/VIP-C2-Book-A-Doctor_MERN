import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import api from "../../services/api";
import { setUser } from "../../redux/features/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(true);

  const token = localStorage.getItem(
    "token"
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await api.get(
          "/auth/current-user"
        );

        if (data.success) {
          dispatch(setUser(data.user));
        }
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, token]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;