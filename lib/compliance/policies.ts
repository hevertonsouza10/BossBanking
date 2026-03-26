import { readdir, readFile } from 'fs/promises';
import path from 'path';

export type PolicyEntry = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  fileName: string;
};

export const compliancePolicies: PolicyEntry[] = [
  {
    slug: 'privacidade-e-protecao-de-dados',
    title: 'Privacidade e proteção de dados',
    shortTitle: 'Privacidade e proteção de dados',
    description:
      'Diretrizes sobre tratamento de dados pessoais, privacidade, consentimento e proteção das informações.',
    fileName: 'PrivacidadeeDados',
  },
  {
    slug: 'seguranca-cibernetica',
    title: 'Segurança cibernética',
    shortTitle: 'Segurança cibernética',
    description:
      'Práticas e responsabilidades relacionadas à segurança da informação, prevenção a riscos e governança cibernética.',
    fileName: 'Seguranca Cibernetica',
  },
  {
    slug: 'nossas-politicas',
    title: 'Nossas políticas',
    shortTitle: 'Nossas políticas',
    description:
      'Documento institucional com termos de uso, privacidade, proteção de dados e diretrizes gerais de relacionamento.',
    fileName: 'Nossas Politicas',
  },
  {
    slug: 'politica-anticorrupcao',
    title: 'Política anticorrupção',
    shortTitle: 'Política anticorrupção',
    description:
      'Normas de conduta, prevenção a ilícitos e diretrizes anticorrupção aplicáveis às operações e aos relacionamentos.',
    fileName: 'Politica Anticorrupcao',
  },
];

function normalizeFileToken(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function resolvePoliciesDirectory() {
  const libDir = path.join(process.cwd(), 'lib');
  const entries = await readdir(libDir, { withFileTypes: true });
  const matchedDirectory = entries.find(
    (entry) => entry.isDirectory() && normalizeFileToken(entry.name) === 'politicas',
  );

  if (!matchedDirectory) {
    return null;
  }

  return path.join(libDir, matchedDirectory.name);
}

async function resolvePolicyFilePath(fileName: string) {
  const policiesDirectory = await resolvePoliciesDirectory();

  if (!policiesDirectory) {
    return null;
  }

  const entries = await readdir(policiesDirectory, { withFileTypes: true });
  const target = normalizeFileToken(fileName);
  const matchedFile = entries.find(
    (entry) => entry.isFile() && normalizeFileToken(entry.name) === target,
  );

  if (!matchedFile) {
    return null;
  }

  return path.join(policiesDirectory, matchedFile.name);
}

export function getAllComplianceSlugs() {
  return compliancePolicies.map((policy) => policy.slug);
}

export function getCompliancePolicyBySlug(slug: string) {
  return compliancePolicies.find((policy) => policy.slug === slug) ?? null;
}

export async function getCompliancePolicyContent(slug: string) {
  const policy = getCompliancePolicyBySlug(slug);

  if (!policy) {
    return null;
  }

  const filePath = await resolvePolicyFilePath(policy.fileName);

  if (!filePath) {
    return null;
  }

  const rawContent = await readFile(filePath, 'utf8');
  const normalizedContent = rawContent
    .replace(/\u200b/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    ...policy,
    content: normalizedContent,
    paragraphs: normalizedContent.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
  };
}
