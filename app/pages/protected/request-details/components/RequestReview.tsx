import { useTranslation } from "react-i18next";
import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import Timeline from "./Timeline";
import RequestDetailsCard from "../../request-contract/components/RequestDetailsCard";

export default function RequestReview({
  requestDetails,
}: {
  requestDetails: RequestDetailsModel;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Timeline />
      <RequestDetailsCard requestDetails={requestDetails} />
    </>
  );
}
