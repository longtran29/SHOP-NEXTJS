import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserTag } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { BiSolidCategory, BiSolidReport } from "react-icons/bi";
import { TbBrandEnvato } from "react-icons/tb";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";

import {
  BarChartOutlined,
  ContainerOutlined,
  FileImageOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagsOutlined,
  TeamOutlined,
  UploadOutlined
} from "@ant-design/icons";


const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = {
    "/admin/dashboard": "1",
    "/admin/products": "2",
    "/admin/users": "3",
    "/admin/categories": "4",
    "/admin/brands": "5",
    "/admin/orders": "6",
    "/admin/blogs": "7",
    "/admin/report": "8",
  };
  
    const router = useRouter();
  
    const {pathname} = useRouter();

  
  const [current, setCurrent] = useState([menuItems[pathname]]);


  function getItem(label, key, icon, pathroute) {
    return {
      key,
      icon,
      pathroute,
      label,
    };
  }

  
const countStyle = {
  right: 24,
};
  
  const items = [
    getItem("Dashboard", "1", <AiFillDashboard />, "/admin/dashboard"),
    getItem("Products", "2", <HiTemplate />, "/admin/products"),
    getItem("User", "3", <FaUserTag />, "/admin/users"),
    getItem("Category", "4", <BiSolidCategory />, "/admin/categories"),
    getItem("Brands", "5", <TbBrandEnvato />, "/admin/brands"),
    getItem("Order", "6", <TbBrandEnvato />, "/admin/orders"),
    getItem("Blogs", "7", <BsFillPostcardHeartFill />, "/admin/blogs"),
    getItem("Thống kê", "8", <BiSolidReport />, "/admin/report"),
  ];

  const handleClick = ({ item, key }) => {
    setCurrent(key);
    router.push(item.props.pathroute);
  };
  
  return (

    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuItems[pathname]]}
          selectedKeys={[menuItems[pathname]]}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
