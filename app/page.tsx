"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fieldTypes,
  FormSchema,
  formSchema,
  inputTypes,
} from "@/validations/form";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "@/components/ui/error-message";
import { v4 as uuid } from "uuid";
import { X } from "lucide-react";

const generateName = () => `name__${uuid().split("-")[1]}`;

type FormType =
  | {
      id: string;
      type: "input" | "textarea";
      inputType: "text" | "email" | "password" | "file";
      name: string;
      label: string;
      placeholder: string;
    }
  | {
      id: string;
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      id: string;
      type: "checkbox" | "switch";
      name: string;
      label: string;
    };

const defaultValues: FormSchema = {
  type: "input",
  name: generateName(),
  inputType: "text",
  label: "",
  placeholder: "",
  min: null,
  max: null,
  options: [],
} as const;

export default function Home() {
  const [form, setForm] = useState<FormType[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (data.type === "input" || data.type === "textarea") {
      setForm([
        ...form,
        {
          id: uuid(),
          type: data.type,
          inputType: data.inputType,
          name: data.name,
          label: data.label,
          placeholder: data.placeholder,
        },
      ]);
    }
  };

  const type = watch("type");

  const deleteField = (id: string) => {
    setForm(form.filter((f) => f.id !== id));
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Form builder</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="type">Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field: { onBlur, onChange, ref, value } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value);
                      setValue("inputType", "text", {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                    value={value}
                  >
                    <SelectTrigger id="type" onBlur={onBlur} ref={ref}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage>{errors.type?.message}</ErrorMessage>
            </div>
            {type === "input" && (
              <div>
                <Label htmlFor="type">Input type</Label>
                <Controller
                  control={control}
                  name="inputType"
                  render={({ field: { onBlur, onChange, ref, value } }) => (
                    <Select
                      onValueChange={(value) => onChange(value)}
                      value={value ?? "text"}
                    >
                      <SelectTrigger id="inputType" onBlur={onBlur} ref={ref}>
                        <SelectValue placeholder="Select input type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inputTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage>{errors.inputType?.message}</ErrorMessage>
              </div>
            )}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" {...register("name")} />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>
            <div>
              <Label htmlFor="label">Label</Label>
              <Input id="label" placeholder="Label" {...register("label")} />
              <ErrorMessage>{errors.label?.message}</ErrorMessage>
            </div>
            {(type === "input" || type === "textarea") && (
              <>
                <div>
                  <Label htmlFor="placeholder">Placeholder</Label>
                  <Input
                    id="placeholder"
                    placeholder="Placeholder"
                    {...register("placeholder")}
                  />
                  <ErrorMessage>{errors.placeholder?.message}</ErrorMessage>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="min">Min</Label>
                    <Input id="min" placeholder="Min" {...register("min")} />
                    <ErrorMessage>{errors.min?.message}</ErrorMessage>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="min">Max</Label>
                    <Input id="max" placeholder="Max" {...register("max")} />
                    <ErrorMessage>{errors.max?.message}</ErrorMessage>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-2">
              <Button className="flex-1" type="submit">
                Add field
              </Button>
              <Button
                className="flex-1"
                variant="destructive"
                type="button"
                onClick={() =>
                  reset({ ...defaultValues, name: generateName() })
                }
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          {form.map((item) => (
            <div key={item.id} className="group relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 group-hover:flex absolute top-0 right-0 hidden hover:bg-red-100"
                onClick={() => deleteField(item.id)}
              >
                <X size={12} className="text-red-500" />
              </Button>
              <Label htmlFor={item.name}>{item.label}</Label>
              {item.type === "input" && (
                <Input
                  id={item.name}
                  name={item.name}
                  type={item.inputType}
                  placeholder={item.placeholder}
                />
              )}
              {item.type === "textarea" && (
                <Textarea
                  id={item.name}
                  name={item.name}
                  placeholder={item.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg col-span-2 border border-input flex flex-col bg-slate-800 text-white">
          <pre>
            {`
const {
  handleSubmit,
  control,
  reset,
  watch,
  setValue,
  register,
  formState: { errors },
} = useForm<FormSchema>({
  resolver: zodResolver(formSchema),
});

          `}
            {`
return (
          `}
          </pre>

          {form.map((item) => {
            if (item.type === "input") {
              return (
                <pre key={item.id}>
                  {`
<div>
  <Label htmlFor="${item.name}">Name</Label>
  <Input id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
  <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
</div>
                  `}
                </pre>
              );
            }

            if (item.type === "textarea") {
              return (
                <pre key={item.id}>
                  {`
<div>
  <Label htmlFor="${item.name}">Name</Label>
  <Textarea id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
  <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
</div>
                  `}
                </pre>
              );
            }
          })}
          {`
);
          `}
        </div>
      </section>
    </main>
  );
}
