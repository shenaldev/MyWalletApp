import { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InputSelectProps = {
  field: ControllerRenderProps<any, any>;
  items: { name: string; value: string }[];
  label?: string;
  className?: string;
  placeholder?: string;
};

function InputSelect({
  field,
  items,
  label,
  className,
  placeholder,
}: InputSelectProps) {
  return (
    <FormItem className={`${className != undefined ? className : ""}`}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

export default InputSelect;
