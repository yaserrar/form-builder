import React from "react";
import { FormType } from "./page";

type Props = {
  form: FormType[];
};

const Code = ({ form }: Props) => {
  return (
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
            if (item.field === "switch") {
              return `
${item.name}: z.boolean(),`;
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
<div className="flex flex-col gap-2">`}
      </pre>

      {form.map((item) => {
        if (item.field === "input") {
          return (
            <pre key={item.id}>
              {`    <div>
<Label htmlFor="${item.name}">${item.label}</Label>
<Input id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
<ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
</div>`}
            </pre>
          );
        }

        if (item.field === "textarea") {
          return (
            <pre key={item.id}>
              {`    <div>
<Label htmlFor="${item.name}">${item.label}</Label>
<Textarea id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
<ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
</div>`}
            </pre>
          );
        }

        if (item.field === "switch") {
          return (
            <pre key={item.id}>
              {`    <div>
<Switch id="${item.name}" {...register("${item.name}")} />
<Label htmlFor="${item.name}">${item.label}</Label>
<ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
</div>`}
            </pre>
          );
        }
      })}
      <pre>
        {`  </div>
);`}
      </pre>
    </div>
  );
};

export default Code;
