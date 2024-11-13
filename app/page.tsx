"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fieldTypes, FormSchema, formSchema } from "@/validations/form";
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

type FormType =
  | {
      id: string;
      type: "input" | "textarea";
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
    defaultValues: {
      type: "input",
      name: "",
      label: "",
      placeholder: "",
      options: [],
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    if (data.type === "input" || data.type === "textarea") {
      setForm([
        ...form,
        {
          id: uuid(),
          type: data.type,
          name: data.name,
          label: data.label,
          placeholder: data.placeholder,
        },
      ]);
    }
  };

  // const addInput = () => {
  //   setForm([
  //     ...form,
  //     {
  //       type: "input",
  //       name: name,
  //       label: label,
  //       placeholder: placeholder,
  //     },
  //   ]);
  //   setName("");
  //   setLabel("");
  //   setPlaceholder("");
  // };

  // const addTextarea = () => {
  //   setForm([
  //     ...form,
  //     {
  //       type: "textarea",
  //       name: name,
  //       label: label,
  //       placeholder: placeholder,
  //     },
  //   ]);
  //   setName("");
  //   setLabel("");
  //   setPlaceholder("");
  // };

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
                    onValueChange={(value) => onChange(value)}
                    value={value}
                  >
                    <SelectTrigger id="cityId" onBlur={onBlur} ref={ref}>
                      <SelectValue placeholder="Selectionner la ville" />
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
              <div>
                <Label htmlFor="placeholder">Placeholder</Label>
                <Input
                  id="placeholder"
                  placeholder="Placeholder"
                  {...register("placeholder")}
                />
                <ErrorMessage>{errors.placeholder?.message}</ErrorMessage>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <Button className="flex-1" type="submit">
                Add field
              </Button>
              <Button
                className="flex-1"
                variant="destructive"
                type="button"
                onClick={() => reset()}
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
      </section>
    </main>
  );
}
