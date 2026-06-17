import {
  Form,
  Input,
  Button,
  Card,
  message,
} from "antd";

import api from "../../services/api";
import Layout from "../../components/Layout/Layout";

const ApplyDoctor = () => {
const onFinish = async (values) => {
  try {
    const reqBody = {
      ...values,
      timings: [
        values.startTime,
        values.endTime,
      ],
    };

    delete reqBody.startTime;
    delete reqBody.endTime;

    const { data } = await api.post(
      "/doctor/apply-doctor",
      reqBody
    );

    if (data.success) {
      message.success(data.message);
    }
  } catch (error) {
    message.error(
      error.response?.data?.message ||
        "Application Failed"
    );
  }
};

  return (
    <Layout>
      <Card title="Apply As Doctor">
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fees Per Consultation"
            name="feesPerConsultation"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="09:00 AM" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="05:00 PM" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
          >
            Submit Application
          </Button>
        </Form>
      </Card>
    </Layout>
  );
};

export default ApplyDoctor;