import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import RequestsList from "./RequestsList";
import MyRequestsList from "./MyRequestsList";
import { useTranslation } from "react-i18next";

const RequesterRequests = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("activeRequests");

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
      <TabsList className="w-full">
        <TabsTrigger value="activeRequests">
          {t("requests.tab.activeRequests")}
        </TabsTrigger>
        <TabsTrigger value="completedRequests">
          {t("requests.tab.completedRequests")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="activeRequests">
        <MyRequestsList isCompleted={false} />
      </TabsContent>
      <TabsContent value="completedRequests">
        <MyRequestsList isCompleted={true} />
      </TabsContent>
    </Tabs>
  );
};

export default RequesterRequests;
