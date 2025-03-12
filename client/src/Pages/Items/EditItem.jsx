import React, { useEffect } from "react";
import AddItem from "../../Components/forms/AddItem";
import { itemSlice } from "../../Store/dashboard";
import { useParams } from "react-router-dom";
import { useGetItem, useUpdateItem } from "../../Hooks/useItem";

function EditItem() {
  const { _id } = useParams();
  const {
    credentials,
    setcredentials,
    options,
    setoptions,
    optionsCount,
    setoptionsCount,
  } = itemSlice();
  const { item } = useGetItem(_id);
  const { update, loading } = useUpdateItem();

  useEffect(() => {
    if (item)
      setcredentials({
        name: item?.name,
        price: item?.price,
        description: item?.description,
        available: item?.available,
        category: item?.category._id
      });
    setoptions(item?.options.length ? item?.options : []);
    setoptionsCount(item?.options.length);
  }, [item]);

  const handleClick = async () => {
    await update(credentials, options, _id);
  };

  return (
    <section className="2xl:grid  justify-center">
      <header className="mb-3 ml-1">
        <h1 className="font-semibold tracking-wide text-[17px]">Edit Item</h1>
      </header>

      {item && <AddItem handleClick={handleClick} loading={loading}/>}
    </section>
  );
}

export default EditItem;
