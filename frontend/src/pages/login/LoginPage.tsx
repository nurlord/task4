import { Form } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FieldError, Fieldset, Label, Legend } from "@/components/ui/field"; // Removed unused imports
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text, TextLink } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error, isError } = useLogin();

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="sr-only">Sign in</h1>
        <Link href="#" aria-label="Goto homepage" className="mb-3 inline-block">
          <Avatar isSquare src="https://design.intentui.com/logo" size="md" />
        </Link>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            login({ email, password });
          }}
        >
          <Fieldset>
            <Legend className="text-xl/6">Sign in</Legend>
            <Text>
              Access your account to manage projects, view analytics, and
              collaborate with your team.
            </Text>

            {isError && (
              <div className="p-3 my-4 text-sm text-red-600 bg-red-50 rounded-md">
                {error?.message || "Login failed"}
              </div>
            )}
            <TextField isRequired value={email} onChange={setEmail}>
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="Your email address"
                spellCheck="false"
              />
              <FieldError />
            </TextField>

            <TextField isRequired value={password} onChange={setPassword}>
              <div className="mb-2 flex items-center justify-between">
                <Label>Password</Label>
              </div>
              <Input placeholder="Your password" type="password" />
              <FieldError />
            </TextField>
          </Fieldset>

          <Button type="submit" className="mt-6 w-full" isDisabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>

          <Text className="mt-4">
            Dont have an account? <TextLink href="/register">Sign up</TextLink>
          </Text>
        </Form>
      </div>
    </main>
  );
}
