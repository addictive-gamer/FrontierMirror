#!/usr/bin/env node
/**
 * build.js — Build de FrontierMirror
 *
 * Minifica index.html (HTML + <style> + <script> inline, todo junto en el
 * mismo archivo — sigue siendo un solo .html, sin build step para vos al
 * editar) y copia el resto de los assets estáticos a dist/, que es lo que
 * termina publicado en GitHub Pages.
 */
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const STATIC_FILES = ['manifest.json', 'icon-192.svg', 'icon-512.svg'];

async function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const rawHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
  const sizeBefore = Buffer.byteLength(rawHtml, 'utf-8');

  const minified = await minify(rawHtml, {
    collapseWhitespace: true,
    conservativeCollapse: true, // no pegar palabras entre sí
    removeComments: true,
    removeRedundantAttributes: false, // no tocar atributos, hay muchos on*="" a propósito
    minifyCSS: true,
    minifyJS: {
      // conservador: mantiene nombres de función (los usan los onclick="" del HTML)
      mangle: false,
      compress: { drop_console: false },
    },
    caseSensitive: true,
    keepClosingSlash: true,
  });

  fs.writeFileSync(path.join(DIST, 'index.html'), minified);
  const sizeAfter = Buffer.byteLength(minified, 'utf-8');
  const pct = (100 - (sizeAfter / sizeBefore) * 100).toFixed(1);
  console.log(`✓ index.html minificado: ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB (-${pct}%)`);

  for (const file of STATIC_FILES) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST, file));
      console.log(`✓ Copiado ${file}`);
    } else {
      console.warn(`⚠ ${file} no encontrado, se omite`);
    }
  }

  console.log('\n✓ Build listo en dist/');
}

main().catch(err => {
  console.error('✗ Build falló:', err);
  process.exit(1);
});
