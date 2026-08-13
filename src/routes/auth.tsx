import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acceso administración | Fotógrafos Bodas" },
      { name: "description", content: "Acceso al panel de administración del sitio." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Acceso administración" },
      { property: "og:description", content: "Acceso al panel de administración del sitio." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpError) throw signUpError;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("No fue posible iniciar sesión con Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/40 px-5 py-16">
      <div className="w-full max-w-sm border border-border bg-background p-8">
        <p className="eyebrow">Administración</p>
        <h1 className="display-3 mt-3">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="block text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-0 border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
            />
          </div>

          {error ? <p className="text-xs text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground px-6 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
          >
            {loading ? "…" : mode === "signin" ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <button
          type="button"
          onClick={onGoogle}
          className="mt-3 w-full border border-border px-6 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
        >
          Continuar con Google
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs text-muted-foreground underline underline-offset-4"
        >
          {mode === "signin" ? "Crear una cuenta" : "Ya tengo cuenta"}
        </button>
      </div>
    </main>
  );
}
