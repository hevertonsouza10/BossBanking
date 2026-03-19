import type { BlogCategory, BlogPost, Page } from '@/lib/cms/types';

const categories: BlogCategory[] = [
  {
    slug: 'private-banking',
    name: 'Private Banking',
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
      title: 'Boss Ledger | Private Digital Banking',
      description: 'Uma home premium com linguagem de luxo, tecnologia e narrativa visual.',
    },
    sections: [
      {
        id: 'home-hero',
        type: 'hero',
        title: 'Um banco digital que ajuda você e o seu negócio a chegar ao topo',
        media: {
          src: 'https://player.vimeo.com/video/1174914823',
          alt: 'Vídeo principal da Boss Ledger com diferentes perfis de empreendedores em atividade',
        },
        actions: [],
        scrollLabel: 'Descubra a experiência',
      },
      {
        id: 'home-proof',
        type: 'testimonialProof',
        eyebrow: 'Atendimento',
        title: 'Atendimento humanizado, gerentes dedicados',
        description:
          'Com toda certeza, um atendimento bancário que você nunca viu. Diferente de qualquer outro banco.',
        quote:
          'Uma experiência mais próxima, clara e presente para clientes que esperam relacionamento real com o banco.',
        attribution: 'Boss Ledger | Relacionamento dedicado',
        metrics: [
          { value: '24h', label: 'acesso digital' },
          { value: '1:1', label: 'atendimento dedicado' },
          { value: '365', label: 'presença ao longo do ano' },
        ],
      },
      {
        id: 'home-phone',
        type: 'mediaShowcase',
        variant: 'phone',
        eyebrow: 'Aplicativo',
        title: 'Um aplicativo fácil de usar, uma estrutura com segurança dobrada.',
        description:
          'Acompanhe saldos, movimentações e serviços em uma experiência feita para o dia a dia.',
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
            title: 'Visão clara',
            description: 'Informações organizadas para facilitar a consulta de saldo, extrato e movimentações.',
          },
          {
            title: 'Acesso contínuo',
            description: 'Recursos disponíveis com fluidez no celular, no escritório e na rotina de trabalho.',
          },
        ],
      },
      {
        id: 'home-benefits',
        type: 'benefitsGrid',
        eyebrow: 'Único',
        title: 'Boss Ledger senta com você e entende sua operação.',
        description:
          'Um banco que entende a estrutura da sua empresa e organiza soluções que acompanham a operação de forma mais próxima.',
        items: [
          {
            kicker: 'holding',
            title: 'Estrutura para holdings e organização societária',
            description:
              'Uma frente pensada para centralizar leitura patrimonial, relacionamento financeiro e necessidades de uma operação com estrutura mais complexa.',
          },
          {
            kicker: 'offshore',
            title: 'Apoio para operações com conta offshore',
            description:
              'Uma abordagem voltada para empresas e clientes que precisam de mais clareza no acompanhamento de estruturas internacionais e fluxos relacionados.',
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
        title: 'Quem vive a experiência Boss Ledger percebe a diferença.',
        description:
          'Relatos de clientes que encontraram uma relação bancária mais próxima, mais clara e mais alinhada com a própria operação.',
        testimonials: [
          {
            name: 'Roberto Alencar',
            role: 'Holding patrimonial',
            quote:
              'A estrutura de atendimento trouxe mais clareza para nossas decisões e deixou a rotina financeira muito mais organizada.',
            rating: 5,
          },
          {
            name: 'Fernanda Araújo',
            role: 'Operação internacional',
            quote:
              'Conseguimos acompanhar melhor a operação e ter um relacionamento mais presente, sem a distância comum de bancos tradicionais.',
            rating: 5,
          },
          {
            name: 'Marcelo Tavares',
            role: 'Empresa em crescimento',
            quote:
              'O suporte fez diferença desde o início. A sensação é de ter um banco que realmente entende o contexto do negócio.',
            rating: 5,
          },
          {
            name: 'Juliana Martins',
            role: 'Estrutura comercial',
            quote:
              'A experiência ficou mais fluida, com atendimento direto e uma leitura muito mais prática da nossa operação financeira.',
            rating: 5,
          },
          {
            name: 'Ricardo Mello',
            role: 'Grupo empresarial',
            quote:
              'O atendimento é rápido, objetivo e sempre muito próximo. Isso trouxe mais confiança para conduzir nossa operação com tranquilidade.',
            rating: 5,
          },
          {
            name: 'Patricia Nogueira',
            role: 'Gestão patrimonial',
            quote:
              'Passamos a ter mais visibilidade sobre a estrutura financeira e um acompanhamento que realmente ajuda nas decisões do dia a dia.',
            rating: 5,
          },
          {
            name: 'Eduardo Sampaio',
            role: 'Operação multissetorial',
            quote:
              'A diferença está na proximidade. Sempre que precisamos, existe alguém que conhece nossa realidade e responde com agilidade.',
            rating: 5,
          },
          {
            name: 'Camila Torres',
            role: 'Empresa familiar',
            quote:
              'O relacionamento ficou muito mais claro e humano. É um tipo de atendimento que transmite segurança desde o primeiro contato.',
            rating: 5,
          },
          {
            name: 'Gustavo Farias',
            role: 'Expansão comercial',
            quote:
              'A organização financeira evoluiu bastante depois que passamos a contar com uma estrutura mais dedicada e próxima da nossa rotina.',
            rating: 5,
          },
          {
            name: 'Renata Barros',
            role: 'Operação premium',
            quote:
              'Encontramos uma experiência mais alinhada ao nosso perfil, com mais clareza, presença e suporte real para a operação.',
            rating: 5,
          },
        ],
      },
      {
        id: 'home-concept',
        type: 'featureSplit',
        eyebrow: 'Filme conceito',
        title: 'Uma história sobre empresários, ambição e o banco que acompanha esse ritmo.',
        description:
          'Assista ao filme conceito da Boss Ledger e acompanhe uma narrativa que apresenta contexto, visão e a proposta do banco em uma experiência cinematográfica.',
        media: {
          src: 'https://player.vimeo.com/video/1174912133?badge=0&autopause=0&player_id=0&app_id=58479',
          alt: 'Vídeo conceito da Boss Ledger',
          ratio: 'video',
          fallbackLabel: 'Boss Ledger',
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
        title: 'Nós do BOSS LEDGER reinventamos o conceito de banco.',
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
    title: 'Como estruturar um site premium para um banco digital sem virar um projeto descartável',
    excerpt: 'Separar rotas, sistema de blocos, SEO e contratos de conteúdo desde o início evita retrabalho quando o site cresce.',
    publishedAt: '10 de março de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap.tecnologia,
    seo: {
      title: 'Como estruturar um site premium para banco digital',
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
    title: 'Por que um blog bem estruturado fortalece um site de banco digital',
    excerpt: 'Blog não é só conteúdo: é aquisição, SEO, confiança e argumento comercial contínuo.',
    publishedAt: '08 de março de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap['private-banking'],
    seo: {
      title: 'Por que um blog ajuda um site de banco digital',
      description: 'Entenda o papel editorial e comercial de um blog para fintech e banco digital.',
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

