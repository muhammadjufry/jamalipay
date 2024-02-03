import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth, signOut } from "@/auth";
import { DatePicker } from "@/components/dashboard/date-picker";
import { Chart } from "@/components/dashboard/chart";
type Props = {};

async function Page({}: Props) {
  const session = await auth();

  const logout = async () => {
    "use server";
    await signOut();
  };

  const groups = [
    {
      label: "Personal Account",
      list: [
        {
          name: session?.user?.name || "",
          value: session?.user?.name?.toLowerCase() || "",
        },
      ],
    },
    {
      label: "Teams",
      list: [
        {
          name: "Jamali Shop",
          value: "jamali-shop",
        },
        {
          name: "Jamali TV",
          value: "jamali-tv",
        },
      ],
    },
  ];

  const totalRevenueChartData = [
    {
      date: "1 Jan",
      value: 1231,
    },
    {
      date: "2 Jan",
      value: 2561,
    },
    {
      date: "3 Jan",
      value: 531,
    },
    {
      date: "4 Jan",
      value: 2241,
    },
    {
      date: "5 Jan",
      value: 6861,
    },
    {
      date: "6 Jan",
      value: 3231,
    },
    {
      date: "7 Jan",
      value: 1254,
    },
    {
      date: "8 Jan",
      value: 987,
    },
    {
      date: "9 Jan",
      value: 554,
    },
    {
      date: "10 Jan",
      value: 3254,
    },
    {
      date: "11 Jan",
      value: 2143,
    },
    {
      date: "12 Jan",
      value: 1218,
    },
    {
      date: "13 Jan",
      value: 4511,
    },
    {
      date: "14 Jan",
      value: 2158,
    },
    {
      date: "15 Jan",
      value: 200,
    },
  ];

  const salesChartData = [
    {
      date: "1 Jan",
      value: 124,
    },
    {
      date: "2 Jan",
      value: 324,
    },
    {
      date: "3 Jan",
      value: 224,
    },
    {
      date: "4 Jan",
      value: 54,
    },
    {
      date: "5 Jan",
      value: 500,
    },
    {
      date: "6 Jan",
      value: 102,
    },
    {
      date: "7 Jan",
      value: 551,
    },
    {
      date: "8 Jan",
      value: 251,
    },
    {
      date: "9 Jan",
      value: 231,
    },
    {
      date: "10 Jan",
      value: 54,
    },
    {
      date: "11 Jan",
      value: 150,
    },
    {
      date: "12 Jan",
      value: 200,
    },
  ];

  const transactionChartData = [
    {
      date: "1 Jan",
      value: 400,
    },
    {
      date: "2 Jan",
      value: 100,
    },
    {
      date: "3 Jan",
      value: 223,
    },
    {
      date: "4 Jan",
      value: 54,
    },
    {
      date: "5 Jan",
      value: 121,
    },
    {
      date: "6 Jan",
      value: 234,
    },
    {
      date: "7 Jan",
      value: 42,
    },
    {
      date: "8 Jan",
      value: 251,
    },
    {
      date: "9 Jan",
      value: 231,
    },
    {
      date: "10 Jan",
      value: 54,
    },
    {
      date: "11 Jan",
      value: 150,
    },
    {
      date: "12 Jan",
      value: 200,
    },
  ];

  const newCustomersChartData = [
    {
      date: "1 Jan",
      value: 100,
    },
    {
      date: "2 Jan",
      value: 153,
    },
    {
      date: "3 Jan",
      value: 556,
    },
    {
      date: "4 Jan",
      value: 881,
    },
    {
      date: "5 Jan",
      value: 1450,
    },
    {
      date: "6 Jan",
      value: 3350,
    },
    {
      date: "7 Jan",
      value: 4014,
    },
    {
      date: "8 Jan",
      value: 251,
    },
    {
      date: "9 Jan",
      value: 231,
    },
    {
      date: "10 Jan",
      value: 54,
    },
    {
      date: "11 Jan",
      value: 150,
    },
    {
      date: "12 Jan",
      value: 200,
    },
  ];

  if (!session) {
    return logout();
  }
  return (
    <>
      <Header groups={groups} userData={session.user} />
      <section className="grid grid-cols-[300px_1fr] mt-[69px]">
        <div className="w-full">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="border-b p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between w-full gap-4">
                <h2 className="text-[22px] font-semibold">Total Revenue</h2>
                <DatePicker />
              </div>
              <span className="text-lg text-sky-500">$32,950</span>
            </div>
            <Chart
              isAmount={true}
              data={totalRevenueChartData}
              tooltipName="Amount"
            />
          </div>
          <div className="border-b">
            <div className="flex flex-col gap-2 p-4">
              <h2 className="text-[22px] font-semibold">Report summary</h2>
              <DatePicker className="mb-1" />
            </div>
            <ul className="grid lg:grid-cols-3">
              <li className="p-4 flex flex-col gap-2 border-r border-t">
                <div className="flex items-center gap-2">
                  <span className="text-md">Sales</span>
                  <div className="bg-green-300 py-1 px-2 text-green-700 text-sm rounded-full">
                    <b>+4.6%</b>
                  </div>
                </div>
                <h2 className="text-sky-500 text-lg">$5,320</h2>
                <Chart
                  isAmount={true}
                  data={salesChartData}
                  height={170}
                  tooltipName="Amount"
                />
              </li>
              <li className="p-4 flex flex-col gap-2 border-r border-t">
                <div className="flex items-center gap-2">
                  <span className="text-md">Transactions</span>
                  <div className="bg-green-300 py-1 px-2 text-green-700 text-sm rounded-full">
                    <b>+2.6%</b>
                  </div>
                </div>
                <h2 className="text-sky-500 text-lg">$3,320</h2>
                <Chart
                  isAmount={true}
                  data={transactionChartData}
                  height={170}
                  tooltipName="Amount"
                />
              </li>
              <li className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-md">New customers</span>
                  <div className="bg-green-300 py-1 px-2 text-green-700 text-sm rounded-full">
                    <b>+21.2%</b>
                  </div>
                </div>
                <h2 className="text-sky-500 text-lg">11,200</h2>
                <Chart
                  isAmount={false}
                  data={newCustomersChartData}
                  height={170}
                  tooltipName="New Customers"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
