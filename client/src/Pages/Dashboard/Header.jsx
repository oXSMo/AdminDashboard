import React from "react";
import { MdCheck, MdGroup, MdPayments } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  useGetLatestUsers,
  useGetTotal,
  usetGetLatesOrders,
  usetGetLatesUsers,
} from "../../Hooks/useDashboard";
import { FaBoxes } from "react-icons/fa";
import { BsBag, BsClipboard2 } from "react-icons/bs";
import { useClipboard } from "../../Utils/Hooks";
import { LiaShippingFastSolid } from "react-icons/lia";
import CounterUp from "../../Components/common/CounterUp";
import moment from "moment";
function Header() {
  const { info } = useGetLatestUsers();

  return (
    <section className="grid lg:grid-cols-3 max-w-full gap-6">
      <Users />
      <Orders />
      <TotalSales />
    </section>
  );
}

////////!  USERS  !////////

const Users = () => {
  const { loading, users } = usetGetLatesUsers();

  return (
    <article className="w-full fadeIn border dark:bg-fif h-96 rounded-xl border-color shadow-lg shadow-black/40 grid grid-rows-[1fr_auto_0.5fr_auto]">
      <div className="h-full px-6 p-4">
        <header className="flex justify-between items-center text-2xl ">
          <h1 className="text-[22px] font-medium tracking-wide">Users</h1>
          <MdGroup />
        </header>

        <h1 className="text-4xl flex gap-2 font-semibold mt-2.5">
          {loading ? (
            0
          ) : (
            <CounterUp maxValue={users?.all} duration={1500} steps={150} />
          )}
          <span className="mt-auto opacity-40 text-sm font-normal">user</span>
        </h1>

        {/* PROGRESS  */}

        <aside className="w-full h-2.5 rounded-lg mt-4 flex gap-0.5 overflow-hidden dark:bg-white/5 bg-black/15">
          <ProgressRow
            color="#2563eb"
            total={users?.all || 0}
            role={users?.normal}
            title="Normal"
            loading={loading}
            i={0}
          />

          <ProgressRow
            color="#9333ea"
            total={users?.all || 0}
            role={users?.super}
            title="Super"
            loading={loading}
            i={1}
          />

          <ProgressRow
            color="#4b5563"
            total={users?.all || 0}
            role={users?.admin}
            title="Admin"
            loading={loading}
            i={2}
          />
        </aside>

        <aside className=" mt-5 space-y-4 text-sm font-medium">
          <ProgressItem color="#2563eb" total={users?.normal} title="Normal" />
          <ProgressItem color="#9333ea" total={users?.super} title="Super" />
          <ProgressItem color="#4b5563" total={users?.admin} title="Admin" />
        </aside>

        {/* AVATAR  */}
      </div>

      <h1 className="px-4 mb-1 font-medium tracking-wide">Latest Users</h1>
      <aside className="-space-x-2 flex p-4 pb-4 py-0 items-center">
        {users?.latest?.map((n) => (
          <Avatar name={n} />
        ))}
        <h1 className="opacity-60 text-xs !ml-2">
          {users.all > 5 ? users.all - 5 : 0} more
        </h1>
      </aside>
      {/* VIEW MORE  */}

      <footer className="border-color mt-auto border-t h-10 grid place-content-center">
        <Link
          to="/users"
          className="text-sm font-medium tracking-wide hover:text-blue-500 hover:underline"
        >
          View More
        </Link>
      </footer>
    </article>
  );
};

const ProgressRow = ({ role, color, total, title, loading, i }) => (
  <div
    style={{
      width: loading ? "0%" : `${(role * 100) / total}%`,
      background: color,
      transitionDelay: `${i * 500}ms`,
    }}
    className="h-full duration-700 ease-in-out bg-blue-600 hs-tooltip [--placement:bottom] cursor-pointer hover:opacity-80"
  >
    <span
      style={{ background: color }}
      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2  text-xs font-medium text-white rounded shadow-sm "
      role="tooltip"
    >
      {title}
    </span>
  </div>
);

