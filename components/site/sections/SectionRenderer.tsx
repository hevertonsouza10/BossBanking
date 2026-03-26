import type { PageSection } from '@/lib/cms/types';
import BenefitsGridSection from '@/components/site/sections/BenefitsGridSection';
import ContactChannelsSection from '@/components/site/sections/ContactChannelsSection';
import CtaSection from '@/components/site/sections/CtaSection';
import FeatureSplitSection from '@/components/site/sections/FeatureSplitSection';
import HeroSection from '@/components/site/sections/HeroSection';
import InviteFormSection from '@/components/site/sections/InviteFormSection';
import MediaShowcaseSection from '@/components/site/sections/MediaShowcaseSection';
import StatementSection from '@/components/site/sections/StatementSection';
import TestimonialProofSection from '@/components/site/sections/TestimonialProofSection';

export default function SectionRenderer({ section }: { section: PageSection }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} />;
    case 'mediaShowcase':
      return <MediaShowcaseSection section={section} />;
    case 'benefitsGrid':
      return <BenefitsGridSection section={section} />;
    case 'contactChannels':
      return <ContactChannelsSection section={section} />;
    case 'featureSplit':
      return <FeatureSplitSection section={section} />;
    case 'testimonialProof':
      return <TestimonialProofSection section={section} />;
    case 'cta':
      return <CtaSection section={section} />;
    case 'inviteForm':
      return <InviteFormSection section={section} />;
    case 'statement':
      return <StatementSection section={section} />;
    default:
      return null;
  }
}
