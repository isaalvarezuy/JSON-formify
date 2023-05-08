import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Form = () => {
  const formSchema = z.object({
    checkbox: z.boolean(),
    field:z.string().min(2)
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  console.log(errors);

  const [data, setData] = useState("");
  const onSubmit = (data: any) => setData(JSON.stringify(data));
  const inputClasses = "border border-blue-400";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* register your input into the hook by invoking the "register" function */}
      <Input type={"input"} id={""} label={""} {...register("field")} />
      {/*     
      <Select {...register("gender")} /> */}
      <Checkbox label="This is a checkbox" {...register("checkbox")} />

      {/* include validation with required or other standard HTML validation rules */}

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />

      {data}
    </form>
  );
};

export default Form;
