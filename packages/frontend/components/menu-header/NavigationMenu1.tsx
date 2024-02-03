import { IconTriangleFilled } from "@tabler/icons-react";
import { forwardRef } from "react";

export const NavigationMenu1 = forwardRef<HTMLUListElement>(function Menu1(
  _,
  ref
) {
  return (
    <ul ref={ref} className="grid grid-cols-2 gap-4">
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300 relative">
          <IconTriangleFilled
            className="absolute left-[40%] -top-[30px] dark:text-white text-white drop-shadow"
            size={15}
          />
          <h2 className="text-base dark:text-white text-slate-700">
            Enterprises
          </h2>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">SaaS</h2>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Marketplaces
          </h2>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Automation
          </h2>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Platforms
          </h2>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 w-full h-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Ecommerce
          </h2>
        </li>
      </a>
    </ul>
  );
});
