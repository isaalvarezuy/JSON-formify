import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./Input";
import Select from "./Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldObj, FormObj } from "./types/types";
import Checkbox from "./Checkbox";

const NewForm = () => {
  // general type helper that filters and object given a condition

  const defaultFormObj: FormObj = {
    title: "Form Title",
    fields: {
      name: {
        type: "input",
        label: "Name",
        message: "please select a name",
        id: "1",
        validations: ["required", "min10"],
      },
      password: {
        type: "input",
        label: "Password",
        message: "please select a password",
        id: "1",
        validations: ["required", "password"],
      },
      /*   terms: {
        type: "checkbox",
        label: "Accept terms & conditions",
        message: "You will be selling your soul",
        id: "1",
        validations: ["required""],
      }, */
      country: {
        type: "select",
        label: "Country",
        message: "countries are what we use to divide the earth",
        id: "2",
        validations: ["required"],
        options: [
          { value: "1", label: "Option1" },
          { value: "2", label: "Option2" },
        ],
      },
      email: {
        type: "input",
        label: "Email",
        message: "Emails are great",
        id: "3",
        validations: [
          "required",
          { type: "email", message: "Please learn to type" },
        ],
      },
    },
  };

  const jsonEntries = Object.entries(defaultFormObj.fields);

  const renderField = ({
    fieldName,
    fieldObj,
    register,
    errors,
  }: {
    fieldName: string;
    fieldObj: FieldObj;
    errors: FieldErrors<{
      [k: string]: string;
    }>;
    register: UseFormRegister<{
      [k: string]: string;
    }>;
  }) => {
    if (fieldObj.type === "input") {
      return (
        <Input
          {...fieldObj}
          id={fieldName}
          {...register(fieldName)}
          error={errors[fieldName]?.message}
        />
      );
    }

    if (fieldObj.type === "select") {
      return (
        <Select
          {...fieldObj}
          id={fieldName}
          {...register(fieldName)}
          /*   error={errors[fieldName]?.message} */
        />
      );
    }

    return null;
  };

  const parseSchema = (jsonEntries: [string, FieldObj][]) => {
    const fieldSchemasKV = jsonEntries
      .filter(([_, value]) => !!value.validations)
      .map(([fieldName, fieldJson]) => {
        const fieldSchema = fieldJson.validations!.reduce(
          (schema, fieldVal) => {
            const validationType =
              typeof fieldVal === "string" ? fieldVal : fieldVal.type;
            const validationMsg =
              typeof fieldVal === "string" ? "" : fieldVal.message;

            if (validationType === "required") {
              return schema.min(1, {
                message: validationMsg || "Field is required",
              });
            }
            if (validationType === "min10") {
              return schema.min(10, {
                message: validationMsg || "Min length is 10",
              });
            }

            if (validationType === "email") {
              return schema.email({
                message: validationMsg || "Invalid email",
              });
            }

            if (validationType === "password") {
              return schema.regex(
                /^[0-9]+$/,
                validationMsg || "Password can only be numbers :P "
              );
            }

            return schema;
          },
          z.string()
        );
        return [fieldName, fieldSchema] as const;
      });

    return z.object(Object.fromEntries(fieldSchemasKV));
  };

  const json = defaultFormObj;
  const schema = parseSchema(jsonEntries);

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: Object.fromEntries(
      jsonEntries
        .filter(([_, obj]) => obj !== undefined)
        .map(([fieldName, fieldObj]) => [fieldName, fieldObj.value as string])
    ),
  });
  const submitFrom = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="flex flex-col justify-between h-full overflow-y-scroll"
      onSubmit={handleSubmit(submitFrom)}
    >
      <div>
        <div className="flex flex-row items-center justify-between border-b border-neutrals-medium-300 px-8 py-[54px]">
          <h1 className="text-3xl font-bold text-neutrals-dark-400">
            {json.title}
          </h1>
        </div>
        <div className="px-8 pt-12">
          {jsonEntries.map(([fieldName, fieldObj]) =>
            renderField({ fieldName, fieldObj, register, errors })
          )}

          <Checkbox label="This is a checkbox" {...register("checkbox")} />
        </div>
      </div>
      <div className="flex flex-row justify-end pr-8 space-x-3 pb-9">
        <button onClick={() => reset()}>Reset</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default NewForm;
