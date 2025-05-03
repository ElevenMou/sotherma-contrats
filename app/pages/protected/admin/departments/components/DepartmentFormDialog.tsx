import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDepartmentUseCase } from "@/usecases/department/departmentUsecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string, z } from "zod";

const DepartmentFormDialog = ({
  departmentId,
  children,
  variant = "default",
  refreshDepartments,
}: {
  departmentId?: string;
  children?: React.ReactNode;
  variant?: "ghost" | "outline" | "default";
  refreshDepartments?: () => void;
}) => {
  const { t } = useTranslation();
  const { getDepartmentDetails, saveDepartment } = useDepartmentUseCase();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (departmentId) {
      getDepartmentDetails({
        request: { guid: departmentId },
        view: {
          setLoading,
          setDepartmentDetails: (departmentDetails) => {
            form.setValue("name", departmentDetails.name);
          },
        },
      });
    }
  }, [departmentId]);

  const departmentDetailsSchema = object({
    name: string().min(1, {
      message: `${t("departments.department_name")} ${t("common.isRequired")}`,
    }),
  });

  const form = useForm<z.infer<typeof departmentDetailsSchema>>({
    resolver: zodResolver(departmentDetailsSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSuccess = async () => {
    setOpen(false);
    form.reset();
    refreshDepartments?.();
  };

  const onSubmit = async () => {
    await saveDepartment({
      request: {
        guid: departmentId ?? "",
        name: form.getValues("name"),
      },
      view: {
        onSuccess,
      },
    });
    refreshDepartments?.();
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={variant} asChild>
        <DialogTrigger>
          {children ? children : t("departments.add_department")}
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t(
              `departments.${
                departmentId ? "edit_department" : "add_department"
              }`
            )}
          </DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("departments.department_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("departments.department_name")}
                        disabled={loading}
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
                disabled={form.formState.isSubmitting || loading}
              >
                {t("departments.save_department")}{" "}
                {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentFormDialog;
