import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <form className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Welcome back</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Login to AgriBridge</h1>
          <div className="mt-6 grid gap-4">
            <FormField htmlFor="email" label="Email">
              <Input id="email" placeholder="name@company.com" type="email" />
            </FormField>
            <FormField htmlFor="password" label="Password">
              <Input id="password" placeholder="Enter your password" type="password" />
            </FormField>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <Link className="font-medium text-emerald-700 hover:text-emerald-800" href="/forgot-password">
              Forgot password?
            </Link>
            <Link className="font-medium text-slate-600 hover:text-slate-950" href="/verify-otp">
              Verify OTP
            </Link>
          </div>
          <Button className="mt-6 w-full" type="submit">
            Login
          </Button>
          <p className="mt-5 text-center text-sm text-slate-600">
            New to AgriBridge?{" "}
            <Link className="font-semibold text-emerald-700" href="/register">
              Create an account
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
