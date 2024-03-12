"use client";
import { motion } from "framer-motion";
import { IconArrowRight, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { NavigationMenu0 } from "@/components/menu-header/NavigationMenu0";
import { NavigationMenu1 } from "@/components/menu-header/NavigationMenu1";
import { NavigationMenu2 } from "@/components/menu-header/NavigationMenu2";
import MenuSlideWrapper from "@/components/MenuSlideWrapper";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
// import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Props = {
  session: Session | null;
};

function Header({ session }: Props) {
  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverLeft, setPopoverLeft] = useState<number | null>(null);
  const [popoverHeight, setPopoverHeight] = useState<number | null>(null);
  const [menuOffsetHeights, setMenuOffsetHeights] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOnMouseEnter = (index: number, el: HTMLElement) => {
    setHovering(index);
    setPopoverLeft(el.offsetLeft);
    const menuOffsetHeight = menuOffsetHeights[index];
    if (menuOffsetHeight) {
      setPopoverHeight(menuOffsetHeight + 32);
    }
  };
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full border-b z-30 bg-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-4">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <ul
          onMouseLeave={() => setHovering(null)}
          className={`${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          } flex lg:items-center lg:gap-4 lg:relative absolute lg:top-0 top-[83px] left-0 lg:flex-row flex-col w-full lg:w-fit lg:p-0 p-2 gap-4 lg:drop-shadow-none lg:opacity-100 lg:visible drop-shadow-xl transition-all duration-300 bg-white`}
        >
          <li
            className="cursor-pointer max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300"
            onMouseEnter={(event) => menuOnMouseEnter(0, event.currentTarget)}
          >
            Products
          </li>
          <li
            className="cursor-pointer max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300"
            onMouseEnter={(event) => menuOnMouseEnter(1, event.currentTarget)}
          >
            Solutions
          </li>
          <li
            className="cursor-pointer max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300"
            onMouseEnter={(event) => menuOnMouseEnter(2, event.currentTarget)}
          >
            Resources
          </li>
          <Link href="/docs" onMouseEnter={() => setHovering(null)}>
            <li className="max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300">
              Docs
            </li>
          </Link>
          <Link href="/pricing" onMouseEnter={() => setHovering(null)}>
            <li className="max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300">
              Pricing
            </li>
          </Link>
          {/* {session !== null ? (
            <>
              <li
                className="max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300 cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </li>
              <Link href="/dashboard" className="lg:hidden">
                <li className="max-lg:text-lg text-md p-2 px-3">
                  <button className="py-3 px-5 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1">
                    Dashboard
                    <IconArrowRight size={18} />
                  </button>
                </li>
              </Link>
            </>
          ) : (
          <>*/}

          {/* <li className="max-lg:text-lg text-md dark:hover:bg-gray-800 hover:bg-slate-100 p-2 px-3 rounded-md transition-all duration-300">
            Login
          </li> */}
          <AlertDialog>
            <AlertDialogTrigger className="lg:hidden">
              <li className="max-lg:text-lg text-md p-2 px-3">
                <button className="py-3 px-5 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1">
                  Get Started
                  <IconArrowRight size={18} />
                </button>
              </li>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sorry</AlertDialogTitle>
                <AlertDialogDescription>
                  We{"'"}re currenly facing some issues in our authentication
                  pages
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* </>
         )}  */}

          <div
            style={{ left: popoverLeft ?? 0, height: popoverHeight ?? 0 }}
            className={clsx(
              "absolute w-[600px] top-[40px] duration-300 transform-gpu -ml-24",
              hovering !== null
                ? "transition-all"
                : "opacity-0 pointer-events-none"
            )}
          >
            <MenuSlideWrapper index={0} hovering={hovering}>
              <NavigationMenu0
                ref={(element: any) => {
                  const currentOffsetHeigtMenus = menuOffsetHeights;
                  currentOffsetHeigtMenus[0] = element?.offsetHeight || 0;
                  setMenuOffsetHeights(currentOffsetHeigtMenus);
                }}
              />
            </MenuSlideWrapper>
            <MenuSlideWrapper index={1} hovering={hovering}>
              <NavigationMenu1
                ref={(element: any) => {
                  const currentOffsetHeigtMenus = menuOffsetHeights;
                  currentOffsetHeigtMenus[1] = element?.offsetHeight || 0;
                  setMenuOffsetHeights(currentOffsetHeigtMenus);
                }}
              />
            </MenuSlideWrapper>
            <MenuSlideWrapper index={2} hovering={hovering}>
              <NavigationMenu2
                ref={(element: any) => {
                  const currentOffsetHeigtMenus = menuOffsetHeights;
                  currentOffsetHeigtMenus[2] = element?.offsetHeight || 0;
                  setMenuOffsetHeights(currentOffsetHeigtMenus);
                }}
              />
            </MenuSlideWrapper>
          </div>
        </ul>
        <div className="items-center gap-8 lg:flex hidden">
          {/* {session !== null ? (
            <>
              <Link href="/dashboard">
                <button className="py-3 px-5 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1">
                  Dashboard
                  <IconArrowRight size={18} />
                </button>
              </Link>
              <button className="w-fit" onClick={() => signOut()}>
                Logout
              </button>
            </>
          ) : (
            <> */}
          {/* <Link href="/auth/login">
            <button>Login</button>
          </Link> */}
          {/* <Link href="/auth/register"> */}
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="py-3 px-5 bg-gradient-to-r from-green-500 to-sky-500 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1">
                Get Started
                <IconArrowRight size={18} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sorry</AlertDialogTitle>
                <AlertDialogDescription>
                  We{"'"}re currenly facing some issues in our authentication
                  pages
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* </Link> */}
          {/* </>
          )} */}
        </div>
        <button
          className="bg-gradient-to-r from-green-500 to-sky-500 text-white p-3 rounded-full cursor-pointer lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? <IconMenu2 size={23} /> : <IconX size={23} />}
        </button>
      </div>
    </motion.header>
  );
}

export default Header;
