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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { date, object, string, z } from "zod";

const ExtendContract = ({
  contractId,
  endDate,
}: {
  contractId: string;
  endDate: Date;
}) => {
  const { t } = useTranslation();
  const { extendContract } = useContractUsecase();

  const [open, setOpen] = useState(false);

  const rejectContractSchema = object({
    newEndDate: date({
      required_error: `${t("common.endDate")} ${t("common.isRequired")}`,
    }).min(endDate, t("contracts.errors.endDate")),
  });

  const form = useForm<z.infer<typeof rejectContractSchema>>({
    resolver: zodResolver(rejectContractSchema),
    defaultValues: {
      newEndDate: endDate,
    },
  });

  const onSubmit = async () => {
    await extendContract({
      request: {
        guid: contractId,
        newEndDate: form.getValues("newEndDate").toISOString(),
      },
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="ml-2">
        <DialogTrigger>{t("common.extend")}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("contracts.confirmExtend.title")}</DialogTitle>
          <DialogDescription>
            {t("contracts.confirmExtend.description")}
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common.endDate")}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder={t("common.endDate")}
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          field.onChange(new Date(e.target.value));
                        }}
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
                {t("common.extend")}{" "}
                {form.formState.isSubmitting && <Loading />}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ExtendContract;
