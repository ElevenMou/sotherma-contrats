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
import { useUserPublicUsecase } from "@/usecases/user/userUsecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string, z } from "zod";

const ChangePasswordFormDialog = ({
  children,
  variant = "ghost",
  className,
}: {
  children?: React.ReactNode;
  variant?: "ghost" | "outline" | "default";
  className?: string;
}) => {
  const { changePassword } = useUserPublicUsecase();

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const changePasswordDetailsSchema = object({
    currentPassword: string().min(1, {
      message: `${t("changePassword.currentPassword")} ${t(
        "common.isRequired"
      )}`,
    }),
    newPassword: string().min(1, {
      message: `${t("changePassword.newPassword")} ${t("common.isRequired")}`,
    }),
    confirmNewPassword: string().min(1, {
      message: `${t("changePassword.confirmNewPassword")} ${t(
        "common.isRequired"
      )}`,
    }),
  });

  const form = useForm<z.infer<typeof changePasswordDetailsSchema>>({
    resolver: zodResolver(changePasswordDetailsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSuccess = async () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = async () => {
    changePassword({
      request: {
        currentPassword: form.getValues("currentPassword"),
        newPassword: form.getValues("newPassword"),
        confirmNewPassword: form.getValues("confirmNewPassword"),
      },
      view: { onSuccess },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={variant} className={className} asChild>
        <DialogTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          {children ? children : t("changePassword.title")}
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(`changePassword.title`)}</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("changePassword.currentPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("changePassword.currentPassword")}
                        disabled={form.formState.isSubmitting}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("changePassword.newPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("changePassword.newPassword")}
                        disabled={form.formState.isSubmitting}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("changePassword.confirmNewPassword")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("changePassword.confirmNewPassword")}
                        disabled={form.formState.isSubmitting}
                        type="password"
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
                {t("changePassword.title")}{" "}
                {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordFormDialog;
