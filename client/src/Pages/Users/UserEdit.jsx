import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGetOneUser, useUpdateUser } from "../../Hooks/useUser";
import AddUser from "../../Components/forms/AddUser";

function UserEdit() {
  const { _id } = useParams();

  const { user, loading } = useGetOneUser(_id);
  const { update, err, loading: Uloading } = useUpdateUser(_id);
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

  useEffect(() => {
    if (user) {
      setcredentials(() => {
        let result = {};
        Object.keys(credentials).map((k) => {
          if (Object.keys(user).indexOf(k) !== -1)
            return (result[k] =
              Object.values(user)[Object.keys(user).indexOf(k)]);
        });
        return { ...result, country: "algeria", confirmPassword: "" };
      });
    }
  }, [user]);

  console.log({ credentials });

  const handleClick = async (e) => {
    e.preventDefault();
    await update(credentials);
  };

  return (
    <section className="mx-auto lg:w-[600px] my-4 fadeIn">
      <header className="flex gap-4 mb-6">
        <FaUserEdit className="text-5xl dark:opacity-60 opacity-80" />
        <div>
          <h1 className="text-xl tracking-wide font-semibold">
            Edit {user?.username} Profile
          </h1>
          <h2 className="opacity-50">
            Edit an already account Profile exist on your system.
          </h2>
        </div>
      </header>
      <AddUser
        credentials={credentials}
        setcredentials={setcredentials}
        handleClick={handleClick}
        edit
        loading={Uloading}
        err={err}
      />
    </section>
  );
}

export default UserEdit;
