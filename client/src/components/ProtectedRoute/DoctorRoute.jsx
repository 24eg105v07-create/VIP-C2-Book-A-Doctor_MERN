import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorRoute = ({ children }) => {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "doctor") {
    return <Navigate to="/" />;
  }

  return children;
};

export default DoctorRoute;