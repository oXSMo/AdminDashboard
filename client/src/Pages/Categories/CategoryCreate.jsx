import React from "react";
import { categorySlice } from "../../Store/dashboard";
import { InputTitle } from "../../Components/forms/AddOrder";
import { CiImageOn } from "react-icons/ci";
import ReactQuill from "react-quill";
import "./DarkTheme.css";
import { MdClose } from "react-icons/md";
import AddCategory from "../../Components/forms/AddCategory";
import { useCreateCategory } from "../../Hooks/useCategory";
function CategoryCreate({ set, getCategories }) {
  const { credentials, setcredentials } = categorySlice();
  const { create, loading, err } = useCreateCategory();

  const handleSubmit = async () => {
    await create(credentials);
    await getCategories();
    set(false);
  };

  return (
    <section className="container w-[800px] text-neutral-800 dark:text-neutral-200 max-w-[98vw] grid grid-rows-[auto_1fr_auto] max-h-[90vh]">
      <header className="flex justify-between relative text-center border-b border-color py-3 px-4">
        <h1 className="font-bold tracking-wide text-xl mx-auto">
          Create New Category
        </h1>
        <MdClose
          onClick={() => set(false)}
          className="translate-y-1 duration-200 right-4 text-xl hover:scale-125 hover:text-red-600 cursor-pointer"
        />
      </header>

      <AddCategory
        credentials={credentials}
        setcredentials={setcredentials}
        handleSubmit={handleSubmit}
      />

      <footer className="flex justify-end px-6 p-3 border-t border-color">
        <button
          onClick={handleSubmit}
          className="button border border-blue-600 text-blue-600 w-44 hover:bg-blue-600 hover:text-white "
          disabled={loading || !credentials.name || !credentials?.image}
        >
          {loading ? (
            <div className="loader w-5 h-5 !border-4 !border-t-blue-600" />
          ) : (
            "Create Category"
          )}
        </button>
      </footer>
    </section>
  );
}

export default CategoryCreate;
