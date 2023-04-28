import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from "react";

const Select = forwardRef(
  (
    { ...rest }: ComponentPropsWithoutRef<"select">,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <select
        {...rest}
        ref={ref}
        className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md font-body text-sm"
      >
        <option value={2}>male</option>
        <option value={3}>female</option>
      </select>
    );
  }
);

export default Select;
