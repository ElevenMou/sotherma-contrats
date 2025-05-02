import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "../../+types/root";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  async function deferRender() {
    if (import.meta.env.VITE_ENABLE_BACKEND_MOCK === "true") {
      const { worker } = await import("@/mocks/browser");
      return worker.start({
        serviceWorker: {
          url: `${import.meta.env.VITE_PUBLIC_HOST}/mockServiceWorker.js`,
        },
        onUnhandledRequest: "warn",
      });
    }
    return Promise.resolve();
  }

  useEffect(() => {
    deferRender();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
