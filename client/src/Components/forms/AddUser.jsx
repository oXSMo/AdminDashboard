import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import Input from "../common/Input";
import Select from "../common/Select";
import { wilayas } from "../../Utils/Constants";
import { useCreateUser } from "../../Hooks/useUser";

function AddUser({
  handleClick,
  loading,
  err,
  credentials,
  setcredentials,
  edit = false,
}) {
  return (
    <form
      onSubmit={handleClick}
      className="w-full container shadow-lg shadow-black/40  md:p-8 p-4 text-[15px] dark:text-neutral-500 font-medium tracking-wide items-center md:grid grid-cols-[140px_1fr] md:gap-y-5 md:[&_h1]:mb-0 [&_h1]:mb-2"
    >
      {/* USERNAME  */}
      <h1>Username</h1>
      <Input
        set={setcredentials}
        name="username"
        placeholder="Enter Username"
        state={credentials}
        className="md:mb-0 mb-6"
        err={err?.username}
      />
      {/* FULL ANME  */}
      <h1>Full Name</h1>
      <div className="grid grid-cols-2 gap-4 md:mb-0 mb-6">
        <Input
          set={setcredentials}
          name="firstName"
          placeholder="Enter firstName"
          state={credentials}
        />
        <Input
          set={setcredentials}
          name="lastName"
          placeholder="Enter LastName"
          state={credentials}
        />
      </div>
      {/* EMAIL  */}
      <h1>Email</h1>
      <Input
        set={setcredentials}
        name="email"
        placeholder="Enter Email Address"
        state={credentials}
        err={err?.email}
        className="md:mb-0 mb-6"
      />

      {/* PHONE NUMBER  */}
      <h1>Phone</h1>
      <Input
        set={setcredentials}
        name="phoneNumber"
        placeholder="Enter Phone Number"
        state={credentials}
        className="md:mb-0 mb-6"
      />

      {/* LOCATION  */}
      <h1>Location</h1>
      <div className="grid grid-cols-3 gap-4 md:mb-0 mb-6">
        <Select
          options={["algeria"]}
          disabled={true}
          name="country"
          set={setcredentials}
          state={credentials}
          className="!h-10"
        />
        <Select
          list={wilayas}
          options={[...Array(58)].map((_, i) => i + 1)}
          name="state"
          set={setcredentials}
          state={credentials}
          className="!h-10"
          fixedPlaceholder={true}
          placeholder={`${credentials.state}- ${
            wilayas[credentials.state - 1]
          }`}
          placement="bottom"
        />
        <Input
          set={setcredentials}
          name="city"
          placeholder="Enter City"
          state={credentials}
        />
      </div>

      {/* ADDRESS  */}
      <h1>Address</h1>
      <div className="grid grid-cols-3 gap-4 md:mb-0 mb-6">
        <Input
          set={setcredentials}
          name="streetAddress1"
          placeholder="Address"
          state={credentials}
        />
        <Input
          set={setcredentials}
          name="postalCode"
          placeholder="Postal Code"
          state={credentials}
        />
        <Select
          options={["normal", "super"]}
          name="role"
          classOption="!w-24"
          set={setcredentials}
          state={credentials}
          className="!h-10"
        />
      </div>

      {/* PASSWORD  */}
      <h1>Password</h1>
      <div className="grid grid-cols-2 gap-4 md:mb-0 mb-6">
        <Input
          set={setcredentials}
          name="password"
          placeholder="Enter Password"
          state={credentials}
          err={err?.password}
        />
        <Input
          set={setcredentials}
          name="confirmPassword"
          placeholder="Confirm Password"
          state={credentials}
          err={err?.confirmPassword}
        />
      </div>

      <div className="mt-4 flex justify-end gap-3 col-span-2">
        <button
          type="button"
          onClick={() =>
            setcredentials({
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
            })
          }
          className="button border !text-sm border-color dark:text-white !px-5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          onClick={handleClick}
          className="button border !text-sm border-color text-white bg-blue-600 !px-4 !w-28"
        >
          {loading ? <div className="loader w-5 h-5 !border-4" /> : edit ? "Edit User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

export default AddUser;
