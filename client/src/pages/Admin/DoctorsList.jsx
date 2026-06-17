import { useEffect, useState } from "react";
import { Table, Button, message } from "antd";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const { data } = await api.get(
        "/admin/get-all-doctors"
      );

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      const { data } = await api.put(
        `/admin/approve-doctor/${doctorId}`
      );

      if (data.success) {
        message.success(data.message);
        getDoctors();
      }
    } catch (error) {
      message.error("Approval Failed");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      render: (_, record) =>
        `${record.firstName} ${record.lastName}`,
    },

    {
      title: "Specialization",
      dataIndex: "specialization",
    },

    {
      title: "Experience",
      dataIndex: "experience",
    },

    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      render: (_, record) =>
        record.status === "pending" ? (
          <Button
            type="primary"
            onClick={() =>
              approveDoctor(record._id)
            }
          >
            Approve
          </Button>
        ) : (
          <span>Approved</span>
        ),
    },
  ];

  return (
    <Layout>
      <h2>Doctor Requests</h2>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={doctors}
      />
    </Layout>
  );
};

export default DoctorsList;