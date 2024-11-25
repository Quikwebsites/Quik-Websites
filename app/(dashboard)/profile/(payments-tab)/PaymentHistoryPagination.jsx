import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function PaymentHistoryPagination({ data }) {
  const pageCount = data.getPageCount();

  const activePageIndex = data.getState().pagination.pageIndex;
  const sliceFrom =
    activePageIndex === 0 || activePageIndex === 1
      ? 0
      : activePageIndex + 3 >= pageCount
        ? pageCount - 3
        : activePageIndex - 1;
  const sliceTo = activePageIndex + 3 >= pageCount ? undefined : sliceFrom + 3;
  const paginationItems = data.getPageOptions().slice(sliceFrom, sliceTo);

  return (
    <Pagination className="mt-6 w-full text-xs">
      <PaginationContent>
        <PaginationItem className="mr-auto">
          <PaginationPrevious
            onClick={() => data.previousPage()}
            disabled={!data.getCanPreviousPage()}
          />
        </PaginationItem>

        {pageCount >= 2 &&
          paginationItems.map((pageIdx) => (
            <PaginationItem
              key={pageIdx}
              onClick={() => data.setPageIndex(pageIdx)}
              className={`${activePageIndex === pageIdx && "bg-brand5 font-bold"}`}
            >
              <PaginationLink isActive={activePageIndex === pageIdx}>
                {pageIdx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {pageCount > 4 && pageCount > activePageIndex + 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => data.lastPage()}>
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem className="ml-auto">
          <PaginationNext
            onClick={() => data.getCanNextPage() && data.nextPage()}
            disabled={!data.getCanNextPage()}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
