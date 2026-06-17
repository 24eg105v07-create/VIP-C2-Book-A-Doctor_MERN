import { useEffect, useState } from "react";
import { Table } from "antd";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const Appointments = () => {
  const [appointments, setAppointments] =
    useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await api.get(
        "/appointment/user-appointments"
      );

      if (data.success) {
        setAppointments(
          data.appointments
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Doctor",
      render: (_, record) =>
        record.doctorInfo?.name,
    },

    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Time",
      dataIndex: "time",
    },

    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        My Appointments
      </h2>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={appointments}
      />
    </Layout>
  );
};

export default Appointments;