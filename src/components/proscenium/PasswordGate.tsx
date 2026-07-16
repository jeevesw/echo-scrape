import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PASSWORD = "letmein";
const STORAGE_KEY = "proscenium-test-unlock";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  const submit = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setError(null);
      setUnlocked(true);
    } else {
      setError("That's not the password.");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <div className="space-y-2">
          <h1 className="font-display text-2xl">Protected preview</h1>
          <p className="text-sm text-muted-foreground">
            Enter the password to view this page.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="proscenium-password">Password</Label>
          <Input
            id="proscenium-password"
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "proscenium-password-error" : undefined}
          />
          {error && (
            <p
              id="proscenium-password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}
        </div>
        <Button
          className="w-full border-0 hover:opacity-90"
          onClick={submit}
          style={{
            background: "#46003A",
            color: "#FFFFFF",
            fontWeight: 700,
          }}
        >
          Enter
        </Button>
      </Card>
    </div>
  );
}

export default PasswordGate;