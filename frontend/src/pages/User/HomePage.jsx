import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const HomePage = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    appointments: 0,
    notifications: 0,
  });

  const getDashboardData = async () => {
    try {
      const doctorsRes = await api.get(
        "/doctor/get-all-doctors"
      );

      const appointmentsRes =
        await api.get(
          "/appointment/user-appointments"
        );

      const notificationsRes =
        await api.get(
          "/auth/notifications"
        );

      setStats({
        doctors:
          doctorsRes.data.doctors?.length || 0,

        appointments:
          appointmentsRes.data.appointments
            ?.length || 0,

        notifications:
          notificationsRes.data.notifications
            ?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <Layout>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Doctors</h2>
          <h1>{stats.doctors}</h1>
        </div>

        <div className="dashboard-card">
          <h2>Appointments</h2>
          <h1>{stats.appointments}</h1>
        </div>

        <div className="dashboard-card">
          <h2>Notifications</h2>
          <h1>{stats.notifications}</h1>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;