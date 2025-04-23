import type { Route } from "./+types/login";
import Logo from "@/components/layout/Logo";
import LoginForm from "./components/LoginForm";
import { useTranslation } from "react-i18next";
import Loading from "@/components/layout/Loading";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/lib/http/http.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to login!" },
  ];
}

export async function clientLoader({}: Route.LoaderArgs) {
  // Simulate a protected route check
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const isAuthenticated = accessToken;
  console.log("accessToken", accessToken);

  if (isAuthenticated) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  );
}

export default function Login() {
  const { t } = useTranslation();
  return (
    <main
      className="min-h-svh bg-accent flex items-center justify-center flex-col p-6"
      suppressHydrationWarning
    >
      <div className="rounded-lg bg-background shadow-md max-w-lg">
        <div className="p-8 col-span-2 m-2 bg-primary rounded-sm">
          <a href="https://www.moussasaidi.com" target="_blank">
            <Logo className="mx-auto max-w-60 w-full" fill="white" />
          </a>
        </div>
        <div className="p-6 md:p-8 h-full" id="main_content">
          <h1 className="mb-4 font-medium">{t("login.title")}</h1>
          <p className="text-sm mb-3 text-muted-foreground">
            {t("login.subtitle")}
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
