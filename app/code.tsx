import React from "react";
import { FormType } from "./page";
import CodePanel from "./code-panel";

type Props = {
  form: FormType[];
};

const Code = ({ form }: Props) => {
  const code = `
const formSchema = z.object({${form
    .map((item) => {
      if (item.field === "input" || item.field === "textarea") {
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
      if (item.field === "switch" || item.field === "checkbox") {
        return `
  ${item.name}: z.boolean(),`;
      }
    })
    .join("")}
});

type FormSchema = z.infer<typeof formSchema>;

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


return (
  <div className="flex flex-col gap-2">${form
    .map((item) => {
      if (item.field === "input") {
        return `
    <div>
      <Label htmlFor="${item.name}">${item.label}</Label>
      <Input id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
      <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
    </div>`;
      }

      if (item.field === "textarea") {
        return `
    <div>
      <Label htmlFor="${item.name}">${item.label}</Label>
      <Textarea id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
      <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
    </div>`;
      }

      if (item.field === "switch") {
        return `
    <Controller
      name="${item.name}"
      control={control}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <div className="flex flex-row items-center gap-2">
          <Switch
            id="${item.name}" 
            ref={ref}
            name={name}
            onBlur={onBlur}
            onCheckedChange={onChange}
            checked={value}
          />
          <Label htmlFor="${item.name}">${item.label}</Label>
          <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
        </div>
      )}
    />`;
      }

      if (item.field === "checkbox") {
        return `
    <Controller
      name="${item.name}"
      control={control}
      render={({ field: { onChange, value, ref, name, onBlur } }) => (
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id="${item.name}" 
            ref={ref}
            name={name}
            onBlur={onBlur}
            onCheckedChange={onChange}
            checked={value}
          />
          <Label htmlFor="${item.name}">${item.label}</Label>
          <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
        </div>
      )}
    />`;
      }
    })
    .join("")}
  </div>
);


`;

  return (
    <div className="col-span-2 grid">
      <CodePanel code={code} />
    </div>
  );
  //   return (
  //
  //       <pre>
  //         {`

  // const formSchema = z.object({${form
  //           .map((item) => {
  //             if (item.field === "input") {
  //               return `
  //   ${item.name}: z.string()${
  //                 item.min
  //                   ? `.min(${item.min}, { message: "${item.min} is min letters" })`
  //                   : ""
  //               }${
  //                 item.max
  //                   ? `.max(${item.max}, { message: "${item.max} is max letters"})`
  //                   : ""
  //               },`;
  //             }
  //             if (item.field === "textarea") {
  //               return `
  //   ${item.name}: z.string()${
  //                 item.min
  //                   ? `.min(${item.min}, { message: "${item.min} is min letters" })`
  //                   : ""
  //               }${
  //                 item.max
  //                   ? `.max(${item.max}, { message: "${item.max} is max letters"})`
  //                   : ""
  //               },`;
  //             }
  //             if (item.field === "switch") {
  //               return `
  //   ${item.name}: z.boolean(),`;
  //             }
  //           })
  //           .join("")}
  // });

  // type FormSchema = z.infer<typeof formSchema>;

  // const {
  //   handleSubmit,
  //   control,
  //   reset,
  //   watch,
  //   setValue,
  //   register,
  //   formState: { errors },
  // } = useForm<FormSchema>({
  //   resolver: zodResolver(formSchema),
  // });

  //   `}
  //         {`
  // return (
  //   <div className="flex flex-col gap-2">`}
  //       </pre>

  //       {form.map((item) => {
  //         if (item.field === "input") {
  //           return (
  //             <pre key={item.id}>
  //               {`    <div>
  //       <Label htmlFor="${item.name}">${item.label}</Label>
  //       <Input id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
  //       <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
  //     </div>`}
  //             </pre>
  //           );
  //         }

  //         if (item.field === "textarea") {
  //           return (
  //             <pre key={item.id}>
  //               {`    <div>
  //       <Label htmlFor="${item.name}">${item.label}</Label>
  //       <Textarea id="${item.name}" placeholder="${item.placeholder}" {...register("${item.name}")} />
  //       <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
  //     </div>`}
  //             </pre>
  //           );
  //         }

  //         if (item.field === "switch") {
  //           return (
  //             <pre key={item.id}>
  //               {`    <Controller
  //       name="${item.name}"
  //       control={control}
  //       render={({ field: { onChange, value, ref, name, onBlur } }) => (
  //         <div>
  //           <Switch
  //             id="${item.name}"
  //             ref={ref}
  //             name={name}
  //             onBlur={onBlur}
  //             onCheckedChange={onChange}
  //             checked={value}
  //           />
  //           <Label htmlFor="name__db1c">${item.label}</Label>
  //           <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
  //         </div>
  //       )}
  //       />`}
  //             </pre>
  //           );
  //         }
  //       })}
  //       <pre>
  //         {`  </div>
  // );`}
  //       </pre>
  //     </div>
  //   );
};

export default Code;
