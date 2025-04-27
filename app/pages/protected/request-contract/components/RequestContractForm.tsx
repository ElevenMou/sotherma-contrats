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
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import ContractTypeSelect from "@/components/form/ContractTypeSelect";
import { useNavigate } from "react-router";
import { routes } from "@/lib/router/routes";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";

const ContractContractForm = ({
  contractDetails,
  requestGuid,
}: {
  contractDetails: ContractDetailsModel | null;
  requestGuid: string;
}) => {
  const { t } = useTranslation();
  const { saveContract } = useContractUsecase();
  const navigate = useNavigate();

  const contractDetailsSchema = object({
    endDate: string({
      required_error: `${t("contracts.endDate")} ${t("common.isRequired")}`,
    }).min(1),

    startDate: string({
      required_error: `${t("common.startDate")} ${t("common.isRequired")}`,
    }).min(1),

    contractType: string({
      required_error: `${t("requests.contractType")} ${t("common.isRequired")}`,
    }).min(1),

    providerFirstName: string({
      required_error: `${t("contracts.providerFirstName")} ${t(
        "common.isRequired"
      )}`,
    }).min(1),

    providerLastName: string({
      required_error: `${t("contracts.providerLastName")} ${t(
        "common.isRequired"
      )}`,
    }).min(1),

    providerEmail: string({
      required_error: `${t("contracts.providerEmail")} ${t(
        "common.isRequired"
      )}`,
    })
      .email(`${t("contracts.providerEmail")} ${t("common.isRequired")}`)
      .min(1, `${t("contracts.providerEmail")} ${t("common.isRequired")}`),

    cvFile: z.instanceof(File, {
      message: `${t("requests.cvFile")} ${t("common.isRequired")}`,
    }),
  }).refine((data) => {
    const contractDetails: Omit<ContractDetailsModel, "guid"> = {
      endDate: new Date(data.endDate),
      startDate: new Date(data.startDate),
      contractType: data.contractType,
      providerFirstName: data.providerFirstName,
      providerLastName: data.providerLastName,
      providerEmail: data.providerEmail,
      cvFile: data.cvFile || null,

      requestGuid: requestGuid,
    };
    return contractDetails;
  });

  const form = useForm<z.infer<typeof contractDetailsSchema>>({
    resolver: zodResolver(contractDetailsSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof contractDetailsSchema>) {
    const contractData: ContractDetailsModel = {
      guid: contractDetails?.guid || "",
      contractType: values.contractType,
      endDate: new Date(values.endDate),
      startDate: new Date(values.startDate),
      providerFirstName: values.providerFirstName,
      providerLastName: values.providerLastName,
      providerEmail: values.providerEmail,
      requestGuid: requestGuid,
      cvFile: values.cvFile || null,
    };
    await saveContract({
      request: contractData,
      view: { navigateToContractsList: () => navigate(routes.contracts) },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <FormField
          control={form.control}
          name="contractType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.contractType")}</FormLabel>
              <FormControl>
                <ContractTypeSelect
                  defaultValue={contractDetails?.contractType}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.startDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  defaultValue={contractDetails?.startDate.toString()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.endDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  defaultValue={contractDetails?.endDate.toString()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="providerFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contracts.providerFirstName")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={contractDetails?.providerFirstName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="providerLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contracts.providerLastName")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={contractDetails?.providerLastName}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="providerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contracts.providerEmail")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  defaultValue={contractDetails?.providerEmail}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.cvFile")}</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full col-span-1 md:col-span-full"
          disabled={form.formState.isSubmitting}
        >
          {t("common.save")} {form.formState.isSubmitting && <Loading />}
        </Button>
      </form>
    </Form>
  );
};

export default ContractContractForm;
