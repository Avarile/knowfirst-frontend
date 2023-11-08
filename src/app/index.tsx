import { Outlet } from "react-router-dom";
import { useTabNavigation } from "../api/state/useTabNavigation";
import LayoutMain from "./layout";

const Main = () => {
  return (
    <div>
      <LayoutMain />
    </div>
  );
};

export default Main;
