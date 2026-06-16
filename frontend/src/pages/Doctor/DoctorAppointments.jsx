import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] =
    useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await api.get(
        "/appointment/doctor-appointments"
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

  const updateStatus = async (
    appointmentId,
    status
  ) => {
    try {
      const { data } = await api.put(
        "/appointment/update-appointment-status",
        {
          appointmentId,
          status,
        }
      );

      if (data.success) {
        message.success(data.message);
        getAppointments();
      }
    } catch (error) {
      message.error(
        "Failed to update status"
      );
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Patient",
      render: (_, record) =>
        record.userInfo?.name,
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

    {
      title: "Action",
      render: (_, record) => {
        if (record.status === "pending") {
          return (
            <>
              <Button
                type="primary"
                onClick={() =>
                  updateStatus(
                    record._id,
                    "approved"
                  )
                }
              >
                Approve
              </Button>

              <Button
                danger
                style={{
                  marginLeft: "10px",
                }}
                onClick={() =>
                  updateStatus(
                    record._id,
                    "rejected"
                  )
                }
              >
                Reject
              </Button>
            </>
          );
        }

        return record.status;
      },
    },
  ];

  return (
    <Layout>
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Doctor Appointments
      </h2>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={appointments}
      />
    </Layout>
  );
};

export default DoctorAppointments;