export const INTERNAL_SERVER_ERROR = "Something went wrong. Please try again or contact support";
export const DEFAULT_ERROR_MESSAGE = {
   status: "FAILED",
   responseMessage: INTERNAL_SERVER_ERROR
};
export const NO_RECORDS_FOUND_ERROR_MESSAGE = "No records were found.";
export const ACCOUNT_ID_NOT_SET_ERROR_MESSAGE = "User account id is not set";

interface ContextRef {
   current?: {
      show: (options: {
         severity: "error" | "success";
         content: string;
         life: number;
         closable: boolean;
      }) => void;
   };
}

/**
 * Show error message for x milliseconds.
 *
 * @param contextref - Reference to the context object
 * @param message - The error message to display
 * @param time - Duration to display the message (in milliseconds)
 */
export const showErrorMessage = (
   contextref: ContextRef,
   message: string,
   time: number = 10000
): void => {
   contextref.current?.show({
      severity: "error",
      content: message,
      life: time,
      closable: false
   });
};

/**
 * Show success message for x milliseconds.
 *
 * @param contextref - Reference to the context object
 * @param message - The success message to display
 * @param time - Duration to display the message (in milliseconds)
 */
export const showSuccessMessage = (
   contextref: ContextRef,
   message: string,
   time: number = 10000
): void => {
   contextref.current?.show({
      severity: "success",
      content: message,
      life: time,
      closable: false
   });
};