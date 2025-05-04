import type { RequestTimeLineModel } from "@/data/requests/model/response/RequestTimeLineModel";
import { formatDate } from "@/lib/utils";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import Stepper from "@keyvaluesystems/react-stepper";
import { fail } from "assert";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Timeline = ({ requestGuid }: { requestGuid: string }) => {
  const [timeline, setTimeline] = useState<RequestTimeLineModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { getRequestTimeline } = useRequestUsecase();
  const { t } = useTranslation();

  useEffect(() => {
    getRequestTimeline({
      requestGuid,
      view: {
        setLoading,
        setRequestTimeline: (timeline) => {
          setTimeline(timeline);
        },
      },
    });
  }, [requestGuid]);

  const getStepLabel = (step: RequestTimeLineModel) => {
    return t(`requests.actions.${step.actionLabel}`);
  };

  const getStepDescription = (step: RequestTimeLineModel) => {
    return step.actionDate
      ? `${formatDate(step.actionDate!)}: ${step.actionUser}`
      : t("status.pending");
  };

  const getStepCompleted = (step: RequestTimeLineModel) => {
    return step.actionDate && step.actionCode !== 3 ? true : false;
  };

  const getCurrentStepIndex = () => {
    const currentStepIndex = timeline?.findIndex((step, index) => {
      if (step.actionDate === null) {
        const previousStep = timeline[index - 1];
        return !previousStep || previousStep.actionCode !== 3;
      }
      return false;
    });
    return currentStepIndex !== -1 ? currentStepIndex : 0;
  };

  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#5fbcff",
    }),
    ActiveNode: () => ({
      backgroundColor: "#5fbcff",
    }),
    CompletedNode: () => ({
      backgroundColor: "#028A0F",
    }),
  };
  return (
    !loading && (
      <Stepper
        steps={
          timeline?.map((step) => ({
            stepLabel: getStepLabel(step),
            stepDescription: getStepDescription(step),
            completed: getStepCompleted(step),
            failed: step.actionCode === 3,
          })) ?? []
        }
        currentStepIndex={getCurrentStepIndex()}
        orientation="horizontal"
        labelPosition="bottom"
        styles={styles}
        showDescriptionsForAllSteps
      />
    )
  );
};

export default Timeline;
