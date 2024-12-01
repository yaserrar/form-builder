"use client";

import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const formSchema = z.object({
    name__c820: z.string(),
    name__db1c: z.boolean(),
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

  console.log(watch());

  return (
    <div className="flex flex-col gap-2 p-10">
      <div>
        <Label htmlFor="name__c820">Username</Label>
        <Input id="name__c820" placeholder="" {...register("name__c820")} />
        <ErrorMessage>{errors.name__c820?.message}</ErrorMessage>
      </div>
      <Controller
        name="name__db1c"
        control={control}
        render={({ field: { onChange, value, name, onBlur, ref } }) => (
          <div>
            <Switch
              id="name__db1c"
              ref={ref}
              name={name}
              onBlur={onBlur}
              onCheckedChange={onChange}
              checked={value}
            />
            <Label htmlFor="name__db1c">Message</Label>
            <ErrorMessage>{errors.name__db1c?.message}</ErrorMessage>
          </div>
        )}
      />
    </div>
  );
}
