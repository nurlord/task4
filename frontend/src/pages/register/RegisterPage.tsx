import { Form } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FieldError, Fieldset, Label, Legend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text, TextLink } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useRegister } from "@/hooks/useAuth";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: register, isPending, isError, error } = useRegister();
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link aria-label="Goto homepage" href="#" className="mb-3 inline-block">
          <Avatar isSquare src="https://design.intentui.com/logo" size="md" />
        </Link>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            register({ name, email, password });
          }}
        >
          <Fieldset>
            <Legend className="text-xl/10">Sign up</Legend>
            <Text>Access your account to manage users.</Text>

            {isError && (
              <div className="p-3 my-4 text-sm text-red-600 bg-red-50 rounded-md">
                {error.message ? error.message : "Server error"}
              </div>
            )}
            <TextField isRequired value={name} onChange={setName}>
              <Label>Full name</Label>
              <Input />
              <FieldError />
            </TextField>
            <TextField
              type="email"
              isRequired
              value={email}
              onChange={setEmail}
            >
              <Label>Email</Label>
              <Input type="email" spellCheck="false" />
              <FieldError />
            </TextField>
            <TextField isRequired value={password} onChange={setPassword}>
              <Label>Password</Label>
              <Input type="password" />
              <FieldError />
            </TextField>
          </Fieldset>
          <Button type="submit" className="mt-6 w-full" isDisabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </Form>

        <Text className="mt-4">
          Already have an account? <TextLink href="/login">Sign in</TextLink>
        </Text>
      </div>
    </main>
  );
};

export default RegisterPage;
