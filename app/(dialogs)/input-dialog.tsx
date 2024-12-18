import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inputTypes } from "@/lib/data";
import { generateName } from "@/lib/utils";
import { inputSchema, InputSchema } from "@/validations/input-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FormType } from "../page";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<FormType[]>>;
};

const InputDialog = ({ open, setOpen, setForm }: Props) => {
  const defaultValues: InputSchema = {
    name: generateName(),
    type: "text",
    label: "Username",
    placeholder: "",
    min: null,
    max: null,
  } as const;

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<InputSchema> = (data) => {
    setForm((form) => [
      ...form,
      {
        id: uuid(),
        field: "input",
        type: data.type,
        name: data.name,
        label: data.label,
        placeholder: data.placeholder,
        min: data.min,
        max: data.max,
      },
    ]);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Input field</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="type">Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field: { onBlur, onChange, ref, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger id="type" onBlur={onBlur} ref={ref}>
                      <SelectValue placeholder="Select type" />
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
                <Controller
                  control={control}
                  name="min"
                  render={({ field }) => (
                    <Input
                      id="min"
                      placeholder="Min"
                      type="number"
                      {...field}
                      value={field.value?.toString()}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <ErrorMessage>{errors.min?.message}</ErrorMessage>
              </div>
              <div className="flex-1">
                <Label htmlFor="min">Max</Label>
                <Controller
                  control={control}
                  name="max"
                  render={({ field }) => (
                    <Input
                      id="max"
                      placeholder="Max"
                      type="number"
                      {...field}
                      value={field.value?.toString()}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    />
                  )}
                />
                <ErrorMessage>{errors.max?.message}</ErrorMessage>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" type="submit">
                Add field
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
