import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import { formatDateWithoutTime } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const RequestDetailsCard = ({
  requestDetails,
}: {
  requestDetails: RequestDetailsModel;
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("requests.details")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <span>{t("common.site")}</span>
          <span className="text-muted-foreground">{requestDetails.site}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("common.department")}</span>
          <span className="text-muted-foreground">
            {requestDetails.department}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("requests.contractType")}</span>
          <span className="text-muted-foreground">
            {t(`contracts.${requestDetails.contractType}`, {
              defaultValue: requestDetails.contractType,
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("requests.justification")}</span>
          <span className="text-muted-foreground">
            {t(`justifications.${requestDetails.justification}`, {
              defaultValue: requestDetails.justification,
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("common.startDate")}</span>
          <span className="text-muted-foreground">
            {formatDateWithoutTime(requestDetails.startDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("common.endDate")}</span>
          <span className="text-muted-foreground">
            {formatDateWithoutTime(requestDetails.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("requests.desiredProfile")}</span>
          <span className="text-muted-foreground">
            {requestDetails.desiredProfile}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("requests.numberOfProfiles")}</span>
          <span className="text-muted-foreground">
            {requestDetails.numberOfProfiles}
          </span>
        </div>
      </CardContent>
      {requestDetails.candidateFirstName &&
        requestDetails.candidateLastName && (
          <>
            <CardHeader>
              <CardTitle>{t("requests.recommendation")}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <span>{t("common.firstName")}</span>
                <span className="text-muted-foreground">
                  {requestDetails.candidateFirstName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{t("common.lastName")}</span>
                <span className="text-muted-foreground">
                  {requestDetails.candidateLastName}
                </span>
              </div>
            </CardContent>
          </>
        )}
    </Card>
  );
};

export default RequestDetailsCard;
