import { useState } from "react";
import Checkbox from "../../Components/common/Checkbox";
import { LuPanelRightOpen } from "react-icons/lu";
import moment from "moment";
import Status from "./Status";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

import { useClipboard, useDownloadInvoic } from "../../Utils/Hooks";
import DropDown from "../../Components/common/DropDown";
import { BsTrash } from "react-icons/bs";
import { MdContentCopy, MdEdit, MdMoreHoriz } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  useCoilCred,
  useDeleteOrderById,
  useUpdateOrder,
} from "../../Hooks/useOrder";
import Tooltip from "../../Components/common/Tooltip";
import { shipSlice } from "../../Store/dashboard";
import { FaShippingFast } from "react-icons/fa";
import InvoiceOrder from "./InvoiceOrder";
import { useGetOneUser } from "../../Hooks/useUser";
import { set } from "mongoose";
import Modal from "../../Components/common/Modal";

export const TableRow = ({
  setopenSide,
  setselect,
  setorderId,
  setopen,
  select,
  o,
  getAll,
  setopenDetail,
}) => {
  const { loading, Update } = useUpdateOrder();
  const [credentials, setcredentials] = useState({
    status: o?.status,
    totalPrice: o?.totalPrice,
  });

  const handleUpdate = async () => {
    await Update(o._id, credentials);
    await getAll();
  };

  return (
    <tr
      key={o._id}
      onClick={() => {
        setselect((select) =>
          !select?.find((e) => e === o._id)
            ? [...select, o._id]
            : select?.filter((e) => e !== o._id)
        );
      }}
      className="border-b border-color cursor-pointer hover:bg-black/30 !relative"
    >
      {/* CHECKBOX  */}
      <td className=" pl-2 hs-dropdown-toggle border-r border-color">
        <Checkbox check={select.find((e) => e === o._id)} />
      </td>

      {/* ITEM  */}

      <td
        onClick={(e) => {
          e.stopPropagation();
          setorderId(o._id);
          setopenDetail(true);
        }}
        className="flex py-2 items-center gap-4 hover:bg-black/60 hover:text-white group border-r border-color relative"
      >
        <img
          onClick={(e) => {
            e.stopPropagation();
            setorderId(o._id);
            setopen(true);
          }}
          src={o?.image || o.item.category?.image}
          className="rounded-md cursor-pointer w-12 ml-3  h-10"
        />

        <h1 className="font-medium tracking-wide text-sm line-clamp-1">
          {o.item.name}
        </h1>
        <span
          //   onClick={(e) => {
          //     e.stopPropagation();
          //     setuserId(u._id);
          //     setopen(true);
          //   }}
          className="absolute items-center  py-1 px-1 hover:bg-opacity-80 group-active:-translate-x-px dark:bg-fif bg-sec text-white right-2 top-1/2 -translate-y-1/2 rounded-md flex gap-1 text-[14px] border border-color opacity-0 group-hover:opacity-100 duration-200"
        >
          <LuPanelRightOpen />{" "}
        </span>
      </td>

      {/* USER  */}

      <td
        onClick={(e) => {
          e.stopPropagation();
          setorderId(o._id);
          o?.user?._id && setopenSide(true);
        }}
        className="p-2 px-3 border-r border-color hover:bg-black/60 hover:text-white relative group"
      >
        <div className="flex items-center gap-14.5">
          <h1 className="font-medium tracking-wide text-sm line-clamp-1 opacity-80">
            {o.user.username}
          </h1>
        </div>
        <span
          //   onClick={(e) => {
          //     e.stopPropagation();
          //     setuserId(u._id);
          //     setopen(true);
          //   }}
          className="absolute items-center  py-1 px-1 hover:bg-opacity-80 group-active:-translate-x-px dark:bg-fif bg-sec text-white right-2 top-1/2 -translate-y-1/2 rounded-md flex gap-1 text-[14px] border border-color opacity-0 group-hover:opacity-100 duration-200"
        >
          <LuPanelRightOpen />{" "}
        </span>
      </td>

      {/* CREATED AT  */}

      <td className="p-2 border-r border-color">
        {moment(o?.createdAt).fromNow()}
      </td>

      {/* STATUS  */}
      <td
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" && o.status !== credentials.status)
            handleUpdate();
        }}
        className="px-3 border-r border-color"
      >
        <Status
          o={o}
          credentials={credentials}
          setcredentials={setcredentials}
        />
      </td>

      {/* PRICE  */}
      <td
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" && o.totalPrice !== credentials.totalPrice)
            handleUpdate();
        }}
        className="px-3 border-r border-color w-24"
      >
        <div className="flex gap-2 items-end">
          <input
            type="number"
            value={credentials.totalPrice}
            className="opacity-80 text-base font-semibold bg-transparent outline-none w-20"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                totalPrice: Math.max(0, parseInt(event.target.value, 10) || 0),
              })
            }
            min={0}
          />

          <span className="opacity-80 text-xs">DA</span>
        </div>
      </td>
      {/* CATEGORY  */}
      <td className="px-3  font-medium tracking-wide border-color">
        <h1 className="">{o?.item?.category?.name}</h1>
      </td>

      <td onClick={(e) => e.stopPropagation()}>
        <Dropdown
          o={o}
          credentials={credentials}
          getAll={getAll}
          handleUpdate={handleUpdate}
        />
      </td>
    </tr>
  );
};

