import React, { useState } from "react";
import { MdAdd, MdEdit, MdGroup, MdOutlineCategory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetDashCategories } from "../../Hooks/useCategory";
import Modal from "../../Components/common/Modal";
import { useClipboard } from "../../Utils/Hooks";
import Tooltip from "../../Components/common/Tooltip";
import moment from "moment";

function CategoryOverView() {
  const { categories, loading } = useGetDashCategories();

  console.log(categories);

  return (
    <section className="">
      <header className="flex justify-between mb-4">
        <h1 className="font-bold tracking-wide text-xl">Categories</h1>
        <Link
          to="/createCategory"
          className="flex gap-2 button bg-blue-600  text-sm !px-3 !pr-4 text-white"
        >
          <MdAdd /> Add Category
        </Link>
      </header>

      <main className="container grid grid-rows-[auto_1fr] min-h-[70vh] 2xl:mx-auto">
        <header className="px-5 py-2.5 text-[15px] border-b border-color w-full">
          Total Categories{" "}
          <span className="opacity-70">({categories?.total || 0})</span>
        </header>

        <section className="p-4">
          {loading || !categories?.categories?.length ? (
            <div className="w-full h-full grid place-content-center opacity-60 text-center font-semibold tracking-wide">
              <MdOutlineCategory className="text-7xl opacity-60 mx-auto" />
              <h1 className="text-center text-xl">No Categories Found.</h1>
              <h2 className="max-w-80 mt-2 text-sm font-light dark:opacity-70">
                if no categories found after while, please check you connection
                then reload
              </h2>
            </div>
          ) : (
            categories?.categories?.map((c) => <Category category={c} />)
          )}
        </section>
      </main>
    </section>
  );
}

const Category = ({ category }) => {
  const [modal, setmodal] = useState(false);
  const navigate = useNavigate();

  const { copyToClipboard, isCopied } = useClipboard();
  return (
    <>
      <article
        onClick={() => navigate(`/editCategory/${category._id}`)}
        className="grid md:grid-cols-[auto_1fr] place-content-center hover:bg-black/15 rounded-t-lg cursor-pointer p-4 items-center gap-6  border-b border-color"
      >
        {/* IMAGE  */}
        <div className="md:w-[150px] mx-auto  w-[100px] overflow-hidden rounded-md ">
          <img
            src={category.image}
            className="  hover:scale-110 duration-300  aspect-square overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setmodal(true);
            }}
          />
        </div>
        <aside className="grid md:grid-cols-3 grid-cols-2 gap-y-4 gap-x-10 ">
          {/* NAME & SALES  */}
          <div className="space-y-5">
            <Info title="Category" name={category.name} />
            <Info
              title="Total Sales"
              name={
                <>
                  {category.totalSales.toLocaleString()}{" "}
                  <span className="text-[11px] opacity-60">DA</span>
                </>
              }
            />
          </div>

          {/* ORDERS & ITEMS  */}
          <div className="space-y-5">
            <Info
              title="Total Orders"
              name={
                <>
                  {category.ordersCount}{" "}
                  <span className="text-[11px] opacity-60">order</span>
                </>
              }
            />
            <Info
              title="Total Items"
              name={
                <>
                  {category.items}{" "}
                  <span className="text-[11px] opacity-60">item</span>
                </>
              }
            />
          </div>

          {/* ID & EDIT  */}
          <div className="md:space-y-5 gap-x-10 md:block grid grid-cols-2 md:col-span-1 col-span-2">
            <Info
              title="Category Id"
              name={
                <Tooltip placement="top-start">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(category._id);
                    }}
                    className="w-20 cursor-pointer text-blue-500 font-semibold text-sm line-clamp-1 break-all"
                  >
                    #{category._id}
                  </div>
                  <span className="tooltip">
                    {isCopied ? "Copied" : "Copy ID"}
                  </span>
                </Tooltip>
              }
            />

            <Info
              title="Last Order"
              name={
                category.orders.length
                  ? moment(category.orders[0].createdAt).fromNow()
                  : "-"
              }
            />
          </div>
        </aside>
      </article>

      <Modal onClose={setmodal} open={modal}>
        <img
          src={category.image}
          className="max-w-[90vw] max-h-[90vh] rounded-2xl"
        />
      </Modal>
    </>
  );
};

const Info = ({ title, name }) => (
  <h1 className="text-xs  tracking-wide space-y-1">
    <p className="opacity-70">{title}</p>{" "}
    <p className="opacity-100 text-sm">{name}</p>
  </h1>
);

export default CategoryOverView;
