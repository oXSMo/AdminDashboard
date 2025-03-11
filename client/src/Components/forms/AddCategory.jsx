import React from "react";
import { CiImageOn } from "react-icons/ci";
import ReactQuill from "react-quill";
import { InputTitle } from "./AddOrder";

function AddCategory({ setcredentials, credentials }) {
  
  return (
    <main className="md:pb-4 pb-16 p-4 px-6 overflow-y-auto">
      <div className="mb-4">
        <InputTitle
          credentials={credentials}
          set={setcredentials}
          title="Category Name"
          name="name"
          value={true}
        />
      </div>

      <article className="grid md:grid-cols-[auto_1fr] gap-4">
        {/* IMAGE  */}
        <div className="mx-auto">
          <h1 className="mb-2">Product Image</h1>
          <aside className="flex gap-4 items-center">
            <div className="w-56 h-56 overflow-hidden relative rounded-lg border border-color border-dashed hover:border-solid cursor-pointer grid place-content-center">
              {credentials?.image ? (
                <img
                  src={
                    typeof credentials?.image !== "string"
                      ? URL.createObjectURL(credentials?.image)
                      : credentials?.image
                  }
                  className="!object-cover h-56 w-56"
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
                    image: e.target.files[0],
                  })
                }
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </aside>
        </div>

        {/* TEXT REACH  */}

        <div className="">
          <h1 className="mb-2">Product Description</h1>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={credentials.description}
            onChange={(e) => {
              setcredentials((c) => ({ ...c, description: e }));
            }}
            className="h-[180px] !rounded-lg"
          />
        </div>
      </article>
    </main>
  );
}

export default AddCategory;

export const modules = {
  toolbar: [
    [{ size: ["small", "medium", "large", "huge"] }],

    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["link"],
    [{ color: [] }],
    ["blockquote"],
  ],
};
