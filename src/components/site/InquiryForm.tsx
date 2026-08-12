import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitInquiry } from "@/lib/inquiries.functions";
import { t, thanksPath, privacyPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground";
const labelClass = "block text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground";

export function InquiryForm({ locale }: { locale: Locale }) {
  const copy = t[locale].form;
  const navigate = useNavigate();
  const send = useServerFn(submitInquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!value("first_name")) nextErrors["first_name"] = copy.required;
    if (!value("email")) nextErrors["email"] = copy.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) nextErrors["email"] = copy.invalidEmail;
    if (!value("phone")) nextErrors["phone"] = copy.required;
    if (!form.get("privacy")) nextErrors["privacy"] = copy.mustAccept;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await send({
        data: {
          first_name: value("first_name"),
          last_name: value("last_name"),
          email: value("email"),
          phone: value("phone"),
          wedding_date: value("wedding_date"),
          venue: value("venue"),
          city: value("city"),
          guests: value("guests"),
          event_type: value("event_type"),
          source: value("source"),
          message: value("message"),
          locale,
        },
      });
      navigate({ to: thanksPath(locale) });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <Field label={copy.firstName} name="first_name" error={errors["first_name"]} required />
      <Field label={copy.lastName} name="last_name" />
      <Field label={copy.email} name="email" type="email" error={errors["email"]} required />
      <Field label={copy.phone} name="phone" type="tel" error={errors["phone"]} required />
      <Field label={copy.date} name="wedding_date" type="date" />
      <Field label={copy.guests} name="guests" inputMode="numeric" />
      <Field label={copy.venue} name="venue" />
      <Field label={copy.city} name="city" />

      <div>
        <label className={labelClass} htmlFor="event_type">
          {copy.eventType}
        </label>
        <select id="event_type" name="event_type" className={cn(fieldClass, "appearance-none")}>
          <option value="">{copy.select}</option>
          {copy.eventTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="source">
          {copy.source}
        </label>
        <select id="source" name="source" className={cn(fieldClass, "appearance-none")}>
          <option value="">{copy.select}</option>
          {copy.sources.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="message">
          {copy.message}
        </label>
        <textarea id="message" name="message" rows={4} maxLength={2000} className={cn(fieldClass, "resize-none")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="privacy"
            className="mt-1 h-4 w-4 shrink-0 accent-foreground"
          />
          <span>
            {copy.privacy}{" "}
            <Link to={privacyPath(locale)} className="link-underline text-foreground">
              {copy.privacyLink}
            </Link>
          </span>
        </label>
        {errors["privacy"] ? <p className="mt-2 text-xs text-destructive">{errors["privacy"]}</p> : null}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-foreground px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        {status === "error" ? <p className="mt-3 text-xs text-destructive">{copy.error}</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string | undefined;
  error?: string | undefined;
  required?: boolean | undefined;
  inputMode?: "numeric" | undefined;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        maxLength={255}
        aria-invalid={Boolean(error)}
        className={cn(fieldClass, error && "border-destructive")}
      />
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
