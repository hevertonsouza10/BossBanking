export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function keepBossLedgerTogether(text: string) {
  return text.replace(/Boss Ledger/g, 'Boss\u00A0Ledger');
}

export function buildVideoEmbedSrc(src: string | undefined, overrides: Record<string, string>) {
  if (!src) {
    return undefined;
  }

  try {
    const url = new URL(src);

    Object.entries(overrides).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  } catch {
    return src;
  }
}
