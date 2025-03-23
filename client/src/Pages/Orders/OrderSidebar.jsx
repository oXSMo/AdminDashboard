import React from "react";
import { MdCheck, MdClose, MdContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";
import Tooltip from "../../Components/common/Tooltip";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Accordion from "../../Components/common/Accordion";
import { useClipboard } from "../../Utils/Hooks";
import { color } from "../Users/UserTable";
import { useGetOneUser } from "../../Hooks/useUser";
import { wilayas } from "../../Utils/Constants";
import { useDeleteOrderById, useGetTracking } from "../../Hooks/useOrder";
import moment from "moment";

function OrderSidebar({ set, o, getAll }) {
  const { isCopied, copyToClipboard } = useClipboard();
  const { user } = useGetOneUser(o?.user?._id);
  const { tracking } = useGetTracking(o?.Tracking);

  const { Delete, loading } = useDeleteOrderById();

  console.log(getAll);

  const handleDelete = async () => {
    await Delete(o?._id);
    set(false);
    await getAll();
  };

  return (
    <section className="w-full h-full relative text-neutral-800 dark:text-neutral-300 grid grid-rows-[50px_1fr_60px]">
      <header className="flex justify-between h-full items-center px-4 border-b border-color">
        <h1 className="font-semibold text-lg tracking-wide">Details</h1>
        <button
          onClick={() => set(false)}
          className=" h-8 w-8 dark:bg-qua bg-black/20 hover:!bg-opacity-30 grid place-content-center text rounded-full"
        >
          <MdClose />
        </button>
      </header>

      <main className="overflow-y-auto [&::-webkit-scrollbar]:w-[7px] space-y-4">
        <Accordion
          inisial={[0]}
          title={["Order Details", "Billing Details", "ZR Express Details"]}
          placement="right"
          className=""
          classOption="text-sm"
          classTitle="dark:text-white text-[15px] font-semibold tracking-wide"
          classAccordion="p-2 border-b border-color"
          classIcon="text-xs"
          chev={{ show: false }}
          multiple
        >
          <div>
            {/* ORDER DETAILS  */}
            <aside
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1.5 grid grid-cols-[90px_1fr] gap-y-2"
            >
              <Info title="Order Id">
                <div
                  onClick={(e) => {
                    copyToClipboard(o?._id);
                  }}
                  className="flex gap-4  cursor-pointer items-center"
                >
                  <p className="text-blue-500 font-bold">#{o?._id}</p>
                  <button className="border button border-color  text-xs !w-6 !p-1">
                    {isCopied ? <MdCheck /> : <MdContentCopy />}
                  </button>
                </div>
              </Info>

              <Info title="Category">{o?.item.category.name}</Info>
              <Info title="Item">{o?.item.name}</Info>
              <Info title="Price">
                <div className="">
                  {o?.totalPrice.toLocaleString()}{" "}
                  <span className="text-[11px] opacity-60">DA</span>{" "}
                </div>
              </Info>
              <Info title="Status">
                <p style={{ color: color(o?.status) }}>{o?.status}</p>
              </Info>
              {o?.model && <Info title="Model">{o?.model}</Info>}
              {o?.manufacture && (
                <Info title="Manufacture">{o?.manufacture}</Info>
              )}
              {o?.serialNumber && <Info title="Serial">{o?.serialNumber}</Info>}
              {o?.password && <Info title="Password">{o?.password}</Info>}
              {o?.node && <Info title="Note">{o?.node}</Info>}
            </aside>
          </div>

          <div>
            {/* BILLING DETAILS  */}
            <aside
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1.5 grid grid-cols-[90px_1fr] gap-y-2"
            >
              <Info title="Email">{user?.email}</Info>
              {user?.firstName && (
                <Info title="Fullname">
                  <div className="flex gap-2">
                    {user.firstName} {user.lastName}
                  </div>
                </Info>
              )}
              {user?.phoneNumber && (
                <Info title="Phone">{user?.phoneNumber}</Info>
              )}
              {user?.state && (
                <Info title="State">{wilayas[user?.state - 1]}</Info>
              )}
              {user?.city && <Info title="City">{user?.city}</Info>}
              {user?.streetAddress1 && (
                <Info title="Street">{user?.streetAddress1}</Info>
              )}
            </aside>
          </div>

          {o?.Tracking && (
            <div>
              <aside
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-1.5 grid grid-cols-[90px_1fr] gap-y-2 items-end mt-1"
              >
                {tracking?.Client && (
                  <Info title="Client">{tracking?.Client}</Info>
                )}
                {tracking?.TProduit && (
                  <Info title="Prdoduct">{tracking?.TProduit}</Info>
                )}
                {tracking?.Total && (
                  <Info title="Price">
                    <div className="">
                      {tracking?.Total.toLocaleString()}{" "}
                      <span className="text-[11px] opacity-60">DA</span>
                    </div>
                  </Info>
                )}

                {tracking?.Wilaya && (
                  <Info title="State">{tracking?.Wilaya}</Info>
                )}
                {tracking?.Commune && (
                  <Info title="City">{tracking?.Commune}</Info>
                )}
                {tracking?.Adresse && (
                  <Info title="Address">{tracking?.Adresse}</Info>
                )}

                {tracking?.MobileA && (
                  <Info title="Phone">{tracking?.MobileA}</Info>
                )}
                {tracking?.Date_Creation && (
                  <Info title="Created">
                    {moment(tracking?.Date_Creation).fromNow()}
                  </Info>
                )}
                {tracking?.DateH_Action && (
                  <Info title="Action">
                    {moment(tracking?.DateH_Action).fromNow()}
                  </Info>
                )}
                {tracking?.Situation && (
                  <Info title="Status">
                    <p className="font-medium tracking-wide text-[15px]">
                      {tracking?.Situation}
                    </p>
                  </Info>
                )}
                {tracking?.Note && <Info title="Note">{tracking?.Note}</Info>}
              </aside>
            </div>
          )}
        </Accordion>
      </main>

      <footer className="border-t border-color px-4 py-2.5 grid grid-cols-2 gap-4">
        <Link
          onClick={() => set(false)}
          to={`/editOrder/${o?._id}`}
          className="button w-full flex text-white items-center justify-center gap-2 bg-blue-600 !py-2.5"
        >
          <FaRegEdit />
          Edit Order
        </Link>
        <Tooltip>
          <button
            disabled={loading}
            onDoubleClick={handleDelete}
            className="button w-full flex items-center justify-center gap-2 border border-color !py-2.5"
          >
            {loading ? (
              <div className="loader w-6 h-6 !border-4" />
            ) : (
              <>
                <FaRegTrashAlt /> Delete Order
              </>
            )}
          </button>
          <span className="tooltip ">Doubl Click</span>
        </Tooltip>
      </footer>
    </section>
  );
}

const Info = ({ title, children, classTitle }) => {
  return (
    <>
      <h1 className={`opacity-80 ${classTitle}`}>{title}:</h1>
      {children}
    </>
  );
};

export default OrderSidebar;
