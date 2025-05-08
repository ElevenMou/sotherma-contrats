import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { useUserAdminUsecase } from "@/usecases/user/userUsecase";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SetActiveStatus = ({
  userGuid,
  isDisabled,
}: {
  userGuid: string;
  isDisabled: boolean;
}) => {
  const { t } = useTranslation();
  const { setActiveStatus } = useUserAdminUsecase();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelegationChange = async () => {
    await setActiveStatus({
      request: {
        guid: userGuid,
        isDisabled: !isDisabled,
      },
      view: {
        setLoading,
      },
    });
  };

  return !isDisabled ? (
    <Button
      variant="destructive"
      className="w-full"
      onClick={handleDelegationChange}
      disabled={loading}
    >
      {t("employees.setStatus.disable")}
      {loading && <Loading />}
    </Button>
  ) : (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleDelegationChange}
      disabled={loading}
    >
      {t("employees.setStatus.enable")}
      {loading && <Loading />}
    </Button>
  );
};

export default SetActiveStatus;
