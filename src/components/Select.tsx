import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from "react";
import { SelectFieldObj } from "./types/types";
import InputWrapper from "./InputWrapper";

const Select = forwardRef(
  (
    { error, ...rest }: ComponentPropsWithoutRef<"select"> & SelectFieldObj,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const errorMessage = error && typeof error === "string" && error;
    const required = rest.validations?.includes("required");
    return (
      <InputWrapper
        label={rest.label}
        message={rest.message}
        error={errorMessage || ""}
        required={required}
      >
        <select
          {...rest}
          ref={ref}
          className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body"
        >
          {rest.options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  }
);

export default Select;
