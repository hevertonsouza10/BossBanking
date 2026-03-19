import Link from 'next/link';
import Container from '@/components/site/ui/Container';

type FooterIconProps = {
  className?: string;
};

type GoldIconFrameProps = FooterIconProps & {
  gradientId: string;
  viewBox?: string;
  children: (fill: string) => React.ReactNode;
};

function GoldIconFrame({
  className,
  gradientId,
  viewBox = '0 0 24 24',
  children,
}: GoldIconFrameProps) {
  const fill = `url(#${gradientId}-fill)`;

  return (
    <svg
      viewBox={viewBox}
      width="24"
      height="24"
      className={className}
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${gradientId}-fill`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7e49f" />
          <stop offset="0.48" stopColor="#ddb25f" />
          <stop offset="1" stopColor="#b8862e" />
        </linearGradient>
        <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.25" stdDeviation="1.4" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter={`url(#${gradientId}-shadow)`}>{children(fill)}</g>
    </svg>
  );
}

function PhoneGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-phone">
      {(fill) => (
        <>
          <rect x="6" y="2.25" width="12" height="19.5" rx="3" fill={fill} />
          <rect x="8.25" y="5" width="7.5" height="10.5" rx="1.15" fill="#0b0b0c" opacity="0.62" />
          <circle cx="12" cy="18.55" r="1.05" fill="#0b0b0c" opacity="0.78" />
        </>
      )}
    </GoldIconFrame>
  );
}

function WalletGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-wallet">
      {(fill) => (
        <>
          <path
            d="M7.2 4h9.45c1.15 0 2.02.96 1.82 2.09L18.35 7H8.05c-1.41 0-2.55 1.13-2.55 2.53V6.7C5.5 5.2 6.17 4 7.2 4Z"
            fill={fill}
          />
          <rect x="4" y="7" width="16.75" height="11" rx="2.7" fill={fill} />
          <path d="M14.4 10.1H20v4.8h-5.6a2.4 2.4 0 1 1 0-4.8Z" fill="#0b0b0c" opacity="0.58" />
          <circle cx="16.2" cy="12.5" r="0.92" fill={fill} />
        </>
      )}
    </GoldIconFrame>
  );
}

function WhatsAppGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-whatsapp">
      {(fill) => (
        <>
          <path
            d="M12 2.8c-5.18 0-9.2 3.93-9.2 8.88 0 1.94.62 3.72 1.77 5.15L3.6 21.2l4.46-1.16c1.18.61 2.49.94 3.94.94 5.17 0 9.2-3.93 9.2-8.88 0-4.98-4.03-8.9-9.2-8.9Z"
            fill={fill}
          />
          <path
            d="M15.82 13.63c-.19-.1-1.13-.54-1.3-.6-.18-.06-.31-.1-.44.1-.13.18-.5.6-.62.72-.11.12-.24.14-.44.04-.2-.1-.87-.3-1.64-.95-.61-.51-1.02-1.15-1.14-1.35-.11-.18-.01-.28.08-.39.08-.08.19-.2.29-.32.09-.1.12-.18.18-.3.07-.12.04-.23-.01-.32-.05-.1-.45-1.08-.62-1.47-.15-.38-.32-.35-.44-.35h-.38c-.13 0-.35.05-.52.24-.18.19-.68.68-.68 1.63 0 .95.69 1.88.78 2.02.1.13 1.35 2.15 3.34 2.95 1.99.81 1.99.54 2.35.5.36-.04 1.16-.48 1.32-.96.16-.47.16-.87.11-.95-.05-.08-.18-.12-.38-.22Z"
            fill="#0b0b0c"
            opacity="0.88"
          />
        </>
      )}
    </GoldIconFrame>
  );
}

function FacebookGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-facebook">
      {(fill) => (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5.2" fill={fill} />
          <path
            d="M13.9 20v-5.3h1.84l.3-2.17H13.9v-1.38c0-.63.17-1.06 1.08-1.06h1.16V8.12c-.2-.03-.9-.09-1.72-.09-1.7 0-2.87 1.05-2.87 2.96v1.5h-1.8v2.17h1.8V20h2.35Z"
            fill="#0b0b0c"
            opacity="0.86"
          />
        </>
      )}
    </GoldIconFrame>
  );
}

function InstagramGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-instagram">
      {(fill) => (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5.4" fill={fill} />
          <rect x="7.1" y="7.1" width="9.8" height="9.8" rx="2.8" stroke="#0b0b0c" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.45" stroke="#0b0b0c" strokeWidth="2" />
          <circle cx="16.75" cy="7.35" r="1.05" fill="#0b0b0c" />
        </>
      )}
    </GoldIconFrame>
  );
}

