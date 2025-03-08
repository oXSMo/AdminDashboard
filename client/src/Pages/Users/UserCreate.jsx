import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useCreateUser } from "../../Hooks/useUser";
import AddUser from "../../Components/forms/AddUser";

function UserCreate() {
  const [credentials, setcredentials] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
    confirmPassword: "",
    postalCode: "",
    country: "algeria",
    state: 1,
    role: "normal",
    streetAddress1: "",
  });

  console.log(credentials);
  

  const { createUser, err, loading } = useCreateUser();

  const handleClick = async (e) => {
    e.preventDefault();
    await createUser(credentials);
  };

  return (
    <section className="mx-auto lg:w-[600px] my-4 fadeIn">
      <header className="flex gap-4 mb-6">
        <MdOutlineAccountCircle className="text-5xl dark:opacity-60 opacity-80" />
        <div>
          <h1 className="text-xl tracking-wide font-semibold">
            Create New User
          </h1>
          <h2 className="opacity-50">
            Create a new user account for your system.
          </h2>
        </div>
      </header>
      <AddUser
        credentials={credentials}
        setcredentials={setcredentials}
        handleClick={handleClick}
        err={err}
        loading={loading}
      />
    </section>
  );
}

export default UserCreate;
