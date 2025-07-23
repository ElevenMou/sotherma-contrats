import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import RequestsList from "./RequestsList";
import MyRequestsList from "./MyRequestsList";
import { useTranslation } from "react-i18next";

const ManagerRequests = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("requests");
  return (
    <Tabs
      defaultValue="requests"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="w-full">
        <TabsTrigger value="requests">
          {t("requests.tab.activeRequests")}
        </TabsTrigger>
        <TabsTrigger value="myRequests">
          {t("requests.tab.completedRequests")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="requests">
        <RequestsList />
      </TabsContent>
      <TabsContent value="myRequests">
        <MyRequestsList />
      </TabsContent>
    </Tabs>
  );
};

export default ManagerRequests;
