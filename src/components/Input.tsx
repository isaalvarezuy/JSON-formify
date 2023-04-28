import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
const Input = forwardRef(
  (
    { ...rest }: ComponentPropsWithoutRef<"input">,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md font-body text-sm"
        {...rest}
      />
    );
  }
);

export default Input;
