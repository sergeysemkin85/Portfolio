// Общие данные страницы (Hero, «Обо мне», контакты, SEO) из src/data/site.json.
// Проверяются при сборке так же, как остальные JSON.
import { z } from 'astro/zod';
import raw from '../data/site.json';

const L = z.object({ ru: z.string().min(1), en: z.string().min(1) });
const L0 = z.object({ ru: z.string(), en: z.string() });

const schema = z.object({
  name: L,
  position: L,
  subtitle: L,
  location: L,
  photo: z.string(),
  resume: z.string(),
  stats: z
    .array(z.object({ count: z.number(), prefix: z.string(), suffix: L0, label: L }))
    .length(4, 'В Hero должно быть ровно 4 ключевые цифры'),
  about: z.object({ ru: z.array(z.string()), en: z.array(z.string()) }),
  languages: L,
  mediaStat: L,
  contacts: z.object({
    email: z.string().email(),
    telegram: z.string(),
    telegramUrl: z.string().url(),
    linkedin: z.string().url(),
    setka: z.string().url(),
  }),
  seo: z.object({ title: L, alumniOf: z.string() }),
});

const parsed = schema.safeParse(raw);
if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  • ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(`Ошибка в src/data/site.json:\n${issues}`);
}
export const site = parsed.data;
