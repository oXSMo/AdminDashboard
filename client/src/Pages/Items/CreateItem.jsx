import React, { useEffect } from "react";
import AddItem from "../../Components/forms/AddItem";
import { useCreateItem } from "../../Hooks/useItem";
import { itemSlice } from "../../Store/dashboard";

function CreateItem() {
  const { credentials, options, setcredentials, setoptions } = itemSlice();
  const { create, loading } = useCreateItem();

  useEffect(() => {
    setcredentials({});
    setoptions([]);
  }, []);

  const handleClick = async () => {
    await create(credentials, options);
  };

  return (
    <section className="2xl:grid  justify-center">
      <header className="mb-3 ml-1">
        <h1 className="font-semibold tracking-wide text-[17px]">
          Create New Item
        </h1>
      </header>

      <AddItem handleClick={handleClick} loading={loading} />
    </section>
  );
}

export default CreateItem;
