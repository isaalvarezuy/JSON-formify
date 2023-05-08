import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import Paragraph from "./Paragraph";
import { CheckboxFieldObj } from "./types/types";

interface Props {
  label: string;
}

const Checkbox = forwardRef(
  (
    { error, ...rest }: ComponentPropsWithoutRef<"input"> & CheckboxFieldObj,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <label className="flex items-center gap-2">
          <input {...rest} type={"checkbox"} ref={ref} />
          <Paragraph>{rest.label}</Paragraph>
        </label>
        <Paragraph>error</Paragraph>
      </>
    );
  }
);

export default Checkbox;
