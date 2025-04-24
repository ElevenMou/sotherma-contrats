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
      {
        file: "pages/protected/contracts/contracts.tsx",
        path: routes.contracts,
      },
      {
        file: "pages/protected/admin/_layout.tsx",
        children: [
          {
            file: "pages/protected/admin/employees/employees.tsx",
            path: routes.employees,
          },
          {
            file: "pages/protected/admin/employee-details/employee-details.tsx",
            path: routes.employeeDetails,
          },
          {
            file: "pages/protected/admin/departments/departments.tsx",
            path: routes.departments,
          },
        ],
      },
    ],
  },
] satisfies RouteConfig;
