import React, { useEffect, useState } from "react";
import AddCategory from "../../Components/forms/AddCategory";
import { MdClose } from "react-icons/md";
import { categorySlice } from "../../Store/dashboard";
import { useDeleteCategory, useEditCategory } from "../../Hooks/useCategory";
import Modal from "../../Components/common/Modal";

function CategoryEdit({ set, category, getCategories }) {
  const { credentials, setcredentials } = categorySlice();
  const [modal, setmodal] = useState(false);
  const { loading, update } = useEditCategory();
  const { Delete, loading: Dloading } = useDeleteCategory();

  useEffect(() => {
    setcredentials({
      name: category.name,
      image: category.image,
      description: category.description,
    });
  }, [category]);

  const handleSubmit = async () => {
    await update(credentials, category._id);
    await getCategories();
  };

  const handleDelete = async () => {
    await Delete(category._id);
    await getCategories();
    set(false);
  };

  return (
    <section className="container w-[800px] text-neutral-800 dark:text-neutral-200 max-w-[98vw] grid grid-rows-[auto_1fr_auto] max-h-[90vh]">
      <header className="flex justify-between relative text-center border-b border-color py-3 px-4">
        <h1 className="font-bold tracking-wide text-xl mx-auto">
          Edit Category
        </h1>
        <MdClose
          onClick={() => set(false)}
          className="translate-y-1 duration-200 right-4 text-xl hover:scale-125 hover:text-red-600 cursor-pointer"
        />
      </header>

      <AddCategory credentials={credentials} setcredentials={setcredentials} />

      <footer className="flex justify-end gap-4 px-6 p-3 border-t border-color">
        <button
          onClick={() => setmodal(true)}
          className="button border border-red-600 text-red-600 w-32 hover:bg-red-600 hover:text-white"
        >
          Delete
        </button>
        <button
          onClick={handleSubmit}
          className="button border border-blue-600 text-blue-600 w-44 hover:bg-blue-600 hover:text-white "
          disabled={loading || !credentials.name || !credentials?.image}
        >
          {loading ? (
            <div className="loader w-5 h-5 !border-4 !border-t-blue-600" />
          ) : (
            "Update Category"
          )}
        </button>
      </footer>
      <DeleteModal set={setmodal} handleDelete={handleDelete} open={modal} />
    </section>
  );
}

const DeleteModal = ({ open, set, handleDelete }) => {
  return (
    <Modal className="" onClose={set} open={open}>
      <article className="max-w-[95vw] w-[400px] font-medium tracking-wide p-4 px-5 container relative dark:text-neutral-200">
        <div
          onClick={() => set(false)}
          className="absolute right-3 cursor-pointer group top-3 p-1.5 rounded-full bg-black/15 text-red-600"
        >
          <MdClose className="text-lg  group-hover:scale-110 duration-200" />
        </div>

        <h1 className="text-lg">Are you sure?</h1>
        <h2 className="opacity-70 text-sm mt-2 font-normal">
          Are you sure you want to delete this category ?
        </h2>

        <div className="flex justify-end mt-6 gap-2 text-xs">
          <button
            onClick={() => set(false)}
            className="button border border-color "
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="button border border-red-600 text-white bg-red-600"
          >
            Yes I'm sure
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default CategoryEdit;
