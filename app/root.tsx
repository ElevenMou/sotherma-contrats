import { isRouteErrorResponse, Outlet, useLocation } from "react-router";
import "./app.css";
import { initializeI18next } from "./lib/localization/i18n";
import { locales } from "./locales";
import type { Route } from "./+types/root";
import { useTranslation } from "react-i18next";
import { routes } from "@/lib/router/routes";
import { logout } from "./usecases/auth/authUsecase";

initializeI18next({ resources: locales });

export * from "@lib/router/Layout";

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();

  let message = "Oops!";
  let details = t("errors.unexpected");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    details = error.statusText || details;

    if (error.status === 401) {
      if (pathname === routes.login) {
        window.location.replace(routes.requests);
      } else {
        window.location.replace(
          `${routes.login}?callbackUrl=${pathname}${search}`
        );
        logout();
      }

      return null;
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
    <main className="p-6 container mx-auto bg-accent min-h-svh min-w-svw flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-4 bg-background rounded-lg shadow-md max-w-lg p-6">
        <h1 className="mb-4">{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
