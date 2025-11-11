import { React } from "rwsdk/client";
import { useFormStatus } from "react-dom";
import Button, { ButtonProps } from "./Button";

type SubmitButtonProps = Omit<ButtonProps, "type" | "isLoading"> & {
  idleLabel?: string;
  pendingLabel?: string;
};

export default function SubmitButton({
  idleLabel = "Submit",
  pendingLabel = "Working...",
  variant = "glow",
  size = "none",
  className = "",
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isLoading={pending}
      aria-busy={pending}
      disabled={pending}
      variant={variant}
      size={size}
      className={`rounded-md transition-all duration-200 ${className}`}
      {...rest}
    >
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}
