import React, { useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import Select from "../common/Select";
import { useGetCategories } from "../../Hooks/useCategory";
import { useGetAllItems, useGetOption } from "../../Hooks/useItem";
import Input from "../common/Input";
import Tooltip from "../common/Tooltip";

function AddOrder({ credentials, setcredentials, handleSubmit, loading }) {
  const { categories } = useGetCategories();
  const { items } = useGetAllItems();
  const { options } = useGetOption(credentials?.item);

  useEffect(() => {
    setcredentials({
      ...credentials,
      item: "",
    });
  }, [credentials?.category]);
  useEffect(() => {
    setcredentials({
      ...credentials,
      options: [],
    });
  }, [credentials?.item]);

  return (
    <main className="md:grid md:grid-cols-[2fr_1fr] w-full gap-4 md:space-y-0 space-y-4">
      {/* ORDER INFO */}
      <nav className="container w-full mx-auto !rounded-lg">
        <header className="p-2.5 px-4 text-[15px] font-medium tracking-wide border-b border-color">
          Order Info
        </header>

        <aside className="p-4 space-y-3">
          <div className="text-[13px] font-medium tracking-wide">
            {/* IMAGE  */}
            <h1 className="mb-2">Product Image</h1>
            <aside className="flex gap-4 items-center">
              <div className="w-20 h-20 overflow-hidden relative rounded-lg border border-color border-dashed hover:border-solid cursor-pointer grid place-content-center">
                {credentials?.img || credentials?.image ? (
                  <img
                    src={
                      credentials?.img
                        ? URL.createObjectURL(credentials?.img)
                        : credentials?.image
                    }
                    className="!object-cover "
                  />
                ) : (
                  <CiImageOn className="text-2xl opacity-60" />
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    setcredentials({
                      ...credentials,
                      img: e.target.files[0],
                    })
                  }
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <aside className="flex gap-2">
                  <button className="flex gap-1 button bg-blue-600 text-white relative !px-4">
                    <FiUpload /> Select Image{" "}
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) =>
                        setcredentials({
                          ...credentials,
                          img: e.target.files[0],
                        })
                      }
                      className="absolute opacity-0 w-full z-10 h-full  !cursor-pointer"
                    />
                  </button>
                  <button
                    onClick={() => setcredentials({ ...credentials, img: "" })}
                    disabled={!credentials?.img}
                    className="button  border-red-600 text-red-600 border border-opacity-50"
                  >
                    Delete
                  </button>
                </aside>
                <h1 className="dark:opacity-50 opacity-80 text-[11px] ml-1 font-normal">
                  Your image better be square, at least 100x100px, and JPG or
                  PNG.
                </h1>
              </div>
            </aside>

            {/* NAME  */}

            <aside className="grid md:grid-cols-2 gap-4 my-4">
              <div className="col-span-2">
                <InputTitle
                  title={
                    <div className="flex gap-2 items-center">
                      User ID{" "}
                      <Tooltip
                        className="max-w-32"
                        placement="top"
                        strategy="fixed"
                      >
                        <div className="w-4 h-4 scale-75 font-bold grid place-content-center cursor-pointer rounded-full text-[9px] bg-color opacity-80 border border-color shadow shadow-black/40">
                          ?
                        </div>
                        <h1 className="dark:bg-qua bg-sec text-[11px] p-1 text-white rounded text-center">
                          default is Fix iiiT _id
                        </h1>
                      </Tooltip>
                    </div>
                  }
                  placeholder="67a556fc3bfd6fba32e07cb8"
                  set={setcredentials}
                  credentials={credentials}
                  name="user"
                  value={true}
                />
              </div>
              {[
                {
                  name: "model",
                  title: "Device Modal",
                  placeholder: "RTX, GTX...",
                },
                {
                  name: "manufacture",
                  title: "Device Manufactur",
                  placeholder: "Intel, Samsung...",
                },
                {
                  name: "password",
                  title: "System Password",
                  placeholder: "Windows pass or BIOS pass",
                },
                {
                  name: "serialNumber",
                  title: "Seriel Number",
                  placeholder: "Enter serial number",
                },
              ].map((e) => (
                <InputTitle
                  name={e.name}
                  title={e.title}
                  set={setcredentials}
                  credentials={credentials}
                  placeholder={e.placeholder}
                />
              ))}

              <div className="col-span-2">
                <h1 className="mb-1.5 opacity-90 text-[13px] font-normal ">
                  Note
                </h1>
                <textarea
                  placeholder="Explain somthing, or add any note shoud we know about it "
                  className=" max-h-36 min-h-14 h-20 border border-color rounded-md px-4 py-2 flex relative focus-within:ring-1 dark:ring-neutral-500 ring-neutral-800 duration-200 items-center gap-3 text-[13px] outline-none w-full disabled:cursor-not-allowed bg-transparent outline- font-medium tracking-wide dark:text-neutral-300 text-black/70  placeholder:text-black/60 placeholder:dark:text-white/30 placeholder:text-xs "
                  onChange={(e) =>
                    setcredentials({ ...credentials, node: e.target.value })
                  }
                  value={credentials?.node}
                />
              </div>
            </aside>
          </div>
        </aside>
      </nav>

      {/* ORDER ORGANIZATION && PRICING  */}

      <article className="w-full   h-full grid grid-rows-[1fr_auto] gap-4 sticky top-0 !rounded-lg">
        <nav className="container mx-auto !rounded-lg">
          <header className="p-2.5 px-4 text-[15px] font-medium tracking-wide border-b border-color">
            Order Organization
          </header>

          <aside className="p-4 space-y-3">
            <InputTitle
              title="Price"
              placeholder="0.00"
              set={setcredentials}
              credentials={credentials}
              type="number"
              name="totalPrice"
            />

            <div>
              <h1 className="mb-1.5 opacity-90 text-[13px] font-normal">
                Category
              </h1>

              <Select
                options={categories?.map((c) => c._id)}
                list={categories?.map((c) => c.name)}
                name="category"
                state={credentials}
                className="!text-xs"
                placement="bottom-start"
                set={setcredentials}
              />
            </div>
            <div>
              <h1 className="mb-1.5 opacity-90 text-[13px] font-normal">
                Items
              </h1>

              <Select
                options={items
                  ?.filter((i) => i.category._id === credentials.category)
                  ?.map((i) => i._id)}
                list={items
                  ?.filter((i) => i.category._id === credentials.category)
                  ?.map((i) => i.name)}
                name="item"
                state={credentials}
                className="!text-xs"
                placement="bottom-start"
                set={setcredentials}
                disabled={!credentials?.category}
              />
            </div>

            <div>
              <h1 className="mb-1.5 opacity-90 text-[13px] font-normal">
                Options
              </h1>

              <Select
                options={options?.map((o) => o._id)}
                list={options?.map((o) => o.name)}
                name="options"
                state={credentials}
                className="!text-xs"
                placement="bottom-start"
                set={setcredentials}
                multiple={true}
                disabled={!credentials?.item}
              />
            </div>
            <InputTitle
              title="Status"
              placeholder="pending"
              set={setcredentials}
              credentials={credentials}
              name="status"
            />
          </aside>
        </nav>

        <nav className="container mx-auto p-4 py-2.5 !rounded-lg flex justify-between items-end  font-medium tracking-wide">
          <button className="text-sm  text-red-600 hover:underline">
            Delete
          </button>
          <div className="flex gap-3 items-end">
            <button
              disabled={
                JSON.stringify(credentials) === JSON.stringify({ options: [] })
              }
              onClick={() =>
                setcredentials({
                  options: [],
                  status: "pending",
                  totalPrice: 0,
                  item: "",
                  user: "67a556fc3bfd6fba32e07cb8",
                  node: "",
                  password: "",
                  model: "",
                  manufacture: "",
                  serialNumber: "",
                })
              }
              className="disabled:pointer-events-none disabled:opacity-60 text-sm hover:underline dark:text-gray-400"
            >
              Cancel
            </button>
            <div className="w-px h-4 mb-1 dark:bg-gray-500 bg-gray-800" />
            <button
              disabled={
                !credentials.item ||
                !credentials.user ||
                !credentials.status ||
                loading
              }
              onClick={handleSubmit}
              className="text-sm hover:underline text-blue-500 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 !border-4 loader !border-t-blue-600" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </nav>
      </article>
    </main>
  );
}

export const InputTitle = ({
  title,
  name,
  set,
  credentials,
  placeholder,
  type = "text",
  value = true,
  classTitle = "",
}) => {
  return (
    <aside className="">
      <h1 className={`mb-1.5 opacity-90 text-[13px] font-normal ${classTitle}`}>
        {title}
      </h1>
      <Input
        name={name}
        set={set}
        state={credentials}
        placeholder={placeholder}
        value={value}
        className="text-sm "
        classInput="placeholder:!text-xs"
        type={type}
      />
    </aside>
  );
};
export default AddOrder;
