import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState("");
  const onSubmit = (data: any) => setData(JSON.stringify(data));
  const inputClasses = "border border-blue-400";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* register your input into the hook by invoking the "register" function */}
      {/*      <Input {...register("field")} />
      <Select {...register("gender")} /> */}
      <Checkbox label="This is a checkbox" {...register("checkbox")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        className={inputClasses}
        {...register("exampleRequired", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />

      {data}
    </form>
  );
};

export default Form;
