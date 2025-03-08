import React from "react";
import { MdCheck, MdClose, MdContentCopy, MdEdit } from "react-icons/md";
import { useDeleteUser, useGetOneUser } from "../../Hooks/useUser";
import { FaEdit, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Avatar } from "./UserOverview";
import moment from "moment";
import { useClipboard } from "../../Utils/Hooks";
import { color } from "./UserTable";
import { wilayas } from "../../Utils/Constants";
import Tooltip from "../../Components/common/Tooltip";
import { Link } from "react-router-dom";

function UserSidebar({ set, open, _id, getAll }) {
  const { loading, user } = useGetOneUser(_id);
  const { isCopied, copyToClipboard } = useClipboard();
  const { loading: Dloading, Delete } = useDeleteUser();

  const handelDelete = async () => {
    await Delete(_id);
    set(false);
    if (getAll) await getAll();
  };

  return (
    <section className="w-full h-full relative text-neutral-800 dark:text-neutral-300 grid grid-rows-[180px_1fr_60px]">
      <button
        onClick={() => set(false)}
        className="absolute right-5 top-5 p-2 dark:bg-qua bg-black/20 hover:!bg-opacity-30 grid place-content-center text rounded-full"
      >
        <MdClose />
      </button>

      <header className="w-full  text-center py-2 pt-12">
        <Avatar
          username={user?.username || "/"}
          className="!w-14 !h-14 !text-2xl !mb-1 mx-auto"
          tooltip={false}
          loading={loading}
        />
        <h1 className="font-semibold text-lg tracking-wide first-letter:uppercase ">
          {!loading
            ? user?.firstName && user?.lastName
              ? `${user?.firstName} ${user?.lastName}`
              : user?.username
            : "loading ..."}
        </h1>
        <h2 className="text-[13px] opacity-50 tracking-wide">
          Account was created {moment(user?.createdAt).fromNow()}
        </h2>
      </header>

      <main className="px-5 !overflow-auto">
        {/* USER ID */}

        <INFO title="User ID">
          <div
            onClick={() => copyToClipboard(user?._id)}
            className="flex gap-4  cursor-pointer items-center"
          >
            <p className="text-blue-500 font-bold">#{user?._id}</p>
            <button className="border button border-color  text-xs !w-6 !p-1">
              {isCopied ? <MdCheck /> : <MdContentCopy />}
            </button>
          </div>
        </INFO>

        {/* EMAIL  */}
        <INFO title="Email">
          <p className="line-clamp-1">{user?.email}</p>
        </INFO>

        {/* Phone  */}
        {user?.phoneNumber && (
          <INFO title="Phone">
            <p className="line-clamp-1">{user?.phoneNumber}</p>
          </INFO>
        )}
        {/* STATE  */}
        {user?.state && (
          <INFO title="State">
            <p className="line-clamp-1">{wilayas[user?.state - 1]}</p>
          </INFO>
        )}
        {/* STATE  */}
        {user?.city && (
          <INFO title="Sity">
            <p className="line-clamp-1">{user?.city}</p>
          </INFO>
        )}
        {/* Address  */}
        {user?.streetAddress1 && (
          <INFO title="Address">
            <p className="line-clamp-1">{user?.streetAddress1}</p>
          </INFO>
        )}

        {/* Role  */}
        {user?.role && (
          <INFO title="Role">
            <p
              style={{
                color: color(user?.role),
                background: `${color(user?.role)}33`,
              }}
              className="line-clamp-1 max-w-20  py-1 px-2 text-xs font-medium bg-red-600 text-center rounded-md first-letter:uppercase break-all"
            >
              {user?.role}
            </p>
          </INFO>
        )}

        {/* Verified  */}

        <INFO title="Verified">
          <p
            style={{
              color: color(user?.isVerified ? "green" : "red"),
              background: `${color(user?.isVerified ? "green" : "red")}33`,
            }}
            className="line-clamp-1 max-w-20  py-1 px-2 text-xs font-medium bg-red-600 text-center rounded-md first-letter:uppercase break-all"
          >
            {user?.isVerified ? "Verefied" : "UnVerified"}
          </p>
        </INFO>
      </main>

      <footer className="border-t border-color px-4 py-2.5 grid grid-cols-2 gap-4">
        <Link
          onClick={() => set(false)}
          to={`/editUser/${_id}`}
          className="button w-full flex text-white items-center justify-center gap-2 bg-blue-600 !py-2.5"
        >
          <FaRegEdit /> Edit User
        </Link>
        <Tooltip>
          <button
            disabled={user?.isAdmin}
            onDoubleClick={handelDelete}
            className="button w-full flex items-center justify-center gap-2 border border-color !py-2.5"
          >
            {Dloading ? (
              <div className="loader w-6 h-6 !border-4" />
            ) : (
              <>
                <FaRegTrashAlt /> Delete User
              </>
            )}
          </button>
          <span className="tooltip ">Doubl Click</span>
        </Tooltip>
      </footer>
    </section>
  );
}

const INFO = ({ title, children, loading }) => (
  <div className="grid grid-cols-[100px_1fr] w-full items-center text-sm border-t border-color py-3">
    <h1 className="dark:text-neutral-500 text-base text-neutral-700">
      {title}:
    </h1>
    {!loading && children}
  </div>
);

export default UserSidebar;
