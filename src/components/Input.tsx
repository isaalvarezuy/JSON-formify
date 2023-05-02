import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import InputWrapper from "./InputWrapper";
import { FieldObj, FormErrorType } from "./types/types";
import classnames from "classnames";

const Input = forwardRef(
  (
    {
      error,
      ...rest
    }: ComponentPropsWithoutRef<"input"> &
      FieldObj & { error: { error?: FormErrorType } },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    console.log(rest.required);
    const errorMessage = error && typeof error === "string" && error;
    return (
      <InputWrapper
        label={rest.label}
        message={rest.message}
        error={errorMessage || ""}
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
