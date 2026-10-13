// Схемы данных сайта. Каждый JSON из src/data проверяется при сборке:
// если поле пропущено или заполнено неверно, `npm run build` остановится
// и покажет, в каком файле и в какой записи ошибка.
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/** Текст на двух языках: { "ru": "...", "en": "..." } */
export const L = z.object({ ru: z.string().min(1), en: z.string().min(1) });
/** Текст на двух языках или одной строкой (выводится как есть на обеих версиях) */
const LorS = z.union([L, z.string()]);
/** Путь к картинке внутри src/assets/images (например, "logos/partners/rec.webp") или пустая строка */
const img = z.string().regex(/^$|^[\w\-./]+\.(png|jpe?g|webp|avif|svg)$/i, 'Путь к картинке должен быть вида "папка/файл.webp" внутри src/assets/images');
const url = z.union([z.literal(''), z.string().url('Ссылка должна начинаться с https://')]);
const date = z.string().regex(/^$|^\d{4}(-\d{2}(-\d{2})?)?$/, 'Дата в формате ГГГГ, ГГГГ-ММ или ГГГГ-ММ-ДД');

const achievements = defineCollection({
  loader: file('src/data/achievements.json'),
  schema: z.object({
    /** {n} в заголовке заменяется анимированным числом из count */
    title: L,
    count: z.number().optional(),
    animate: z.boolean().default(true),
    company: L,
    done: z.object({ ru: z.array(z.string()).min(1).max(3), en: z.array(z.string()).min(1).max(3) }),
    result: L,
  }),
});

const certificates = defineCollection({
  loader: file('src/data/certificates.json'),
  schema: z.object({
    title: L,
    org: L,
    year: z.number().int().min(1990).max(2100),
    category: z.enum(['AI', 'Marketing', 'Management', 'Education', 'Language']),
    /** Путь к файлу в public. По умолчанию /certificates/<id>.pdf */
    file: z.string().optional(),
  }),
});

const awards = defineCollection({
  loader: file('src/data/awards.json'),
  schema: z.object({ title: L, company: L, year: z.number().optional(), image: img.optional() }),
});

const companies = defineCollection({
  loader: file('src/data/companies.json'),
  schema: z.object({
    name: L,
    logo: img,
    years: z.string(),
    role: L,
    realTitle: L,
    industry: L,
    /** Страна работы, выводится в таймлайне карьеры */
    country: L,
    /** Срок работы. Если не задан, считается по годам из поля years */
    duration: L.optional(),
    highlight: L,
    linkedinUrl: url,
    /** Данные со страницы компании в LinkedIn (обновляются вручную) */
    linkedin: z
      .object({
        headline: L,
        industry: L,
        location: L,
        followers: z.number().int().nonnegative(),
        employees: z.string(),
      })
      .optional(),
  }),
});

const partners = defineCollection({
  loader: file('src/data/partners.json'),
  schema: z.object({ name: L, logo: img, url, placeholder: z.boolean().default(false) }),
});

const event = z.object({
  title: LorS,
  location: LorS,
  date,
  role: LorS,
  description: LorS,
  image: img,
  url,
  embedUrl: url,
  source: z.enum(['linkedin', 'telegram', 'vk', 'site']),
  placeholder: z.boolean().default(false),
});
const eventsInternational = defineCollection({ loader: file('src/data/events-international.json'), schema: event });
const eventsRussia = defineCollection({ loader: file('src/data/events-russia.json'), schema: event });

const media = defineCollection({
  loader: file('src/data/media.json'),
  schema: z.object({
    url: z.string().url(),
    outlet: z.string(),
    outletLogo: img,
    title: z.string(),
    description: z.string(),
    date,
    image: img,
  }),
});

const brands = defineCollection({
  loader: file('src/data/brands.json'),
  schema: z.object({ name: z.string(), logo: img, category: L, done: L, metric: L }),
});

const tools = defineCollection({
  loader: file('src/data/tools.json'),
  schema: z.object({ name: z.string(), logo: img, group: z.enum(['ads', 'seo', 'crm', 'web', 'ai']) }),
});

const sites = defineCollection({
  loader: file('src/data/sites.json'),
  schema: z.object({
    name: z.string(),
    url,
    company: L,
    tags: z.object({ ru: z.array(z.string()), en: z.array(z.string()) }),
    description: L,
    result: L.optional(),
    image: img,
  }),
});

const creatives = defineCollection({
  loader: file('src/data/creatives.json'),
  schema: z.object({ title: L, image: img.refine((s) => s.length > 0, 'Для креатива нужна картинка'), file: z.string().optional() }),
});

export const collections = {
  achievements,
  certificates,
  awards,
  companies,
  partners,
  eventsInternational,
  eventsRussia,
  media,
  brands,
  sites,
  tools,
  creatives,
};
