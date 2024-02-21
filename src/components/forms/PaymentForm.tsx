import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FormGroup from "@/components/ui/elements/FormGroup";
import DatePicker from "@/components/ui/elements/DatePicker";
import InputField from "@/components/forms/elements/InputField";
import InputSelect from "@/components/forms/elements/InputSelect";
import InputTextArea from "@/components/forms/elements/InputTextArea";
//IMPORT DATA
import currencies from "@/data/Currencies";
//IMPORT ICONS
import { SendHorizonalIcon } from "lucide-react";

//ZOD VALIDATION SCHEMA
const schema = zod.object({
  name: zod.string(),
  amount: zod.coerce.number().min(1, "Amount must be greater than 0"),
  date: zod.date(),
  currency: zod.string(),
  category_id: zod.string(),
  payment_method_id: zod.string(),
  note: zod.string().optional(),
});

function PaymentForm() {
  const [showNote, setShowNote] = useState(false);
  const todayDate = new Date();

  //CREATE FORM INSTANCE
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      amount: 0,
      date: todayDate,
      currency: "lkr",
      category_id: "",
      payment_method_id: "",
      note: "",
    },
  });

  function onSubmitHandler(data: zod.infer<typeof schema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputField
              label="Payment For"
              field={field}
              placeholder="Electricty Bill"
            />
          )}
        />
        <FormGroup className="items-end justify-between md:grid-cols-[8fr_4fr]">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <InputField
                label="Amount"
                field={field}
                placeholder="1000.99"
                type="number"
              />
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <InputSelect field={field} items={currencies} />
            )}
          />
        </FormGroup>
        <FormGroup>
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <InputSelect
                field={field}
                items={currencies}
                className=""
                label="Category"
              />
            )}
          />
          <FormField
            control={form.control}
            name="payment_method_id"
            render={({ field }) => (
              <InputSelect
                field={field}
                items={currencies}
                label="Payment Method"
              />
            )}
          />
        </FormGroup>
        <FormGroup>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => <DatePicker field={field} label="Date" />}
          />
          <div className="flex items-center justify-end space-x-2">
            <Label htmlFor="note">Add Note</Label>
            <Switch id="note" onCheckedChange={(e) => setShowNote(e)} />
          </div>
        </FormGroup>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <InputTextArea
              field={field}
              label="Add Note"
              className={showNote ? "block" : "hidden"}
            />
          )}
        />
        <div className="mt-6 flex justify-center">
          <Button variant="default" type="submit" disabled={false}>
            {false ? (
              <>
                <Spinner color="white" isButton={true} /> Please Wait...
              </>
            ) : (
              <>
                <SendHorizonalIcon className="mr-3 h-4 w-4" /> Add Payment
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PaymentForm;
