import React, { useState } from "react";
import { useClickOut } from "../../Utils/Hooks";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react";

function DropDown({
  children,
  placement = "bottom-left",
  classDropdown = "",
  offSet = 5,
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
    placement,
    strategy,
  });

  if (children[1] && children[0])
    return (
      <div ref={ref}>
        {React.cloneElement(children[0], {
          ref: refs.setReference,
          onClick: () => setIsOpen(!isOpen),
        })}

        {isOpen && (
          <div>
            {React.cloneElement(children[1], {
              ref: refs.setFloating,
              style: floatingStyles,
              onClick: () => setIsOpen(false),
            })}
          </div>
        )}
      </div>
    );

  // <article ref={ref}>
  //   {React.cloneElement(button, {
  // ref: refs.setReference,
  // onClick: () => setIsOpen(!isOpen),
  // className: def
  //   ? `border grid grid-cols-[1fr_auto]   items-center border-color px-2.5 py-1.5 rounded-md  dark:hover:bg-neutral-700 hover:bg-neutral-200 hover:border-transparent text-sm font-medium ${className}`
  //   : className,
  //   })}
  //   {isOpen &&
  //     React.cloneElement(children, {
  // className: `${classDropdown}`,
  // ref: refs.setFloating,
  // style: floatingStyles,
  //     })}

  //   {React.cloneElement(children, {
  //     ref: refs.setReference,
  //     onClick: () => setIsOpen(!isOpen),
  //     className: def
  //       ? `border grid grid-cols-[1fr_auto]   items-center border-color px-2.5 py-1.5 rounded-md  dark:hover:bg-neutral-700 hover:bg-neutral-200 hover:border-transparent text-sm font-medium ${className}`
  //       : className,
  //     children: <div></div>,
  //   })}
  // </article>
}

export default DropDown;
