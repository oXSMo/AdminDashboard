import React, { useEffect, useState } from "react";
import { itemSlice } from "../../Store/dashboard";
import { InputTitle } from "./AddOrder";
import ReactQuill from "react-quill";
import { modules } from "./AddCategory";
import Input from "../common/Input";
import Switch from "../common/Switch";
import Select from "../common/Select";
import { useGetCategories } from "../../Hooks/useCategory";

function AddItem({ loading, handleClick }) {
  const {
    credentials,
    setcredentials,
    options,
    setoptions,
    optionsCount,
    setoptionsCount,
  } = itemSlice();
  const { categories } = useGetCategories();

  console.log({ credentials, options });

  return (
    <section className="grid md:grid-cols-[1fr_auto] gap-4">
      <article className="space-y-4">
        <nav className="container w-full  !rounded-lg">
          <header className="p-2.5 px-4 text-[15px] font-medium tracking-wide border-b border-color">
            Item Info
          </header>

          <aside className="p-4 space-y-4">
            <InputTitle
              title="Name"
              placeholder="Short and clear name"
              set={setcredentials}
              credentials={credentials}
              name="name"
            />

            <div className="space-y-2 pb-14">
              <h1 className="text-sm">Description</h1>
              <ReactQuill
                modules={modules}
                theme="snow"
                value={credentials?.description}
                onChange={(e) => {
                  setcredentials((c) => ({ ...c, description: e }));
                }}
                className="h-[180px]"
              />
            </div>
          </aside>
        </nav>

        <nav className="container w-full  !rounded-lg">
          <header className="p-2.5 px-4 text-[15px] font-medium tracking-wide border-b border-color">
            Item Options
          </header>

          <aside className="p-4 space-y-4">
            <div className="grid grid-cols-[2fr_1fr_4fr] gap-4 [&_h1]:opacity-70">
              <h1>Name</h1>
              <h1>Price</h1>
              <h1>Description</h1>
            </div>
            {[...Array(optionsCount)].map((_, i) => (
              <div className="grid fadeIn grid-cols-[2fr_1fr_4fr] gap-4">
                <input
                  type="text"
                  onChange={(e) =>
                    setoptions((o) => {
                      const update = [...o];
                      update[i] = { ...o[i], name: e.target.value };
                      return update;
                    })
                  }
                  className="outline-none w-full border border-color rounded-md px-3 focus:ring-1 ring-gray-500 disabled:cursor-not-allowed bg-transparent outline- font-medium tracking-wide dark:text-neutral-300 text-black/70  placeholder:text-black/60"
                  value={options[i]?.name || ""}
                />
                <Input
                  onChange={(e) =>
                    setoptions((o) => {
                      const update = [...o];
                      update[i] = { ...o[i], price: e.target.value };
                      return update;
                    })
                  }
                  type="number"
                  VALUE={options[i]?.price}
                />
                <Input
                  value={options[i]?.description}
                  onChange={(e) =>
                    setoptions((o) => {
                      const update = [...o];
                      update[i] = { ...o[i], description: e.target.value };
                      return update;
                    })
                  }
                  VALUE={options[i]?.description}
                />
              </div>
            ))}

            <button
              disabled={optionsCount > 4}
              onClick={() => setoptionsCount(optionsCount + 1)}
              className="border-dashed border disabled:pointer-events-none disabled:opacity-60 border-color rounded-full p-1 text-xs w-24 grid place-content-center hover:border-double cursor-pointer"
            >
              + Add option
            </button>
          </aside>
        </nav>
      </article>

      <article className="md:w-80 w-full gap-4 grid grid-rows-[auto_auto]">
        <nav className="container w-full md:sticky top-16 !rounded-lg h-fit">
          <header className="p-2.5 px-4 text-[15px] font-medium tracking-wide border-b border-color">
            Pricing & Organization
          </header>

          <aside className="p-4 space-y-4">
            <InputTitle
              type="number"
              name="price"
              title="Price"
              set={setcredentials}
              credentials={credentials}
            />
            <div className="w-full rounded-md border border-color flex items-center justify-between p-2 px-3">
              <h1 className="text-sm">Available</h1>
              <Switch
                active={credentials?.available}
                onClick={() => {
                  setcredentials({
                    ...credentials,
                    available: !credentials?.available,
                  });
                }}
              />
            </div>

            <div className="">
              <h1 className="text-sm mb-2 ml-1">Category</h1>
              <Select
                list={categories.map((c) => c.name)}
                options={categories.map((c) => c._id)}
                state={credentials}
                name="category"
                set={setcredentials}
                
              />
            </div>
          </aside>
        </nav>

        <nav className="self-end container mx-auto p-4 py-2.5 !rounded-lg flex justify-between items-end  font-medium tracking-wide md:sticky bottom-4 ">
          <div className=""></div>
          <div className="flex gap-3 items-end">
            <button
              disabled={
                JSON.stringify(credentials) === JSON.stringify({ options: [] })
              }
              onClick={() => {
                setcredentials({
                  name: "",
                  description: "",
                  available: false,
                  price: 0,
                });
                setoptions([]);
                setoptionsCount(optionsCount);
              }}
              className="disabled:pointer-events-none disabled:opacity-60 text-sm hover:underline dark:text-gray-400"
            >
              Cancel
            </button>
            <div className="w-px h-4 mb-1 dark:bg-gray-500 bg-gray-800" />
            <button
              disabled={
                !credentials?.name ||
                !credentials?.price ||
                !credentials?.category ||
                loading
              }
                onClick={handleClick}
              className="text-sm hover:underline text-blue-500 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 !border-4 loader !border-t-blue-600" />
              ) : (
                "Place Item"
              )}
            </button>
          </div>
        </nav>
      </article>
    </section>
  );
}

export default AddItem;
