import { IconTriangleFilled } from "@tabler/icons-react";
import { forwardRef } from "react";

export const NavigationMenu0 = forwardRef<HTMLUListElement>(function Menu0(
  _,
  ref
) {
  return (
    <ul ref={ref} className="grid grid-cols-2 gap-4">
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300 relative">
          <IconTriangleFilled
            className="absolute left-[40%] -top-[30px] dark:text-white text-white drop-shadow"
            size={15}
          />
          <h2 className="text-base dark:text-white text-slate-700">Checkout</h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            High perfomance and secure checkout for SaaS
          </p>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">Elements</h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            Prebuilt payments page
          </p>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Payment Link
          </h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            No-Code Payment
          </p>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">Payments</h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            All in one payment tools
          </p>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Invoicing
          </h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            Recurring, automated B2B and B2C billing
          </p>
        </li>
      </a>
      <a href="#">
        <li className="p-2 dark:hover:bg-gray-800 h-full w-full hover:bg-slate-100 rounded-lg transition-all duration-300">
          <h2 className="text-base dark:text-white text-slate-700">
            Subscribtions
          </h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm">
            Flexible, multi-product subscribtions
          </p>
        </li>
      </a>
    </ul>
  );
});
