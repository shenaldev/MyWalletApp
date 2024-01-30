import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

type InputTypes = {
  label?: string | null;
  placeholder?: string | undefined;
  field: React.RefAttributes<HTMLInputElement>;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  inputClassName?: string;
  wrapperClassName?: string;
  required?: boolean;
};

function InputField({
  label,
  placeholder,
  field,
  disabled = false,
  type = "text",
  inputClassName,
  wrapperClassName,
  required = true,
}: InputTypes) {
  return (
    <FormItem
      className={`${wrapperClassName != undefined ? wrapperClassName : ""}`}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          className={`${inputClassName != undefined ? inputClassName : ""}`}
          required={required}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default InputField;
