import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { useUserAdminUsecase } from "@/usecases/user/userUsecase";
import type { DelegationUserModel } from "@/data/users/model/response/DelegationUserModel";

const DelegationsSelect = ({
  disabled,
  defaultValue,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const { getDelegationUsers } = useUserAdminUsecase();

  const [delegations, setDelegations] = useState<DelegationUserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangeLanguage = (selectedLanguage: string) => {
    onChange(selectedLanguage);
  };

  useEffect(() => {
    const fetchDelegations = async () => {
      await getDelegationUsers({
        view: {
          setDelegationUsers: setDelegations,
          setLoading,
        },
      });
    };

    fetchDelegations();
  }, []);

  useEffect(() => {
    if (defaultValue) {
      const selectedSite = delegations.find(
        (delegation) => delegation.userId === defaultValue
      );

      if (selectedSite) {
        onChange(selectedSite.userId);
      }
    }
  }, [delegations]);

  return (
    <>
      {loading && <Skeleton className="h-9 w-full rounded-md" />}
      {!loading && (
        <Select
          onValueChange={handleChangeLanguage}
          disabled={disabled}
          defaultValue={delegations
            .find((delegation) => delegation.userId === defaultValue)
            ?.userId?.toString()}
          i18nIsDynamicList={true}
          name="delegation"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("employees.employee_delegation")} />
          </SelectTrigger>
          <SelectContent>
            {delegations.map((delegation) => (
              <SelectItem key={delegation.userId} value={delegation.userId}>
                {delegation.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default DelegationsSelect;
