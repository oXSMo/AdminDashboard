import React, { useEffect, useState } from "react";
import { color } from "../Users/UserTable";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { useClickOut } from "../../Utils/Hooks";

function Status({ credentials, o, setcredentials }) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOut(() => {
    setIsOpen(false);
  });
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), flip(), shift()], // Adjust tooltip position
    whileElementsMounted: autoUpdate, // Auto-update position
  });

  const set = { setcredentials, setIsOpen };

  return (
    <aside ref={ref}>
      <input
        ref={refs.setReference}
        onClick={() => setIsOpen(true)}
        onFocus={() => {
          setIsOpen(true);
        }}
        style={{
          color: color(credentials.status),
          background: `${color(credentials.status)}33`,
        }}
        className="line-clamp-1 outline-none mx-auto text-[13px] w-28 px-2 py-1.5  font-medium bg-red-600 text-center rounded-md first-letter:uppercase break-all"
        value={credentials.status}
        onChange={(e) =>
          setcredentials({ ...credentials, status: e.target.value })
        }
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="w-28 bg-color max-h-36 shadow-lg shadow-black/60 overflow-auto popFade z-40 [&::-webkit-scrollbar]:w-1.5  rounded-md space-y-0.5 p-1"
        >
          <Option text="pending" {...set} />
          <Option text="processing" {...set} />
          <Option text="cancelled" {...set} />
          <Option text="delivered" {...set} />
          <Option text="shipped" {...set} />
          <Option text="done" {...set} />
        </div>
      )}
    </aside>
  );
}

const Option = ({ text, setcredentials, setIsOpen }) => (
  <div
    style={{ color: color(text) }}
    onClick={() => {
      setcredentials((state) => ({ ...state, status: text }));
      setIsOpen(false);
    }}
    className="w-full py-1 text-center text-xs rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-300"
  >
    {text}
  </div>
);

export default Status;
