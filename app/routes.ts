import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  // Public pages
  index("pages/login/login.tsx"),

  // Protected pages
  {
    file: "pages/protected/_layout.tsx",
    children: [{ file: "pages/protected/dashboard.tsx", path: "dashboard" }],
  },
] satisfies RouteConfig;
