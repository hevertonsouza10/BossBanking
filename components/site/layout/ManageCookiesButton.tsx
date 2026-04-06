'use client';

type ManageCookiesButtonProps = {
  className?: string;
};

export default function ManageCookiesButton({ className }: ManageCookiesButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('bossledger:open-cookie-preferences'));
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Gerenciar cookies
    </button>
  );
}
