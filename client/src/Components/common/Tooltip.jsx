import React, { useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  FloatingArrow,
  offset,
  arrow,
  flip,
  shift,
} from "@floating-ui/react";

function Tooltip({
  children,
  offSet = 5,
  placement = "bottom-left",
  className = "",
  strategy = "absolute",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, middlewareData, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(offSet),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ], // Adjust tooltip position
    strategy,
    placement,
    whileElementsMounted: autoUpdate,
  });

  if (children[1] && children[0])
    return (
      <>
        {React.cloneElement(children[0], {
          ref: refs.setReference,
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
        })}
        {isOpen && (
          <div
            className={` !z-40 ${className}`}
            ref={refs.setFloating}
            style={floatingStyles}
          >
            {React.cloneElement(children[1], {})}
          </div>
        )}
      </>
    );
}

export default Tooltip;
