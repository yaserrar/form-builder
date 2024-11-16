"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import InputDialog from "./(dialogs)/input-dialog";
import TextareaDialog from "./(dialogs)/textarea-dialog";

export type FormType =
  | {
      id: string;
      field: "input";
      type: "text" | "email" | "password" | "file";
      name: string;
      label: string;
      placeholder: string;
      min: number | null;
      max: number | null;
    }
  | {
      id: string;
      field: "textarea";
      name: string;
      label: string;
      placeholder: string;
      min: number | null;
      max: number | null;
    };
// | {
//     id: string;
//     name: string;
//     label: string;
//   };

export default function Home() {
  const [inputDialog, setInputDialog] = useState(false);
  const [textareaDialog, setTextareaDialog] = useState(false);
  const [form, setForm] = useState<FormType[]>([]);

  const deleteField = (id: string) => {
    setForm(form.filter((f) => f.id !== id));
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <section className="p-4 rounded-lg border border-input flex gap-2 mb-2">
        <Button onClick={() => setInputDialog(true)}>Add input</Button>
        <Button onClick={() => setTextareaDialog(true)}>Add textarea</Button>
        {/* ------------------------------------------------------------------------- */}
        <InputDialog
          open={inputDialog}
          setOpen={setInputDialog}
          setForm={setForm}
        />
        <TextareaDialog
          open={textareaDialog}
          setOpen={setTextareaDialog}
          setForm={setForm}
        />
      </section>
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          {form.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-2 border border-input rounded-lg items-center"
            >
              <p className="capitalize">{item.field}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-100"
                onClick={() => deleteField(item.id)}
              >
                <TrashIcon size={12} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          {form.map((item) => (
            <div key={item.id}>
              <Label htmlFor={item.name}>{item.label}</Label>
              {item.field === "input" && (
                <Input
                  id={item.name}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                />
              )}
              {item.field === "textarea" && (
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

const formSchema = {${form
              .map((item) => {
                if (item.field === "input") {
                  return `
  ${item.name}: z.string()${
                    item.min
                      ? `.min(${item.min}, { message: "${item.min} is min letters" })`
                      : ""
                  }${
                    item.max
                      ? `.max(${item.max}, { message: "${item.max} is max letters"})`
                      : ""
                  },`;
                }
                if (item.field === "textarea") {
                  return `
  ${item.name}: z.string()${
                    item.min
                      ? `.min(${item.min}, { message: "${item.min} is min letters" })`
                      : ""
                  }${
                    item.max
                      ? `.max(${item.max}, { message: "${item.max} is max letters"})`
                      : ""
                  },`;
                }
              })
              .join("")}
}


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
            if (item.field === "input") {
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

            if (item.field === "textarea") {
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
