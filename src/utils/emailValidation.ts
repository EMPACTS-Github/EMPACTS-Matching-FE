import { checkEmailFormat } from "./checkValid";

// Utility function for email validation state that can be reused across components
export const getEmailValidationState = (
  email: string,
  hasSubmitted: boolean = false
) => {
  if (!hasSubmitted && !email) {
    return {
      isValid: true,
      error: "",
      color: "default" as const,
    };
  }

  const isValid = checkEmailFormat(email);
  return {
    isValid,
    error: isValid ? "" : "Invalid email format",
    color: isValid ? ("default" as const) : ("danger" as const),
  };
};
