import Image from "next/image";

const Loader = () => {
  return (
    <div
      className={`fixed h-screen w-full flex items-center justify-center bg-white z-50 top-0 left-0`}
    >
      <div className="animate-spin relative w-24 h-24 border-4 border-current border-t-transparent text-sky-500 rounded-full"></div>
      <Image
        src="/logo.png"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
        width={50}
        height={50}
        alt="logo"
      />
    </div>
  );
};

export default Loader;
