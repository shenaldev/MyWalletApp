import { ApiErrorRes } from "@/types/axios";

export default function getServerErrorsArray(
  error: ApiErrorRes,
  isAuthPage = false,
) {
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
  } else if (error.response.status == 401) {
    /**********************************
     * Handle Server Errors With Status Code Of 401
     * @returns Redirects To Login Page
     ************************************/
    if (!isAuthPage) {
      localStorage.removeItem("user");
      window.location.href = "/auth/login?error=unauthorized";
    }
  } else {
    return ["An error occurred. Please try again later."];
  }
}