const ProgressItem = ({ color, total, title, symbol = "User" }) => (
  <div className="flex justify-between">
    <h1 className="flex gap-2 items-center">
      <span
        style={{ background: color }}
        className="w-[12px] h-[12px] rounded-sm "
      />
      {title} {symbol}
    </h1>
    <h2 className="opacity-70 flex items-end gap-1  ">{total}</h2>
  </div>
);

const Avatar = ({ name }) => {
  if (name)
    return (
      <aside className="hs-tooltip cursor-pointer duration-200  bg-color border border-color rounded-full w-8 h-8 grid place-content-center hover:z-20 relative">
        {name[0]}
        <span
          class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2  text-xs bg-color font-medium rounded shadow-lg "
          role="tooltip"
        >
          {name}
        </span>
      </aside>
    );
};

////////!  ORDERS  !////////

const Orders = () => {
  const { loading, orders } = usetGetLatesOrders();

  return (
    <article className="w-full fadeIn border dark:bg-fif h-96 rounded-xl border-color shadow-lg shadow-black/40 grid grid-rows-[1fr_auto_auto]">
      <div className="h-full px-6 p-4 pb-2">
        {/* HEADER  */}
        <header className="flex justify-between items-center text-2xl ">
          <h1 className="text-[22px] font-medium tracking-wide">Orders</h1>
          <FaBoxes />
        </header>

        <h1 className="text-4xl flex gap-2 font-semibold mt-2.5">
          {loading ? (
            0
          ) : (
            <CounterUp maxValue={orders?.all} duration={1500} steps={150} />
          )}
          <span className="mt-auto opacity-40 text-sm font-normal">Order</span>
        </h1>

        {/* PROGRESS BAR  */}
        <aside className="w-full h-2.5 rounded-lg mt-4 flex gap-0.5 overflow-hidden dark:bg-white/5 bg-black/15">
          <ProgressRow
            color="#16a34a"
            total={orders?.all}
            loading={loading}
            i={0}
            role={orders?.shipped}
            title="Shipped"
          />
          <ProgressRow
            color="#dc2626"
            total={orders?.all}
            loading={loading}
            i={1}
            role={orders?.cancelled}
            title="Cancelled"
          />
          <ProgressRow
            color="#fdba74"
            total={orders?.all}
            loading={loading}
            i={2}
            role={orders?.pending}
            title="Pending"
          />
        </aside>

        <aside className=" mt-5 space-y-1.5 text-sm font-medium">
          <ProgressItem
            color="#16a34a"
            total={orders.shipped}
            title="Shipped"
            symbol="Orders"
          />
          <ProgressItem
            color="#dc2626"
            total={orders?.cancelled}
            title="Cancelled"
            symbol="Order"
          />
          <ProgressItem
            color="#fdba74"
            total={orders?.pending}
            title="Pending"
            symbol="Order"
          />
        </aside>

        {/* LATEST ORDERS  */}
      </div>

      {/* LATEST ORDERS  */}
      <h1 className="px-4 text-sm font-medium mb-auto tracking-wide">
        Latest Orders
      </h1>
      <aside className="px-4 overflow-y-auto h-full  [&::-webkit-scrollbar]:w-[6px]">
        <div className="space-y-1">
          {orders?.latest?.map((o, i) => (
            <OrderCard last={i === 1} order={o} />
          ))}
        </div>
      </aside>
      {/* FOOTER  */}
      <footer className="border-color border-t h-10  grid place-content-center">
        <Link
          to="/orders"
          className="text-sm font-medium tracking-wide hover:text-blue-500 hover:underline"
        >
          View More
        </Link>
      </footer>
    </article>
  );
};

