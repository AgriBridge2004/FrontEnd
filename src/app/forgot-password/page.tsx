import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <form className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Account recovery</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Reset your password</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Password reset emails are mocked until the authentication API is available.
          </p>
          <div className="mt-6">
            <FormField htmlFor="email" label="Email">
              <Input id="email" placeholder="name@company.com" type="email" />
            </FormField>
          </div>
          <Button className="mt-6 w-full" type="submit">
            Send reset link
          </Button>
        </form>
      </main>
    </div>
  );
}
