import type { BlogCategory, BlogPost, Page } from '@/lib/cms/types';

const categories: BlogCategory[] = [
  {
    slug: 'private-finance',
    name: 'Private Finance',
    description: 'Estratégias, produtos e decisões para clientes de alta exigência.',
  },
  {
    slug: 'tecnologia',
    name: 'Tecnologia',
    description: 'Produto, design e experiência digital para uma operação premium.',
  },
  {
    slug: 'cartoes-beneficios',
    name: 'Cartões e Benefícios',
    description: 'Programas de vantagens, experiências e uso inteligente de crédito.',
  },
];

const categoryMap = Object.fromEntries(categories.map((category) => [category.slug, category])) as Record<
  string,
  BlogCategory
>;

export const marketingPages: Page[] = [
  {
    slug: 'home',
    title: 'Boss Ledger',
    summary: 'Home cinematográfica com vídeo humano, manifesto, app, benefícios, cartão e vídeo conceito.',
    navigationLabel: 'Início',
    seo: {
      title: 'Boss Ledger | Plataforma Financeira Premium',
      description: 'Uma home premium com linguagem de luxo, tecnologia e narrativa visual.',
    },
    sections: [
      {
        id: 'home-hero',
        type: 'hero',
        title: 'Uma Fintech digital que ajuda você e o seu negócio a chegar ao topo',
        media: {
          src: 'https://player.vimeo.com/video/1174914823',
          alt: 'Vídeo principal da Boss Ledger com diferentes perfis de empreendedores em atividade',
        },
        actions: [],
        scrollLabel: 'Descubra a melhor experiencia PJ',
      },
      {
        id: 'home-proof',
        type: 'testimonialProof',
        eyebrow: 'Atendimento',
        title: 'Atendimento humanizado, gerentes dedicados',
        description:
          'Um atendimento financeiro diferente de qualquer outro',
        quote:
          'Uma experiencia mais proxima, segura e lucrativa para empresas que buscam um relacionamento',
        attribution: 'Suporte por telefone e WhatsApp',
        metrics: [
          { value: '24h', label: 'acesso digital' },
          { value: '1:1', label: 'Atendimento humanizado', icon: 'handshake' },
          { value: '365', label: 'presença ao longo do ano' },
        ],
      },
      {
        id: 'home-phone',
        type: 'mediaShowcase',
        variant: 'phone',
        eyebrow: 'Aplicativo',
        title: 'Um aplicativo fácil de usar, uma estrutura com segurança dobrada.',
        media: {
          src: 'https://prod.spline.design/x5wn5bZMT-Kfm7MB/scene.splinecode',
          poster: '/images/Free iPhone 16 Pro Mockup@1-1707x811 (1).png',
          alt: 'Visual do aplicativo Boss Ledger',
          caption: 'Boss Ledger App',
          ratio: 'portrait',
          fallbackLabel: 'Aplicativo',
        },
        highlights: [
          {
            title: 'Fácil de usar',
            description: 'Interface organizada com foco na sua experiência',
          },
          {
            title: 'Tranquilidade',
            description: 'Tecnologias adicionais com foco de segurança em seu capital',
          },
        ],
      },
      {
        id: 'home-benefits',
        type: 'benefitsGrid',
        eyebrow: 'Único',
        title: 'Boss Ledger senta com você e entende sua operação.',
        description:
          'Entendemos a estrutura da sua empresa e apresenta soluções reais com foco e desempenho',
        items: [
            {
              kicker: 'holdings',
              title: 'Apoio de estruturação para holdings',
              description:
                '• Redução de IR sobre aluguéis: de 27,5% para até 11,33%\n• Sucessão sem inventário (economia de até 35%)\n• Proteção jurídica do patrimônio familiar\n• Separação entre CPF e riscos operacionais\n• Centralização de lucros e dividendos com eficiência fiscal',
            },
            {
              kicker: 'offshores',
              title: 'Apoio de estruturação para offshores',
              description:
                '• Imposto ZERO sobre lucros no exterior (diferimento)\n• Reinvestimento integral de lucros em moeda estrangeira\n• Proteção contra desvalorização do Real e risco Brasil',
            },
          {
            kicker: 'splitpayment',
            title: 'Split payment para operações com divisão financeira',
            description:
              'Uma solução para negócios que precisam distribuir valores entre partes da operação com mais controle, visibilidade e previsibilidade.',
          },
        ],
      },
      {
        id: 'home-card',
        type: 'mediaShowcase',
        variant: 'card',
        eyebrow: 'Cartão',
        title: 'Um cartão personalizado, para clientes selecionados, como você.',
        description:
          'Um cartão pensado para unir presença, exclusividade e uma experiência mais alinhada ao perfil de cada cliente.',
        media: {
          alt: 'Vídeo do cartão Boss Ledger',
          src: '/videos/teste%20de%20animacao0001-0122.mp4',
          ratio: 'wide',
          fallbackLabel: 'Cartão Boss Ledger',
        },
      },
      {
        id: 'home-statement',
        type: 'statement',
        eyebrow: 'Depoimentos / Cases de sucesso',
        title: 'Somente quem vive a experiência Boss Ledger sabe a diferença.',
        description:
          'Relatos de clientes que encontraram um Relacionamento mais próximo, mais claro e mais alinhado com a própria operação.',
          testimonials: [
            {
              name: 'Rafael Carvalho',
              role: 'Google • 3 anos atrás',
              quote:
                'excelente atendimento e cuidado com o cliente, super satisfeito.',
              rating: 5,
            },
            {
              name: 'Rogerio Longhi',
              role: 'Google • 3 anos atrás',
              quote:
                'Ótimo atendimento, muito profissional e atencioso.',
              rating: 5,
            },
            {
              name: 'Nara Romeu',
              role: 'Google • Editado 3 anos atrás',
              quote:
                'Atendimento Excelente! O Dr. Eduardo é muito atencioso e um profissional competente. Sempre que entrei em contato, fui atendida logo e com muita paciência para sanar minhas dúvidas e incertezas. Recomendo a Bosqueroli Assessoria e Consultoria!',
              rating: 5,
            },
            {
              name: 'Marcos Vinicius',
              role: 'Google • 2 anos atrás',
              quote:
                'Excelente atendimento, nota 10.',
              rating: 5,
            },
            {
              name: 'Robson Bordignon Pólvora',
              role: 'Google • 4 anos atrás',
              quote:
                'Profissionais altamente qualificados e muito prestativos. O analista atende com muita atenção e se expressa com clareza... recomendo',
              rating: 5,
            },
            {
              name: 'Eliana Bastianel',
              role: 'Google • Editado 2 anos atrás',
              quote:
                'Excelente profissional, atendimento super atencioso.',
              rating: 5,
            },
            {
              name: 'Rodrigo Peña',
              role: 'Google • 3 anos atrás',
              quote:
                'Excelente!! Ótimos profissionais.',
              rating: 5,
            },
            {
              name: 'dulce weber',
              role: 'Google • 4 anos atrás',
              quote:
                'Indico sempre, resolveram minha situação com maestria! Gratidão!',
              rating: 5,
            },
            {
              name: 'Renan Correa',
              role: 'Google • 3 anos atrás',
              quote:
                'Ótimo atendimento!',
              rating: 5,
            },
            {
              name: 'Vilson Butierres',
              role: 'Google • Editado 2 anos atrás',
              quote:
                'Muito bem entendido, foi ágil e atencioso.',
              rating: 5,
            },
            {
              name: 'Jéssica Pagliosa',
              role: 'Google • 3 anos atrás',
              quote:
                'Ótimo atendimento.',
              rating: 5,
            },
            {
              name: 'Fabiano Goulart',
              role: 'Google • 3 anos atrás',
              quote:
                'Atendimento primoroso!',
              rating: 5,
            },
          ],
      },
      {
        id: 'home-concept',
        type: 'featureSplit',
        eyebrow: 'Filme conceito',
        title: 'Uma história sobre empresários, ambição e uma Fintech que acompanha esse ritmo.',
        description:
          'Assista ao filme conceito da Boss Ledger e acompanhe uma narrativa que apresenta contexto, visão e a proposta da Fintech em uma experiência cinematográfica.',
        media: {
          src: 'https://player.vimeo.com/video/1175664452?badge=0&autopause=0&player_id=0&app_id=58479',
          alt: 'Vídeo conceito da Boss Ledger',
          ratio: 'video',
          fallbackLabel: 'Boss Ledger',
          loopUntilSeconds: 114,
        },
        layout: 'immersive',
        points: [
          {
            title: 'Atendimento próximo',
            description: 'Uma experiência pensada para quem valoriza disponibilidade, clareza e acompanhamento.',
          },
          {
            title: 'Operação simplificada',
            description: 'Recursos digitais organizados para acompanhar a rotina de clientes e negócios.',
          },
          {
            title: 'Presença em diferentes contextos',
            description: 'Uma proposta pensada para quem atua no escritório, na empresa, no campo e em movimento.',
          },
        ],
      },
      {
        id: 'home-cta',
        type: 'cta',
        eyebrow: 'Convite',
        title: 'Nos da BOSS LEDGER reinventamos o conceito de experiencia financeira.',
        description:
          'Faça parte dessa história, solicite seu convite hoje mesmo.',
        actions: [
          { label: 'Solicitar convite', href: '/convites' },
          { label: 'Minha conta', href: 'https://bossbanking.idez.com.br/login', variant: 'secondary', external: true },
        ],
      },
    ],
  },
  {
    slug: 'conta-global',
    title: 'Conta Global',
    summary: 'Página de produto reaproveitando o mesmo sistema visual.',
    navigationLabel: 'Conta global',
    seo: {
      title: 'Conta Global',
      description: 'Página preparada para crescer com CMS e narrativa premium.',
    },
    sections: [
      {
        id: 'conta-hero',
        type: 'hero',
        eyebrow: 'Conta global',
        title: 'Uma página de produto criada sobre a mesma fundação da home.',
        description: 'Cada nova rota institucional pode nascer com o mesmo padrão elevado e muito menos retrabalho.',
        actions: [
          { label: 'Solicitar convite', href: '/convites' },
          { label: 'Ler blog', href: '/blog', variant: 'secondary' },
        ],
      },
      {
        id: 'conta-benefits',
        type: 'benefitsGrid',
        eyebrow: 'Escala',
        title: 'O sistema já suporta novas páginas, benefícios e narrativas.',
        items: [
          {
            kicker: 'Conteúdo',
            title: 'Headline e narrativa configuráveis',
            description: 'A página deixa de depender de hardcode espalhado em componentes isolados.',
          },
          {
            kicker: 'SEO',
            title: 'Metadata própria por slug',
            description: 'Cada produto pode ranquear com título e descrição independentes.',
          },
          {
            kicker: 'Design',
            title: 'Mesmo padrão, novas jornadas',
            description: 'Você mantém consistência sem transformar todas as páginas em cópias da home.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cartao-black',
    title: 'Cartão Black',
    summary: 'Página dedicada ao cartão.',
    navigationLabel: 'Cartão Black',
    seo: {
      title: 'Cartão Black',
      description: 'Página do cartão premium com suporte a mídia cinematográfica.',
    },
    sections: [
      {
        id: 'card-hero',
        type: 'hero',
        eyebrow: 'Cartão premium',
        title: 'Uma rota pronta para lançar o cartão com narrativa forte e alto contraste visual.',
        description: 'Use vídeos, renders, benefícios e prova social dentro do mesmo renderer de página.',
        actions: [{ label: 'Quero saber mais', href: '/beneficios' }],
      },
      {
        id: 'card-media',
        type: 'mediaShowcase',
        variant: 'card',
        title: 'Container preparado para o vídeo do cartão.',
        description: 'A página pode receber o asset cinematográfico quando ele estiver pronto.',
        media: {
          alt: 'Placeholder para animação do cartão Boss Ledger',
          ratio: 'wide',
          fallbackLabel: 'Vídeo do cartão',
        },
      },
    ],
  },
  {
    slug: 'para-empresas',
    title: 'Para Empresas',
    summary: 'Página institucional para ofertas B2B.',
    navigationLabel: 'Para empresas',
    seo: {
      title: 'Para Empresas',
      description: 'Página institucional B2B construída sobre o mesmo sistema de blocos.',
    },
    sections: [
      {
        id: 'empresas-hero',
        type: 'hero',
        eyebrow: 'B2B',
        title: 'A mesma base atende comunicação para empresas e produtos corporativos.',
        description: 'Troque apenas o conteúdo e mantenha o padrão visual de todo o ecossistema.',
        actions: [{ label: 'Falar com especialista', href: '/contato' }],
      },
    ],
  },
  {
    slug: 'beneficios',
    title: 'Benefícios',
    summary: 'Página de benefícios.',
    navigationLabel: 'Benefícios',
    seo: {
      title: 'Benefícios',
      description: 'Página institucional para benefícios e vantagens do ecossistema Boss Ledger.',
    },
    sections: [
      {
        id: 'benefits-hero',
        type: 'hero',
        eyebrow: 'Benefícios',
        title: 'Benefícios podem virar uma página própria sem retrabalho estrutural.',
        description: 'O renderer já suporta grids, feature splits, CTA e prova social sem mudar a arquitetura.',
        actions: [{ label: 'Ler manifesto', href: '/manifesto' }],
      },
    ],
  },
  {
    slug: 'tecnologia',
    title: 'Tecnologia',
    summary: 'Página institucional sobre tecnologia.',
    navigationLabel: 'Tecnologia',
    seo: {
      title: 'Tecnologia',
      description: 'Explicação institucional sobre plataforma, segurança e experiência digital.',
    },
    sections: [
      {
        id: 'tech-hero',
        type: 'hero',
        eyebrow: 'Tecnologia',
        title: 'Página pronta para explicar produto, segurança e UX com narrativa premium.',
        actions: [{ label: 'Ver blog', href: '/blog' }],
      },
    ],
  },
  {
    slug: 'convites',
    title: 'Convites',
    summary: 'Página de captação.',
    navigationLabel: 'Convites',
    seo: {
      title: 'Convites',
      description: 'Página de solicitação de convite e captação.',
    },
    sections: [
      {
        id: 'invite-hero',
        type: 'hero',
        eyebrow: 'Convite',
        title: 'Uma rota pronta para captação, formulário e campanhas futuras.',
        description: 'A primeira versão pode começar simples e depois receber integrações reais sem mudar o esqueleto.',
        actions: [
          { label: 'Abrir conta', href: 'https://bossbanking.idez.com.br/login', external: true },
          { label: 'Voltar para home', href: '/', variant: 'secondary' },
        ],
      },
    ],
  },
  {
    slug: 'manifesto',
    title: 'Manifesto',
    summary: 'Página institucional de posicionamento.',
    navigationLabel: 'Manifesto',
    seo: {
      title: 'Manifesto',
      description: 'Página de marca, visão e posicionamento da Boss Ledger.',
    },
    sections: [
      {
        id: 'manifesto-hero',
        type: 'hero',
        eyebrow: 'Manifesto',
        title: 'Branding, campanha e posicionamento no mesmo sistema visual.',
        description: 'Isso mantém o site inteiro coeso mesmo quando cada página tiver uma narrativa própria.',
        actions: [{ label: 'Conhecer tecnologia', href: '/tecnologia' }],
      },
    ],
  },
  {
    slug: 'contato',
    title: 'Contato',
    summary: 'Página de contato.',
    navigationLabel: 'Contato',
    seo: {
      title: 'Contato',
      description: 'Página de contato institucional pronta para evoluir com integrações.',
    },
    sections: [
      {
        id: 'contact-hero',
        type: 'hero',
        eyebrow: 'Contato',
        title: 'Uma rota final simples para centralizar suporte, comercial ou relacionamento.',
        actions: [{ label: 'Solicitar convite', href: '/convites' }],
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-estruturar-um-site-premium-para-banco-digital',
    title: 'Como estruturar um site premium para uma fintech sem virar um projeto descartavel',
    excerpt: 'Separar rotas, sistema de blocos, SEO e contratos de conteúdo desde o início evita retrabalho quando o site cresce.',
    publishedAt: '10 de março de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap.tecnologia,
    seo: {
      title: 'Como estruturar um site premium para fintech',
      description: 'Base arquitetural para landing, páginas institucionais e blog no mesmo projeto.',
    },
    body: [
      {
        id: 'intro',
        heading: 'Comece pela arquitetura, não só pelo hero',
        paragraphs: [
          'Um hero bonito vende a primeira impressão, mas não sustenta a expansão do site. Quando a operação pede páginas de produto, campanhas e blog, a falta de estrutura aparece rápido.',
          'Separar renderer de seções, rotas por domínio e contratos de conteúdo dá velocidade sem sacrificar o visual premium.',
        ],
      },
      {
        id: 'cms',
        heading: 'CMS como direção, contratos locais como primeira etapa',
        paragraphs: [
          'Mesmo antes de plugar um CMS headless real, vale modelar Page, Post e Category no código. Isso reduz a mudança futura a uma troca de fonte de dados.',
        ],
      },
    ],
  },
  {
    slug: 'porque-um-blog-ajuda-um-site-de-banco-digital',
    title: 'Por que um blog bem estruturado fortalece o site de uma fintech',
    excerpt: 'Blog não é só conteúdo: é aquisição, SEO, confiança e argumento comercial contínuo.',
    publishedAt: '08 de março de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap['private-finance'],
    seo: {
      title: 'Por que um blog ajuda o site de uma fintech',
      description: 'Entenda o papel editorial e comercial de um blog para uma fintech.',
    },
    body: [
      {
        id: 'blog-value',
        heading: 'Aquisição e autoridade',
        paragraphs: [
          'Um blog permite capturar buscas de topo e meio de funil, além de educar o visitante antes de um pedido de convite ou abertura de conta.',
          'Quando o blog compartilha layout, navegação e identidade com o restante do site, a percepção de marca sobe.',
        ],
      },
    ],
  },
  {
    slug: 'o-papel-do-cartao-premium-na-experiencia-da-marca',
    title: 'O papel do cartão premium na experiência da marca',
    excerpt: 'O cartão não é só um produto: ele pode ser a peça central do storytelling visual da home e das páginas de produto.',
    publishedAt: '05 de março de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap['cartoes-beneficios'],
    seo: {
      title: 'O papel do cartão premium na experiência da marca',
      description: 'Como usar mídia cinematográfica e narrativa visual para destacar um cartão premium.',
    },
    body: [
      {
        id: 'card-storytelling',
        heading: 'Produto como narrativa',
        paragraphs: [
          'Quando a página trata o cartão como protagonista visual, ele deixa de ser só um benefício listado em bullet points.',
          'Vídeo, iluminação, textura e ritmo editorial ajudam a construir percepção premium mesmo antes do asset final 3D existir.',
        ],
      },
    ],
  },
];

export { categories as blogCategories };

