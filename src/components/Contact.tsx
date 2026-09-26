import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { emailConfig, identity } from "../data/profile";
import { GithubMark, LinkedinMark } from "./Brand";
import { Reveal, SectionLabel } from "./ui";

const links = [
  {
    label: "Phone",
    value: identity.phone,
    href: "tel:" + identity.phone.replace(/\s/g, ""),
    icon: Phone,
  },
  {
    label: "Based in",
    value: identity.base,
    href: identity.mapUrl,
    icon: MapPin,
  },
  {
    label: "GitHub",
    value: "Ketheeswaran-Kirushikan",
    href: identity.github,
    icon: GithubMark,
  },
  {
    label: "LinkedIn",
    value: "kirushikan-ketheeswaran",
    href: identity.linkedin,
    icon: LinkedinMark,
  },
];
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const inFlight = useRef(false);
  useEffect(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);
  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((previous) => ({ ...previous, [key]: event.target.value }));
      if (status === "sent" || status === "error") setStatus("idle");
    };
  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        { from_name: form.name, email_d: form.email, message: form.message },
      );
      if (response.status !== 200)
        throw new Error("Delivery was not confirmed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };
  return (
    <section id="contact" className="section-shell contact-section">
      <div className="page-width contact-grid">
        <div>
          <Reveal>
            <SectionLabel index="08">Start a conversation</SectionLabel>
            <h2 className="contact-title">
              <span>Have something</span>
              <span>worth building?</span>
            </h2>
            <p className="contact-invitation">
              A role, a product, or an architecture question.
              <br />
              Let's talk about what comes next.
            </p>
            <a className="contact-email" href={"mailto:" + identity.email}>
              {identity.email}
              <ArrowUpRight size={19} />
            </a>
            <dl className="contact-links">
              {links.map(({ label, value, href, icon: Icon }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <Icon className="size-4 shrink-0" />
                      {value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-sm text-muted">
              Professional references available on request.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <form
            className="contact-form glass"
            onSubmit={send}
            aria-label="Contact Kirushikan"
            aria-busy={status === "sending"}
          >
            <p>Tell me what you're thinking.</p>
            <div className="form-field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                disabled={status === "sending"}
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={status === "sending"}
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
                value={form.message}
                onChange={update("message")}
                placeholder="A little about your role, project, or idea..."
              />
            </div>
            <button
              type="submit"
              className="button button-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send message"}
              <Send size={17} />
            </button>
            <div className="form-status" role="status" aria-live="polite">
              {status === "sent" && (
                <p>Message sent. I'll reply to your email address.</p>
              )}
              {status === "error" && (
                <p>
                  Your message couldn't be sent. Your text is saved here. Try
                  again, or{" "}
                  <a href={"mailto:" + identity.email}>email me directly</a>.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
