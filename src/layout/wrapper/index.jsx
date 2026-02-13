import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

const Wrapper = () => {
  return (
    <Layout className="flex h-screen">
      <Sidebar />
      <Layout>
        <Header />
        <Content className="bg-[#eeeeee] p-4 mt-6 mb-0 ml-4 mr-4 border border-[#eeeeee] rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Wrapper;