////////!    DROP DOWN    !////////

const Dropdown = ({ o, credentials, getAll, handleUpdate }) => {
  const { copyToClipboard, isCopied } = useClipboard();
  const { Delete } = useDeleteOrderById();

  const [modal, setmodal] = useState(false);

  const { loading, send } = useCoilCred(o, o.user);

  const handleDelete = async (e) => {
    e.preventDefault();
    await Delete(o._id);
    await getAll();
  };

  return (
    <>
      <DropDown strategy="fixed" placement="bottom-start">
        <button className="p-1 rounded-md text-xl hover:bg-white/15 mr-2">
          <MdMoreHoriz />
        </button>
        <article className="w-36 dark:bg-fif bg-[#122732] text-white shadow-lg shadow-black/40 border border-color z-40 rounded-md py-1 text-sm grid space-y-0.5">
          {/* COPY ID  */}
          <div
            onClick={() => copyToClipboard(o._id)}
            className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
          >
            <MdContentCopy /> {isCopied ? "Copied" : "Copy Id"}
          </div>

          {/* EDIT  */}

          <button
            disabled={
              credentials.status === o.status &&
              credentials.totalPrice === o.totalPrice
            }
            onClick={handleUpdate}
            className="rounded-md disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
          >
            <MdEdit /> Edit Item
          </button>

          {/* COIL  */}

          <button
            disabled={loading}
            onClick={send}
            className="rounded-md disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
          >
            <FaShippingFast /> Send Coil
          </button>

          {/* INVOICE  */}

          <button
            onClick={() => setmodal(true)}
            className="rounded-md disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 p-0.5 px-2 py-1 mx-1 items-center font-medium flex gap-2"
          >
            <LiaFileInvoiceDollarSolid /> Invoice
          </button>

          <div className="w-full h-px bg-white/20 my-1" />

          {/* DELETE  */}

          <Tooltip strategy="fixed" placement="top-start">
            <div
              onContextMenu={handleDelete}
              className="rounded-md hover:bg-white/10 p-0.5 px-2 py-1 mx-1 dark:text-red-600 text-red-500 items-center font-medium flex gap-2"
            >
              <BsTrash /> Delete Item
            </div>
            <span className="tooltip">Right Click</span>
          </Tooltip>
        </article>
      </DropDown>
      <Modal onClose={setmodal} open={modal}>
        <InvoiceOrder order={o} set={setmodal}/>
      </Modal>
    </>
  );
};
