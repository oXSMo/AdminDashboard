import React from "react";

function TextArea({
  state,
  set,
  name,
  className = "",
  placeholder = "",
  title,
  value = true,
}) {
  let args = {};
  if (value) args.value = state[name];
  return (
    <div className="">
      {title && <h1 className="text-sm  tracking-wide ml-0.5 mb-2">{title}</h1>}
      <textarea
      placeholder={placeholder}
        onChange={(e) => set({ ...state, [name]: e.target.value })}
        className={`border border-color rounded-md px-4 py-2 flex relative focus-within:ring-1 dark:ring-neutral-500 ring-neutral-800 duration-200 items-center gap-3 text-[13px] outline-none w-full disabled:cursor-not-allowed bg-transparent outline- font-medium tracking-wide dark:text-neutral-300 text-black/70  placeholder:text-black/60 placeholder:dark:text-white/30 placeholder:text-xs  ${className}`}
        {...args}
      ></textarea>
    </div>
  );
}

export default TextArea;
