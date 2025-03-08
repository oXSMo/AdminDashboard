import React, { useState } from 'react'
import { useLogin } from '../../Hooks/useUser';
import Input from '../../Components/common/Input';

function Auth() {
    const [credentials, setcredentials] = useState({ email: "", passowrd: "" });
    const { loading, login,err } = useLogin();
    const handleSubmit = async (e) => {
      e.preventDefault();
      await login(credentials);
    };
    return (
      <section className="w-full h-screen grid place-content-center bg-white dark:bg-fif">
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

export default Auth
