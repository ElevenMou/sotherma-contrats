import type { Route } from "./+types/login";
import Logo from "@/components/layout/Logo";
import LoginForm from "./components/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to login!" },
  ];
}

export default function Login() {
  return (
    <main
      className="min-h-svh bg-accent flex items-center justify-center p-6"
      suppressHydrationWarning
    >
      <div className="max-w-3xl rounded-lg bg-background shadow-md">
        <div className="p-8 col-span-2 m-2 bg-primary rounded-sm">
          <a href="https://www.moussasaidi.com" target="_blank">
            <Logo className="mx-auto max-w-60 w-full" fill="white" />
          </a>
        </div>
        <div className="p-6 md:p-8 h-full" id="main_content">
          <h1 className="mb-4">Login to your account</h1>
          <p className="text-sm mb-3">
            Welcome back! Please enter your credentials to log in to your
            account.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
