import { useState } from "react";

import currencies from "@/data/Currencies";
import { Income } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Button } from "../ui/button";
//IMPORT COMPONENTS
import { Form, FormField } from "../ui/form";
import { Label } from "../ui/label";
import Spinner from "../ui/spinner";
import { Switch } from "../ui/switch";
import ServerErrorAlert from "../elements/server-error-alert";
import {
  DatePicker,
  FormGroup,
  InputField,
  InputSelect,
  InputTextArea,
} from "./elements/form-elements";

//IMPORT UTILS
import ApiUrls from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios-call";

const schema = zod.object({
  source: zod.string(),
  amount: zod.coerce.number().min(1, "Amount must be greater than 0"),
  date: zod.date(),
  currency: zod.string(),
  note: zod.string().optional(),
});

type IncomeProps = {
  editData: Income | null;
  onCreate: (status: boolean, action: "add" | "update") => void;
};

function IncomeForm({ editData, onCreate }: IncomeProps) {
  //VARIABLES
  const [showNote, setShowNote] = useState(false);
  const amount = editData?.amount ? parseFloat(editData.amount) : undefined;
  const date = editData?.date ? new Date(editData.date) : new Date();

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      source: editData?.source || "",
      amount: amount,
      date: date,
      currency: editData?.currency.toLowerCase() || "lkr",
      note: "",
    },
  });

  //ADD NEW INCOME MUTATION
  const addIncome = useMutation({
    mutationFn: async (data: zod.infer<typeof schema>) => {
      return await axiosCall({
        method: "POST",
        urlPath: ApiUrls.user.incomes,
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

  //UPDATE INCOME MUTATION
  const updateIncome = useMutation({
    mutationFn: async (data: zod.infer<typeof schema>) => {
      return await axiosCall({
        method: "POST",
        urlPath: `${ApiUrls.user.incomes}/${editData?.id}`,
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
    if (editData !== null) {
      updateIncome.mutateAsync(data);
    } else {
      addIncome.mutateAsync(data);
    }
  }

  return (
    <Form {...form}>
      {addIncome.status === "error" && (
        <ServerErrorAlert errors={addIncome.error} />
      )}
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <InputField label="Source" placeholder="Salary" field={field} />
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
            disabled={addIncome.isPending || updateIncome.isPending}
          >
            {addIncome.isPending || updateIncome.isPending ? (
              <>
                <Spinner color="white" isButton={true} /> Please Wait...
              </>
            ) : (
              <>
                <SendHorizonalIcon className="mr-3 h-4 w-4" />{" "}
                {editData ? "Update" : "Add"} Income
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default IncomeForm;
