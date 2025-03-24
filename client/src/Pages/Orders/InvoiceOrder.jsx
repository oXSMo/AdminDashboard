import React, { useEffect, useState } from "react";
import { useGetOneUser } from "../../Hooks/useUser";
import { useDownloadInvoic } from "../../Utils/Hooks";
import logo from "../../Assets/logo-black.png";
import { wilayas } from "../../Utils/Constants";
import { MdClose } from "react-icons/md";

function InvoiceOrder({ order, set }) {
  const { user: u } = useGetOneUser(order.user._id);

  const { handleDownload, invoiceRef } = useDownloadInvoic();

  const ord = {
    category: order?.item?.category?.name,
    item: order?.item?.name,
  };

  if (order?.serialNumber) ord.serialnumber = order?.serialNumber;
  if (order?.model) ord.model = order?.model;

  const user = {
    Username: u?.username,
    Email: u?.email,
    Firstname: u?.firstName,
    LastName: u?.lastName,
    Phonenumber: u?.phoneNumber,
    State: wilayas[Number(u?.state) - 1],
    Address: u?.streetAddress1,
    PostalCode: u?.postalCode,
  };

  console.log(order);

  if (user)
    return (
      <main className="overflow-auto max-h-[95vh] max-w-[95vw] ">
        <section
          onClick={handleDownload}
          className="flex justify-center relative max-w-6xl mx-auto items-center min-h-screen bg-gray-100"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              set(false);
            }}
            className="absolute top-6 right-6 text-xl cursor-pointer text-red-600 p-1.5 duration-200 hover:bg-black/30 bg-black/20 rounded-full"
          >
            <MdClose className=" " />
          </div>
          <article
            ref={invoiceRef}
            className="w-full  bg-white shadow-lg font-semibold font-mono text-black/70 rounded-lg p-14"
          >
            {/* Invoice content */}
            <aside className="flex justify-between items-center mb-14">
              <img src={logo} className="w-24" />
              <h1 className="text-black text-lg font-bold">
                Fix iiiT
                <h2 className="text-base text-black/70">
                  Algeria, Oum El Bouaghi , Ain Beida
                </h2>
              </h1>
            </aside>

            {/* ADDRESS  */}
            <aside className="w-full grid grid-cols-[2fr_1fr]">
              <div className="">
                <h1 className="text-2xl mb-4 text-black font-black tracking-wide">
                  INVOICE
                </h1>
                <div className="grid grid-cols-[1fr_2fr] text-sm">
                  {Object.keys(user).map((e, i) => (
                    <>
                      <h1>{e} : </h1>
                      <h2>{Object.values(user)[i]}</h2>
                    </>
                  ))}
                </div>
              </div>

              {/* DATE */}
              <div className="grid grid-cols-2 text-sm place-content-start gap-1.5 my-12 justify-start">
                <h1>ORDER ID:</h1> <h2>{order?._id}</h2>
                <h1>ORDER DATE: </h1>{" "}
                <h2>
                  {new Date(order?.createdAt || 0).toISOString().split("T")[0]}
                </h2>
                <h1>INVOICE DATE: </h1>{" "}
                <h2>{new Date().toISOString().split("T")[0]}</h2>
              </div>
            </aside>

            {/* PRODUCT  */}
            <aside className="w-full grid grid-cols-[2fr_1fr] mt-10">
              <div>
                <h1 className="text-2xl mb-4 text-black font-black tracking-wide">
                  ORDER
                </h1>
                <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                  <>
                    {Object.keys(ord).map((e, i) => (
                      <>
                        <h1>{e} : </h1>
                        <h2 className="">{Object.values(ord)[i]}</h2>
                      </>
                    ))}

                    {order?.Tracking && (
                      <>
                        <h1>Track Number :</h1>
                        <h2 className="">{order?.Tracking}</h2>
                      </>
                    )}
                  </>
                </div>
              </div>

              <div className=" place-self-end text-black">
                Price : {order?.totalPrice || "N/A"} DA
              </div>
            </aside>
          </article>
        </section>
      </main>
    );
}

export default InvoiceOrder;
