import React from "react";
import AdminLayout from "@/components/Admin/AdminLayout";
import CardDataStats from "@/components/Admin/CardDataStats";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChartOne from "@/components/Admin/Charts/ChartOne";
import ChartTwo from "@/components/Admin/Charts/ChartTwo";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsCart, BsBoxes, BsCashCoin } from "react-icons/bs";

const Dashboard = () => {
  const token = cookies().get("mobiapp-session")?.value;
  if (!token) {
    redirect("/user/login");
  }
  return (
    <>
      <AdminLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Annual Profit"
            total="0.85M"
            rate="0.43%"
            levelUp
          >
            <BsCashCoin className="w-6 h-6 fill-primary dark:fill-white" />
          </CardDataStats>
          <CardDataStats
            title="Annual Sales"
            total="3.21M"
            rate="4.35%"
            levelUp
          >
            <BsCart className="w-6 h-6 fill-primary dark:fill-white" />
          </CardDataStats>
          <CardDataStats
            title="Available Stock"
            total="1.45M"
            rate="2.59%"
            levelUp
          >
            <BsBoxes className="w-6 h-6 fill-primary dark:fill-white" />
          </CardDataStats>
          <CardDataStats
            title="Cash in Hand"
            total="120.23k"
            rate="0.95%"
            levelDown
          >
            <GiTakeMyMoney className="w-6 h-6 fill-primary dark:fill-white" />
          </CardDataStats>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
