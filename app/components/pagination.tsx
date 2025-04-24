import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  totalItems,
  itemsPerPage = 15,
  currentPage: externalCurrentPage,
  onPageChange = () => {},
  label,
}: {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  label: string;
}) => {
  const { t } = useTranslation();
  const [internalCurrentPage, setInternalCurrentPage] =
    useState(externalCurrentPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setInternalCurrentPage(externalCurrentPage);
  }, [externalCurrentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(
      1,
      internalCurrentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          variant={page === internalCurrentPage ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    }

    return buttons;
  };

  return totalPages > 1 ? (
    <div className="flex justify-between items-center mt-5 md:flex-row flex-col gap-3">
      <span>
        {`${internalCurrentPage * itemsPerPage - itemsPerPage + 1} ${t(
          "pagination.to"
        )} ${Math.min(internalCurrentPage * itemsPerPage, totalItems)} ${t(
          "pagination.of"
        )} ${totalItems} ${label}`}
      </span>
      <div className="flex gap-3 items-center">
        <Button
          variant="default"
          disabled={internalCurrentPage === 1}
          onClick={() => handlePageChange(internalCurrentPage - 1)}
          aria-label={t("pagination.previous")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">{renderPageButtons()}</div>
        <Button
          variant="default"
          disabled={internalCurrentPage === totalPages}
          onClick={() => handlePageChange(internalCurrentPage + 1)}
          aria-label={t("pagination.next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ) : (
    <p className="mt-2">
      {totalItems} {label}
    </p>
  );
};

export default Pagination;
