import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function safeNext(raw: string | null): string {
  if (!raw) return "/";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

export default function Signup() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + next },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (data.session) {
      window.location.href = next;
    } else {
      toast.success("Check your email to confirm your account.");
    }
  }

  async function signInGoogle() {
    const returnTo = window.location.origin + next;
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: returnTo,
    });
    if (result.error) toast.error(String(result.error.message ?? result.error));
    if (result.redirected) return;
    window.location.href = next;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-sm">
        <h1 className="font-serif text-3xl mb-2">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Save assessments and connect Seraphyn Care to AI assistants.
        </p>
        <form onSubmit={signUp} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full">Create account</Button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="w-full" onClick={signInGoogle}>
          Continue with Google
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-6">
          Have an account?{" "}
          <Link to={`/login?next=${encodeURIComponent(next)}`} className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
