import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import type { NotifyProviderRequestModel } from "@/data/requests/model/request/NotifyProviderRequestModel";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import { BellRing } from "lucide-react";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";

const NotifyProvider: FC<NotifyProviderRequestModel> = ({
  requestGUID,
  providerNotificationCounter,
}) => {
  const { t } = useTranslation();
  const { notifyProvider } = useRequestUsecase();
  const [loading, setLoading] = useState<boolean>(false);

  const notify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await notifyProvider({ request: { requestGUID }, view: { setLoading } });
    } catch (error) {
      console.error("Error notifying provider:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="secondary"
      disabled={loading}
      onClick={notify}
      title={t("requests.notifyProvider")}
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <BellRing />
          {providerNotificationCounter && (
            <span>{providerNotificationCounter}</span>
          )}
        </>
      )}
    </Button>
  );
};

export default NotifyProvider;