function XGoldIcon({ className }: FooterIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="footer-x">
      {(fill) => (
        <>
          <circle cx="12" cy="12" r="9.15" fill={fill} />
          <path
            d="M8.18 6.7h2.63l2.53 3.43 2.73-3.43h1.7l-3.6 4.53 4.14 5.63h-2.63l-2.83-3.85-3.07 3.85H8.1l3.97-4.97L8.18 6.7Z"
            fill="#0b0b0c"
            opacity="0.88"
          />
        </>
      )}
    </GoldIconFrame>
  );
}

const navigationLinks = [
  { label: 'Sobre', href: '#' },
  { label: 'Produtos', href: '#' },
  { label: 'Dúvidas', href: '#' },
  { label: 'Notícias', href: '/blog' },
];

const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/555121659459', icon: WhatsAppGoldIcon },
  { label: 'Facebook', href: '#', icon: FacebookGoldIcon },
  { label: 'Instagram', href: '#', icon: InstagramGoldIcon },
  { label: 'X', href: '#', icon: XGoldIcon },
];

const policyLinks = [
  { label: 'Privacidade e Dados', href: '#' },
  { label: 'Nossas Políticas', href: '#' },
  { label: 'Segurança Cibernética', href: '#' },
  { label: 'Anticorrupção', href: '#' },
];

const storeLinks = [
  { label: 'Google Play', href: '#', eyebrow: 'Disponível no', icon: PhoneGoldIcon },
  { label: 'App Store', href: '#', eyebrow: 'Baixar na', icon: WalletGoldIcon },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,77,0.12),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(10,10,10,0.96),rgba(4,4,4,1))]" />
      <Container className="relative py-3 md:py-4">
        <div className="relative px-2 py-3 sm:px-4 lg:px-6 lg:py-4">
          <div className="grid gap-6 xl:min-h-[30vh] xl:grid-cols-[0.82fr_0.56fr_0.78fr_0.92fr] xl:items-start">
            <div className="space-y-3 xl:pt-1 xl:pr-5">
              <div className="space-y-2">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">Contato</p>
                <div className="max-w-[14rem] space-y-1.5 text-[0.84rem] leading-5 text-white/50 md:text-[0.86rem]">
                  <p>Av. Whilhelm Rotermund 124, Morro do Espelho</p>
                  <p>São Leopoldo/RS, CEP 93.030.135</p>
                  <p>(51) 2165-9459 | 0800 130 1212</p>
                  <Link href="mailto:contato@bossbanking.com.br" className="transition hover:text-white/84">
                    contato@bossbanking.com.br
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-3 xl:border-l xl:border-white/8 xl:pl-6">
              <div className="space-y-2">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">Menu</p>
                <div className="grid gap-y-2.5 text-sm text-white/62 md:text-[0.93rem]">
                  {navigationLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="whitespace-nowrap leading-none transition hover:translate-x-1 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 xl:border-l xl:border-white/8 xl:pl-6">
              <div className="space-y-2">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">Políticas</p>
                <div className="grid max-w-[13rem] gap-y-2.5 text-sm text-white/42 md:text-[0.87rem]">
                  {policyLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="whitespace-nowrap leading-none transition hover:text-white/78"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 xl:justify-self-end xl:border-l xl:border-white/8 xl:pl-6">
              <div className="space-y-1.5">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">Aplicativo</p>
                <p className="max-w-[13rem] text-[0.98rem] font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-[1.12rem]">
                  Baixe o app Boss.
                </p>
              </div>

              <div className="grid gap-2 sm:max-w-[13.75rem]">
                {storeLinks.map((store) => {
                  const Icon = store.icon;

                  return (
                    <Link
                      key={store.label}
                      href={store.href}
                      className="group soft-glass-pill relative flex items-center gap-3 rounded-[1rem] px-4 py-2.5 text-white transition hover:-translate-y-0.5 hover:border-white/18"
                    >
                      <Icon className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-105" />
                      <span className="block min-w-0">
                        <span className="block text-[0.56rem] uppercase tracking-[0.18em] text-white/42">{store.eyebrow}</span>
                        <span className="block text-[1rem] font-medium leading-none text-white/92">{store.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-2.5 pt-0.5">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">Redes sociais</p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="group soft-glass-pill relative inline-flex h-10 w-10 items-center justify-center rounded-[0.9rem] border-white/8 transition hover:-translate-y-0.5 hover:border-white/16"
                      >
                        <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.1),rgba(255,255,255,0))]" />

          <div className="flex flex-col gap-2 pt-3 text-[0.72rem] text-white/30 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-white/24">&copy; 2025 por Boss Pay LTDA - CNPJ: 62.169.944/0001-44.</div>
            <div className="text-white/24 lg:text-right">
              Todos os direitos reservados.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
