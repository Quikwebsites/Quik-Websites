import AuthFormCard from "@/components/layout/auth-form-card";
import RequestResetCodeForm from "./RequestResetCodeForm";
import NewPasswordForm from "./NewPasswordForm";
import ConfirmationBox from "@/components/layout/confirmation-box";
import { redirect } from "next/navigation";
import GetNewEmailVerification from "./GetNewEmailVerification";
import Link from "next/link";

export default async function ResetPasswordPage({ searchParams }) {
  const { mode, oobCode } = await searchParams;

  if (!mode) redirect("/login");

  if (mode === "resetPasswordSuccess" || mode === "emailChangeSuccess") {
    return (
      <ConfirmationBox
        title={
          mode === "resetPasswordSuccess"
            ? "Your password has been reset"
            : "New mail confirmed"
        }
        description="Redirecting you to login in:"
        navigateTo="/login"
      />
    );
  }

  // Password reset
  if (mode === "resetPasswordRequest" || mode === "resetPassword") {
    return (
      <AuthFormCard
        title="Reset Your Password"
        description={
          mode === "resetPassword"
            ? "Select your new password below"
            : "Forgot your password? No worries, let’s submit password reset below . keep an eye on your email."
        }
      >
        {mode === "resetPassword" ? (
          <NewPasswordForm oobCode={oobCode} />
        ) : (
          <RequestResetCodeForm />
        )}
      </AuthFormCard>
    );
  }

  // Email change
  if (mode === "changeEmailRequest") {
    return (
      <>
        <AuthFormCard
          title="Change your email"
          description="Verify your current email address to proceed"
        >
          <GetNewEmailVerification />
        </AuthFormCard>

        <p className="mt-8 text-xs font-normal text-gray60">
          Dont have access to your current email address?{" "}
          <Link href={"#"} className="underline">
            Contact Us
          </Link>
        </p>
      </>
    );
  }

  // verifyEmail

  return null;
}
