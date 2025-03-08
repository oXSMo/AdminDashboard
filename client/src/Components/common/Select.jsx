import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { useClickOut } from "../../Utils/Hooks";

function Select({
  placement = "bottom",
  classPrefix = "",
  className = "",
  classOption = "",
  placeholder = "",
  def = true,
  options,
  set,
  state,
  name,
  multiple = false,
  Optiondisabled,
  disabled,
  chevron = true,
  offSet = 5,
  list,
  fixedPlaceholder = false,
  strategy = "absolute",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOut(() => {
    setIsOpen(false);
  });
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(offSet), flip(), shift()], // Adjust tooltip position
    whileElementsMounted: autoUpdate, // Auto-update position
    strategy,
    placement,
  });

  console.log(refs?.reference?.current?.offsetWidth);

  return (
    <article ref={ref}>
      {/* Tooltip Trigger (Button) */}
      <aside
        ref={refs.setReference}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          def
            ? `border grid grid-cols-[1fr_auto]  cursor-pointer items-center border-color px-0.5  py-1.5 rounded-md  dark:hover:bg-neutral-700 hover:bg-neutral-200 hover:border-transparent text-sm font-medium ${className} ${
                isOpen &&
                "dark:bg-neutral-700 bg-neutral-200 border-transparent"
              }`
            : className
        } ${disabled && "pointer-events-none opacity-60"}`}
      >
        <h1
          className={`line-clamp-1 self-center !mb-0 break-all px-2 ${
            multiple && "text-xs"
          }`}
        >
          {fixedPlaceholder
            ? placeholder
            : multiple
            ? list.length
              ? options
                  ?.filter((o) => state[name]?.find((s) => s === o) === o)
                  ?.map((o) => list[options.indexOf(o)])
                  ?.join(", ")
              : state[name].length
              ? state[name].join(", ")
              : placeholder
            : list
            ? list[options.indexOf(state[name])]
            : state[name]}
        </h1>
        {chevron && (
          <MdChevronLeft
            className={`-rotate-90 w-4  translate-y-px justify-self-end text-base duration-100 
            ${isOpen && "!rotate-90"}`}
          />
        )}
      </aside>

      {/* Tooltip Content */}
      {true && (
        <div
          ref={refs.setFloating}
          style={{...floatingStyles,width: refs?.reference?.current?.offsetWidth}}
          className={`bg-color space-y-0.5 relative z-40 max-h-48 overflow-y-auto rounded-lg popFade shadow-lg shadow-black/30 border border-color scroll-rounded  p-1 text-sm ${
            isOpen ? "visible" : "invisible"
          } ${classPrefix}`}
        >
          {options?.map((o, i) => (
            <div
              onClick={() => {
                multiple
                  ? set((old) => ({
                      ...old,
                      [name]: !old[name]?.find((e) => e === o)
                        ? [...old[name], o]
                        : old[name].filter((e) => e !== o),
                    }))
                  : set((old) => ({ ...old, [name]: o }));
                setIsOpen(multiple ? isOpen : false);
              }}
              className={`w-full text-[13px] cursor-pointer py-1  rounded-md hover:bg-neutral-200 px-2 dark:hover:bg-neutral-800   ${classOption}
                ${
                  multiple
                    ? state[name].find((e) => e === o) &&
                      "!bg-neutral-300 dark:!bg-neutral-700"
                    : state[name] === o &&
                      "!bg-neutral-300 dark:!bg-neutral-700"
                }
                ${
                  Optiondisabled?.find((x) => x === i || x === o) &&
                  "pointer-events-none opacity-60"
                }
                `}
            >
              {list ? list[i] : o}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default Select;
