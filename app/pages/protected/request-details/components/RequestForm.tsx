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
import DepartmentsSelect from "@/components/form/DepartmentSelect";
import SitesSelect from "@/components/form/SiteSelect";
import RoleSelect from "@/components/form/RoleSelect";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";

const RequestForm = ({
  requestDetails,
}: {
  requestDetails: RequestDetailsModel | null;
}) => {
  const { t } = useTranslation();
  const { saveRequest } = useRequestUsecase();

  const requestDetailsSchema = object({
    contractType: string().min(
      1,
      `${t("requests.contractType")} ${t("common.isRequired")}`
    ),
    endDate: string().min(
      1,
      `${t("requests.endDate")} ${t("common.isRequired")}`
    ),
    startDate: string().min(
      1,
      `${t("requests.startDate")} ${t("common.isRequired")}`
    ),
    site: string().min(1, `${t("requests.site")} ${t("common.isRequired")}`),
    department: string().min(
      1,
      `${t("requests.department")} ${t("common.isRequired")}`
    ),
    desiredProfile: string().min(
      1,
      `${t("requests.desiredProfile")} ${t("common.isRequired")}`
    ),
    desiredStartDate: string().min(
      1,
      `${t("requests.desiredStartDate")} ${t("common.isRequired")}`
    ),
    justification: string().min(
      1,
      `${t("requests.justification")} ${t("common.isRequired")}`
    ),
    numberOfProfiles: string().min(
      1,
      `${t("requests.numberOfProfiles")} ${t("common.isRequired")}`
    ),
    candidateFirstName: string().optional(),
    candidateLastName: string().optional(),
    cvFile: z.instanceof(File).optional(),
  }).refine((data) => {
    const requestDetails: Omit<RequestDetailsModel, "guid"> = {
      contractType: data.contractType,
      endDate: new Date(data.endDate),
      startDate: new Date(data.startDate),
      siteId: Number(data.site),
      departmentId: Number(data.department),
      desiredProfile: data.desiredProfile,
      desiredStartDate: new Date(data.desiredStartDate),
      justification: data.justification,
      numberOfProfiles: Number(data.numberOfProfiles),
      candidateFirstName: data.candidateFirstName || null,
      candidateLastName: data.candidateLastName || null,
      cvFile: data.cvFile || null,
    };
    return requestDetails;
  });

  const form = useForm<z.infer<typeof requestDetailsSchema>>({
    resolver: zodResolver(requestDetailsSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof requestDetailsSchema>) {
    const requestData: RequestDetailsModel = {
      guid: requestDetails?.guid || "",
      contractType: values.contractType,
      endDate: new Date(values.endDate),
      startDate: new Date(values.startDate),
      siteId: Number(values.site),
      departmentId: Number(values.department),
      desiredProfile: values.desiredProfile,
      desiredStartDate: new Date(values.desiredStartDate),
      justification: values.justification,
      numberOfProfiles: Number(values.numberOfProfiles),
      candidateFirstName: values.candidateFirstName || null,
      candidateLastName: values.candidateLastName || null,
      cvFile: values.cvFile || null,
    };
    await saveRequest({ request: requestData });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="contractType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.contractType")}</FormLabel>
              <FormControl>
                <Input defaultValue={requestDetails?.contractType} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desiredProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.desiredProfile")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={requestDetails?.desiredProfile}
                  {...field}
                />
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
              <FormLabel>{t("requests.request_department")}</FormLabel>
              <FormControl>
                <DepartmentsSelect
                  defaultValue={String(requestDetails?.departmentId) || ""}
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
              <FormLabel>{t("requests.request_site")}</FormLabel>
              <FormControl>
                <SitesSelect
                  defaultValue={String(requestDetails?.siteId) || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.justification")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={requestDetails?.justification}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfProfiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.numberOfProfiles")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  defaultValue={requestDetails?.numberOfProfiles}
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
              <FormLabel>{t("requests.startDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  defaultValue={requestDetails?.startDate.toString()}
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
              <FormLabel>{t("requests.endDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  defaultValue={requestDetails?.endDate.toString()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desiredStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.desiredStartDate")}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  defaultValue={requestDetails?.desiredStartDate.toString()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="candidateFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.candidateFirstName")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={requestDetails?.candidateFirstName || ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="candidateLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("requests.candidateLastName")}</FormLabel>
              <FormControl>
                <Input
                  defaultValue={requestDetails?.candidateLastName || ""}
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

export default RequestForm;
