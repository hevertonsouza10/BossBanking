import type { Page } from '@/lib/cms/types';
import SectionRenderer from '@/components/site/sections/SectionRenderer';

export default function PageRenderer({ page }: { page: Page }) {
  return (
    <main>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
