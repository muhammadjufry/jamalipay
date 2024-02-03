"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Props = {
  groups: {
    label: string;
    list: {
      name: string;
      value: string;
    }[];
  }[];
  defaultValue: string | undefined;
};

export function TeamSwitcher({ groups, defaultValue }: Props) {
  const [defaultVal, _] = useState(defaultValue);
  return (
    <Select defaultValue={defaultVal}>
      <SelectTrigger>
        <SelectValue placeholder="Select team" />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group, index) => (
          <SelectGroup key={index}>
            <SelectLabel className="text-slate-400">{group.label}</SelectLabel>
            {group.list.map((groupList, index) => (
              <SelectItem value={groupList.value} key={index}>
                {groupList.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
