import React from "react";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "/designers",
      icon: <UserOutlined />,
      label: "Designers",
    },
    {
      key: "/editor",
      icon: <EditOutlined />,
      label: "Editor",
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      className="lg:block hidden"
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={handleMenuClick}
        className="h-full"
      />
    </Sider>
  );
};

export default Sidebar;
