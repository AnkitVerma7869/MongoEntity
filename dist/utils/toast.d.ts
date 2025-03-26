/**
 * Custom toast function to ensure only one toast at a time
 * @param message - The message to display in the toast
 * @param type - The type of toast ('success' or 'error')
 */
export declare const showToast: (message: string, type: "success" | "error") => void;
