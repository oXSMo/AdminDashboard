import React, { useState } from "react";
import Input from "../Components/common/Input";
import { useLogin } from "../Hooks/useUser";

function Test() {
  const [credentials, setcredentials] = useState({ email: "", passowrd: "" });
  const { loading, login,err } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };
  return (
    <section className="w-full h-full grid place-content-center">
      <form onSubmit={handleSubmit} className="container p-4 space-y-4">
        <Input err={err?.email} name="email" set={setcredentials} state={credentials} />
        <Input err={err?.password} name="password" set={setcredentials} state={credentials} />
        <button type="submit" className="button w-full border border-color">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Test;
