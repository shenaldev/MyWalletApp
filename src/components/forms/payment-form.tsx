import { useState } from "react";

//IMPORT DATA
import currencies from "@/data/Currencies";
//IMPORT TYPES
import { InputSelectOption, Payment } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
//IMPORT ICONS
import { SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import DatePicker from "@/components/forms/elements/date-picker";
import {
  FormGroup,
  InputField,
  InputSelect,
  InputTextArea,
} from "@/components/forms/elements/form-elements";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
//IMPORT COMPONENTS
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

import ServerErrorAlert from "../elements/server-error-alert";

import ApiUrls from "@/lib/api-urls";
//IMPORT UTILS
import { axiosCall } from "@/lib/axios-call";

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

type PropTypes = {
  categories?: InputSelectOption[];
  paymentMethods?: InputSelectOption[];
  editData: Payment | null;
  onCreate: (status: boolean, action: "add" | "update") => void;
};

function PaymentForm({
  categories,
  paymentMethods,
  editData,
  onCreate,
}: PropTypes) {
  //VARIABLES
  const [showNote, setShowNote] = useState(false);
  const amount = editData?.amount ? parseFloat(editData.amount) : undefined;
  const date = editData?.date ? new Date(editData.date) : new Date();
  const defaultCategory = categories?.find((c) => c.name === "General");

  //CREATE FORM INSTANCE
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: editData?.name || "",
      amount: amount,
      date: date,
      currency: editData?.currency.toLowerCase() || "lkr",
      category_id: editData?.category_id.toString() || defaultCategory?.value,
      payment_method_id: editData?.payment_method_id.toString() || "1",
      note: "",
    },
  });

  //CREATE NEW PAYMENT REQUEST
  const addPayment = useMutation({
    mutationFn: async (data: zod.infer<typeof schema>) => {
      return await axiosCall({
        method: "POST",
        urlPath: ApiUrls.user.payments,
        data: { ...data, date: data.date.toLocaleDateString() },
      });
    },
    onSuccess: () => {
      form.reset();
      onCreate(true, "add");
    },
    onError: () => {
      onCreate(false, "add");
    },
  });

  //UPDATE PAYMENT REQUEST
  const updatePayment = useMutation({
    mutationFn: async (data: zod.infer<typeof schema>) => {
      return await axiosCall({
        method: "POST",
        urlPath: `${ApiUrls.user.payments}/${editData?.id}`,
        data: { _method: "PUT", ...data, date: data.date.toLocaleDateString() },
      });
    },
    onSuccess: () => {
      form.reset();
      onCreate(true, "update");
    },
    onError: () => {
      onCreate(false, "update");
    },
  });

  function onSubmitHandler(data: zod.infer<typeof schema>) {
    if (editData != null) {
      updatePayment.mutate(data);
    } else {
      addPayment.mutate(data);
    }
  }

  return (
    <Form {...form}>
      {addPayment.status === "error" && (
        <ServerErrorAlert errors={addPayment.error} />
      )}
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
        <FormGroup className="grid-cols-[9fr_3fr] items-end justify-between">
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
                items={categories ? categories : []}
                className=""
                label="Category"
                placeholder="Select Category"
              />
            )}
          />
          <FormField
            control={form.control}
            name="payment_method_id"
            render={({ field }) => (
              <InputSelect
                field={field}
                items={paymentMethods ? paymentMethods : []}
                label="Payment Method"
                placeholder="Select Payment Method"
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
          <Button
            variant="default"
            type="submit"
            disabled={addPayment.isPending || updatePayment.isPending}
            className="dark:text-white"
          >
            {addPayment.isPending || updatePayment.isPending ? (
              <>
                <Spinner color="white" isButton={true} /> Please Wait...
              </>
            ) : (
              <>
                <SendHorizonalIcon className="mr-3 h-4 w-4" />{" "}
                {editData ? "Update" : "Add"} Payment
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PaymentForm;
