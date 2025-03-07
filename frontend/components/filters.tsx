"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddNew } from "./new-ticket-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
// import { ThemeToggle } from "./theme-toggle";

const Filters = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilterChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("status", value);
      console.log(pathname, params.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );
  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-accent-foreground">Filter</span>
        <Select defaultValue="all" onValueChange={handleFilterChange}>
          <SelectTrigger className="h-8 w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">
              <span
                className="size-1.5 rounded-full bg-yellow-500"
                aria-hidden="true"
              ></span>
              Open
            </SelectItem>
            <SelectItem value="in-progress">
              <span
                className="size-1.5 rounded-full bg-blue-500"
                aria-hidden="true"
              ></span>
              In Progress
            </SelectItem>
            <SelectItem value="closed">
              <span
                className="size-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              ></span>
              Closed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3">
        <AddNew />
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Filters;
