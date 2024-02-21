import { ControllerRenderProps } from "react-hook-form";
//IMPORT COMPONENTS
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
};

function InputSelect({ field, items, label, className }: InputSelectProps) {
  return (
    <FormItem className={`${className != undefined ? className : ""}`}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Currency" />
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
