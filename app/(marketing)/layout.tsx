import SiteFooter from '@/components/site/layout/SiteFooter';
import SiteHeader from '@/components/site/layout/SiteHeader';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div>{children}</div>
      <SiteFooter />
    </>
  );
}
