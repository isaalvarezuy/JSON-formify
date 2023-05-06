import { ForwardedRef, forwardRef } from "react";
import Paragraph from "./Paragraph";

interface Props {
  label: string;
}

const Checkbox = forwardRef(
  ({ label, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" {...rest} ref={ref} />
        <Paragraph>{label}</Paragraph>
      </label>
    );
  }
);

export default Checkbox;
