import type { BlogCategory, BlogPost, Page } from '@/lib/cms/types';

const categories: BlogCategory[] = [
  {
    slug: 'private-banking',
    name: 'Private Banking',
    description: 'Estrategias, produtos e decisoes para clientes de alta exigencia.',
  },
  {
    slug: 'tecnologia',
    name: 'Tecnologia',
    description: 'Produto, design e experiencia digital para uma operacao premium.',
  },
  {
    slug: 'cartoes-beneficios',
    name: 'Cartoes e Beneficios',
    description: 'Programas de vantagens, experiencias e uso inteligente de credito.',
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
    summary: 'Home cinematografica com video humano, manifesto, app, beneficios, cartao e video conceito.',
    navigationLabel: 'Inicio',
    seo: {
      title: 'Boss Ledger | Private Digital Banking',
      description: 'Uma home premium com linguagem de luxo, tecnologia e narrativa visual.',
    },
    sections: [
      {
        id: 'home-hero',
        type: 'hero',
        title: 'Um banco digital que ajuda voce e o seu negocio a chegar ao topo',
        media: {
          src: 'https://player.vimeo.com/video/1174914823',
          alt: 'Video principal da Boss Ledger com diferentes perfis de empreendedores em atividade',
        },
        actions: [],
        scrollLabel: 'Descubra a experiencia',
      },
      {
        id: 'home-proof',
        type: 'testimonialProof',
        eyebrow: 'Atendimento',
        title: 'Atendimento humanizado Gerentes Dedicados',
        description:
          'Com toda certeza, um atendimento bancario que voce nunca viu. Diferente de qualquer outro banco.',
        quote:
          'Uma experiencia mais proxima, clara e presente para clientes que esperam relacionamento real com o banco.',
        attribution: 'Boss Ledger | Relacionamento dedicado',
        metrics: [
          { value: '24h', label: 'acesso digital' },
          { value: '1:1', label: 'atendimento dedicado' },
          { value: '365', label: 'presenca ao longo do ano' },
        ],
      },
      {
        id: 'home-phone',
        type: 'mediaShowcase',
        variant: 'phone',
        eyebrow: 'Aplicativo',
        title: 'Um aplicativo facil de usar, uma estrutura com seguranca dobrada.',
        description:
          'Acompanhe saldos, movimentacoes e servicos em uma experiencia feita para o dia a dia.',
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
            title: 'Visao clara',
            description: 'Informacoes organizadas para facilitar a consulta de saldo, extrato e movimentacoes.',
          },
          {
            title: 'Acesso continuo',
            description: 'Recursos disponiveis com fluidez no celular, no escritorio e na rotina de trabalho.',
          },
        ],
      },
      {
        id: 'home-benefits',
        type: 'benefitsGrid',
        eyebrow: 'Unico',
        title: 'Boss Ledger senta com voce e entende sua operacao.',
        description:
          'Um banco que entende a estrutura da sua empresa e organiza solucoes que acompanham a operacao de forma mais proxima.',
        items: [
          {
            kicker: 'holding',
            title: 'Estrutura para holdings e organizacao societaria',
            description:
              'Uma frente pensada para centralizar leitura patrimonial, relacionamento financeiro e necessidades de uma operacao com estrutura mais complexa.',
          },
          {
            kicker: 'offshore',
            title: 'Apoio para operacoes com conta offshore',
            description:
              'Uma abordagem voltada para empresas e clientes que precisam de mais clareza no acompanhamento de estruturas internacionais e fluxos relacionados.',
          },
          {
            kicker: 'splitpayment',
            title: 'Split payment para operacoes com divisao financeira',
            description:
              'Uma solucao para negocios que precisam distribuir valores entre partes da operacao com mais controle, visibilidade e previsibilidade.',
          },
        ],
      },
      {
        id: 'home-card',
        type: 'mediaShowcase',
        variant: 'card',
        eyebrow: 'Cartao',
        title: 'Um cartao personalizado, para clientes selecionados, como voce.',
        description:
          'Um cartao pensado para unir presenca, exclusividade e uma experiencia mais alinhada ao perfil de cada cliente.',
        media: {
          alt: 'Video do cartao Boss Ledger',
          src: '/videos/teste%20de%20animacao0001-0122.mp4',
          ratio: 'wide',
          fallbackLabel: 'Cartao Boss Ledger',
        },
      },
      {
        id: 'home-statement',
        type: 'statement',
        eyebrow: 'Depoimentos / Cases de sucesso',
        title: 'Quem vive a experiencia Boss Ledger percebe a diferenca.',
        description:
          'Relatos de clientes que encontraram uma relacao bancaria mais proxima, mais clara e mais alinhada com a propria operacao.',
        testimonials: [
          {
            name: 'Roberto Alencar',
            role: 'Holding patrimonial',
            quote:
              'A estrutura de atendimento trouxe mais clareza para nossas decisoes e deixou a rotina financeira muito mais organizada.',
            rating: 5,
          },
          {
            name: 'Fernanda Araujo',
            role: 'Operacao internacional',
            quote:
              'Conseguimos acompanhar melhor a operacao e ter um relacionamento mais presente, sem a distancia comum de bancos tradicionais.',
            rating: 5,
          },
          {
            name: 'Marcelo Tavares',
            role: 'Empresa em crescimento',
            quote:
              'O suporte fez diferenca desde o inicio. A sensacao e de ter um banco que realmente entende o contexto do negocio.',
            rating: 5,
          },
          {
            name: 'Juliana Martins',
            role: 'Estrutura comercial',
            quote:
              'A experiencia ficou mais fluida, com atendimento direto e uma leitura muito mais pratica da nossa operacao financeira.',
            rating: 5,
          },
          {
            name: 'Ricardo Mello',
            role: 'Grupo empresarial',
            quote:
              'O atendimento e rapido, objetivo e sempre muito proximo. Isso trouxe mais confianca para conduzir nossa operacao com tranquilidade.',
            rating: 5,
          },
          {
            name: 'Patricia Nogueira',
            role: 'Gestao patrimonial',
            quote:
              'Passamos a ter mais visibilidade sobre a estrutura financeira e um acompanhamento que realmente ajuda nas decisoes do dia a dia.',
            rating: 5,
          },
          {
            name: 'Eduardo Sampaio',
            role: 'Operacao multissetorial',
            quote:
              'A diferenca esta na proximidade. Sempre que precisamos, existe alguem que conhece nossa realidade e responde com agilidade.',
            rating: 5,
          },
          {
            name: 'Camila Torres',
            role: 'Empresa familiar',
            quote:
              'O relacionamento ficou muito mais claro e humano. E um tipo de atendimento que transmite seguranca desde o primeiro contato.',
            rating: 5,
          },
          {
            name: 'Gustavo Farias',
            role: 'Expansao comercial',
            quote:
              'A organizacao financeira evoluiu bastante depois que passamos a contar com uma estrutura mais dedicada e proxima da nossa rotina.',
            rating: 5,
          },
          {
            name: 'Renata Barros',
            role: 'Operacao premium',
            quote:
              'Encontramos uma experiencia mais alinhada ao nosso perfil, com mais clareza, presenca e suporte real para a operacao.',
            rating: 5,
          },
        ],
      },
      {
        id: 'home-concept',
        type: 'featureSplit',
        eyebrow: 'Filme conceito',
        title: 'Uma historia sobre empresarios, ambicao e o banco que acompanha esse ritmo.',
        description:
          'Assista ao filme conceito da Boss Ledger e acompanhe uma narrativa que apresenta contexto, visao e a proposta do banco em uma experiencia cinematografica.',
        media: {
          src: 'https://player.vimeo.com/video/1174912133?badge=0&autopause=0&player_id=0&app_id=58479',
          alt: 'Boss video conceito',
          ratio: 'video',
          fallbackLabel: 'Boss Ledger',
        },
        layout: 'immersive',
        points: [
          {
            title: 'Atendimento proximo',
            description: 'Uma experiencia pensada para quem valoriza disponibilidade, clareza e acompanhamento.',
          },
          {
            title: 'Operacao simplificada',
            description: 'Recursos digitais organizados para acompanhar a rotina de clientes e negocios.',
          },
          {
            title: 'Presenca em diferentes contextos',
            description: 'Uma proposta pensada para quem atua no escritorio, na empresa, no campo e em movimento.',
          },
        ],
      },
      {
        id: 'home-cta',
        type: 'cta',
        eyebrow: 'Convite',
        title: 'Nos do BOSS LEDGER reinventamos o conceito de Banco.',
        description:
          'Faca parte dessa historia, solicite seu convite hoje mesmo.',
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
    summary: 'Pagina de produto reaproveitando o mesmo sistema visual.',
    navigationLabel: 'Conta global',
    seo: {
      title: 'Conta Global',
      description: 'Pagina preparada para crescer com CMS e narrativa premium.',
    },
    sections: [
      {
        id: 'conta-hero',
        type: 'hero',
        eyebrow: 'Conta global',
        title: 'Uma pagina de produto criada sobre a mesma fundacao da home.',
        description: 'Cada nova rota institucional pode nascer com o mesmo padrao elevado e muito menos retrabalho.',
        actions: [
          { label: 'Solicitar convite', href: '/convites' },
          { label: 'Ler blog', href: '/blog', variant: 'secondary' },
        ],
      },
      {
        id: 'conta-benefits',
        type: 'benefitsGrid',
        eyebrow: 'Escala',
        title: 'O sistema ja suporta novas paginas, beneficios e narrativas.',
        items: [
          {
            kicker: 'Conteudo',
            title: 'Headline e narrativa configuraveis',
            description: 'A pagina deixa de depender de hardcode espalhado em componentes isolados.',
          },
          {
            kicker: 'SEO',
            title: 'Metadata propria por slug',
            description: 'Cada produto pode ranquear com titulo e descricao independentes.',
          },
          {
            kicker: 'Design',
            title: 'Mesmo padrao, novas jornadas',
            description: 'Voce mantem consistencia sem transformar todas as paginas em copias da home.',
          },
        ],
      },
    ],
  },
  {
    slug: 'cartao-black',
    title: 'Cartao Black',
    summary: 'Pagina dedicada ao cartao.',
    navigationLabel: 'Cartao Black',
    seo: {
      title: 'Cartao Black',
      description: 'Pagina do cartao premium com suporte a midia cinematografica.',
    },
    sections: [
      {
        id: 'card-hero',
        type: 'hero',
        eyebrow: 'Cartao premium',
        title: 'Uma rota pronta para lancar o cartao com narrativa forte e alto contraste visual.',
        description: 'Use videos, renders, beneficios e prova social dentro do mesmo renderer de pagina.',
        actions: [{ label: 'Quero saber mais', href: '/beneficios' }],
      },
      {
        id: 'card-media',
        type: 'mediaShowcase',
        variant: 'card',
        title: 'Container preparado para o video do cartao.',
        description: 'A pagina pode receber o asset cinematografico quando ele estiver pronto.',
        media: {
          alt: 'Placeholder para animacao do cartao Boss Ledger',
          ratio: 'wide',
          fallbackLabel: 'Video do cartao',
        },
      },
    ],
  },
  {
    slug: 'para-empresas',
    title: 'Para Empresas',
    summary: 'Pagina institucional para ofertas B2B.',
    navigationLabel: 'Para empresas',
    seo: {
      title: 'Para Empresas',
      description: 'Pagina institucional B2B construida sobre o mesmo sistema de blocos.',
    },
    sections: [
      {
        id: 'empresas-hero',
        type: 'hero',
        eyebrow: 'B2B',
        title: 'A mesma base atende comunicacao para empresas e produtos corporativos.',
        description: 'Troque apenas o conteudo e mantenha o padrao visual de todo o ecossistema.',
        actions: [{ label: 'Falar com especialista', href: '/contato' }],
      },
    ],
  },
  {
    slug: 'beneficios',
    title: 'Beneficios',
    summary: 'Pagina de beneficios.',
    navigationLabel: 'Beneficios',
    seo: {
      title: 'Beneficios',
      description: 'Pagina institucional para beneficios e vantagens do ecossistema Boss Ledger.',
    },
    sections: [
      {
        id: 'benefits-hero',
        type: 'hero',
        eyebrow: 'Beneficios',
        title: 'Beneficios podem virar uma pagina propria sem retrabalho estrutural.',
        description: 'O renderer ja suporta grids, feature splits, CTA e prova social sem mudar a arquitetura.',
        actions: [{ label: 'Ler manifesto', href: '/manifesto' }],
      },
    ],
  },
  {
    slug: 'tecnologia',
    title: 'Tecnologia',
    summary: 'Pagina institucional sobre tecnologia.',
    navigationLabel: 'Tecnologia',
    seo: {
      title: 'Tecnologia',
      description: 'Explicacao institucional sobre plataforma, seguranca e experiencia digital.',
    },
    sections: [
      {
        id: 'tech-hero',
        type: 'hero',
        eyebrow: 'Tecnologia',
        title: 'Pagina pronta para explicar produto, seguranca e UX com narrativa premium.',
        actions: [{ label: 'Ver blog', href: '/blog' }],
      },
    ],
  },
  {
    slug: 'convites',
    title: 'Convites',
    summary: 'Pagina de captacao.',
    navigationLabel: 'Convites',
    seo: {
      title: 'Convites',
      description: 'Pagina de solicitacao de convite e captacao.',
    },
    sections: [
      {
        id: 'invite-hero',
        type: 'hero',
        eyebrow: 'Convite',
        title: 'Uma rota pronta para captacao, formulario e campanhas futuras.',
        description: 'A primeira versao pode comecar simples e depois receber integracoes reais sem mudar o esqueleto.',
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
    summary: 'Pagina institucional de posicionamento.',
    navigationLabel: 'Manifesto',
    seo: {
      title: 'Manifesto',
      description: 'Pagina de marca, visao e posicionamento da Boss Ledger.',
    },
    sections: [
      {
        id: 'manifesto-hero',
        type: 'hero',
        eyebrow: 'Manifesto',
        title: 'Branding, campanha e posicionamento no mesmo sistema visual.',
        description: 'Isso mantem o site inteiro coeso mesmo quando cada pagina tiver uma narrativa propria.',
        actions: [{ label: 'Conhecer tecnologia', href: '/tecnologia' }],
      },
    ],
  },
  {
    slug: 'contato',
    title: 'Contato',
    summary: 'Pagina de contato.',
    navigationLabel: 'Contato',
    seo: {
      title: 'Contato',
      description: 'Pagina de contato institucional pronta para evoluir com integracoes.',
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
    title: 'Como estruturar um site premium para um banco digital sem virar um projeto descartavel',
    excerpt: 'Separar rotas, sistema de blocos, SEO e contratos de conteudo desde o inicio evita retrabalho quando o site cresce.',
    publishedAt: '10 de marco de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap.tecnologia,
    seo: {
      title: 'Como estruturar um site premium para banco digital',
      description: 'Base arquitetural para landing, paginas institucionais e blog no mesmo projeto.',
    },
    body: [
      {
        id: 'intro',
        heading: 'Comece pela arquitetura, nao so pelo hero',
        paragraphs: [
          'Um hero bonito vende a primeira impressao, mas nao sustenta a expansao do site. Quando a operacao pede paginas de produto, campanhas e blog, a falta de estrutura aparece rapido.',
          'Separar renderer de secoes, rotas por dominio e contratos de conteudo da velocidade sem sacrificar o visual premium.',
        ],
      },
      {
        id: 'cms',
        heading: 'CMS como direcao, contratos locais como primeira etapa',
        paragraphs: [
          'Mesmo antes de plugar um CMS headless real, vale modelar Page, Post e Category no codigo. Isso reduz a mudanca futura a uma troca de fonte de dados.',
        ],
      },
    ],
  },
  {
    slug: 'porque-um-blog-ajuda-um-site-de-banco-digital',
    title: 'Por que um blog bem estruturado fortalece um site de banco digital',
    excerpt: 'Blog nao e so conteudo: e aquisicao, SEO, confianca e argumento comercial continuo.',
    publishedAt: '08 de marco de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap['private-banking'],
    seo: {
      title: 'Por que um blog ajuda um site de banco digital',
      description: 'Entenda o papel editorial e comercial de um blog para fintech e banco digital.',
    },
    body: [
      {
        id: 'blog-value',
        heading: 'Aquisicao e autoridade',
        paragraphs: [
          'Um blog permite capturar buscas de topo e meio de funil, alem de educar o visitante antes de um pedido de convite ou abertura de conta.',
          'Quando o blog compartilha layout, navegacao e identidade com o restante do site, a percepcao de marca sobe.',
        ],
      },
    ],
  },
  {
    slug: 'o-papel-do-cartao-premium-na-experiencia-da-marca',
    title: 'O papel do cartao premium na experiencia de marca',
    excerpt: 'O cartao nao e so um produto: ele pode ser a peca central do storytelling visual da home e das paginas de produto.',
    publishedAt: '05 de marco de 2026',
    author: 'Equipe Boss Ledger',
    category: categoryMap['cartoes-beneficios'],
    seo: {
      title: 'O papel do cartao premium na experiencia da marca',
      description: 'Como usar midia cinematografica e narrativa visual para destacar um cartao premium.',
    },
    body: [
      {
        id: 'card-storytelling',
        heading: 'Produto como narrativa',
        paragraphs: [
          'Quando a pagina trata o cartao como protagonista visual, ele deixa de ser so um beneficio listado em bullet points.',
          'Video, iluminacao, textura e ritmo editorial ajudam a construir percepcao premium mesmo antes do asset final 3D existir.',
        ],
      },
    ],
  },
];

export { categories as blogCategories };

