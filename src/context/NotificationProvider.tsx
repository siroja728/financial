"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification = { ...notification, id: Date.now().toString() };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
