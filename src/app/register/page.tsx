import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <form className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Create account</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Register your trade profile</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FormField htmlFor="name" label="Full name">
              <Input id="name" placeholder="Your name" />
            </FormField>
            <FormField htmlFor="email" label="Email">
              <Input id="email" placeholder="name@company.com" type="email" />
            </FormField>
            <FormField htmlFor="role" label="Role">
              <Select id="role" defaultValue="farmer">
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
                <option value="quality_officer">Quality Officer</option>
              </Select>
            </FormField>
            <FormField htmlFor="phone" label="Phone">
              <Input id="phone" placeholder="+970 ..." />
            </FormField>
            <FormField htmlFor="password" label="Password">
              <Input id="password" placeholder="Create a password" type="password" />
            </FormField>
            <FormField htmlFor="confirm-password" label="Confirm password">
              <Input id="confirm-password" placeholder="Repeat password" type="password" />
            </FormField>
          </div>
          <Button className="mt-6 w-full" type="submit">
            Register
          </Button>
          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-semibold text-emerald-700" href="/login">
              Login
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
