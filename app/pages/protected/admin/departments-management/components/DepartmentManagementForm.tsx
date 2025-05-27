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
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { routes } from "@/lib/router/routes";
import type { DepartmentManagementDetailsModel } from "@/data/department-management/model/request/DepartmentManagementDetailsModel";
import { useDepartmentManagementContext } from "../contexts/DepartmentManagementProvider";
import { useDepartmentManagementUseCase } from "@/usecases/department-management/departmentManagementUsecase";
import ValidatorSelect from "./ValidatorSelect";
import HrSelect from "./HrSelect";

const DepartmentManagementForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { departmentManagement } = useDepartmentManagementContext();
  const { saveDepartmentManagementDetails } = useDepartmentManagementUseCase();
  const { id } = useParams<"id">();

  const departmentManagementSchema = object({
    firstValidatorId: string().min(
      1,
      `${t("departments.department_id")} ${t("common.isRequired")}`
    ),
    secondValidatorId: string().optional(),
    hrId: string().min(
      1,
      `${t("departments.department_id")} ${t("common.isRequired")}`
    ),
  });

  const form = useForm<z.infer<typeof departmentManagementSchema>>({
    resolver: zodResolver(departmentManagementSchema),
    defaultValues: {
      firstValidatorId: departmentManagement?.firstValidatorId || "",
      secondValidatorId: departmentManagement?.secondValidatorId || "",
      hrId: departmentManagement?.hrId || "",
    },
  });

  const onSuccess = () => {
    form.reset();
    navigate(routes.departments, { replace: true });
  };

  async function onSubmit(values: z.infer<typeof departmentManagementSchema>) {
    const departmentManagementDetails: DepartmentManagementDetailsModel = {
      departmentGuid: departmentManagement?.departmentGuid || id || "",
      firstValidatorId: values.firstValidatorId || "",
      secondValidatorId: values.secondValidatorId || "",
      hrId: values.hrId,
      departmentName: departmentManagement?.departmentName || "",
    };
    await saveDepartmentManagementDetails({
      request: departmentManagementDetails,
      view: { onSuccess },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstValidatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("departments.first_validator")}</FormLabel>
              <FormControl>
                <ValidatorSelect defaultValue={field.value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondValidatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("departments.second_validator")}</FormLabel>
              <FormControl>
                <ValidatorSelect defaultValue={field.value} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hrId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("departments.hr")}</FormLabel>
              <FormControl>
                <HrSelect defaultValue={field.value} {...field} />
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

export default DepartmentManagementForm;
