"use client";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
export default function Hero() {
  const { resolvedTheme } = useTheme();
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:items-center justfiy-center gap-4 px-4 lg:py-32 py-16">
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="!text-sky-500 text-[17.5px]"
      >
        Build product for everyone
      </motion.span>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="lg:text-[40px] text-4xl leading-[45px] font-bold lg:text-center"
      >
        Best payment gateway solution for
        <br />
        <span className="bg-gradient-to-r from-green-500 to-sky-500 text-transparent inline-block bg-clip-text">
          SaaS Business
        </span>
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="max-w-xl lg:text-center text-[17.5px] leading-8 dark:text-white text-slate-700"
      >
        We support all banks in the world, except for Israel banks, and offer
        secure, fast payment options for cryptocurrencies and e-wallets.
      </motion.p>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="flex items-center gap-4"
      >
        <a href="/docs">
          <button className="py-3 px-5 bg-white dark:bg-[#121212] dark:border-white border-2 border rounded-md">
            Read Docs
          </button>
        </a>
        <a href="/signup">
          <button className="py-3 px-5 bg-gradient-to-r from-green-500 to-sky-500 flex items-center gap-1 text-white rounded-md hover:shadow-lg transition-all duration-300">
            Get Started <IconArrowRight size={18} />
          </button>
        </a>
      </motion.div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="relative"
      >
        <Image
          src={
            resolvedTheme === "dark"
              ? "/jamalipay-browser-mockup-dark.svg"
              : "/jamalipay-browser-mockup-light.svg"
          }
          className="drop-shadow-2xl mt-8 z-20 relative"
          width={1248}
          height={764}
          alt="jamalipay_browser_mockup"
        />
        <Image
          src={
            resolvedTheme === "dark"
              ? "/dots_pattern_dark_mode.svg"
              : "/dots_pattern_light_mode.svg"
          }
          width={250}
          height={250}
          className="opacity-80 absolute z-10 lg:bottom-[400px] -bottom-14 left-4 lg:-left-10 drop-shadow-2xl lg:w-[250px] w-[150px]"
          alt="dots_pattern"
        />
        <Image
          src={
            resolvedTheme === "dark"
              ? "/dots_pattern_dark_mode.svg"
              : "/dots_pattern_light_mode.svg"
          }
          width={250}
          height={250}
          className="opacity-80 absolute z-10 max-lg:top-0 right-2 lg:bottom-20 lg:-right-10  drop-shadow-2xl lg:w-[250px] w-[150px]"
          alt="dots_pattern"
        />
      </motion.div>
    </section>
  );
}
