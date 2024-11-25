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
import { generateName } from "@/lib/utils";
import { switchSchema, SwitchSchema } from "@/validations/switch-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FormType } from "../page";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<FormType[]>>;
  defaultForm?: SwitchSchema;
};

const SwitchDialog = ({ open, setOpen, setForm, defaultForm }: Props) => {
  const defaultValues: SwitchSchema = {
    name: generateName(),
    label: "Message",
  } as const;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SwitchSchema>({
    resolver: zodResolver(switchSchema),
    defaultValues: defaultForm ?? defaultValues,
  });

  const onSubmit: SubmitHandler<SwitchSchema> = (data) => {
    setForm((form) => [
      ...form,
      {
        id: uuid(),
        field: "switch",
        name: data.name,
        label: data.label,
      },
    ]);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch field</DialogTitle>
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
            <div className="flex gap-2 mt-2">
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

export default SwitchDialog;
