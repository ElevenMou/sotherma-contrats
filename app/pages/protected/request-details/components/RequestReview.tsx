import type { RequestDetailsModel } from "@/data/requests/model/request/RequestDetailsModel";
import Timeline from "./Timeline";
import RequestDetailsCard from "../../request-contract/components/RequestDetailsCard";
import ContractDetialsCard from "../../contracts/components/ContractDetialsCard";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import { useEffect, useState } from "react";
import type { ContractDetailsModel } from "@/data/contracts/model/response/ContractDetailsModel";

export default function RequestReview({
  requestDetails,
}: {
  requestDetails: RequestDetailsModel;
}) {
  const { contractGuid } = requestDetails;
  const [loading, setLoading] = useState<boolean>(true);
  const [contractDetails, setContractDetails] =
    useState<ContractDetailsModel>();

  useEffect(() => {
    if (contractGuid) {
      getContractDetails({
        request: { guid: contractGuid },
        view: {
          setLoading,
          setContractDetails,
        },
      });
    }
  }, [contractGuid]);

  const { getContractDetails } = useContractUsecase();

  return (
    <>
      {requestDetails.guid && <Timeline requestGuid={requestDetails.guid} />}
      {requestDetails.contractGuid && contractDetails && !loading && (
        <ContractDetialsCard contractDetails={contractDetails} />
      )}
      <RequestDetailsCard requestDetails={requestDetails} />
    </>
  );
}
