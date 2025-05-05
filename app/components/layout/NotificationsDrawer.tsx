import { Bell, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { use, useEffect, useRef, useState } from "react";
import type { NotificationListItemModel } from "@/data/notifications/model/response/NotificationListItemModel";
import { notificationHttpRepository } from "@/data/notifications/notifications.repository";
import Loading from "./Loading";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/utils";

const MAX_RECORDS = 10;

export function NotificationsDrawer() {
  const { t } = useTranslation();
  const { numberOfUnreadNotifications } = useGlobalContext();
  const [notifications, setNotifications] = useState<
    NotificationListItemModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLoadMore = () => {
    setStartIndex((prev) => prev + MAX_RECORDS);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationHttpRepository.GetNotifications({
        maxRecords: MAX_RECORDS,
        startIndex,
      });
      setHasMore(response.totalCount > notifications.length + MAX_RECORDS);
      setNotifications((prev) => [...prev, ...response.userNotifications]);
    } catch (error) {
      toast.error("Failed to fetch notifications", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setStartIndex(0);
      setHasMore(true);
    }
  }, [isOpen, startIndex]);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          {numberOfUnreadNotifications > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs p-0.5 font-semibold text-white bg-red-500 rounded-full">
              {numberOfUnreadNotifications < 10 ? (
                numberOfUnreadNotifications
              ) : (
                <span className="text-xs">9+</span>
              )}
            </span>
          )}
          <Bell />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex items-center justify-between flex-row">
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close">
                <X />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {/* Content */}

          {loading && notifications.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <Loading />
            </div>
          )}

          {!loading && notifications.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          )}

          {notifications.length > 0 && (
            <div
              className="flex flex-col p-4 max-h-screen overflow-y-auto"
              style={{ maxHeight: "calc(100dvh - 100px)" }}
            >
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-2 py-4 border-b border-gray-200 ${
                    notification.readed ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.notificationDateTime)}
                    </span>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
              ))}
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {t("common.loadMore")}
                  {loading && <Loading />}
                </Button>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
