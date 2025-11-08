// components/AppFilters.tsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  appType: string;
  setAppType: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  appText: Map<string, string>;
}

export function AppFilters({
  searchTerm,
  setSearchTerm,
  appType,
  setAppType,
  sort,
  setSort,
  appText,
}: Props) {
  return (
    <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
      <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
        <Input
          placeholder="Filter apps..."
          className="h-9 w-40 lg:w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={appType} onValueChange={setAppType}>
          <SelectTrigger className="w-36">
            <SelectValue>{appText.get(appType)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Apps</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="notConnected">Not Connected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-16">
          <SelectValue>
            <IconAdjustmentsHorizontal size={18} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="ascending">Ascending</SelectItem>
          <SelectItem value="descending">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}