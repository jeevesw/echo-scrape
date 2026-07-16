import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CAPTURE } from "@/data/prosceniumQuizContent";

// NOTE: the email destination for these submissions is an open decision.
// Nothing is being persisted here — the form triggers a client-side download
// of the whitepaper and shows a confirmation message.

const emailSchema = z.string().trim().email("Please enter a valid email address.");

export function CaptureBox() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }
    setError(null);

    // Trigger download of the whitepaper
    const a = document.createElement("a");
    a.href = CAPTURE.whitepaperFile;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setSubmitted(true);
  };

  return (
    <div className="relative my-12 overflow-visible">
      <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-visible">
        {/* Left panel */}
        <div
          className="rounded-2xl md:rounded-r-none shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] p-8 md:p-10"
          style={{ background: "#FFFFFF", color: "#46003A" }}
        >
          {submitted ? (
            <div className="space-y-3">
              <h3 className="text-2xl tracking-tight" style={{ color: "#46003A", fontWeight: 700 }}>On its way</h3>
              <p style={{ color: "#46003A" }}>
                Your whitepaper download has started. We'll email your recommendations shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl tracking-tight" style={{ color: "#46003A", fontWeight: 700 }}>{CAPTURE.headline}</h3>
              <p style={{ color: "#46003A" }}>{CAPTURE.body}</p>
              <div className="space-y-2 pt-2">
                <Label htmlFor="proscenium-email" style={{ color: "#46003A" }}>{CAPTURE.fieldLabel}</Label>
                <Input
                  id="proscenium-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "proscenium-email-error" : undefined}
                  style={{ borderColor: "#46003A", color: "#46003A", background: "#FFFFFF" }}
                />
                {error && (
                  <p
                    id="proscenium-email-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {error}
                  </p>
                )}
              </div>
              <Button
                onClick={submit}
                className="mt-2 border-0 hover:opacity-90"
                style={{
                  background: "#46003A",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  padding: "15px 34px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  height: "auto",
                }}
              >
                {CAPTURE.submit}
              </Button>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div
          className="relative rounded-2xl md:rounded-l-none p-8 md:p-10 overflow-visible flex flex-col justify-center"
          style={{ background: "#F4EEF2", color: "#46003A" }}
        >
          <div className="relative flex justify-center mb-6 overflow-visible">
            <img
              src={CAPTURE.whitepaperCover}
              alt="Accessibility in Events whitepaper cover"
              className="w-48 md:w-56 rounded-md shadow-[0_25px_50px_-12px_rgba(70,0,58,0.45)] -rotate-[6deg] scale-110"
            />
          </div>
          <h4 className="text-xl tracking-tight" style={{ color: "#46003A", fontWeight: 700 }}>
            {CAPTURE.whitepaperHeadline}
          </h4>
          <p className="mt-2" style={{ color: "#46003A" }}>
            {CAPTURE.whitepaperBody}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptureBox;