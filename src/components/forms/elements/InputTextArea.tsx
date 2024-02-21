import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";

type InputTextAreaProps = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  placeholder?: string;
  className?: string;
};

function InputTextArea({
  field,
  label,
  placeholder,
  className,
}: InputTextAreaProps) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default InputTextArea;
