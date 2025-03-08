import React from "react";
import { FaCheck } from "react-icons/fa";

export default function   Checkbox({
  onCheck,
  onChange,
  check,
  className,
  text,
  disabled = false,
}) {
  return (
    <article
      onClick={() => {
        !disabled && onChange ? onChange() : onCheck(!check);
      }}
      className={`flex gap-2 items-center cursor-pointer  font-bold tracking-wide text-[16px] ${
        disabled && "!cursor-not-allowed opacity-50"
      }`}
    >
      <div
        className={`w-[17px] h-[17px] border border-gray-600 rounded-[5px] text-[12px] grid place-content-center  duration-300 ${className}
            ${check && "dark:bg-blue-600 bg-blue-500 !border-blue-600"}
            ${disabled && "!bg-gray-700 !border-gray-800"}
            `}
      >
        {" "}
        <FaCheck
          className={`duration-300 text-white scale-75 ${!check && "!scale-0 opacity-0"}`}
        />
      </div>
      {text}
    </article>
  );
}
