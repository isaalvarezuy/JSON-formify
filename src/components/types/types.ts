import { ComponentPropsWithoutRef, ReactNode } from "react";

type FilterConditionally<Source, Condition> = Pick<
  Source,
  {
    [K in keyof Source]: Source[K] extends Condition ? K : never;
  }[keyof Source]
>;

type ValidationType = "required" | "email" | "password";

type Validation =
  | ValidationType
  | {
      type: ValidationType;
      message?: string;
    };

export type FormErrorType = string | boolean;

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label: string;
  containerClassName?: string;
  message?: string;
  compact?: boolean;
  error?: FormErrorType;
  left?: ReactNode;
  right?: ReactNode;
  rightWidth?: number;
}

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>
  | ReactNode // this one was added to support label, left & right props
  | readonly string[]
  | readonly number[];

type JSONableInputProps = FilterConditionally<
  InputProps,
  JSONValue | undefined
>;

type InputFieldObj = JSONableInputProps & {
  type: "input";
  validations?: Validation[];
};

export type FieldObj = InputFieldObj;

export type FormObj = {
  title: string;
  fields: Record<string, FieldObj>;
};
