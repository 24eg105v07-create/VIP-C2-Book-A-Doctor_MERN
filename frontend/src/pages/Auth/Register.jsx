import {
  Form,
  Input,
  Button,
  Card,
  message,
} from "antd";

import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await api.post(
        "/auth/register",
        values
      );

      if (data.success) {
        message.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-title">
          Book A Doctor
        </div>

        <div className="auth-subtitle">
          Create Account
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Name",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Enter Email",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Enter Password",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="auth-btn"
          >
            Register
          </Button>

          <div className="auth-footer">
            Already Registered?{" "}
            <Link to="/login">
              Login Here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;