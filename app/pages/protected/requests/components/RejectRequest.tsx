import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string, z } from "zod";

const RejectRequest = ({
  requestId,
  refreshList,
}: {
  requestId: string;
  refreshList: () => void;
}) => {
  const { t } = useTranslation();
  const { rejectRequest } = useRequestUsecase();

  const [open, setOpen] = useState(false);

  const rejectRequestSchema = object({
    reason: string({
      required_error: `${t("requests.reason")} ${t("common.isRequired")}`,
    }).min(1, `${t("requests.reason")} ${t("common.isRequired")}`),
  });

  const form = useForm<z.infer<typeof rejectRequestSchema>>({
    resolver: zodResolver(rejectRequestSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async () => {
    await rejectRequest({
      request: {
        requestGuid: requestId,
        reason: form.getValues("reason"),
      },
    });
    setOpen(false);
    form.reset();
    refreshList();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        size="icon"
        variant="destructive"
        asChild
      >
        <DialogTrigger>
          <X className="h-4 w-4" />
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("requests.confirmReject.title")}</DialogTitle>
          <DialogDescription>
            {t("requests.confirmReject.description")}
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("requests.reason")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("requests.reason")} {...field} />
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
                {t("requests.reject")}{" "}
                {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RejectRequest;
