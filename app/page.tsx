"use client";

import { Button } from "@/components/ui/button";
import { inputTypes } from "@/lib/data";
import { PlusCircle, TrashIcon } from "lucide-react";
import { useState } from "react";
import CheckboxDialog from "./(dialogs)/checkbox-dialog";
import InputDialog from "./(dialogs)/input-dialog";
import SwitchDialog from "./(dialogs)/switch-dialog";
import TextareaDialog from "./(dialogs)/textarea-dialog";
import Code from "./code";
import Form from "./form";

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
      field: "switch" | "checkbox";
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
  const [checkboxDialog, setCheckboxDialog] = useState(false);

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
        <Button onClick={() => setCheckboxDialog(true)}>
          Add checkbox <PlusCircle />
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
        {checkboxDialog && (
          <CheckboxDialog
            open={checkboxDialog}
            setOpen={setCheckboxDialog}
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
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                >
                  <Pencil size={12} className="text-primary" />
                </Button> */}
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
        <Form form={form} />
        <Code form={form} />
      </section>
    </main>
  );
}
