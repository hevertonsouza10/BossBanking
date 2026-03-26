export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function keepBossLedgerTogether(text: string) {
  return text.replace(/Boss Ledger/g, 'Boss\u00A0Ledger');
}
