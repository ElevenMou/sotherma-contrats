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
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import type { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string, z } from "zod";

const CloseContract: FC<{
  contractId: string;
  onClose: () => void;
}> = ({ contractId, onClose }) => {
  const { t } = useTranslation();
  const { closeContract } = useContractUsecase();

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
    await closeContract({
      request: {
        contractGuid: contractId,
        closingReason: form.getValues("reason"),
      },
      view: {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          onClose();
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        variant="destructive"
        asChild
      >
        <DialogTrigger>{t("common.close")}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("contracts.confirmClose.title")}</DialogTitle>
          <DialogDescription>
            {t("contracts.confirmClose.description")}
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
                {t("common.close")} {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CloseContract;
