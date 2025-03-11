import React from "react";
import { shipSlice } from "../../Store/dashboard";
import { InputTitle } from "./AddOrder";
import Select from "../common/Select";
import { wilayas } from "../../Utils/Constants";
import TextArea from "../common/TextArea";
import Checkbox from "../common/Checkbox";
import Switch from "../common/Switch";
import Tooltip from "../common/Tooltip";
import { useCreateCoil } from "../../Hooks/useOrder";
import { useNavigate } from "react-router-dom";

function AddCoil({_id}) {
  const { credentials, setcredentials } = shipSlice();

  const { create, loading } = useCreateCoil();
  const navigate = useNavigate();

  const handleCreate = async () => {
    await create(credentials,_id);
    navigate("/orders")
  };

  

  return (
    <section className="w-full grid md:grid-cols-[1fr_auto]  gap-4">
      <article className="container  !rounded-lg">
        <header className="w-full p-4 py-2.5 border-b border-color font-medium tracking-wide">
          User Info
        </header>

        <main className="p-4 font-medium space-y-4">
          <InputTitle
            credentials={credentials}
            set={setcredentials}
            name="Client"
            placeholder="User name"
            title="Client"
            classTitle="text-sm !font-medium !tracking-wide ml-0.5"
            value
          />

          <aside className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h1 className="text-sm  tracking-wide ml-0.5">State</h1>
              <Select
                options={[...Array(58)].map((_, i) => (i + 1).toString())}
                list={wilayas}
                name="IDWilaya"
                set={setcredentials}
                state={credentials}
              />
            </div>
            <InputTitle
              credentials={credentials}
              set={setcredentials}
              name="Commune"
              title="City"
              classTitle="text-sm !font-medium !tracking-wide ml-0.5 "
              value
            />
          </aside>

          <div className="grid md:grid-cols-2 gap-4">
            <InputTitle
              credentials={credentials}
              set={setcredentials}
              name="MobileA"
              placeholder="05********"
              title="Phone number"
              classTitle="text-sm !font-medium !tracking-wide ml-0.5 "
              type="number"
              value
            />
            <InputTitle
              credentials={credentials}
              set={setcredentials}
              name="Adresse"
              title="Street Address"
              classTitle="text-sm !font-medium !tracking-wide ml-0.5 "
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextArea
              name="TProduit"
              set={setcredentials}
              state={credentials}
              title="Product"
              placeholder="Exmple : Sac a Dos (1) + Usb ( 1 )"
              className="h-20 max-h-40 min-h-14"
            />
            <TextArea
              name="Note"
              set={setcredentials}
              state={credentials}
              title="Note"
              className="h-20 max-h-40 min-h-14"
            />
          </div>
        </main>
      </article>

      <article className=" min-w-80 w-full grid grid-rows-[auto_40px] gap-4">
        <aside className="container  !rounded-lg">
          <header className="w-full p-4 py-2.5 border-b border-color font-medium tracking-wide">
            Coil Type & Price
          </header>

          <main className="p-4 font-medium space-y-8">
            <InputTitle
              credentials={credentials}
              set={setcredentials}
              name="Total"
              title="Price"
              classTitle="text-sm !font-medium !tracking-wide ml-0.5 "
              type="number"
              value
            />

            <div className="grid grid-cols-2 text-sm tracking-wide [&_h1]:opacity-80 px-1 gap-6">
              {/* STOP DESK  */}
              <h1 className="">Stop Desk</h1>
              <Switch
                active={credentials.TypeLivraison === "1" ? true : false}
                onClick={() => {
                  setcredentials({
                    ...credentials,
                    TypeLivraison:
                      credentials.TypeLivraison === "0" ? "1" : "0",
                  });
                }}
                className="justify-self-end"
              />

              {/* COIL TYPE  */}
              <div className="flex gap-2 items-center">
                <p className="opacity-80">Coil Type </p>
                <Tooltip className="max-w-32" placement="top" strategy="fixed">
                  <div className="w-4 h-4 scale-75 font-bold grid place-content-center cursor-pointer rounded-full text-[9px] bg-color opacity-80 border border-color shadow shadow-black/40">
                    ?
                  </div>
                  <h1 className="dark:bg-qua bg-sec text-[11px] !opacity-100 p-1 text-white rounded text-center">
                    Active mean Echange
                  </h1>
                </Tooltip>
              </div>
              <Switch
                active={credentials.TypeColis === "1" ? true : false}
                onClick={() => {
                  setcredentials({
                    ...credentials,
                    TypeColis: credentials.TypeColis === "0" ? "1" : "0",
                  });
                }}
                className="justify-self-end"
              />
              {/* CONFIRMEE  */}
              <h1 className="">Confrime</h1>
              <Switch
                active={credentials.Confrimee === "1" ? true : false}
                onClick={() => {
                  setcredentials({
                    ...credentials,
                    Confrimee: credentials.Confrimee === "" ? "1" : "",
                  });
                }}
                className="justify-self-end"
              />
            </div>
          </main>
        </aside>

        <footer className="container h-full flex items-center justify-end px-4 gap-3 !rounded-lg">
          <button
            onClick={() => setcredentials(inisial)}
            className="text-sm  text-red-600 hover:underline"
          >
            Cancel
          </button>
          <div className="w-px h-4 dark:bg-gray-500 bg-gray-800" />
          <button
            onClick={handleCreate}
            disabled={
              !credentials.Client ||
              !credentials.MobileA ||
              !credentials.Adresse ||
              !credentials.Commune ||
              !credentials.Total ||
              !credentials.TProduit
            }
            className="text-sm disabled:opacity-60 disabled:pointer-events-none  text-blue-600 hover:underline"
          >
            {loading ? (
              <div className="w-5 h-5 !border-4 loader !border-t-blue-600" />
            ) : (
              "Add Coil"
            )}
          </button>
        </footer>
      </article>
    </section>
  );
}

export default AddCoil;

const inisial = {
  Client: "",
  MobileA: "",
  Adresse: "",
  Commune: "",
  Total: 0,
  TProduit: "",
  Confrimee: "",
  TypeColis: "0",
  TypeLivraison: "0",
  IDWilaya: "1",
  Note: "",
};
