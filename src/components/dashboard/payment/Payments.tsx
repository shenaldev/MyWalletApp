import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
//IMPORT TYPES
import { PaymentResponse, Payment } from "@/types/types";
//IMPORT COMPONENTS
import PaymentItem from "./PaymentItem";
import TotalCard from "../ui/TotalCard";
import CategoryCard from "./CategoryCard";
import { CardContent, CardFooter, FinanceCard } from "../ui/FinanceCard";
import ActionDropdown from "../ui/ActionDropdown";
import PaymentDialog from "@/components/elements/dialogs/PaymentDialog";
import DeleteAlertDialog from "@/components/elements/dialogs/DeleteAlertDialog";
import ViewPaymentDialog from "@/components/elements/dialogs/ViewPaymentDialog";
import CategoryCardSkeleton from "@/components/ui/skeletons/CategoryCardSkeletion";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useMonthYear } from "@/components/providers/MonthYearProvider";

function Payments() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { selectedMonth, selectedYear } = useMonthYear();

  //FETCH PAYMENTS
  const { data, isLoading, refetch } = useQuery<PaymentResponse>({
    queryKey: ["payments", selectedYear, selectedMonth],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: `${ApiUrls.user.payments}/${selectedYear}/${selectedMonth + 1}`,
      });
    },
    enabled: true,
  });

  //HANDLE PAYMENTS VIEW EDIT DELETE ACTIONS
  function actionHandler(action: string, payment: any) {
    setSelectedPayment(payment);
    if (action == "view") {
      setOpenView(true);
    } else if (action == "edit") {
      setOpenAdd(true);
    } else if (action == "delete") {
      setOpenDelete(true);
    }
  }

  //HANDLE PAYMENT DIALOG CLOSE
  function paymentDialogCloseHandler() {
    setOpenAdd(false);
    setSelectedPayment(null);
  }

  //DELETE PAYMENT API CALL
  const deletePayment = useMutation({
    mutationFn: async () => {
      return await axiosCall({
        method: "POST",
        urlPath: `${ApiUrls.user.payments}/${selectedPayment?.id}`,
        data: { _method: "DELETE" },
      });
    },
    onSuccess: () => {
      refetch();
      toast.success("Payment Deleted Successfully");
    },
    onError: () => {
      toast.error("Failed to delete payment");
    },
    onSettled: () => {
      toast.dismiss();
      setSelectedPayment(null);
    },
  });

  //DELETE PAYMENT HANDLER
  function deletePaymentHandler() {
    deletePayment.mutateAsync();
    toast.loading("Deleting Payment");
  }

  //HANDLE DELETE DIALOG CLOSE
  function deleteDialogCancelHandler() {
    setOpenDelete(false);
    setSelectedPayment(null);
  }

  function addPaymentButtonHandler() {
    setSelectedPayment(null);
    setOpenAdd(true);
  }

  const Skeletion = (
    <div className="space-y-3">
      <CategoryCardSkeleton items={5} />
    </div>
  );

  return (
    <>
      <FinanceCard title="Payments" onAction={addPaymentButtonHandler}>
        <CardContent>
          {isLoading && Skeletion}
          <div className="space-y-4">
            {data?.payments.map((item, index) => (
              <CategoryCard
                key={index}
                details={{
                  name: item.name,
                  icon: item.icon,
                  total: item.total,
                }}
              >
                <ul className="flex flex-col font-medium">
                  {item.payments?.map((payment, index) => (
                    <PaymentItem key={index} payment={payment}>
                      <ActionDropdown
                        onClick={(action) => actionHandler(action, payment)}
                      />
                    </PaymentItem>
                  ))}
                </ul>
              </CategoryCard>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <TotalCard total={data?.total || 0} />
        </CardFooter>
      </FinanceCard>
      {/* ADD EDIT PAYMENT DIALOG */}
      <PaymentDialog
        open={openAdd}
        onClose={paymentDialogCloseHandler}
        refetch={refetch}
        editData={selectedPayment}
      />
      {/* DELETE PAYMENT DIALOG */}
      {openDelete && (
        <DeleteAlertDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onCancel={deleteDialogCancelHandler}
          onDelete={deletePaymentHandler}
        >
          <p className="mt-1 rounded-md bg-slate-100 py-2 text-center font-medium text-red-600">
            Payment Name: {selectedPayment?.name}
          </p>
        </DeleteAlertDialog>
      )}
      {/* VIEW PAYMENT DIALOG */}
      {openView && selectedPayment && (
        <ViewPaymentDialog
          open={openView}
          onClose={() => setOpenView(false)}
          payment={selectedPayment}
        />
      )}
    </>
  );
}

export default Payments;
