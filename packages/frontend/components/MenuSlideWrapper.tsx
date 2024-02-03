import clsx from "clsx";

type Props = {
  index: number;
  hovering: number | null;
  children: React.ReactNode;
};

function MenuSlideWrapper({ index, hovering, children }: Props) {
  return (
    <div
      className={clsx(
        "absolute left-0 top-[15px] border rounded-md shadow p-4 w-full transition-all duration-300 h-full dark:bg-gray-700 bg-white",
        hovering === index ? "opacity-100" : "opacity-0 pointer-events-none",
        hovering === index
          ? "transform-none"
          : hovering! > index
          ? "-translate-x-24"
          : "translate-x-24"
      )}
    >
      {children}
    </div>
  );
}

export default MenuSlideWrapper;
