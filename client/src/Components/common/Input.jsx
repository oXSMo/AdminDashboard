import React, { useRef } from "react";

function Input({
  classInput = "",
  className = "",
  type = "text",
  name,
  set,
  state,
  def = true,
  icon,
  classIcon = "",
  children,
  placeholder = "",
  disabled = false,
  wait = false,
  value = true,
  err = "",
  onChange,
  VALUE,
}) {
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    clearTimeout(timeoutRef.current); // Clear previous timeout
    timeoutRef.current = setTimeout(() => {
      // Perform server-side action here (e.g., API call)
      console.log("Input value:", e.target.value);
      set((state) => ({ ...state, [name]: e.target.value }));
      // Clear the timeout ref after the action is completed
      timeoutRef.current = null;
    }, 500); // Adjust the delay as needed (in milliseconds)
  };

  let args = {};

  if (value && !wait && state) args.value = state[name];
  
   if (VALUE) args.value = VALUE;

  return (
    <div className="relative">
      <article
        className={`${
          def &&
          "border border-color rounded-md px-4 py-1.5 flex relative focus-within:ring-1 dark:ring-neutral-500 ring-neutral-800 duration-200 items-center gap-3 text-[15px]"
        } ${disabled && "cursor-not-allowed"} ${
          err && "!border-red-600 !ring-red-600"
        } ${className}`}
      >
        {icon &&
          React.cloneElement(icon, { className: ` opacity-60 ${classIcon}` })}
        <input
          ref={timeoutRef}
          type={type}
          className={`outline-none w-full disabled:cursor-not-allowed bg-transparent outline- font-medium tracking-wide dark:text-neutral-300 text-black/70  placeholder:text-black/60 placeholder:dark:text-white/30 placeholder:text-sm ${classInput}`}
          onChange={
            onChange
              ? onChange
              : wait
              ? handleChange
              : (e) => set({ ...state, [name]: e.target.value })
          }
          placeholder={placeholder}
          disabled={disabled}
          {...args}
        />
        {children}
      </article>
      <p
        className={`text-red-600 text-xs font-light ml-1 opacity-0 duration-150 ${
          err && "opacity-100"
        }`}
      >
        {err}
      </p>
    </div>
  );
}

export default Input;
