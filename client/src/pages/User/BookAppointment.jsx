import { useEffect, useState } from "react";

import {
  Form,
  Input,
  Button,
  Card,
  message,
  Spin,
} from "antd";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const BookAppointment = () => {
  const { doctorId } = useParams();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [doctor, setDoctor] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const getDoctor = async () => {
    try {
      const { data } = await api.get(
        `/doctor/${doctorId}`
      );

      if (data.success) {
        setDoctor(data.doctor);
      }
    } catch (error) {
      console.log(error);
      message.error(
        "Failed to load doctor details"
      );
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const { data } = await api.post(
        "/appointment/book-appointment",
        {
          doctorId,

          doctorInfo: {
            name: `Dr. ${doctor?.firstName} ${doctor?.lastName}`,
          },

          userInfo: {
            name: user?.name,
          },

          date: values.date,
          time: values.time,
        }
      );

      if (data.success) {
        message.success(data.message);
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Booking Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Card
        style={{
          marginBottom: "20px",
        }}
      >
        {doctor ? (
          <>
            <h2>
              Dr. {doctor.firstName}{" "}
              {doctor.lastName}
            </h2>

            <p>
              <strong>
                Specialization:
              </strong>{" "}
              {doctor.specialization}
            </p>

            <p>
              <strong>
                Experience:
              </strong>{" "}
              {doctor.experience}
            </p>

            <p>
              <strong>Fees:</strong> ₹
              {
                doctor.feesPerConsultation
              }
            </p>
          </>
        ) : (
          <Spin />
        )}
      </Card>

      <Card title="Book Appointment">
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message:
                  "Please select a date",
              },
            ]}
          >
            <Input placeholder="20-06-2026" />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[
              {
                required: true,
                message:
                  "Please select a time",
              },
            ]}
          >
            <Input placeholder="10:00 AM" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Book Appointment
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};

export default BookAppointment;