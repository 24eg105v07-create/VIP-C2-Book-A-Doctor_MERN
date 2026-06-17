import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const { data } = await api.get(
        "/doctor/get-all-doctors"
      );

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <h2>Available Doctors</h2>

      <Row gutter={[16, 16]}>
        {doctors.map((doctor) => (
          <Col key={doctor._id} span={8}>
            <Card>
              <h3>
                Dr. {doctor.firstName}{" "}
                {doctor.lastName}
              </h3>

              <p>
                {doctor.specialization}
              </p>

              <p>
                {doctor.experience}
              </p>

              <Button
                type="primary"
                onClick={() =>
                  navigate(
                    `/book-appointment/${doctor._id}`
                  )
                }
              >
                Book Appointment
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Doctors;