import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RequestTimeLineModel } from "@/data/requests/model/response/RequestTimeLineModel";
import { formatDate } from "@/lib/utils";
import { useRequestUsecase } from "@/usecases/request/requestUsecase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/layout/Loading";

const RequestHistory = ({ requestGuid }: { requestGuid: string }) => {
  const [timeline, setTimeline] = useState<RequestTimeLineModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const { getRequestTimeline } = useRequestUsecase();
  const { t } = useTranslation();

  useEffect(() => {
    if (open)
      getRequestTimeline({
        requestGuid,
        view: {
          setLoading,
          setRequestTimeline: (timeline) => {
            setTimeline(timeline);
          },
        },
      });
  }, [requestGuid, open]);

  const getContent = (step: RequestTimeLineModel) => {
    return (
      step.actionDate && (
        <div className="flex flex-col gap-0.5 items-center justify-center">
          <span className="text-xs text-muted-foreground">
            {formatDate(step.actionDate!)}
          </span>
          <span>
            {t(`requests.actions.${step.actionLabel}`)} - {step.actionUser}
          </span>
        </div>
      )
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change theme">
          <Ellipsis />
          <VisuallyHidden>See history</VisuallyHidden>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-40 p-2 gap-3" align="end">
        {timeline && !loading && timeline.map((step) => getContent(step))}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <Loading />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default RequestHistory;
