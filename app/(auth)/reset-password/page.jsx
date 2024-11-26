import AuthFormCard from "@/components/layout/auth-form-card";
import RequestResetCodeForm from "./RequestResetCodeForm";
import NewPasswordForm from "./NewPasswordForm";
import ConfirmationBox from "@/components/layout/confirmation-box";

export default async function ResetPasswordPage({ searchParams }) {
  const { phase } = await searchParams;

  return (
    <>
      {phase === "reset-successful" ? (
        <ConfirmationBox
          title="Your password has been reset"
          description="Your password has been reset"
          navigateTo="/login"
        />
      ) : (
        <AuthFormCard
          title="Reset Your Password"
          description={
            phase === "new-password"
              ? "Select your new password below"
              : "Forgot your password? No worries, let’s submit password reset below . keep an eye on your email."
          }
        >
          {phase === "new-password" ? (
            <NewPasswordForm />
          ) : (
            <RequestResetCodeForm />
          )}
        </AuthFormCard>
      )}
    </>
  );
}
