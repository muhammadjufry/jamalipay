import { CardWrapper } from "@/components/auth/card-wrapper";
import { IconAlertTriangle } from "@tabler/icons-react";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <IconAlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
