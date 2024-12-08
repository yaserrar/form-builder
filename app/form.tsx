import React from "react";
import { FormType } from "./page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "@/components/ui/error-message";

type Props = {
  form: FormType[];
};

const Form = ({ form }: Props) => {
  const schema = z.object(
    form.reduce((acc: { [key: string]: z.ZodTypeAny }, item) => {
      if (item.field === "input" || item.field === "textarea") {
        let stringSchema = z.string();
        if (item.min) {
          stringSchema = stringSchema.min(item.min, {
            message: `${item.min} is min letters`,
          });
        }
        if (item.max) {
          stringSchema = stringSchema.max(item.max, {
            message: `${item.max} is max letters`,
          });
        }
        acc[item.name] = stringSchema;
      }

      if (item.field === "switch" || item.field === "checkbox") {
        acc[item.name] = z.boolean();
      }

      return acc;
    }, {})
  );

  type Schema = z.infer<typeof schema>;

  const defaultValues = {};

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
        {form.map((item) => (
          <div key={item.id}>
            {item.field === "input" && (
              <div>
                <Label htmlFor={item.name}>{item.label}</Label>
                <Input
                  id={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  {...register(item.name)}
                />
                <ErrorMessage>{errors[item.name]?.message}</ErrorMessage>
              </div>
            )}
            {item.field === "textarea" && (
              <div>
                <Label htmlFor={item.name}>{item.label}</Label>
                <Textarea
                  id={item.name}
                  placeholder={item.placeholder}
                  {...register(item.name)}
                />
                <ErrorMessage>{errors[item.name]?.message}</ErrorMessage>
              </div>
            )}
            {item.field === "switch" && (
              <Controller
                name={item.name}
                control={control}
                render={({ field: { onChange, value, ref, name, onBlur } }) => (
                  <div className="flex flex-row items-center gap-2">
                    <Switch
                      id={item.name}
                      ref={ref}
                      name={name}
                      onBlur={onBlur}
                      onCheckedChange={onChange}
                      checked={value}
                    />
                    <Label htmlFor={item.name}>{item.label}</Label>
                    <ErrorMessage>{errors[item.name]?.message}</ErrorMessage>
                  </div>
                )}
              />
            )}
            {item.field === "checkbox" && (
              <Controller
                name={item.name}
                control={control}
                render={({ field: { onChange, value, ref, name, onBlur } }) => (
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      id={item.name}
                      ref={ref}
                      name={name}
                      onBlur={onBlur}
                      onCheckedChange={onChange}
                      checked={value}
                    />
                    <Label htmlFor={item.name}>{item.label}</Label>
                    <ErrorMessage>{errors[item.name]?.message}</ErrorMessage>
                  </div>
                )}
              />
            )}
          </div>
        ))}
        <Button className="flex-1" type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default Form;
