import React, { useState } from "react";
import Select from "../../Components/common/Select";
import { MdGroup, MdSwapVert, MdTune } from "react-icons/md";
import { FaBoxes, FaSearch } from "react-icons/fa";
import Input from "../../Components/common/Input";
import { useGetAllOrders } from "../../Hooks/useOrder";
import Checkbox from "../../Components/common/Checkbox";
import Modal from "../../Components/common/Modal";
import { Avatar } from "../Users/UserOverview";
import OffCanvas from "../../Components/common/OffCanvas";
import UserSidebar from "../Users/UserSidebar";
import moment from "moment";
import { color } from "../Users/UserTable";
import Status from "./Status";
import { LuPanelRightOpen } from "react-icons/lu";
import { TableRow } from "./TableRow";
import Pagination from "../../Components/common/Pagination";
import OrderSidebar from "./OrderSidebar";
import { useGetAllItems } from "../../Hooks/useItem";

function OrdersTable() {
  const [filter, setfilter] = useState({
    limit: 10,
    search: "",
    sort: "updatedAt",
    item: "",
    page: 1,
  });

  const { loading, getAll, orders } = useGetAllOrders({ filter });
  const { items } = useGetAllItems();
  console.log(filter);
  
  return (
    <main className="p-5 w-full fadeIn overflow-hidden grid border border-color rounded-xl   bg-white dark:bg-fif shadow-lg shadow-black/40  ">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <Input
          icon={<FaSearch />}
          set={setfilter}
          state={filter}
          name="search"
          className="dark:bg-neutral-600 md:w-80 w-full focus-within:opacity-100 !py-1.5 !text-sm dark:!border-opacity-0  opacity-70 focus-within:!bg-transparent !rounded-lg dark:focus-within:!border-opacity-100 "
          placeholder="Search Items"
          wait={true}
        />
        <div className="flex gap-4">
          <Select
            set={setfilter}
            state={filter}
            options={["", ...items?.map((i) => i._id)]}
            list={["No Item", ...items?.map((i) => i.name)]}
            placeholder={
              <div className="flex gap-2 items-center">
                <MdTune /> Filter
              </div>
            }
            name="item"
            className="w-28 h-[30px] "
            classPrefix="!w-28"
            classOption="line-clamp-1"
            placement="bottom-end"
            strategy="absolute"
          />
          <Select
            set={setfilter}
            state={filter}
            options={[5, 10, 20, 40]}
            name="limit"
            className="w-14 h-[30px]"
            classPrefix="!w-14"
            placement="bottom-end"
            strategy="absolute"
          />
        </div>
      </header>

      <Table
        orders={orders}
        getAll={getAll}
        setfilter={setfilter}
        filter={filter}
      />

      <footer className="mt-4 flex justify-between">
        <h1 className="text-sm tracking-wide opacity-80">
          Results <span className="opacity-60">({orders?.total})</span>
        </h1>
        <Pagination
          current={filter.page}
          total={orders?.pages?.total}
          set={setfilter}
        />
      </footer>
    </main>
  );
}

const Table = ({ orders, filter, setfilter, getAll }) => {
  const [select, setselect] = useState([]);
  const [orderId, setorderId] = useState();
  const [open, setopen] = useState(false);
  const [openSide, setopenSide] = useState(false);
  const [openDetail, setopenDetail] = useState(false);

  return (
    <section className="w-full mt-4 max-h-[500px] min-h-[300px] overflow-auto  [&::-webkit-scrollbar]:h-[8px]">
      {orders?.orders?.length ? (
        <table className="min-w-full dark:divide-neutral-700 text-sm ">
          <thead className=" sticky top-[1px] dark:bg-fif bg-white ring-[1px] dark:ring-[#525252] ring-[#CDD1D7] z-10  border-color h-10 w-full text-neutral-500">
            <tr className="">
              {/* CHECK BOX  */}
              <th className="w-8 pl-2 pr-3 border-r border-color">
                <Checkbox
                  check={
                    select.sort().join("") ===
                    orders?.orders
                      ?.map((i) => i._id)
                      .sort()
                      .join("")
                  }
                  onChange={() => {
                    setselect(
                      select.length ? [] : orders?.orders?.map((i) => i._id)
                    );
                  }}
                />
              </th>

              {/* Item  */}
              <th className="min-w-[200px]  border-r font-medium border-color  px-4 py-2.5 text-left cursor-pointer ">
                <div className="flex gap-1 items-center font-serif tracking-wide">
                  Item
                </div>
              </th>

              {/* CUSTOMER  */}
              <th className="border-r font-medium border-color  px-4 py-2.5 text-left cursor-pointer ">
                <div className="flex gap-1 items-center">Customer</div>
              </th>

              {/* CREATED AT  */}
              <th
                onClick={() => setfilter({ ...filter, sort: "createdAt" })}
                className="hover:dark:bg-white/10 hover:bg-black/20 border-r font-medium border-color  px-4 py-2.5 text-left cursor-pointer "
              >
                <div className="flex gap-1 items-center">
                  Ordered <MdSwapVert className="text-lg" />
                </div>
              </th>
              {/* STATUS  */}
              <th className="border-r font-medium border-color text-center w-40  px-4 py-2.5 cursor-pointer ">
                <h1 className="mx-auto">Status</h1>
              </th>
              {/* PRICE  */}
              <th
                onClick={() => setfilter({ ...filter, sort: "totalPrice" })}
                className="hover:dark:bg-white/10 hover:bg-black/20 border-r font-medium border-color  px-4 py-2.5 text-left cursor-pointer "
              >
                <div className="flex gap-1 items-center">
                  Price <MdSwapVert className="text-lg" />
                </div>
              </th>
              {/* CATEGORY  */}
              <th className=" font-medium border-color  px-4 py-2.5 text-left cursor-pointer ">
                <div className="flex gap-1 items-center">Category</div>
              </th>
              <th className="w-4"></th>
            </tr>
          </thead>

          <tbody>
            {orders?.orders?.map((o, i) => (
              <TableRow
                key={o._id}
                o={o}
                setopen={setopen}
                setorderId={setorderId}
                setselect={setselect}
                setopenSide={setopenSide}
                setopenDetail={setopenDetail}
                select={select}
                getAll={getAll}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-full grid place-content-center opacity-60 text-center font-semibold tracking-wide">
          <FaBoxes className="text-7xl mb-2 opacity-60 mx-auto" />
          <h1 className="text-center text-xl">No Orders Found.</h1>
          <h2 className="max-w-80 mt-2 text-sm font-light dark:opacity-70">
            no data here yet like this, change the filter to see the results
          </h2>
        </div>
      )}
      <Modal open={open} onClose={setopen}>
        <img
          src={
            orders?.orders?.find((o) => o._id === orderId)?.image ||
            orders?.orders?.find((o) => o._id === orderId)?.item?.category
              ?.image
          }
          className="rounded-md cursor-pointer max-h-[90vh] max-w-[90vw]"
        />
      </Modal>

      <OffCanvas open={openSide} set={setopenSide}>
        <UserSidebar
          set={setopenSide}
          open={openSide}
          _id={orders?.orders?.find((o) => o._id === orderId)?.user._id}
        />
      </OffCanvas>
      <OffCanvas open={openDetail} set={setopenDetail}>
        <OrderSidebar
          set={setopenDetail}
          open={openDetail}
          o={orders?.orders?.find((o) => o._id === orderId)}
          getAll={getAll}
        />
      </OffCanvas>
    </section>
  );
};

export default OrdersTable;
