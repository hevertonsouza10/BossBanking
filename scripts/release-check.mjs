import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const buildDirCandidates = ['.next-build', '.next'];
const requiredRoutes = [
  '/',
  '/operacoes-estruturadas',
  '/consultoria-financeira',
  '/consultoria-boss',
  '/compliance',
  '/conheca-nossa-fintech',
  '/blog',
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const buildDir = buildDirCandidates.find((dir) => fs.existsSync(path.join(rootDir, dir)));

if (!buildDir) {
  console.error('No Next.js build output found. Run "npm run build" first.');
  process.exit(1);
}

const prerenderManifestPath = path.join(rootDir, buildDir, 'prerender-manifest.json');
const routesManifestPath = path.join(rootDir, buildDir, 'routes-manifest.json');

if (!fs.existsSync(prerenderManifestPath) || !fs.existsSync(routesManifestPath)) {
  console.error(`Build output in "${buildDir}" is incomplete.`);
  process.exit(1);
}

const prerenderManifest = readJson(prerenderManifestPath);
const routesManifest = readJson(routesManifestPath);
const prerenderedRoutes = new Set([
  ...Object.keys(prerenderManifest.routes ?? {}),
  ...Object.keys(prerenderManifest.dynamicRoutes ?? {}),
]);

const missingRoutes = requiredRoutes.filter((route) => !prerenderedRoutes.has(route));

if (missingRoutes.length > 0) {
  console.error('Missing expected prerendered routes:');
  for (const route of missingRoutes) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

const hasStaticDataRoute = Array.isArray(routesManifest.dataRoutes);

if (!hasStaticDataRoute) {
  console.error('Routes manifest does not have the expected structure.');
  process.exit(1);
}

console.log(`Release check passed using "${buildDir}".`);
console.log(`Validated routes: ${requiredRoutes.join(', ')}`);
