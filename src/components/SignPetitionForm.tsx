"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "lucide-react";
import { content, type Content } from "@/i18n/translations";
import { useSignatureCount } from "@/context/SignatureCountProvider";
import { isValidIndianMobile, normalizeMobile } from "@/lib/validation";

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
    case "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9":
      return errors.invalidMobile;
    case "Failed to save signature":
      return errors.saveFailed;
    default:
      return errors.generic;
  }
}

const fields = [
  {
    key: "name" as const,
    label: content.form.name,
    type: "text",
    placeholder: content.form.namePlaceholder,
    autoComplete: "name",
  },
  {
    key: "profession" as const,
    label: content.form.profession,
    type: "text",
    placeholder: content.form.professionPlaceholder,
    autoComplete: "organization-title",
  },
  {
    key: "mobile" as const,
    label: content.form.mobile,
    type: "tel",
    placeholder: content.form.mobilePlaceholder,
    autoComplete: "tel",
    pattern: "[6-9][0-9]{9}",
    title: content.form.mobileTitle,
  },
  {
    key: "location" as const,
    label: content.form.location,
    type: "text",
    placeholder: content.form.locationPlaceholder,
    autoComplete: "address-level2",
  },
];

export default function SignPetitionForm() {
  const { refresh } = useSignatureCount();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validateForm(data: FormData) {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!data.name.trim() || !data.profession.trim() || !data.mobile.trim() || !data.location.trim()) {
      if (!data.name.trim()) errors.name = content.form.errors.allFields;
      if (!data.profession.trim()) errors.profession = content.form.errors.allFields;
      if (!data.mobile.trim()) errors.mobile = content.form.errors.allFields;
      if (!data.location.trim()) errors.location = content.form.errors.allFields;
    }

    if (data.mobile.trim() && !isValidIndianMobile(data.mobile)) {
      errors.mobile = content.form.errors.invalidMobile;
    }

    return errors;
  }

  function handleFieldChange(key: keyof FormData, value: string) {
    const nextValue = key === "mobile" ? normalizeMobile(value) : value;
    setForm((current) => ({ ...current, [key]: nextValue }));

    if (fieldErrors[key]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }

    if (errorMessage) {
      setErrorMessage("");
      setStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage(
        errors.mobile && form.mobile.trim()
          ? content.form.errors.invalidMobile
          : content.form.errors.allFields
      );
      return;
    }

    setFieldErrors({});
    setStatus("loading");

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
      setFieldErrors({});
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
      <section id="sign" className="border-t border-foreground p-10 text-center">
        <CheckCircle
          className="mx-auto h-12 w-12 text-foreground"
          aria-hidden
        />
        <h2 className="mt-4 text-xl font-bold uppercase tracking-wide text-foreground">
          {content.form.successTitle}
        </h2>
        <p className="mt-2 text-sm text-muted">{content.form.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 bg-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
        >
          {content.form.signAgain}
        </button>
      </section>
    );
  }

  return (
    <section id="sign">
      <form onSubmit={handleSubmit} noValidate>
        <div className="border-t border-b border-foreground bg-foreground px-5 py-5 text-center text-white sm:px-6 sm:py-6">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            {content.form.support}
          </h2>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            {content.form.signatoryDetails}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className={`border-foreground p-5 sm:p-6 ${
                index < 2 ? "border-b" : ""
              } ${index % 2 === 0 ? "sm:border-r" : ""} ${
                index >= 2 ? "sm:border-b-0" : "sm:border-b"
              }`}
            >
              <label
                htmlFor={field.key}
                className="block text-[11px] font-bold uppercase tracking-[0.15em] text-foreground"
              >
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
                inputMode={field.key === "mobile" ? "numeric" : undefined}
                maxLength={field.key === "mobile" ? 10 : undefined}
                value={form[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                aria-invalid={fieldErrors[field.key] ? true : undefined}
                aria-describedby={fieldErrors[field.key] ? `${field.key}-error` : undefined}
                className={`mt-3 w-full border-0 border-b bg-transparent py-2 text-sm text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-0 ${
                  fieldErrors[field.key]
                    ? "border-red-600 focus:border-red-600"
                    : "border-foreground focus:border-foreground"
                }`}
                placeholder={field.placeholder}
              />
              {fieldErrors[field.key] && (
                <p
                  id={`${field.key}-error`}
                  className="mt-2 text-xs text-red-600"
                  role="alert"
                >
                  {fieldErrors[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>

        {status === "error" && (
          <p
            className="border-t border-foreground px-5 py-3 text-sm font-semibold text-foreground sm:px-6"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <div className="flex justify-center border-t border-foreground p-5 sm:p-6">
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? content.form.submitting : content.form.submit}
          </button>
        </div>
      </form>

      <p className="border-t border-foreground px-5 py-3 text-center text-[10px] text-muted sm:px-6">
        {content.form.privacy}
      </p>
    </section>
  );
}
