import React, { useState } from "react";
import Input from "../../Components/common/Input";
import { MdContentCopy, MdEdit, MdMoreHoriz } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import Checkbox from "../../Components/common/Checkbox";
import { useGetItems } from "../../Hooks/useDashboard";
import DropDown from "../../Components/common/DropDown";
import { useClipboard } from "../../Utils/Hooks";
import Modal from "../../Components/common/Modal";
import { useDeleteItem } from "../../Hooks/useItem";
import { Link } from "react-router-dom";

function ItemsTable() {
  const [filter, setfilter] = useState({ search: "" });

  return (
    <section className="py-3 px-4 w-full  border border-color rounded-xl  grid grid-rows-[auto_1fr] bg-white dark:bg-fif shadow-lg shadow-black/40 ">
      <header className="px-2 flex items-center justify-between pb-3">
        <h1 className="text-lg font-medium tracking-wide">All Items</h1>

        <Input
          icon={<FaSearch />}
          set={setfilter}
          state={filter}
          name="search"
          className="dark:bg-neutral-600 focus-within:opacity-100 !border-opacity-0  opacity-70 focus-within:!bg-transparent !rounded-lg focus-within:!border-opacity-100 "
          placeholder="Search Items"
          disabled
        />
      </header>

      <Table search={filter.search} />
    </section>
  );
}

const Table = ({ search }) => {
  const [select, setselect] = useState([]);
  const { loading, items, getItems } = useGetItems();
  const [open, setopen] = useState(false);
  const [image, setimage] = useState();
  return (
    <section className="w-full overflow-auto [&::-webkit-scrollbar]:h-[8px] scroll-rounded">
      <table className="min-w-full mt-2 dark:divide-neutral-700 ">
        <thead className="border-t border-b border-color text-neutral-500 ">
          <tr className="">
            {/* CHECK BOX  */}
            <th className="w-8 pl-2 pr-5">
              <Checkbox
                check={
                  select.sort().join("") ===
                  items
                    .map((i) => i._id)
                    .sort()
                    .join("")
                }
                onChange={() => {
                  setselect(select.length ? [] : items.map((i) => i._id));
                }}
              />
            </th>

            {/* ITEM NAME  */}
            <th className="lg:min-w-[400px] min-w-[300px]  font-medium px-4 py-2.5 text-left cursor-pointer">
              Items
            </th>

            {["Price", "Sold", "Sales"].map((e) => (
              <th className="tracking-tight font-medium md:px-8 px-3.5 py-2.5 text-left cursor-pointer">
                {e}
              </th>
            ))}
            {/* CHANGE  */}
          </tr>
        </thead>

        <tbody className="">
          {!loading &&
            items?.map((item, i) => (
              <tr
                onClick={() => {
                  setselect(
                    !select?.find((e) => e === item._id)
                      ? [...select, item._id]
                      : select?.filter((e) => e !== item._id)
                  );
                }}
                className={`cursor-pointer hover:bg-black/30 relative ${
                  i !== items.length - 1 && "border-b border-color"
                }`}
              >
                {/* CHECK BOX  */}
                <td className=" pl-2 hs-dropdown-toggle">
                  <Checkbox check={select.find((e) => e === item._id)} />
                </td>

                {/* IMAGE & NAME  */}
                <td className="py-2 flex items-center gap-4">
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setopen(true);
                      setimage(item.category[0].image);
                    }}
                    src={item.category[0].image}
                    className="rounded-md cursor-pointer w-12  h-10"
                  />
                  <h1 className="font-medium tracking-wide text-sm line-clamp-1">
                    {item?.name || "Deleted User"}
                  </h1>
                </td>

                {/* PRICE  */}
                <td className="md:px-8 px-3.5 font-mono text-[17px] opacity-60 ">
                  <div className="flex gap-1 items-end">
                    {" "}
                    {item.price}
                    {""}
                    <span className="text-sm mb-px">DA</span>
                  </div>
                </td>

                {/* COUNT */}
                <td className="md:px-8 px-3.5 font-mono text-[17px] opacity-60 ">
                  {item.count}
                </td>

                {/* SALES  */}
                <td className="md:px-8 px-3.5 font-mono text-base opacity-90 ">
                  <div className="flex gap-1 items-end">
                    {" "}
                    {item?.total?.toLocaleString()}
                    {""}
                    <span className="text-sm mb-px opacity-60">DA</span>
                  </div>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu item={item} getItems={getItems} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <footer className="mt-4 flex justify-between items-center tracking-wide opacity-70 text-sm">
        <h1>
          results <span>({items?.length})</span>
        </h1>
        <aside className="flex gap-3">
          <button
            disabled={!select.length}
            className="button bg-red-600 flex gap-2 !px-3 !pr-4 mb-1"
          >
            <BsTrash /> Delete
          </button>
        </aside>
      </footer>
      <Modal open={open} onClose={setopen}>
        <img
          src={image}
          className="rounded-md cursor-pointer max-h-[90vh] max-w-[90vw]"
        />
      </Modal>
    </section>
  );
};

const DropdownMenu = ({ item, getItems }) => {
  const { copyToClipboard, isCopied } = useClipboard();
  const { Delete, loading } = useDeleteItem();

  const handleDelete = async () => {
    await Delete(item._id);
    await getItems();
  };

  return (
    <DropDown>
      <button className="p-1 rounded-md text-xl hover:bg-white/15">
        <MdMoreHoriz />
      </button>
      <article className="w-36 dark:bg-fif bg-[#122732] text-white shadow-lg shadow-black/40 border border-color z-40 rounded-md py-1 text-sm space-y-0.5">
        {/* COPY ID  */}
        <div
          onClick={() => copyToClipboard(item._id)}
          className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
        >
          <MdContentCopy /> Copy Id
        </div>

        {/* EDIT  */}

        <Link
          to={`/item/${item._id}`}
          className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
        >
          <MdEdit /> Edit Item
        </Link>

        {/* COPY NAME  */}
        <div
          onClick={() => copyToClipboard(item.name)}
          className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
        >
          <MdContentCopy /> Copy Name
        </div>

        <div className="w-full h-px bg-white/20 my-0.5" />

        {/* DELETE  */}
        <div
          onClick={handleDelete}
          className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 dark:text-red-600 text-red-500 items-center font-medium flex gap-2"
        >
          <BsTrash /> Delete Item
        </div>
      </article>
    </DropDown>
  );
};

export default ItemsTable;
