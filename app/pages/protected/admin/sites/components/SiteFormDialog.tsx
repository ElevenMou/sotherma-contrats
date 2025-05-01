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
import { useSiteUseCase } from "@/usecases/site/siteUsecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string, z } from "zod";

const SiteFormDialog = ({
  siteId,
  children,
  variant = "default",
  refreshSites,
}: {
  siteId?: string;
  children?: React.ReactNode;
  variant?: "ghost" | "outline" | "default";
  refreshSites?: () => void;
}) => {
  const { t } = useTranslation();
  const { getSiteDetails, saveSite } = useSiteUseCase();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (siteId) {
      getSiteDetails({
        request: { guid: siteId },
        view: {
          setLoading,
          setSiteDetails: (siteDetails) => {
            form.setValue("code", siteDetails.code);
            form.setValue("name", siteDetails.name);
          },
        },
      });
    }
  }, [siteId]);

  const siteDetailsSchema = object({
    code: string().min(1, {
      message: `${t("sites.site_code")} ${t("common.isRequired")}`,
    }),
    name: string().min(1, {
      message: `${t("sites.site_name")} ${t("common.isRequired")}`,
    }),
  });

  const form = useForm<z.infer<typeof siteDetailsSchema>>({
    resolver: zodResolver(siteDetailsSchema),
    defaultValues: {
      code: "",
      name: "",
    },
  });

  const onSaveSuccess = async () => {
    setOpen(false);
    form.reset();
    refreshSites?.();
  };

  const onSubmit = async () => {
    await saveSite({
      request: {
        guid: siteId ?? "",
        code: form.getValues("code"),
        name: form.getValues("name"),
      },
      view: {
        onSaveSuccess,
      },
    });
    refreshSites?.();
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={variant} asChild>
        <DialogTrigger>
          {children ? children : t("sites.add_site")}
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t(`sites.${siteId ? "edit_site" : "add_site"}`)}
          </DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("sites.site_code")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("sites.site_code")}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("sites.site_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("sites.site_name")}
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
                {t("sites.save_site")}{" "}
                {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SiteFormDialog;