const OrderCard = ({ last, order }) => {
  const { isCopied, copyToClipboard } = useClipboard();

  return (
    <>
      <article
        className={`border-color  flex justify-between items-center group cursor-pointer hover:dark:bg-[#17171766] hover:bg-black/10 duration-200 rounded-md px-2 py-0.5 `}
      >
        <aside className="flex gap-3 items-center">
          <BsBag />
          <div className="text-base">
            <h1 className="font-medium text-sm tracking-wide">
              {order?.user?.username || "Delete User"}
            </h1>
            <h2 className="flex gap-3 opacity-50 text-[10px] leading-none mb-1 items-end">
              <p>{moment(order.createdAt).fromNow()}</p>
              <p className="opacity-50  ">{order.item.name}</p>
            </h2>
          </div>
        </aside>

        <aside className="flex border  border-color h-6 opacity-0 group-hover:opacity-100 duration-200  rounded">
          <div
            onClick={() => copyToClipboard(order.item._id)}
            className="grid place-content-center   border-r border-color hs-tooltip w-6   text-[11px]"
          >
            {!isCopied ? (
              <BsClipboard2 className="fadeIn" />
            ) : (
              <MdCheck className="text-green-600 fadeIn" />
            )}
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 text-[10px] hs-tooltip-shown:visible opacity-0 transition-opacity inline-block  absolute invisible z-10 p-1  bg-gray-900  font-medium text-white rounded shadow-sm dark:bg-neutral-700"
              role="tooltip"
            >
              {!isCopied ? "copyId" : "copied"}
            </span>
          </div>

          <div className="grid place-content-center  border-r border-color hs-tooltip w-6   text-[11px]">
            <LiaShippingFastSolid className="fadeIn text-sm" />
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 text-[10px] hs-tooltip-shown:visible opacity-0 transition-opacity inline-block  absolute invisible z-10 p-1  bg-gray-900  font-medium text-white rounded shadow-sm dark:bg-neutral-700"
              role="tooltip"
            >
              Send Pack
            </span>
          </div>
        </aside>
      </article>
      {!last ? <div className="w-full h-px bg-white/40 my-0.5" /> : <></>}
    </>
  );
};

////////!  TOTAL   !////////

const TotalSales = () => {
  const { total, loading } = useGetTotal();
  const ttl = total?.reduce((a, b) => a.totalPrice + b.totalPrice) || 0;

  return (
    <article className=" col-span-1  fadeIn border dark:bg-fif h-96 rounded-xl border-color shadow-lg shadow-black/40 grid grid-rows-[1fr_auto_auto]">
      <aside className="h-full px-6 p-4 pb-2">
        {/* HEADER  */}
        <header className="flex justify-between items-center text-2xl ">
          <h1 className="text-[22px] font-medium tracking-wide">Total Sales</h1>
          <MdPayments />
        </header>

        <h1 className="text-4xl flex gap-2 font-semibold mt-2.5">
          {loading ? (
            0
          ) : (
            <CounterUp
              maxValue={total?.map((e) => e.totalPrice).reduce((a, b) => a + b)}
              duration={1500}
              steps={150}
            />
          )}

          <span className="mt-auto opacity-40 text-sm font-normal">DA</span>
        </h1>

        <div className="mt-4 space-y-3">
          {total?.map((t, i) => {
            if (i < 7)
              return (
                <div
                  key={`day-${i}`}
                  className="flex justify-between items-end font-medium"
                >
                  <div className="flex gap-2 items-center">
                    <span
                      style={{
                        background: colors[i],
                      }}
                      className="w-3 h-3 rounded "
                    />
                    <h1>{getWeekdayFromDate(t._id)}</h1>
                    <span className="text-[10px] mt-auto opacity-65">
                      {t._id}
                    </span>
                  </div>
                  <h2 className="text-sm opacity-60">
                    {t.totalPrice} <span className="text-[10px]">DA</span>
                  </h2>
                </div>
              );
          })}
        </div>
      </aside>
    </article>
  );
};

export default Header;

////////!  OTHER   !////////

export function getWeekdayFromDate(dateString) {
  try {
    const date = moment(dateString);
    if (!date.isValid()) {
      return "Invalid Date"; // Invalid Date (Arabic)
    }

    moment.locale("ar-dz"); // Set the locale to Algerian Arabic

    return date.format("dddd"); // Get the weekday name
  } catch (error) {
    return "Invalid Date "; // Invalid Date (Arabic)
  }
}

const colors = [
  "#44f920",
  "#6e94c9",
  "#472230",
  "#91c46a",
  "#9829c8",
  "#35da2c",
  "#db9640",
];
