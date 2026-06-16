import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";

import Layout from "../../components/Layout/Layout";
import api from "../../services/api";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  const getNotifications = async () => {
    try {
      const { data } = await api.get(
        "/auth/notifications"
      );

      if (data.success) {
        setNotifications(
          data.notifications
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    try {
      const { data } = await api.post(
        "/auth/mark-all-notifications"
      );

      if (data.success) {
        message.success(data.message);
        getNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Notifications</h2>

        <Button
          type="primary"
          onClick={markAllRead}
        >
          Mark All Read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <Card>
          No Notifications
        </Card>
      ) : (
        notifications.map(
          (notification, index) => (
            <Card
              key={index}
              style={{
                marginBottom: "15px",
              }}
            >
              <h3>
                {notification.type}
              </h3>

              <p>
                {notification.message}
              </p>
            </Card>
          )
        )
      )}
    </Layout>
  );
};

export default Notifications;