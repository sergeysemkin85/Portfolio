// Делает PDF-версию сайта из собранной папки dist/ (запускать после npm run build).
// Результат: dist/portfolio-semkin-ru.pdf и dist/portfolio-semkin-en.pdf
// Запуск: npm run pdf
// Нужен браузер Chromium: в GitHub Actions ставится командой `npx playwright-core install chromium`,
// на компьютере используется установленный Microsoft Edge или Chrome.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const dist = path.resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const port = 4399;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };

// Простой статический сервер с учётом BASE_PATH
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (base && url.startsWith(base)) url = url.slice(base.length) || '/';
  let file = path.join(dist, url);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  // Chromium кладёт WebP/PNG в PDF без сжатия (десятки мегабайт), поэтому крупные картинки
  // отдаём ему в JPEG — они встраиваются компактно. Мелкие логотипы остаются как есть.
  if (/\.(webp|png)$/i.test(file) && fs.statSync(file).size > 8_000) {
    sharp(file).flatten({ background: '#ffffff' }).jpeg({ quality: 72, mozjpeg: true }).toBuffer()
      .then((buf) => { res.writeHead(200, { 'Content-Type': 'image/jpeg' }); res.end(buf); })
      .catch(() => { res.writeHead(500); res.end(); });
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(port, r));

async function launch() {
  for (const opts of [{}, { channel: 'msedge' }, { channel: 'chrome' }]) {
    try { return await chromium.launch(opts); } catch {}
  }
  throw new Error('Не найден браузер: установите Chromium командой `npx playwright-core install chromium`');
}

const browser = await launch();
for (const [lang, route] of [['ru', '/'], ['en', '/en/']]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  // Тема светлая, язык страницы фиксирован (без перенаправления по сохранённому выбору)
  await ctx.addInitScript((l) => { try { localStorage.setItem('theme', 'light'); localStorage.setItem('lang', l); } catch {} }, lang);
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${port}${base}${route}`, { waitUntil: 'networkidle', timeout: 120000 });
  // Подгружаем ленивые картинки и показываем все анимированные блоки
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
    // Для PDF берём самую маленькую подходящую версию картинки, чтобы файл был лёгким
    document.querySelectorAll('img[srcset]').forEach((img) => {
      const need = Math.max(img.getBoundingClientRect().width, 120) * 1.3;
      const cands = img.srcset.split(',').map((s) => s.trim().split(/\s+/)).map(([u, w]) => [u, parseInt(w)]).filter(([, w]) => w).sort((a, b) => a[1] - b[1]);
      const pick = cands.find(([, w]) => w >= need) || cands[cands.length - 1];
      if (pick) { img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.src = pick[0]; }
    });
    document.querySelectorAll('[data-count]').forEach((e) => (e.textContent = e.textContent));
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  const out = path.join(dist, `portfolio-semkin-${lang}.pdf`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, scale: 0.62, margin: { top: '8mm', bottom: '8mm', left: '6mm', right: '6mm' } });
  console.log(`✓ ${path.relative(process.cwd(), out)} (${(fs.statSync(out).size / 1024 / 1024).toFixed(1)} МБ)`);
  await ctx.close();
}
await browser.close();
server.close();
