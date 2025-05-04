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
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import ContractTypeSelect from "@/components/form/ContractTypeSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JustificationSelect from "@/components/form/JustificationSelect";
import { useLocation, useNavigate } from "react-router";
import { routes } from "@/lib/router/routes";
import { DatePicker } from "@/components/form/DatePicker";
import { useEffect, useState } from "react";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import ContractDetialsCard from "../../contracts/components/ContractDetialsCard";

const RequestForm = ({
  requestDetails,
}: {
  requestDetails: RequestDetailsModel | null;
}) => {
  const { t } = useTranslation();
  const { saveRequest, getRequestDetails } = useRequestUsecase();
  const { getContractDetails } = useContractUsecase();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [contractDetails, setContractDetails] =
    useState<ContractDetailsModel>();
  const [loading, setLoading] = useState<boolean>(false);

  const requestDetailsSchema = object({
    contractType: string().min(
      1,
      `${t("requests.contractType")} ${t("common.isRequired")}`
    ),
    startDate: z.coerce
      .date({
        required_error: `${t("requests.startDate")} ${t("common.isRequired")}`,
      })
      .min(new Date(), {
        message: `${t("requests.startDate")} ${t("common.isRequired")}`,
      }),
    endDate: z.coerce.date({
      required_error: `${t("requests.endDate")} ${t("common.isRequired")}`,
    }),
    site: string().min(1, `${t("requests.site")} ${t("common.isRequired")}`),
    department: string().min(
      1,
      `${t("requests.department")} ${t("common.isRequired")}`
    ),
    desiredProfile: string().min(
      1,
      `${t("requests.desiredProfile")} ${t("common.isRequired")}`
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
  });

  const form = useForm<z.infer<typeof requestDetailsSchema>>({
    resolver: zodResolver(requestDetailsSchema),
    defaultValues: requestDetails
      ? {
          contractType: requestDetails.contractType,
          startDate: requestDetails.startDate,
          endDate: requestDetails.endDate,
          site: String(requestDetails.siteId),
          department: String(requestDetails.departmentId),
          desiredProfile: requestDetails.desiredProfile,
          justification: requestDetails.justification,
          numberOfProfiles: String(requestDetails.numberOfProfiles),
          candidateFirstName: requestDetails.candidateFirstName || "",
          candidateLastName: requestDetails.candidateLastName || "",
          cvFile: requestDetails.cvFile || undefined,
        }
      : {},
  });

  async function onSubmit(values: z.infer<typeof requestDetailsSchema>) {
    const requestData: RequestDetailsModel = {
      guid: requestDetails?.guid || "",
      contractType: values.contractType,
      endDate: values.endDate,
      startDate: values.startDate,
      siteId: Number(values.site),
      departmentId: Number(values.department),
      desiredProfile: values.desiredProfile,
      justification: values.justification,
      numberOfProfiles: Number(values.numberOfProfiles),
      candidateFirstName: values.candidateFirstName || null,
      candidateLastName: values.candidateLastName || null,
      cvFile: values.cvFile || null,
      contractGuid: state.contractId,
    };
    await saveRequest({
      request: requestData,
      view: { navigateToRequestsList: () => navigate(routes.requests) },
    });
  }

  const minStartDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const daysToAdd = dayOfWeek === 5 || dayOfWeek === 4 ? 4 : 2; // Friday & Thursday: +4, other days: +2
    const minDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    return minDate;
  };

  const minEndDate = () => {
    const startDate = form.watch("startDate");

    if (!startDate)
      return new Date(minStartDate().getTime() + 48 * 60 * 60 * 1000);

    const minEndDate = new Date(
      new Date(startDate).getTime() + 48 * 60 * 60 * 1000
    );

    return minEndDate;
  };

  useEffect(() => {
    if (state?.contractId) {
      getContractDetails({
        request: { guid: state?.contractId },
        view: {
          setLoading: setLoading,
          setContractDetails,
        },
      });
    }
  }, [state?.contractId]);

  useEffect(() => {
    if (contractDetails) {
      getRequestDetails({
        requestGuid: contractDetails.requestGuid,
        view: {
          setLoading,
          setRequestDetails: (requestDetails) => {
            form.reset({
              contractType: requestDetails?.contractType || "",
              startDate: requestDetails?.startDate || new Date(),
              endDate: requestDetails?.endDate || new Date(),
              site: String(requestDetails?.siteId || ""),
              department: String(requestDetails?.departmentId || ""),
              desiredProfile: requestDetails?.desiredProfile || "",
              justification: requestDetails?.justification || "",
              numberOfProfiles: String(requestDetails?.numberOfProfiles || ""),
              candidateFirstName: requestDetails?.candidateFirstName || "",
              candidateLastName: requestDetails?.candidateLastName || "",
              cvFile: requestDetails?.cvFile || undefined,
            });
          },
        },
      });
    }
  }, [contractDetails]);

  return (
    <>
      {contractDetails && (
        <ContractDetialsCard contractDetails={contractDetails} />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <FormField
            control={form.control}
            name="desiredProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("requests.desiredProfile")}</FormLabel>
                <FormControl>
                  <Input disabled={loading || state?.contractId} {...field} />
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
                    disabled={loading || state?.contractId}
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
                  <JustificationSelect
                    disabled={loading || state?.contractId}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("requests.contractType")}</FormLabel>
                <FormControl>
                  <ContractTypeSelect
                    disabled={loading || state?.contractId}
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
                <FormLabel>{t("common.department")}</FormLabel>
                <FormControl>
                  <DepartmentsSelect
                    disabled={loading || state?.contractId}
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
                <FormLabel>{t("common.site")}</FormLabel>
                <FormControl>
                  <SitesSelect
                    disabled={loading || state?.contractId}
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
                  <DatePicker
                    minDate={minStartDate()}
                    date={field.value ?? requestDetails?.startDate}
                    setDate={field.onChange}
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
                  <DatePicker
                    minDate={minEndDate()}
                    date={field.value ?? requestDetails?.endDate}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!contractDetails && (
            <Accordion
              type="single"
              collapsible
              className="col-span-1 md:col-span-full"
            >
              <AccordionItem value="recomandation">
                <AccordionTrigger>
                  {t("requests.haveRecomandation")}
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="candidateFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("requests.candidateFirstName")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          <Button
            type="submit"
            className="w-full col-span-1 md:col-span-full"
            disabled={form.formState.isSubmitting}
          >
            {t("common.save")} {form.formState.isSubmitting && <Loading />}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RequestForm;
