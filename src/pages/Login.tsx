import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function safeNext(raw: string | null): string {
  if (!raw) return "/";
  try {
    // Must be same-origin, relative
    if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  } catch {}
  return "/";
}

export default function Login() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
  }, [navigate, next]);

  async function signInEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    window.location.href = next;
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
        <h1 className="font-serif text-3xl mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Access your Seraphyn Care account.
        </p>
        <form onSubmit={signInEmail} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={busy} className="w-full">Sign in</Button>
        </form>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="w-full" onClick={signInGoogle}>
          Continue with Google
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-6">
          No account?{" "}
          <Link to={`/signup?next=${encodeURIComponent(next)}`} className="underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
