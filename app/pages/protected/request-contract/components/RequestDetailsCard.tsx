import DownloadFile from "@/components/form/DownloadFile";
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
            {t(`contracts.type.${requestDetails.contractType}`, {
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

        {requestDetails.departureFirstName && (
          <div className="flex items-center gap-2">
            <span>{t("requests.departureFirstName")}</span>
            <span className="text-muted-foreground">
              {requestDetails.departureFirstName}
            </span>
          </div>
        )}

        {requestDetails.departureLastName && (
          <div className="flex items-center gap-2">
            <span>{t("requests.departureLastName")}</span>
            <span className="text-muted-foreground">
              {requestDetails.departureLastName}
            </span>
          </div>
        )}

        {requestDetails.departurePosition && (
          <div className="flex items-center gap-2">
            <span>{t("requests.departurePosition")}</span>
            <span className="text-muted-foreground">
              {t(`desiredProfil.${requestDetails.departurePosition}`, {
                defaultValue: requestDetails.departurePosition,
              })}
            </span>
          </div>
        )}

        {requestDetails.departureReason && (
          <div className="flex items-center gap-2">
            <span>{t("requests.departureReason")}</span>
            <span className="text-muted-foreground">
              {t(`departureReasons.${requestDetails.departureReason}`, {
                defaultValue: requestDetails.departureReason,
              })}
            </span>
          </div>
        )}

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
            {t(`desiredProfil.${requestDetails.desiredProfile}`, {
              defaultValue: requestDetails.desiredProfile,
            })}
          </span>
        </div>
      </CardContent>
      {requestDetails.recommendedProfiles &&
        requestDetails.recommendedProfiles.length > 0 && (
          <>
            <CardHeader>
              <CardTitle>{t("requests.recommendation")}</CardTitle>
            </CardHeader>
            {requestDetails.recommendedProfiles.map((recommendation) => (
              <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span>{t("requests.candidateFirstName")}</span>
                  <span className="text-muted-foreground">
                    {recommendation.candidateFirstName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{t("requests.candidateLastName")}</span>
                  <span className="text-muted-foreground">
                    {recommendation.candidateLastName}
                  </span>
                </div>
                <DownloadFile
                  guid={recommendation.guid ?? ""}
                  name={recommendation.fileName ?? ""}
                />
              </CardContent>
            ))}
          </>
        )}
    </Card>
  );
};

export default RequestDetailsCard;
