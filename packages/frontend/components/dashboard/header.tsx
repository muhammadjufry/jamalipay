"use client";
import { IconLogout, IconSearch } from "@tabler/icons-react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
  IoMdNotificationsOutline,
  IoIosHelpCircleOutline,
} from "react-icons/io";
import { User } from "next-auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TeamSwitcher } from "./team-switcher";
import { signOut } from "next-auth/react";

type Props = {
  groups: {
    label: string;
    list: {
      name: string;
      value: string;
    }[];
  }[];
  userData?: User | undefined;
};

export async function Header({ groups, userData }: Props) {
  return (
    <header className="w-full border-b fixed top-0 left-0 dark:bg-[#121212] bg-white z-50">
      <div className="flex justify-between items-center gap-4">
        <div className="grid grid-cols-[300px_1fr] w-full">
          <div className="p-4 w-full border-r">
            <TeamSwitcher
              groups={groups}
              defaultValue={userData?.name?.toLowerCase()}
            />
          </div>
          <form className="flex items-center p-4 w-full">
            <Input
              placeholder="Search..."
              className="w-full max-w-[500px] rounded-r-none border-r-0 focus-visible:ring-0"
            />
            <Button variant="outline" size="icon" className="rounded-l-none">
              <IconSearch className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-end gap-6 p-4 h-full">
          <div className="w-fit h-fit relative cursor-pointer hover:drop-shadow-lg transition-all duration-300">
            <IoMdNotificationsOutline size={26} />
            <div className="absolute w-4 h-4 flex items-center justify-center -top-[4px] -right-[2px] bg-black text-white text-[9px] rounded-full">
              <span>1</span>
            </div>
          </div>
          <Link href={"/help"}>
            <IoIosHelpCircleOutline size={30} />
          </Link>
          {userData && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {userData.image ? (
                  <Image
                    src={userData.image}
                    alt="user_profile"
                    width={43}
                    height={43}
                    className="rounded-full cursor-pointer hover:drop-shadow-lg transition-all duration-300"
                  />
                ) : (
                  <HiOutlineUserCircle size={30} />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-8 w-[200px]">
                <DropdownMenuLabel>{userData.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="#">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="#">
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <Link href="#">
                  <DropdownMenuItem className="cursor-pointer">
                    Team
                  </DropdownMenuItem>
                </Link>
                <Link href="#">
                  <DropdownMenuItem className="cursor-pointer">
                    Business
                  </DropdownMenuItem>
                </Link>
                <Link href="#">
                  <DropdownMenuItem className="cursor-pointer">
                    Payment method
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="border-t cursor-pointer">
                  <form action={() => signOut()}>
                    <button type="submit" className="flex items-center gap-2">
                      <span>Logout</span> <IconLogout className="w-4 h-4" />
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
