"use client";

import { ArrowUpDown, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const paymentHistoryColumns = [
  {
    accessorKey: "transaction",
    header: "Transactions",
    size: "20%",
    cell: ({ row }) => {
      return (
        <div className="*w-[180px] *md:w-[260px] flex items-center gap-2 font-medium capitalize">
          <Image
            src="/icons/ion_card-outline.svg"
            alt="credit card icon"
            height={40}
            width={40}
            className="rounded-full bg-brand5 p-2"
          />
          <p>{row.getValue("transaction")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-base font-bold text-gray80"
        >
          Amount
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div className="">{format(date, "P")}</div>;
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const rowValue = row.getValue("category");
      const variant =
        rowValue === "accepted"
          ? "success"
          : rowValue === "rejected"
            ? "destructive"
            : "warning";
      return (
        <div className="">
          <Badge variant={variant}>{rowValue}</Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => {
      const account = row.getValue("account");
      return (
        <div className="*w-[180px] flex w-full items-center gap-3 py-0.5">
          <Image
            src={account?.icon}
            alt={account?.type + "logo"}
            width={36}
            height={36}
            className="w-[36px] object-contain object-center"
          />
          <div className="s">
            <p className="font-medium">
              <span>{account?.type} </span>
              <span>{account?.number}</span>
            </p>
            <p className="text-base font-normal">
              <span>Expires in </span>
              <span>{account?.expires}</span>
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "edit",
    header: "",
    id: "edit",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="*w-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 outline-none focus-visible:ring-transparent"
              >
                <span className="sr-only">Open menu</span>
                <Pencil className="h-5 w-5 text-gray60" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Edit</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Request edits
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View transaction</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
