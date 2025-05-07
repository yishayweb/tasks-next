import { ActionState } from "@/utils/to-action-state";
import { FieldErrors } from "react-hook-form";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
  clientErrors: FieldErrors;
};

const FieldError = ({ actionState, name, clientErrors }: FieldErrorProps) => {
  const serverError = actionState.fieldErrors[name]?.[0];
  const clientError = clientErrors?.[name]?.message;

  if (!clientError && !serverError) {
    return null;
  }

  const message = typeof clientError === "string" ? clientError : serverError;

  return <span className="text-xs text-red-600">{message}</span>;
};

export { FieldError };
