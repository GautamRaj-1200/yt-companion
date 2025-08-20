import React from "react";
import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  return (
    <>
      <section className="my-8 px-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Channel Dashboard</h1>
        <h3 className="text-[var(--accent)]">
          Welcome back, {session?.user?.name}! Here&apos;s a quick overview of
          your channel&apos;s performance and recent activity.
        </h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 sm:gap-4 gap-2">
          <div className="bg-[#f2e8e8] text-[#1c0d0d] px-6 py-4 rounded-md flex flex-col gap-1">
            <p className="text-sm">Subscribers</p>
            <p className="text-xl font-bold">1.2K</p>
          </div>
          <div className="bg-[#f2e8e8] text-[#1c0d0d] px-6 py-4 rounded-md flex flex-col gap-1">
            <p className="text-sm">Video views</p>
            <p className="text-xl font-bold">12.5K</p>
          </div>
          <div className="bg-[#f2e8e8] text-[#1c0d0d] px-6 py-4 rounded-md flex flex-col gap-1">
            <p className="text-sm">Video Watch Time(hours)</p>
            <p className="text-xl font-bold">12.5K</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
