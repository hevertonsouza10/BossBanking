import SiteFooter from '@/components/site/layout/SiteFooter';
import SiteHeader from '@/components/site/layout/SiteHeader';

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="pt-24 md:pt-28">{children}</div>
      <SiteFooter />
    </>
  );
}
