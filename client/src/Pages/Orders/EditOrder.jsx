import React, { useEffect } from "react";
import AddOrder from "../../Components/forms/AddOrder";
import { useParams } from "react-router-dom";
import { orderSlice } from "../../Store/dashboard";
import { useGetOrder, useUpdateOrder } from "../../Hooks/useOrder";

function EditOrder() {
  const { _id } = useParams();

  const { credentials, setcredentials } = orderSlice();
  const { order } = useGetOrder(_id);
  const { Update,loading } = useUpdateOrder();
  const handleSubmit = async () => {
    await Update(_id, credentials, credentials?.img);
  };

  console.log(order);

  useEffect(() => {
    if (order) {
      setcredentials(() => {
        let result = {};
        Object.keys(credentials).map((k) => {
          if (Object.keys(order).indexOf(k) !== -1)
            return (result[k] =
              Object.values(order)[Object.keys(order).indexOf(k)]);
        });
        return {
          ...result,
          user: "67a556fc3bfd6fba32e07cb8",
          category: order.item.category._id,
          item: order.item._id,
        };
      });
    }
  }, [order]);

  console.log({ credentials });

  return (
    <section className="2xl:grid fadeIn justify-center">
      <header className="mb-3 ml-1">
        <h1 className="font-semibold tracking-wide text-[17px]">
          Edit Order
        </h1>
      </header>

      <AddOrder
        credentials={credentials}
        setcredentials={setcredentials}
        handleSubmit={handleSubmit} loading={loading}
      />
    </section>
  );
}

export default EditOrder;
