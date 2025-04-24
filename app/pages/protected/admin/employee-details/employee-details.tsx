import { Separator } from "@radix-ui/react-separator";
import type { Route } from "./+types/employee-details";
import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
import { routes } from "@/lib/router/routes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employee details" },
    { name: "description", content: "Welcome to employees!" },
  ];
}

export default function EmployeeDetails({ params }: Route.ComponentProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <Link to={routes.employees}>
            <ArrowLeftCircle className="h-6 w-6" />
          </Link>
          <Separator
            orientation="vertical"
            className="mr-2 h-4 w-[1px] bg-ring"
          />
          <h1>Employee {params.id}</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0"></div>
    </>
  );
}
