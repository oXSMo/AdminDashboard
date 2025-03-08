function Switch({ active, setactive, className, width = 48 }) {
  return (
    <aside
      style={{ width: `${width}px` }}
      onClick={() => setactive(!active)}
      className={`relative border border-color hover:ring-2 duration-200 ring-blue-600 group bg-color cursor-pointer rounded-full p-px h-6 ${
        active ? "!bg-blue-600" : ""
      } ${className}`}
    >
      <span
        style={{
          transform: `${
            active
              ? `translateX(calc(${width - 6}px - 100%))`
              : "translateX(2px)"
          } translateY(-50%)`,
        }}
        className={`absolute h-[calc(80%)] top-1/2 duration-500 aspect-square rounded-full shadow-md bg-black/15 dark:bg-white  border border-color 
            
        `}
      />
    </aside>
  );
}

export default Switch;
