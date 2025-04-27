import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/layout/Loading";
import type { UserDetailsModel } from "@/data/users/model/response/UserDetailsModel";
import { useTranslation } from "react-i18next";
import DepartmentsSelect from "@/components/form/DepartmentSelect";
import SitesSelect from "@/components/form/SiteSelect";
import RoleSelect from "@/components/form/RoleSelect";
import { useUserUsecase } from "@/usecases/user/userUsecase";
import { useNavigate } from "react-router";
import { routes } from "@/lib/router/routes";

const EmployeeForm = ({
  employeeDetails,
}: {
  employeeDetails: UserDetailsModel | null;
}) => {
  const { t } = useTranslation();
  const { saveUserDetails } = useUserUsecase();
  const navigate = useNavigate();

  const employeeDetailsSchema = object({
    code: string().min(
      1,
      `${t("employees.employee_id")} ${t("common.isRequired")}`
    ),
    firstName: string().min(
      1,
      `${t("employees.employee_firstname")} ${t("common.isRequired")}`
    ),
    lastName: string().min(
      1,
      `${t("employees.employee_lastname")} ${t("common.isRequired")}`
    ),
    department: string().min(
      1,
      `${t("employees.employee_department")} ${t("common.isRequired")}`
    ),
    site: string().min(
      1,
      `${t("employees.employee_site")} ${t("common.isRequired")}`
    ),
    email: string({
      required_error: `${t("employees.employee_email")} ${t(
        "common.isRequired"
      )}`,
    })
      .min(1, `${t("employees.employee_email")} ${t("common.isRequired")}`)
      .email(`${t("employees.employee_email")} ${t("common.isInvalid")}`),
    profile: string().min(1, `Role ${t("common.isRequired")}`),
  }).refine((data) => {
    const userDetails: Omit<UserDetailsModel, "guid"> = {
      code: "",
      firstName: "",
      lastName: "",
      department: "",
      site: "",
      email: data.email,
      profile: "",
    };
    return userDetails;
  });

  const form = useForm<z.infer<typeof employeeDetailsSchema>>({
    resolver: zodResolver(employeeDetailsSchema),
    defaultValues: {
      code: employeeDetails?.code || "",
      firstName: employeeDetails?.firstName || "",
      lastName: employeeDetails?.lastName || "",
      department: employeeDetails?.department || "",
      site: employeeDetails?.site || "",
      email: employeeDetails?.email || "",
      profile: employeeDetails?.profile || "",
    },
  });

  async function onSubmit(values: z.infer<typeof employeeDetailsSchema>) {
    const userDetails: UserDetailsModel = {
      guid: employeeDetails?.guid || "",
      code: values.code,
      firstName: values.firstName,
      lastName: values.lastName,
      department: values.department,
      site: values.site,
      email: values.email,
      profile: values.profile,
    };
    await saveUserDetails({ request: userDetails });
    form.reset();
    navigate(routes.employees, { replace: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_id")}</FormLabel>
              <FormControl>
                <Input placeholder={t("employees.employee_id")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_firstname")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("employees.employee_firstname")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_lastname")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("employees.employee_lastname")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_email")}</FormLabel>
              <FormControl>
                <Input placeholder={t("employees.employee_email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_department")}</FormLabel>
              <FormControl>
                <DepartmentsSelect
                  defaultValue={employeeDetails?.department}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="site"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.employee_site")}</FormLabel>
              <FormControl>
                <SitesSelect defaultValue={employeeDetails?.site} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RoleSelect
                  defaultValue={employeeDetails?.profile}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {t("common.save")} {form.formState.isSubmitting && <Loading />}
        </Button>
      </form>
    </Form>
  );
};

export default EmployeeForm;
