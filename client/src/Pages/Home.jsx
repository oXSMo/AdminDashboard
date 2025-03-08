import React from "react";
import { useToggleTheme } from "../Utils/Hooks";
function Home() {
  const { setisDark } = useToggleTheme();

  return (
    <section className="w-full h-screen grid place-content-center">
      
    </section>
  );
}

export default Home;
