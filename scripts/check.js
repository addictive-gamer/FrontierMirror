#!/usr/bin/env node
/**
 * check.js — Chequeo pre-deploy de FrontierMirror
 *
 * - Verifica que index.html exista y tenga contenido mínimo esperado.
 * - Extrae todos los <script> inline y valida su sintaxis con `node --check`.
 * - Verifica que todo id="..." referenciado por getElementById(...) exista
 *   realmente en el HTML (evita típicos errores de "null.addEventListener").
 * - Verifica que manifest.json sea JSON válido.
 *
 * Si algo falla, termina con exit code 1 y el workflow de deploy se detiene.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');

let errors = 0;
const fail = (msg) => { console.error(`✗ ${msg}`); errors++; };
const ok = (msg) => console.log(`✓ ${msg}`);

if (!fs.existsSync(INDEX)) {
  fail('No se encontró index.html en la raíz del repo.');
  process.exit(1);
}

const html = fs.readFileSync(INDEX, 'utf-8');

if (html.length < 1000) {
  fail('index.html parece sospechosamente chico (¿se rompió el archivo?).');
}

// --- 1. Extraer y validar sintaxis JS ---
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(m => m[1])
  .filter(s => s.trim().length > 0);

if (scripts.length === 0) {
  fail('No se encontró ningún bloque <script> con código.');
} else {
  const combined = scripts.join('\n;\n');
  const tmpFile = path.join(os.tmpdir(), `fm-check-${Date.now()}.js`);
  fs.writeFileSync(tmpFile, combined);
  try {
    execFileSync(process.execPath, ['--check', tmpFile], { stdio: 'pipe' });
    ok(`Sintaxis JS válida (${scripts.length} bloque(s) <script>, ${combined.split('\n').length} líneas).`);
  } catch (err) {
    fail(`Error de sintaxis en el JS inline:\n${err.stderr?.toString() || err.message}`);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

// --- 2. IDs referenciados vs IDs definidos ---
const idsDefined = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
const idsUsed = new Set([
  ...[...html.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]),
]);
const missingIds = [...idsUsed].filter(id => !idsDefined.has(id));
if (missingIds.length > 0) {
  fail(`getElementById() referencia IDs que no existen en el HTML: ${missingIds.join(', ')}`);
} else {
  ok(`Todos los IDs usados en getElementById() existen (${idsUsed.size} referencias).`);
}

// --- 3. Funciones usadas en on* pero no definidas ---
const funcsDefined = new Set([...html.matchAll(/function\s+(\w+)\s*\(/g)].map(m => m[1]));
const onAttrs = [...html.matchAll(/\son(?:click|change|input|keydown|keyup|submit|load)=["']([^"']+)["']/g)]
  .map(m => m[1]);
const knownGlobals = new Set([
  'if', 'else', 'event', 'this', 'Math', 'encodeURIComponent', 'decodeURIComponent',
  'getElementById', 'preventDefault', 'stopPropagation', 'parseFloat', 'parseInt',
  'toFixed', 'JSON', 'console', 'window', 'document', 'click', 'focus', 'blur',
]);
const calledFuncs = new Set();
onAttrs.forEach(attr => {
  [...attr.matchAll(/([A-Za-z_$][\w$]*)\s*\(/g)].forEach(m => calledFuncs.add(m[1]));
});
const missingFuncs = [...calledFuncs].filter(f => !funcsDefined.has(f) && !knownGlobals.has(f));
if (missingFuncs.length > 0) {
  fail(`Atributos on*="" llaman funciones no definidas: ${missingFuncs.join(', ')}`);
} else {
  ok(`Todas las funciones usadas en atributos on*="" están definidas.`);
}

// --- 4. manifest.json válido ---
const manifestPath = path.join(ROOT, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    ok('manifest.json es JSON válido.');
  } catch (err) {
    fail(`manifest.json tiene JSON inválido: ${err.message}`);
  }
} else {
  fail('No se encontró manifest.json.');
}

// --- Resultado final ---
console.log('');
if (errors > 0) {
  console.error(`✗ Chequeo falló con ${errors} error(es). Deploy cancelado.`);
  process.exit(1);
} else {
  console.log('✓ Todos los chequeos pasaron. Listo para build + deploy.');
}
