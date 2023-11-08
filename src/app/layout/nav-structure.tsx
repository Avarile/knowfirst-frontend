import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import storageService from "../../api/util/storageServicve";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(props: { label: React.ReactNode; key: React.Key; route?: string; icon?: React.ReactNode; children?: MenuItem[] }): MenuItem {
  return {
    ...props,
  } as MenuItem;
}

export const nav_structure: MenuItem[] = [
  getItem({ label: "Search Company", key: "list", route: "/companies", icon: <PieChartOutlined /> }),
  getItem({ label: "Detail Info", key: "overview", route: `/companies/${storageService.getItem("CURRENT_COMPANY")}`, icon: <DesktopOutlined /> }),
  // getItem({
  //   label: "Detail",
  //   key: "detail",
  //   icon: <UserOutlined />,
  //   children: [
  //     getItem({ label: "Customer review", key: "custromer_review" }),
  //     getItem({ label: "News", key: "news" }),
  //     getItem({ label: "People", key: "people" }),
  //     getItem({ label: "Jobs", key: "jobs" }),
  //     getItem({ label: "Finance", key: "finance" }),
  //   ],
  // }),
];
