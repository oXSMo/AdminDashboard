import React from "react";
import {
  MdAdd,
  MdCancelPresentation,
  MdOutlinePendingActions,
  MdStoreMallDirectory,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { UserCard } from "../Users/UserOverview";
import { FcShipped } from "react-icons/fc";
import { usetGetLatesOrders } from "../../Hooks/useDashboard";
import OrdersTable from "./OrdersTable";

function OrdersOverview() {
  const { loading, orders } = usetGetLatesOrders();

  return (
    <main className="space-y-4">
      {/* HEADER  */}
      <header className="flex justify-between ">
        <h1 className="font-bold tracking-wide text-xl">Orders</h1>
        <Link
          to="/addOrder"
          className="flex gap-2 button bg-blue-600  text-sm !px-3 !pr-4 text-white"
        >
          <MdAdd /> Add Order
        </Link>
      </header>
      <section className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <UserCard
          color="#2563eb"
          tooltip="All orders"
          total={orders?.all}
          users={[]}
          title="Total Orders"
          icon={<MdStoreMallDirectory />}
        />
        <UserCard
          color="#fdba74"
          tooltip="Orders you working on "
          total={orders?.pending}
          users={[]}
          title="Pending Orders"
          icon={<MdOutlinePendingActions />}
        />
        <UserCard
          color="#16a34a"
          tooltip="Orders Are done"
          total={orders?.shipped}
          users={[]}
          title="Shipped Orders"
          icon={<FcShipped />}
        />
        <UserCard
          color="#dc2626"
          tooltip="Filed Orders"
          total={orders?.cancelled}
          users={[]}
          title="Cancelled Orders"
          icon={<MdCancelPresentation />}
        />
      </section>

      <OrdersTable />
    </main>
  );
}

export default OrdersOverview;
