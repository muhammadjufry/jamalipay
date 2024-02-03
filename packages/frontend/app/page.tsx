import { auth } from "@/auth";
import BanksTicker from "@/components/BanksTicker";
import Feature from "@/components/Feature";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  IconEdit,
  IconBusinessplan,
  IconDeviceAnalytics,
  IconBolt,
  IconCreditCardPay,
  IconCurrency,
  IconDeviceMobile,
  IconPlugConnected,
  IconShieldLock,
} from "@tabler/icons-react";

async function Home() {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      <main className="lg:mt-[81px] mt-[80px]">
        <Hero />
        <div className="text-center flex flex-col gap-10">
          <h2 className="text-2xl font-bold text-black dark:text-white text-shadow p-4">
            We support all banks in the world execpt Israel banks
          </h2>
          <BanksTicker />
        </div>
        <div className="py-28 flex flex-col gap-28">
          <Feature
            layout="2-grid"
            icon={<IconCreditCardPay size={26} className="text-green-500" />}
            iconTitle="Payments"
            title="Pay and accept through all payments method globally"
            descriptionOrFeatures="Pay and accept all payments using various methods, like banks, e-wallets and cryptocurrencies with fast perfomance and secure"
            linkText="Learn more"
          />
          <Feature
            layout="2-grid"
            icon={<IconPlugConnected size={26} className="text-green-500" />}
            iconTitle="Connect"
            title="Connect easily to your web using low-code or no-code"
            descriptionOrFeatures="Easily integrate to your web using no-code tools like Webflow, Bubble, etc or use ready made packages"
            linkText="Learn more"
          />
          <Feature
            layout="2-grid"
            icon={<IconBusinessplan size={26} className="text-green-500" />}
            iconTitle="Subscriptions"
            title="Add custom subscription to your website easily and secure"
            descriptionOrFeatures="Add/Customize your own subscribtions to your website easily fast and secure"
            linkText="Learn more"
          />
          <Feature
            layout="navs"
            icon={<IconBusinessplan size={26} className="text-green-500" />}
            iconTitle="Subscriptions"
            title="We offer"
            descriptionOrFeatures={[
              {
                backgroundColor: "bg-sky-200",
                icon: <IconBolt size={40} className="text-sky-500" />,
                title: "Fast perfomance",
                description:
                  "We ensures quick and efficient transactions, minimizing wait times for users.",
              },
              {
                backgroundColor: "bg-green-200",
                icon: <IconShieldLock size={40} className="text-green-500" />,
                title: "Secure",
                description:
                  "We offer secure payments globally against attacker/hacker",
              },
              {
                backgroundColor: "bg-indigo-200",
                icon: (
                  <IconDeviceMobile size={40} className="text-indigo-500" />
                ),
                title: "Mobile optimized",
                description:
                  "Work flawlessly on mobile devices, ensuring a consistent user experience across platforms.",
              },
              {
                backgroundColor: "bg-orange-200",
                icon: <IconCurrency size={40} className="text-orange-500" />,
                title: "Multiple currencies supported",
                description:
                  "Send and received money using multiple currencies",
              },
              {
                backgroundColor: "bg-red-200",
                icon: (
                  <IconDeviceAnalytics size={40} className="text-red-500" />
                ),
                title: "Advanced Analytics",
                description:
                  "Use our advanced analytics dashboard to see your company perfomance",
              },
              {
                backgroundColor: "bg-slate-200",
                icon: <IconEdit size={40} className="text-slate-500" />,
                title: "White-labelled Solutions",
                description:
                  "We allow businesses to brand their payment gateway with their own logo and customizations",
              },
            ]}
            linkText="Learn more"
          />
        </div>
      </main>
    </>
  );
}

export default Home;
