'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Container from '@/components/site/ui/Container';
import { cn } from '@/lib/utils';

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

type MenuGroup = {
  label: string;
  items?: MenuItem[];
  href?: string;
};

const navigationGroups: MenuGroup[] = [
  {
    label: 'Sobre',
    items: [
      { label: 'Quem somos', href: '#' },
      { label: 'Compliance', href: '#' },
      { label: 'Consultoria financeira', href: '#' },
      { label: 'Assessoria Boss', href: '#' },
      { label: 'Encontre nosso banco', href: '#' },
      { label: 'Notícias Boss', href: '/blog' },
    ],
  },
  {
    label: 'Produtos',
    items: [
      { label: 'Assessoria Boss', href: '#' },
      { label: 'Cartão de crédito', href: '#' },
      { label: 'Consultoria financeira', href: '#' },
    ],
  },
  {
    label: 'Dúvidas',
    items: [
      { label: 'Central de atendimento', href: '#' },
      { label: 'Custos operacionais (iniciação)', href: '#' },
      { label: 'Bloqueio de acesso', href: '#' },
      { label: 'Dicas de segurança', href: '#' },
    ],
  },
  {
    label: 'Notícias',
    href: '/blog',
  },
];

function NavItemLink({
  item,
  className,
  onClick,
  isLast = false,
}: {
  item: MenuItem;
  className?: string;
  onClick?: () => void;
  isLast?: boolean;
}) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between gap-4 px-0 py-3 text-[0.95rem] text-[#b9b9bb] transition duration-200 hover:text-[#ececee]',
        !isLast && 'border-b border-white/[0.045]',
        className,
      )}
    >
      <span>{item.label}</span>
      <ChevronRight className="h-4 w-4 text-[#ddb25f] opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);

  useEffect(() => {
    setDesktopOpen(null);
    setMobileMenuOpen(false);
    setMobileSectionOpen(null);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopOpen(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopOpen(null);
        setMobileMenuOpen(false);
        setMobileSectionOpen(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[linear-gradient(180deg,rgba(8,8,8,0.92),rgba(8,8,8,0.72))] shadow-[inset_0_-0.5px_0_0_#525252] backdrop-blur-2xl"
    >
      <Container className="h-[100px]">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 xl:flex-1 xl:gap-9">
            <Link href="/" className="relative flex shrink-0 items-center" aria-label="Boss Ledger Home">
              <div className="pointer-events-none absolute left-[-2.8rem] top-1/2 h-16 w-36 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,178,95,0.18),rgba(221,178,95,0.08)_42%,transparent_74%)] blur-2xl" />
              <Image
                src="/brand/LOGO%20BOSS%20LEDGER%20horizontall%20editavel%20c%C3%B3pia%209PNG.png"
                alt="Boss Ledger"
                width={768}
                height={768}
                priority
                className="relative h-auto w-[126px] sm:w-[142px] lg:w-[160px]"
              />
            </Link>

            <nav className="hidden items-center gap-0.5 xl:flex">
              {navigationGroups.map((group) => {
                const hasDropdown = !!group.items?.length;
                const isOpen = desktopOpen === group.label;
                const items = group.items ?? [];

                if (!hasDropdown && group.href) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href}
                      className="whitespace-nowrap px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-[#b5b5b8] transition duration-200 hover:text-[#ededee]"
                    >
                      {group.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpen(group.label)}
                    onMouseLeave={() => setDesktopOpen((current) => (current === group.label ? null : current))}
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopOpen((current) => (current === group.label ? null : group.label))}
                      className={cn(
                        'inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-[0.64rem] font-medium uppercase tracking-[0.2em] transition duration-200',
                        isOpen
                          ? 'text-[#f0f0f1]'
                          : 'text-[#b5b5b8] hover:text-[#ededee]',
                      )}
                      aria-expanded={isOpen}
                    >
                      <span>{group.label}</span>
                      <ChevronDown className={cn('h-3.5 w-3.5 transition duration-200', isOpen ? 'rotate-180 text-[#ddb25f]' : 'text-white/55')} />
                    </button>

                    <AnimatePresence>
                      {isOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 top-full z-30 mt-3 w-[21rem] overflow-hidden rounded-[0.65rem] bg-[linear-gradient(180deg,rgba(14,14,14,0.97),rgba(8,8,8,0.95))] px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
                        >
                          <div className="absolute inset-0 rounded-[0.65rem] bg-[radial-gradient(circle_at_top_right,rgba(221,178,95,0.06),transparent_32%)]" />
                          <div className="relative">
                            <p className="mb-3 text-[0.62rem] uppercase tracking-[0.28em] text-[#ddb25f]">
                              {group.label}
                            </p>
                            {items.map((item, index) => (
                              <NavItemLink
                                key={`${group.label}-${item.label}`}
                                item={item}
                                isLast={index === items.length - 1}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="relative flex items-center justify-end gap-2 lg:gap-3 xl:ml-12 xl:border-l xl:border-white/8 xl:pl-10">
            <Link
              href="/convites"
              className="hidden rounded-full border border-[#d9dde2]/28 bg-[linear-gradient(180deg,#f4dcab_0%,#ddb25f_52%,#b9832e_100%)] px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#130f08] shadow-[0_0_18px_rgba(173,177,184,0.1),0_10px_26px_rgba(201,162,77,0.18)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.02] hover:brightness-[1.03] hover:shadow-[0_0_24px_rgba(173,177,184,0.14),0_14px_32px_rgba(201,162,77,0.22)] md:inline-flex"
            >
              Solicitar convite
            </Link>
            <Link
              href="https://bossbanking.idez.com.br/login"
              target="_blank"
              rel="noreferrer"
              className="hidden px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#b9b9bb] transition duration-300 ease-out hover:text-[#ededee] md:inline-flex"
            >
              Minha conta
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-9 w-9 items-center justify-center text-white/82 transition duration-200 hover:text-white xl:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="boss-ledger-mobile-nav"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            id="boss-ledger-mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(10,10,10,0.97),rgba(5,5,5,0.95))] xl:hidden"
          >
            <Container className="py-4">
              <div className="space-y-3">
                {navigationGroups.map((group) => {
                  const hasDropdown = !!group.items?.length;
                  const isOpen = mobileSectionOpen === group.label;
                  const items = group.items ?? [];

                  if (!hasDropdown && group.href) {
                    return (
                      <Link
                        key={group.label}
                        href={group.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/[0.02] px-4 py-3.5 text-sm text-white/78 transition hover:border-[#ddb25f]/28 hover:text-white"
                      >
                        <span>{group.label}</span>
                        <ChevronRight className="h-4 w-4 text-[#ddb25f]" />
                      </Link>
                    );
                  }

                  return (
                    <div key={group.label} className="rounded-[1.15rem] border border-white/8 bg-white/[0.02]">
                      <button
                        type="button"
                        onClick={() => setMobileSectionOpen((current) => (current === group.label ? null : group.label))}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium uppercase tracking-[0.12em] text-white/82"
                        aria-expanded={isOpen}
                      >
                        <span>{group.label}</span>
                        <ChevronDown className={cn('h-4 w-4 transition duration-200', isOpen ? 'rotate-180 text-[#ddb25f]' : 'text-white/55')} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 border-t border-white/8 px-3 pb-3 pt-3">
                              {items.map((item, index) => (
                                <NavItemLink
                                  key={`${group.label}-${item.label}`}
                                  item={item}
                                  isLast={index === items.length - 1}
                                  className="px-1 py-3"
                                  onClick={() => setMobileMenuOpen(false)}
                                />
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <Link
                    href="/convites"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-[#f6deb0]/34 bg-[linear-gradient(180deg,#f5ddb0_0%,#ddb25f_48%,#b9832e_100%)] px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#130f08]"
                  >
                    Solicitar convite
                  </Link>
                  <Link
                    href="https://bossbanking.idez.com.br/login"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-[#ddb25f]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] px-5 py-3 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-white/88"
                  >
                    Minha conta
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
