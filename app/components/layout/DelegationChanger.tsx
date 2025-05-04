import { useGlobalContext } from "@/contexts/GlobalContext";
import { useUserPublicUsecase } from "@/usecases/user/userUsecase";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Loading from "./Loading";

const DelegationChanger = () => {
  const { t } = useTranslation();
  const { userInfo } = useGlobalContext();
  const { setIsDelegated } = useUserPublicUsecase();

  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = () => {
    setLoading(false);
  };

  const handleDelegationChange = async () => {
    await setIsDelegated({
      request: {
        delegated: !userInfo?.delegated,
      },
      view: {
        setLoading,
        onSuccess,
      },
    });
  };

  return userInfo?.delegated ? (
    <Button
      variant="destructive"
      className="w-full"
      onClick={handleDelegationChange}
      disabled={loading}
    >
      {t("employees.delegation.stopDelegation")}
      {loading && <Loading />}
    </Button>
  ) : (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleDelegationChange}
      disabled={loading}
    >
      {t("employees.delegation.enableDelegation")}
      {loading && <Loading />}
    </Button>
  );
};

export default DelegationChanger;
