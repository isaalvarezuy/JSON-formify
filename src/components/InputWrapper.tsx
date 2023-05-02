import { ReactNode } from "react";
import Paragraph from "./Paragraph";

interface Props {
  children: ReactNode;
  label?: string;
  error?: string;
  message?: string;
}
const InputWrapper = ({ children, label, error, message }: Props) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {label && (
        <label>
          <Paragraph size={14} weight="medium" color="text-gray-700">
            {label}
          </Paragraph>
        </label>
      )}
      {children}
      {error && (
        <Paragraph size={14} color="text-red-700">
          {error}
        </Paragraph>
      )}
      {message && !error && (
        <Paragraph size={14} color="text-gray-500">
          {message}
        </Paragraph>
      )}
    </div>
  );
};

export default InputWrapper;
