import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// User Pages
import HomePage from "../pages/User/HomePage";
import Doctors from "../pages/User/Doctors";
import BookAppointment from "../pages/User/BookAppointment";
import Notifications from "../pages/User/Notifications";
import Appointments from "../pages/User/Appointments";

// Doctor Pages
import ApplyDoctor from "../pages/Doctor/ApplyDoctor";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import DoctorsList from "../pages/Admin/DoctorsList";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "../components/ProtectedRoute/AdminRoute";
import DoctorRoute from "../components/ProtectedRoute/DoctorRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================= */}
      {/* Authentication Routes */}
      {/* ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ========================= */}
      {/* User Routes */}
      {/* ========================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book-appointment/:doctorId"
        element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply-doctor"
        element={
          <ProtectedRoute>
            <ApplyDoctor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* Doctor Routes */}
      {/* ========================= */}

      <Route
        path="/doctor"
        element={
         <DoctorRoute>
  <DoctorDashboard />
</DoctorRoute>
        }
      />

      <Route
        path="/doctor/appointments"
        element={
         <DoctorRoute>
  <DoctorAppointments />
</DoctorRoute>
        }
      />

      {/* ========================= */}
      {/* Admin Routes */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={
         <AdminRoute>
  <AdminDashboard />
</AdminRoute>
        }
      />

      <Route
        path="/admin/doctors"
        element={
          <AdminRoute>
  <DoctorsList />
</AdminRoute>
        }
      />

      {/* ========================= */}
      {/* Fallback Route */}
      {/* ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
};

export default AppRoutes;