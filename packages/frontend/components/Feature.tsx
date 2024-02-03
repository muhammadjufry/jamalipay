"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  layout: "2-grid" | "navs";
  icon: React.ReactNode;
  iconTitle: string;
  title: string;
  descriptionOrFeatures:
    | string
    | {
        backgroundColor: string;
        icon: React.ReactNode;
        title: string;
        description: string;
      }[];
  image?: string;
  linkText?: string;
};

function Feature({
  layout,
  icon,
  iconTitle,
  title,
  descriptionOrFeatures,
  image,
  linkText,
}: Props) {
  return (
    <section
      className={`max-w-7xl mx-auto p-4 w-full ${
        layout === "2-grid" ? "lg:grid grid-cols-2" : "flex flex-col gap-4"
      } items-center gap-6`}
    >
      {layout === "navs" && descriptionOrFeatures instanceof Array ? (
        <>
          <h2 className="text-3xl font-bold leading-[45px] dark:text-white text-gray-800">
            {title}
          </h2>
          <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
            {descriptionOrFeatures.map((list, index) => (
              <li
                className="flex flex-col gap-6 rounded-lg border dark:border-slate-600 border-slate-200 p-6 w-full cursor-pointer hover:shadow-lg group transition-all duration-300"
                key={index}
              >
                <div
                  className={`${list.backgroundColor} w-fit p-3 rounded-lg group-hover:scale-110 transition-all duration-300`}
                >
                  {list.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-all duration-300">
                    {list.title}
                  </h2>
                  <p className="text-slate-500 text-[17px] leading-8 dark:text-slate-300">
                    {list.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-md">{iconTitle}</span>
            </div>
            <h2 className="text-3xl font-bold leading-[45px] dark:text-white text-gray-800">
              {title}
            </h2>
            <p className="text-lg text-slate-500 leading-10 dark:text-slate-300">
              {typeof descriptionOrFeatures === "string" &&
                descriptionOrFeatures}
            </p>
            {linkText && linkText.length > 0 && (
              <a
                href="#"
                className="dark:text-white text-sky-500 font-bold text-md border-b-4 hover:drop-shadow-md transition-all duration-300 border-green-500 w-fit"
              >
                {linkText}
              </a>
            )}
          </div>
          <div className="w-full h-full">
            {image && (
              <Image src={image} alt="feature_image" width={500} height={500} />
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Feature;
