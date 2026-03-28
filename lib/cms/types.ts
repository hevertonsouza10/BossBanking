export type MediaAsset = {
  src?: string;
  poster?: string;
  alt: string;
  caption?: string;
  ratio?: 'video' | 'square' | 'portrait' | 'wide';
  fallbackLabel?: string;
  loopUntilSeconds?: number;
};

export type SectionAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
};

export type HeroSection = {
  id: string;
  type: 'hero';
  eyebrow?: string;
  title: string;
  description?: string;
  media?: MediaAsset;
  actions: SectionAction[];
  scrollLabel?: string;
};

export type MediaHighlight = {
  title: string;
  description: string;
};

export type MediaShowcaseSection = {
  id: string;
  type: 'mediaShowcase';
  variant: 'phone' | 'card' | 'concept';
  eyebrow?: string;
  title: string;
  description?: string;
  media?: MediaAsset;
  highlights?: MediaHighlight[];
};

export type BenefitsGridItem = {
  kicker: string;
  title: string;
  description: string;
};

export type BenefitsGridSection = {
  id: string;
  type: 'benefitsGrid';
  eyebrow?: string;
  title: string;
  description?: string;
  items: BenefitsGridItem[];
};

export type FeaturePoint = {
  title: string;
  description: string;
};

export type FeatureSplitSection = {
  id: string;
  type: 'featureSplit';
  eyebrow?: string;
  title: string;
  description?: string;
  media?: MediaAsset;
  points: FeaturePoint[];
  layout?: 'standard' | 'immersive';
};

export type TestimonialMetric = {
  value: string;
  label: string;
  icon?: 'handshake';
};

export type TestimonialProofSection = {
  id: string;
  type: 'testimonialProof';
  eyebrow?: string;
  title: string;
  description?: string;
  quote: string;
  attribution: string;
  metrics: TestimonialMetric[];
};

export type CtaSection = {
  id: string;
  type: 'cta';
  eyebrow: string;
  title: string;
  description?: string;
  actions: SectionAction[];
};

export type InviteFormSection = {
  id: string;
  type: 'inviteForm';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description: string;
  messagePlaceholder: string;
  buttonLabel: string;
  subject: string;
  bottomText: string;
  successMessage: string;
};

export type ContactChannelItem = {
  label: string;
  value: string;
  href: string;
  description?: string;
  primary?: boolean;
};

export type ContactChannelsSection = {
  id: string;
  type: 'contactChannels';
  eyebrow?: string;
  title: string;
  description: string;
  items: ContactChannelItem[];
  bottomText: string;
};

export type StatementSection = {
  id: string;
  type: 'statement';
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials?: {
    name: string;
    role: string;
    quote: string;
    rating: number;
  }[];
};

export type PageSection =
  | HeroSection
  | MediaShowcaseSection
  | BenefitsGridSection
  | FeatureSplitSection
  | TestimonialProofSection
  | CtaSection
  | InviteFormSection
  | ContactChannelsSection
  | StatementSection;

export type SeoData = {
  title: string;
  description: string;
};

export type Page = {
  slug: string;
  title: string;
  summary: string;
  navigationLabel: string;
  seo: SeoData;
  sections: PageSection[];
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export type RichTextBlock = {
  id: string;
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  author?: string;
  category: BlogCategory;
  seo: SeoData;
  body: RichTextBlock[];
};
