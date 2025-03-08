import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";

function Pagination({ current, total, set }) {
  const add = () => set((state) => ({ ...state, page: state.page + 1 }));
  const reduce = () => set((state) => ({ ...state, page: state.page - 1 }));

  useEffect(() => {
    set((state) => ({ ...state, page: 1 }));
  }, [total]);

  return (
    <article className="flex gap-1 items-center">
      <button
        disabled={current === 1}
        className="w-8 grip place-content-center disabled:pointer-events-none disabled:opacity-40 aspect-square bg-hover rounded-md"
        onClick={reduce}
      >
        <MdChevronLeft className="mx-auto" />
      </button>

      <input
        type="number"
        disabled={!total}
        onChange={(e) =>
          set((state) => ({
            ...state,
            page: Math.max(1, Math.min(e.target.value, total)),
          }))
        }
        value={current}
        className="w-8 flex items-center justify-center aspect-square rounded-md bg-black/20 dark:bg-white/10 outline-none text-center"
      />
      {/* <div className="w-8 flex items-center justify-center aspect-square rounded-md bg-black/20 dark:bg-white/10">
        <h1>{current}</h1>
      </div> */}
      <p className="opacity-60 mx-1 text-sm">of</p>

      <h2 className="opacity-70 w-8 text-center">{total}</h2>
      <button
        disabled={current === total}
        className="w-8 grip place-content-center disabled:pointer-events-none disabled:opacity-40 aspect-square bg-hover rounded-md"
        onClick={add}
      >
        <MdChevronLeft className="mx-auto rotate-180" />
      </button>
    </article>
  );
}

export default Pagination;
