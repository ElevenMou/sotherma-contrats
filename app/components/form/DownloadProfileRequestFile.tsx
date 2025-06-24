import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import { Button } from "../ui/button";
import { useState } from "react";
import Loading from "../layout/Loading";

const DownloadProfileRequestFile = ({ name, guid }: { name: string; guid: string }) => {
  if (!guid || !name) {
    return null;
  }

  const { downloadProfileFile } = useRequestUsecase();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = () => {
    downloadProfileFile({
      request: { guid },
      view: {
        setLoading,
      },
    });
  };
  return (
    <Button variant="link" onClick={handleDownload} disabled={loading}>
      {name} {loading && <Loading />}
    </Button>
  );
};

export default DownloadProfileRequestFile;
