import { IconAlertTriangle } from "@tabler/icons-react";

type Props = {
  message?: string;
};

export function FormError({ message }: Props) {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <IconAlertTriangle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
