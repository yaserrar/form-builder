"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inputTypes } from "@/lib/data";
import { Pencil, PlusCircle, TrashIcon } from "lucide-react";
import { useState } from "react";
import InputDialog from "./(dialogs)/input-dialog";
import TextareaDialog from "./(dialogs)/textarea-dialog";
import { Switch } from "@/components/ui/switch";
import SwitchDialog from "./(dialogs)/switch-dialog";
import Code from "./code";

export type FormType =
  | {
      id: string;
      field: "input";
      type: (typeof inputTypes)[number];
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
    }
  | {
      id: string;
      field: "switch";
      name: string;
      label: string;
    };
// | {
//     id: string;
//     name: string;
//     label: string;
//   };

export default function Home() {
  const [inputDialog, setInputDialog] = useState(false);
  const [textareaDialog, setTextareaDialog] = useState(false);
  const [switchDialog, setSwitchDialog] = useState(false);

  const [form, setForm] = useState<FormType[]>([]);

  const deleteField = (id: string) => {
    setForm(form.filter((f) => f.id !== id));
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <section className="p-4 rounded-lg border border-input flex gap-2 mb-2">
        <Button onClick={() => setInputDialog(true)}>
          Add input <PlusCircle />
        </Button>
        <Button onClick={() => setTextareaDialog(true)}>
          Add textarea <PlusCircle />
        </Button>
        <Button onClick={() => setSwitchDialog(true)}>
          Add switch <PlusCircle />
        </Button>
        {/* ------------------------------------------------------------------------- */}
        {inputDialog && (
          <InputDialog
            open={inputDialog}
            setOpen={setInputDialog}
            setForm={setForm}
          />
        )}
        {textareaDialog && (
          <TextareaDialog
            open={textareaDialog}
            setOpen={setTextareaDialog}
            setForm={setForm}
          />
        )}
        {switchDialog && (
          <SwitchDialog
            open={switchDialog}
            setOpen={setSwitchDialog}
            setForm={setForm}
          />
        )}
      </section>
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          {form.map((item) => (
            <div
              key={item.id}
              className="flex justify-between p-2 border border-input rounded-lg items-center"
            >
              <p className="capitalize text-sm font-medium">{item.field}</p>
              <div key={item.id} className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                >
                  <Pencil size={12} className="text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-100"
                  onClick={() => deleteField(item.id)}
                >
                  <TrashIcon size={12} className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          {form.map((item) => (
            <div key={item.id}>
              {item.field === "input" && (
                <>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Input
                    id={item.name}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                  />
                </>
              )}
              {item.field === "textarea" && (
                <>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Textarea
                    id={item.name}
                    name={item.name}
                    placeholder={item.placeholder}
                  />
                </>
              )}
              {item.field === "switch" && (
                <>
                  <Switch id={item.name} name={item.name} />
                  <Label htmlFor={item.name}>{item.label}</Label>
                </>
              )}
            </div>
          ))}
        </div>
        <Code form={form} />
      </section>
    </main>
  );
}
