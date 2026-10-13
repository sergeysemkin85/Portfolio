// Делает превью первой страницы для всех PDF в public/certificates/.
// Результат: public/certificates/previews/<имя>.webp
// Запуск: npm run previews            (только новые PDF)
//         npm run previews -- --force (пересоздать все)
//         node scripts/generate-pdf-previews.mjs <папка-с-pdf> <папка-для-превью>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const pdfjs = await import(pathToFileURL(require.resolve('pdfjs-dist/legacy/build/pdf.mjs')).href);
const pdfjsRoot = path.dirname(require.resolve('pdfjs-dist/package.json'));
const standardFontDataUrl = path.join(pdfjsRoot, 'standard_fonts') + path.sep;
const cMapUrl = path.join(pdfjsRoot, 'cmaps') + path.sep;

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const force = process.argv.includes('--force');
const srcDir = path.resolve(args[0] ?? 'public/certificates');
const outDir = path.resolve(args[1] ?? path.join(srcDir, 'previews'));
const WIDTH = 800;

fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith('.pdf'));
if (!files.length) console.log(`В ${srcDir} нет PDF-файлов.`);

let made = 0;
for (const file of files) {
  const out = path.join(outDir, file.replace(/\.pdf$/i, '.webp'));
  if (!force && fs.existsSync(out)) continue;
  try {
    const data = new Uint8Array(fs.readFileSync(path.join(srcDir, file)));
    const doc = await pdfjs.getDocument({ data, standardFontDataUrl, cMapUrl, cMapPacked: true, verbosity: 0 }).promise;
    const page = await doc.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: WIDTH / base.width });
    const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    await sharp(await canvas.encode('png')).webp({ quality: 82 }).toFile(out);
    made++;
    console.log(`✓ ${file} → ${path.relative(process.cwd(), out)}`);
  } catch (e) {
    console.warn(`✗ ${file}: ${e.message}`);
  }
}
console.log(`Готово: создано превью ${made} из ${files.length}.`);
