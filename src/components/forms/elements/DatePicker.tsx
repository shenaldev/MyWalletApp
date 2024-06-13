import { format } from "date-fns";
import { ControllerRenderProps } from "react-hook-form";
//IMPORT COMPONENTS
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
//IMPORT ICONS
import { CalendarIcon } from "lucide-react";
//IMPORT UTILS
import { cn } from "@/lib/utils";

type DatePickerProps = {
  field: ControllerRenderProps<any, any>;
  label?: string;
};
function DatePicker({ field, label }: DatePickerProps) {
  return (
    <FormItem className="mb-3 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => field.onChange(date)}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}

export default DatePicker;
