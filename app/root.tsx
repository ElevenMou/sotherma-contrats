import { isRouteErrorResponse, Outlet } from "react-router";
import "./app.css";
import { initializeI18next } from "./lib/localization/i18n";
import { locales } from "./locales";
import type { Route } from "./+types/root";
import { useTranslation } from "react-i18next";

initializeI18next({ resources: locales });

export * from "./lib/router/Layout";

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();

  let message = "Oops!";
  let details = t("errors.unexpected");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details;

    if (error.status === 401) {
      message = "401";
      details = t("errors.unauthorized");
      window.location.replace(`/?callbackUrl=${window.location.pathname}`);
    }
    if (error.status === 403) {
      message = "403";
      details = t("errors.forbidden");
    }

    if (error.status === 500) {
      message = "500";
      details = t("errors.server_error");
    }

    if (error.status === 404) {
      message = "404";
      details = t("errors.not_found");
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
