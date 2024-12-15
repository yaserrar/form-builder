import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/error-message";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateName } from "@/lib/utils";
import { selectSchema, SelectSchema } from "@/validations/select-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FormType } from "../page";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<FormType[]>>;
};

const SelectDialog = ({ open, setOpen, setForm }: Props) => {
  const defaultValues: SelectSchema = {
    name: generateName(),
    type: "text",
    label: "Country",
    placeholder: "",
  } as const;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SelectSchema>({
    resolver: zodResolver(selectSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<SelectSchema> = (data) => {
    setForm((form) => [
      ...form,
      {
        id: uuid(),
        field: "select",
        type: data.type,
        name: data.name,
        label: data.label,
        placeholder: data.placeholder,
      },
    ]);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select field</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
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

export default SelectDialog;
