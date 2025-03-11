import React from "react";
import AddCoil from "../../Components/forms/AddCoil";
import { shipSlice } from "../../Store/dashboard";

function ShippingCreate() {
  const { credentials, setcredentials } = shipSlice();

  return (
    <section className="2xl:grid fadeIn justify-center">
      <header className="mb-3 ml-1">
        <h1 className="font-semibold tracking-wide text-[17px]">
          Create New Coil
        </h1>
      </header>

      <AddCoil />
    </section>
  );
}

export default ShippingCreate;
