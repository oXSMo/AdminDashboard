import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

function Accordion({
  title = "",
  classTitle = "",
  classOption = "",
  classAccordion = "",
  classIcon = "",
  children,
  className = "",
  chev = true,
  icon = <BsChevronDown />,
  placement = "left",
  multiple = false,
  inisial = [],
}) {
  const [open, setopen] = useState(inisial);

  console.log(open);

  return (
    <article className={` ${className}`}>
      {React.Children.map(children, (child, i) => {
        if(React.isValidElement(child)) return (
          <main
            className={classAccordion}
            onClick={() => {
              setopen((state) =>
                multiple
                  ? state.find((o) => o === i) !== undefined
                    ? state.filter((o) => o != i)
                    : [...state, i]
                  : state.find((o) => o === i) !== undefined
                  ? []
                  : [i]
              );
            }}
          >
            <header
              className={`flex items-center cursor-pointer ${
                placement === "left" ? "gap-3" : "justify-between"
              }`}
            >
              {placement === "left" &&
                React.cloneElement(icon, {
                  className: `duration-200 ${
                    open.find((o) => o === i) !== undefined && "rotate-180"
                  } ${classIcon} `,
                })}
              <h1 className={`line-clamp-1 ${classTitle}`}>{title[i]}</h1>
              {placement !== "left" &&
                React.cloneElement(icon, {
                  className: `duration-200 ${
                    open.find((o) => o === i) !== undefined && "rotate-180"
                  } ${classIcon} `,
                })}
            </header>

            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                open.find((o) => o === i) !== undefined
                  ? "grid-rows-[1fr] opacity-100 mb-2"
                  : "grid-rows-[0fr] opacity-0"
              } ${classOption}`}
            >
              {React.cloneElement(child, {
                className: "overflow-hidden",
              })}
            </div>
          </main>
        );
      })}
    </article>
  );
}

{
  /* <div
        className={`grid overflow-hidden transition-all duration-500 ${
          open
            ? "grid-rows-[1fr] opacity-100 mb-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      ></div> */
}
export default Accordion;
