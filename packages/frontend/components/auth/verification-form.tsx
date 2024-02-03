"use client";
import { useCallback, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { verification } from "@/actions/verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

type Props = {};

export function VerificationForm({}: Props) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    verification(token)
      .then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      title="Verification"
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center flex-col gap-4">
        {!success && !error && <PulseLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
