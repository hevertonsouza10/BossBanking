import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'mx-auto text-center' : '', className)}>
      {eyebrow ? (
        <p className="mb-4 text-[12px] uppercase tracking-[0.42em] text-[#ddb25f]">{eyebrow}</p>
      ) : null}
      <h2 className="font-[family:var(--font-display)] text-4xl font-light leading-[1.02] tracking-[-0.03em] text-white md:text-6xl">
        {title}
      </h2>
      {description ? <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">{description}</p> : null}
    </div>
  );
}
