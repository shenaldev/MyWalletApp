import { ApiErrorRes } from "@/types/axios";

export default function getServerErrorsArray(error: ApiErrorRes) {
  /**********************************************
   * Handle Server Errors With Status Code Of 422
   * @returns Input Validation Errors Are Returend As Array
   * ******************************************/
  if (error?.response?.status == 422) {
    const errorList: string[] = [];
    if (error.response?.data?.errors) {
      Object.values(error.response.data.errors).map((error) => {
        errorList.push(error[0]);
      });
    }
    return errorList;
  } else {
    return ["An error occurred. Please try again later."];
  }
}
