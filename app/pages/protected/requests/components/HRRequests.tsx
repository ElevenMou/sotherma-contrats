import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import RequestsList from "./RequestsList";
import MyRequestsList from "./MyRequestsList";
import { useTranslation } from "react-i18next";
import ContractClosingRequestsList from "./ContractClosingRequestsList";

const HRRequests = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("contractsRequests");
  return (
    <Tabs
      defaultValue="contractsRequests"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="w-full">
        <TabsTrigger value="contractsRequests">
          {t("requests.tab.contractsRequests")}
        </TabsTrigger>
        <TabsTrigger value="closeRequests">
          {t("requests.tab.closeRequests")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="contractsRequests">
        <MyRequestsList />
      </TabsContent>
      <TabsContent value="closeRequests">
        <ContractClosingRequestsList />
      </TabsContent>
    </Tabs>
  );
};

export default HRRequests;
