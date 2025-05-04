import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";
import { formatDateWithoutTime } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ContractDetialsCard = ({
  contractDetails,
}: {
  contractDetails: ContractDetailsModel;
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("contracts.details")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <span>{t("contracts.providerFirstName")}</span>
          <span className="text-muted-foreground">
            {contractDetails.contractedFirstName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("contracts.providerLastName")}</span>
          <span className="text-muted-foreground">
            {contractDetails.contractedLastName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{t("contracts.providerEmail")}</span>
          <span className="text-muted-foreground">
            {contractDetails.contractedEmail}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>{t("common.startDate")}</span>
          <span className="text-muted-foreground">
            {formatDateWithoutTime(contractDetails.startDate)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>{t("common.endDate")}</span>
          <span className="text-muted-foreground">
            {formatDateWithoutTime(contractDetails.endDate)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDetialsCard;
