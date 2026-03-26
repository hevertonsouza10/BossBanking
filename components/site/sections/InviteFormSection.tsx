'use client';

import { type FormEvent, useState } from 'react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import type { InviteFormSection as InviteFormSectionType } from '@/lib/cms/types';
import { keepBossLedgerTogether } from '@/lib/utils';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export default function InviteFormSection({ section }: { section: InviteFormSectionType }) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `${section.subject}`,
      '',
      `Nome completo: ${formState.fullName}`,
      `E-mail: ${formState.email}`,
      `Telefone / WhatsApp: ${formState.phone}`,
      `Empresa ou negócio: ${formState.company}`,
      '',
      'Mensagem:',
      formState.message,
    ].join('\n');

    const params = new URLSearchParams({
      subject: section.subject,
      body,
    });

    setIsSubmitted(true);
    setFormState(initialFormState);
    window.location.href = `mailto:${section.recipientEmail}?${params.toString()}`;
  };

  return (
    <section className="relative py-24 md:py-32" data-scroll-scene="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_22%),linear-gradient(180deg,rgba(7,7,7,0),rgba(5,5,5,0.68)_18%,rgba(5,5,5,0.92))]" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <Reveal className="space-y-6 lg:sticky lg:top-[140px]">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#ddb25f]/15 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#ddb25f]">
              <span className="h-2 w-2 rounded-full bg-[#ddb25f]" />
              {section.eyebrow ?? 'Pré-cadastro'}
            </div>

            <div className="space-y-5">
              <h2 className="max-w-xl font-[family:var(--font-sans)] text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white md:text-[3.6rem]">
                {keepBossLedgerTogether(section.title)}
              </h2>
              {section.subtitle ? (
                <p className="text-[0.74rem] uppercase tracking-[0.34em] text-[#e1c58f]/90 md:text-[0.8rem]">
                  {keepBossLedgerTogether(section.subtitle)}
                </p>
              ) : null}
              <p className="max-w-xl text-[0.98rem] leading-8 text-white/64 md:text-[1.04rem]">
                {keepBossLedgerTogether(section.description)}
              </p>
            </div>

            <div className="soft-glass-pill relative inline-flex w-fit max-w-full items-center gap-3 rounded-full px-5 py-3 text-left">
              <span className="text-[0.58rem] uppercase tracking-[0.26em] text-white/42">Assunto fixo</span>
              <span className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-white/82">{section.subject}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="cta-luxury-shell relative overflow-hidden rounded-[2rem] p-[1px]">
              <div className="cta-luxury-panel relative overflow-hidden rounded-[calc(2rem-1px)] px-5 py-6 md:px-8 md:py-8">
                <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,236,196,0.74),transparent)]" />
                <div className="pointer-events-none absolute right-[8%] top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(230,194,122,0.18),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-[10%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Nome completo"
                      value={formState.fullName}
                      onChange={(value) => setFormState((current) => ({ ...current, fullName: value }))}
                    />
                    <Field
                      label="E-mail"
                      type="email"
                      value={formState.email}
                      onChange={(value) => setFormState((current) => ({ ...current, email: value }))}
                    />
                    <Field
                      label="Telefone / WhatsApp"
                      value={formState.phone}
                      onChange={(value) => setFormState((current) => ({ ...current, phone: value }))}
                    />
                    <Field
                      label="Empresa ou negócio"
                      value={formState.company}
                      onChange={(value) => setFormState((current) => ({ ...current, company: value }))}
                    />
                  </div>

                  <Field
                    label="Mensagem"
                    multiline
                    placeholder={section.messagePlaceholder}
                    value={formState.message}
                    onChange={(value) => setFormState((current) => ({ ...current, message: value }))}
                  />

                  <div className="flex flex-col gap-4 pt-2">
                    <button type="submit" className="lux-button lux-button-gold min-h-[3.3rem] w-full justify-center px-7 text-[0.7rem] tracking-[0.22em] sm:w-auto sm:min-w-[17rem]">
                      {section.buttonLabel}
                    </button>

                    {isSubmitted ? (
                      <p className="rounded-[1rem] border border-[#ddb25f]/16 bg-[#ddb25f]/[0.06] px-4 py-3 text-sm leading-6 text-white/82">
                        {section.successMessage}
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto mt-10 max-w-4xl">
          <p className="text-center text-[0.95rem] leading-8 text-white/56 md:text-[1rem]">
            {keepBossLedgerTogether(section.bottomText)}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
}) {
  const baseClassName =
    'w-full rounded-[1.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)),linear-gradient(180deg,rgba(19,19,21,0.9),rgba(8,8,10,0.92))] px-4 py-3.5 text-[0.96rem] leading-6 text-white outline-none transition duration-200 placeholder:text-white/28 focus:border-[#ddb25f]/34 focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)),linear-gradient(180deg,rgba(21,21,24,0.94),rgba(10,10,12,0.96))]';

  return (
    <label className="block space-y-2">
      <span className="block text-[0.64rem] font-medium uppercase tracking-[0.24em] text-white/48">{label}</span>
      {multiline ? (
        <textarea
          required
          rows={6}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClassName} resize-none`}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={baseClassName}
        />
      )}
    </label>
  );
}
