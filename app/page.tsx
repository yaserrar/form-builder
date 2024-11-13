"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type FormType =
  | {
      type: "input" | "textarea";
      name: string;
      label: string;
      placeholder: string;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "checkbox" | "switch";
      name: string;
      label: string;
    };

export default function Home() {
  const [name, setName] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [form, setForm] = useState<FormType[]>([]);

  const addInput = () => {
    setForm([
      ...form,
      {
        type: "input",
        name: name,
        label: label,
        placeholder: placeholder,
      },
    ]);
    setName("");
    setLabel("");
    setPlaceholder("");
  };

  const addTextarea = () => {
    setForm([
      ...form,
      {
        type: "textarea",
        name: name,
        label: label,
        placeholder: placeholder,
      },
    ]);
    setName("");
    setLabel("");
    setPlaceholder("");
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          <h1>Form builder</h1>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              name="label"
              placeholder="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              name="placeholder"
              placeholder="Placeholder"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={addInput}>
            Add input
          </Button>
          <Button className="w-full" onClick={addTextarea}>
            Add textarea
          </Button>
        </div>
        <div className="p-4 rounded-lg border border-input flex flex-col gap-2">
          <h1>Form builder</h1>
          {form.map((item, index) => (
            <div key={index}>
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
