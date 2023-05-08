import { ComponentPropsWithoutRef, ReactNode } from "react";

type FilterConditionally<Source, Condition> = Pick<
  Source,
  {
    [K in keyof Source]: Source[K] extends Condition ? K : never;
  }[keyof Source]
>;

type ValidationType = "required" | "email" | "password" | "min10";

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
  message?: string;
  error?: FormErrorType;
}
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label: string;
  message?: string;
  error?: FormErrorType;
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

export type InputFieldObj = JSONableInputProps & {
  type: "input";
  validations?: Validation[];
};

export interface SelectProps<
  TOptionsValue extends string = string,
  TValue extends TOptionsValue = TOptionsValue
> extends ComponentPropsWithoutRef<"select"> {
  options: { value: TOptionsValue; label: string }[];
  id: string;
  label?: string;
  value?: TValue;
  message?: string;
  error?: FormErrorType;
}

type SelectOptions = SelectProps["options"];

type JSONableSelectProps = FilterConditionally<
  SelectProps,
  JSONValue | undefined
>;

export type SelectFieldObj = JSONableSelectProps & {
  type: "select";
  validations?: Validation[];
  options: SelectOptions;
};

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  message?: string;
  error?: FormErrorType;
}

type JSONableCheckboxProps = FilterConditionally<
  CheckboxProps,
  JSONValue | undefined
>;

export type CheckboxFieldObj = JSONableCheckboxProps & {
  type: "checkbox";
  validations?: Validation[];
};

export type FieldObj = InputFieldObj | SelectFieldObj | CheckboxFieldObj;

export type FormObj = {
  title: string;
  fields: Record<string, FieldObj>;
};
