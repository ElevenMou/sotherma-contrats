import { Button } from "../ui/button";
import { useState } from "react";
import Loading from "../layout/Loading";
import { useContractUsecase } from "@/usecases/contract/contractUsecase";
import type { GetCvFileRequestModel } from "@/data/contracts/model/request/GetCvFileRequestModel";
import { FileDown } from "lucide-react";

const DownloadCandidatContractFile = ({ guid }: GetCvFileRequestModel) => {
  if (!guid) {
    return null;
  }

  const { downloadCandidateCv } = useContractUsecase();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = () => {
    downloadCandidateCv({
      request: { guid },
      view: {
        setLoading,
      },
    });
  };
  return (
    <Button variant="default" onClick={handleDownload} disabled={loading}>
      {loading ? <Loading /> : <FileDown />}
    </Button>
  );
};

export default DownloadCandidatContractFile;
