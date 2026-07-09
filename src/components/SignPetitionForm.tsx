"use client";

import { FormEvent, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  Handshake,
  Lock,
  MapPin,
  Pencil,
  Phone,
  User,
} from "lucide-react";
import { content, type Content } from "@/i18n/translations";
import { useSignatureCount } from "@/context/SignatureCountProvider";

type FormData = {
  name: string;
  profession: string;
  mobile: string;
  location: string;
};

const initialForm: FormData = {
  name: "",
  profession: "",
  mobile: "",
  location: "",
};

function translateError(
  message: string,
  errors: Content["form"]["errors"]
) {
  switch (message) {
    case "All fields are required":
      return errors.allFields;
    case "Please enter a valid 10-digit mobile number":
      return errors.invalidMobile;
    case "Failed to save signature":
      return errors.saveFailed;
    default:
      return errors.generic;
  }
}

export default function SignPetitionForm() {
  const { refresh } = useSignatureCount();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit signature");
      }

      setForm(initialForm);
      setStatus("success");
      await refresh();
    } catch (error) {
      setStatus("error");
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMessage(translateError(message, content.form.errors));
    }
  }

  if (status === "success") {
    return (
      <section id="sign" className="bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <CheckCircle className="mx-auto h-14 w-14 text-foreground" aria-hidden />
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            {content.form.successTitle}
          </h2>
          <p className="mt-2 text-muted">{content.form.successMessage}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-foreground underline hover:no-underline"
          >
            {content.form.signAgain}
          </button>
        </div>
      </section>
    );
  }

  const fields = [
    {
      key: "name" as const,
      label: content.form.name,
      icon: User,
      type: "text",
      placeholder: content.form.namePlaceholder,
      autoComplete: "name",
    },
    {
      key: "profession" as const,
      label: content.form.profession,
      icon: Briefcase,
      type: "text",
      placeholder: content.form.professionPlaceholder,
      autoComplete: "organization-title",
    },
    {
      key: "mobile" as const,
      label: content.form.mobile,
      icon: Phone,
      type: "tel",
      placeholder: content.form.mobilePlaceholder,
      autoComplete: "tel",
      pattern: "[0-9]{10}",
      title: content.form.mobileTitle,
    },
    {
      key: "location" as const,
      label: content.form.location,
      icon: MapPin,
      type: "text",
      placeholder: content.form.locationPlaceholder,
      autoComplete: "address-level2",
    },
  ];

  return (
    <section id="sign" className="bg-surface">
      <form onSubmit={handleSubmit} noValidate>
        <div className="border-b border-border bg-surface-muted px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <Handshake className="h-6 w-6 shrink-0 text-foreground" aria-hidden />
            <p className="text-base font-bold text-foreground sm:text-lg">
              {content.form.support}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-foreground" aria-hidden />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
              {content.form.signatoryDetails}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  <field.icon className="h-4 w-4 text-muted" aria-hidden />
                  {field.label}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  required
                  autoComplete={field.autoComplete}
                  pattern={field.pattern}
                  title={field.title}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          {status === "error" && (
            <p className="mt-4 text-sm font-semibold text-foreground" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <Pencil className="h-4 w-4" aria-hidden />
            {status === "loading" ? content.form.submitting : content.form.submit}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted">
            <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {content.form.privacy}
          </p>
        </div>
      </form>
    </section>
  );
}
