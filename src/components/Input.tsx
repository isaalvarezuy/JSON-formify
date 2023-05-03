import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import classnames from "classnames";
import { InputFieldObj } from "./types/types";
import InputWrapper from "./InputWrapper";

const Input = forwardRef(
  (
    { error, ...rest }: ComponentPropsWithoutRef<"input"> & InputFieldObj,
    ref: ForwardedRef<HTMLInputElement>
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
        <input
          ref={ref}
          className={classnames(
            "w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body",
            error && "border-red-600"
          )}
          {...rest}
        />
      </InputWrapper>
    );
  }
);

export default Input;
