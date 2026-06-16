import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import { loginSuccess } from "../../redux/features/authSlice";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const { data } = await api.post(
        "/auth/login",
        values
      );

      if (data.success) {
        dispatch(
          loginSuccess({
            user: data.user,
            token: data.token,
          })
        );

        message.success(data.message);
        navigate("/");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} className="text-center">
          🩺 Book A Doctor
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Sign in to continue
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Email Address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            Login
          </Button>

          <div className="login-footer">
            <span>Don't have an account?</span>
            <Link to="/register"> Register</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;