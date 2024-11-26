"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";

export default function PaymentHistoryHeader({ table }) {
  const [date, setDate] = useState();

  useEffect(() => {
    if (date) {
      table.getColumn("date")?.setFilterValue(format(date, "P"));
    } else {
      table.resetColumnFilters(table.getColumn("date"));
    }
  }, [date]);

  console.log(date);
  return (
    <div className="flex w-full justify-between">
      <p className="mb-2 text-lg font-bold tracking-tight text-gray80">
        Payment History
      </p>

      <div className="flex gap-2">
        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-[160px] items-center justify-start gap-2 px-[16px] py-2.5 text-left text-base font-[450] text-gray60">
              <CalendarIcon size={20} />
              <p className="pt-0.5">
                {date ? format(date, "PP") : <span>Choose Date</span>}
              </p>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="ml-auto text-base font-[450]"
            >
              <ListFilter size={20} /> Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
