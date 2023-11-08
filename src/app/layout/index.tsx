import React, { ReactNode, useMemo, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { nav_structure } from "./nav-structure";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import storageService from "../../api/util/storageServicve";

const { Header, Content, Footer, Sider } = Layout;

const LayoutMain = () => {
  const params = useParams();
  console.log("params", params);
  if (params?.id) {
    console.log("trigger");
  }

  const [collapsed, setCollapsed] = useState(false);
  const current_selected_company = useMemo(() => {
    return storageService.getItem("CURRENT_COMPANY");
  }, []);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["main"]}
          mode="inline"
          items={nav_structure}
          onSelect={(e) => {
            // @ts-ignore
            navigate(e.item?.props.route);
          }}
          selectedKeys={params?.id ? ["overview"] : ["list"]}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{<Outlet />}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Empire Intelligence Created 2023</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
