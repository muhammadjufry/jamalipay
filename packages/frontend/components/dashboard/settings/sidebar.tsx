import Link from "next/link";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <aside className="border-r h-screen fixed w-[300px] bg-white dark:bg-[#121212] p-4">
      <ul className="flex flex-col gap-6">
        <Link href="/dashboard/settings">
          <li className="underline">Profile</li>
        </Link>
        <Link href="/dashboard/settings?tab=account">
          <li className="hover:underline">Account</li>
        </Link>
        <Link href="/dashboard/settings?tab=payment-method">
          <li className="hover:underline">Payment method</li>
        </Link>
        <Link href="/dashboard/settings?tab=appearance">
          <li className="hover:underline">Appearance</li>
        </Link>
        <Link href="/dashboard/settings?tab=notifications">
          <li className="hover:underline">Notifications</li>
        </Link>
      </ul>
    </aside>
  );
}
