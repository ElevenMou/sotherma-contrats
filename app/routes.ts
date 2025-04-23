import { type RouteConfig, index } from "@react-router/dev/routes";
import { routes } from "./lib/router/routes";

export default [
  // Public pages
  index("pages/login/login.tsx"),

  // Protected pages
  {
    file: "pages/protected/_layout.tsx",
    children: [
      { file: "pages/protected/requests/requests.tsx", path: routes.requests },
      // { file: "pages/protected/employees/employees.tsx", path: "employees" },
      {
        file: "pages/protected/contracts/contracts.tsx",
        path: routes.contracts,
      },
      // {
      //   file: "pages/protected/departments/departments.tsx",
      //   path: "departments",
      // },
    ],
  },
] satisfies RouteConfig;
