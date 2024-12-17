import React from "react";
import { FormType } from "./page";
import CodePanel from "./code-panel";
import CopyCodeButton from "./copy-code-button";

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
      if (item.field === "select") {
        return `
  ${item.name}: z.string(),`;
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

${
  form.find((item) => item.field === "select")
    ? `const countries = [
  { label: "Morocco", value: "Morocco" },
  { label: "France", value: "France" },
  { label: "Spain", value: "Spain" },
  { label: "Germany", value: "Germany" },
  { label: "Italy", value: "Italy" },
];`
    : ""
}

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

      if (item.field === "select") {
        return `
    <div>
      <Label htmlFor="${item.name}">${item.label}</Label>
      <Controller
        name="${item.name}"
        control={control}
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger id="${item.name}" onBlur={onBlur} ref={ref}>
              <SelectValue placeholder="${item.placeholder}" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <ErrorMessage>{errors.${item.name}?.message}</ErrorMessage>
    </div>`;
      }
    })
    .join("")}
  </div>
);


`;

  return (
    <div className="md:col-span-2 col-span-1 grid relative">
      <CopyCodeButton code={code} />
      <CodePanel code={code} />
    </div>
  );
};

export default Code;
