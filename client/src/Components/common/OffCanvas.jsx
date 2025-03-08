import React, { useEffect, useRef, useState } from "react";
import Portal from "../layouts/Portal";

function OffCanvas({
  children,
  open,
  set,
  placement = "right",
  className = "",
}) {
  const ref = useRef();

  const [animate, setanimate] = useState(false);
  const [kill, setkill] = useState(true);

  const handleClick = () => {
    ref.current.classList.add("shake");

    setTimeout(() => {
      ref.current.classList.remove("shake");
    }, 1000);
  };

  useEffect(() => {
    if (open) {
      setkill(false);
      var t1 = setTimeout(() => {
        setanimate(true);
      }, 100);
    } else {
      setanimate(false);
      var t2 = setTimeout(() => {
        setkill(true);
      }, 400);
    }
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 400);
      // or "scroll"
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  return (
    <Portal>
      {!kill && (
        <article
          onClick={() => set(false)}
          className={`fixed inset-0  z-[999] transition-colors ${
            animate ? "visible bg-black/50" : "invisible"
          }`}
        >
          <aside
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className={`right-0 absolute border-l border-color  shadow h-screen md:w-96 w-screen dark:bg-fif bg-white transition-all duration-500 ${className} ${
              animate ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {children}
          </aside>
        </article>
      )}
    </Portal>
  );
}

export default OffCanvas;
