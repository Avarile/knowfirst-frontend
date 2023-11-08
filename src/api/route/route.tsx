import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CompanyList from "../../app/content/view/company-list";
import CompanyDetail from "../../app/content/view/company-detail";
import { http } from "../state/http";
import LayoutMain from "../../app/layout";
import storageService from "../util/storageServicve";
import Login from "../../app/content/view/login";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      meta: "Login",
      element: <Login />,
      loader: async () => {
        const current_user = storageService.getItem("CURRENT_USER");
        return current_user ? { current_user } : null;
      },
    },
    {
      path: "/",
      meta: "Search",
      require_auth: true,
      element: <LayoutMain />,
      errorElement: <div>Oops something is wrong: 404</div>,
      children: [
        {
          path: "companies",
          meta: "Companies",
          require_auth: true,
          element: <CompanyList />,
          loader: async () => {
            return null;
          },
        },
        {
          path: "companies/:id",
          meta: "Company",
          require_auth: true,
          element: <CompanyDetail />,
          loader: async () => {
            return null;
          },
        },
      ],
    },
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default AppRoutes;
