// Собирает превью публикаций в СМИ по списку src/data/media-sources.json.
// Для каждой ссылки вытаскивает og:title, og:image, og:description и дату,
// сохраняет картинку в src/assets/images/media/ и пишет результат в src/data/media.json.
// Запуск вручную: npm run fetch-og            (новые ссылки и те, что не удалось скачать)
//                 npm run fetch-og -- --force (обновить все)
// Поля, заполненные в media-sources.json вручную (title, description, date, image), имеют приоритет.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCES = path.join(ROOT, 'src/data/media-sources.json');
const OUT = path.join(ROOT, 'src/data/media.json');
const IMG_DIR = path.join(ROOT, 'src/assets/images/media');
const force = process.argv.includes('--force');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const byId = new Map(existing.map((e) => [e.id, e]));
fs.mkdirSync(IMG_DIR, { recursive: true });

const decode = (s = '') =>
  s.replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, '&').trim();

function meta(html, keys) {
  for (const key of keys) {
    const val = `(?:"([^"]*)"|'([^']*)')`;
    const re1 = new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${key}["'][^>]*?content=${val}`, 'i');
    const re2 = new RegExp(`<meta[^>]+content=${val}[^>]*(?:property|name|itemprop)=["']${key}["']`, 'i');
    const m = html.match(re1) || html.match(re2);
    const v = m && (m[1] ?? m[2]);
    if (v && v.trim()) return decode(v);
  }
  return '';
}

async function fetchText(url, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'ru,en;q=0.8' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    if (attempt >= 3 || /HTTP 4/.test(e.message)) throw new Error(e.cause?.code || e.cause?.message || e.message);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
    return fetchText(url, attempt + 1);
  }
}

async function saveImage(url, id) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`картинка: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const file = `${id}.webp`;
  await sharp(buf).resize(1200, 800, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(IMG_DIR, file));
  return `media/${file}`;
}

const result = [];
for (const src of sources) {
  const prev = byId.get(src.id);
  if (prev?.title && !force) { result.push({ ...prev, ...pick(src) }); continue; }
  const entry = { id: src.id, url: src.url, outlet: src.outlet, outletLogo: src.outletLogo ?? '', title: '', description: '', date: '', image: '' };
  try {
    const html = await fetchText(src.url);
    entry.title = meta(html, ['og:title', 'twitter:title']) || decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '');
    entry.description = meta(html, ['og:description', 'description', 'twitter:description']);
    const published = meta(html, ['article:published_time', 'datePublished', 'pubdate', 'date']) || html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] || '';
    entry.date = normalizeDate(published) || normalizeDate(src.url.match(/\/(20\d{6})\//)?.[1] ?? '');
    const img = meta(html, ['og:image', 'og:image:url', 'twitter:image']);
    if (img) {
      try { entry.image = await saveImage(new URL(img, src.url).href, src.id); }
      catch (e) { console.warn(`  ${src.id}: не удалось сохранить картинку (${e.message})`); }
    }
    console.log(`✓ ${src.id}: ${entry.title.slice(0, 70)}`);
  } catch (e) {
    console.warn(`✗ ${src.id}: ${e.message} — будет показана заглушка`);
  }
  result.push({ ...entry, ...pick(src) });
}

function normalizeDate(s) {
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : '';
}

function pick(src) {
  const o = {};
  for (const k of ['title', 'description', 'date', 'image', 'outlet', 'outletLogo', 'url']) if (src[k]) o[k] = src[k];
  return o;
}

fs.writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n');
console.log(`Записано ${result.length} публикаций в ${path.relative(ROOT, OUT)}`);
