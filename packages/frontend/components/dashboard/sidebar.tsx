import { IconBook, IconHome, IconSettings } from "@tabler/icons-react";
import {
  MdOutlinePayments,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import Link from "next/link";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <aside className="border-r dark:border-slate-600 border-slate-150 fixed h-screen w-[300px] top-0 pt-[69px] z-10 dark:bg-[#121212] bg-white">
      <div className="h-full flex flex-col">
        <ul className="flex flex-col gap-6 p-4 text-sm">
          <Link href="/dashboard">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <IconHome size={20} />
              <span>Home</span>
            </li>
          </Link>
          <Link href="/dashboard/payments">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <MdOutlinePayments size={20} />
              <span>Payments</span>
            </li>
          </Link>
          <Link href="/dashboard/balance">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <MdOutlineAccountBalanceWallet size={20} />
              <span>Balance</span>
            </li>
          </Link>
          <Link href="/dasboard/customers">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <LuUsers2 size={20} />
              <span>Customer{"'"}s</span>
            </li>
          </Link>
          <Link href="/dashboard/products">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <BsBoxSeam size={20} />
              <span>Products</span>
            </li>
          </Link>
          <Link href="/dashboard/reports">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <TbReportSearch size={20} />
              <span>Reports</span>
            </li>
          </Link>
          <Link href="/dashboard/errors">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <BiError size={20} />
              <span>Errors</span>
            </li>
          </Link>
        </ul>
        <ul className="flex flex-col gap-6 p-4 text-sm mt-auto">
          <Link href="/dashboard/settings">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <IconSettings size={22} />
              <span>Settings</span>
            </li>
          </Link>
          <Link href="/documentation">
            <li className="flex items-center gap-2 hover:text-sky-500 transition-all">
              <IconBook size={20} />
              <span>Documentation</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}
