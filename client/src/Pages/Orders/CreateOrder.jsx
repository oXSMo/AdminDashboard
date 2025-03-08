import React from "react";
import { orderSlice } from "../../Store/dashboard";
import AddOrder from "../../Components/forms/AddOrder";
import { useCreateOrder } from "../../Hooks/useOrder";

function CreateOrder() {
  const { credentials, setcredentials } = orderSlice();
  const { create, loading } = useCreateOrder();
  const handleSubmit = async () => {
    await create(credentials);
  };

  return (
    <section className="2xl:grid fadeIn justify-center">
      <header className="mb-3 ml-1">
        <h1 className="font-semibold tracking-wide text-[17px]">
          Create New Order
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

export default CreateOrder;
