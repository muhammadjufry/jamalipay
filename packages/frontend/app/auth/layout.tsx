import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <Image src="/logo.png" width={80} height={80} alt="logo" />
      {children}
    </div>
  );
}

export default Layout;
