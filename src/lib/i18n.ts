export type Lang = 'ru' | 'en';
export type Localized = { ru: string; en: string };

/** Берёт нужный язык из {ru, en}; строку возвращает как есть. */
export function t(value: Localized | string | undefined, lang: Lang): string {
  if (value === undefined) return '';
  return typeof value === 'string' ? value : value[lang];
}

export const ui = {
  ru: {
    skip: 'Перейти к содержимому',
    contact: 'Связаться',
    menu: 'Меню',
    closeMenu: 'Закрыть меню',
    theme: 'Сменить тему',
    langSwitch: 'English version',
    nav: {
      about: 'Обо мне',
      achievements: 'Достижения',
      awards: 'Награды',
      certifications: 'Сертификаты',
      companies: 'Опыт',
      partners: 'Партнёры',
      eventsInternational: 'Международные ивенты',
      eventsRussia: 'Мероприятия в России',
      linkedin: 'Компании в LinkedIn',
      clients: 'Клиенты',
      media: 'СМИ',
      brands: 'Бренды',
      sites: 'Сайты',
      tools: 'Инструменты',
      creatives: 'Креативы',
      contacts: 'Контакты',
    },
    downloadResume: 'Скачать резюме',
    writeTelegram: 'Написать в Telegram',
    about: 'Обо мне',
    achievementsTitle: 'Основные достижения',
    achievementsLead: 'Девять кейсов, где маркетинг дал бизнесу измеримый результат.',
    whatDone: 'Что сделано',
    result: 'Результат',
    certificatesTitle: 'Достижения и награды',
    certsTitle: 'Подтверждённые навыки и сертификаты',
    certsLead: 'Обучение, которое я прохожу постоянно: AI, маркетинг, менеджмент.',
    certificatesLead: 'Награды и отраслевое признание, полученные компаниями и проектами, которые я развивал.',
    all: 'Все',
    open: 'Открыть',
    download: 'Скачать',
    fileSoon: 'Файл скоро появится',
    close: 'Закрыть',
    companiesTitle: 'Компании, где я работал',
    companiesLead: 'Запускаю и масштабирую бизнес в разных отраслях: IT, агроэкспорт, e-commerce, международные бренды.',
    partnersTitle: 'Партнёры',
    partnersLead: 'Партнёры и организации, с которыми я выстраивал сотрудничество',
    eventsIntTitle: 'Международные ивенты',
    eventsIntLead: 'Бизнес-миссии, выставки и форумы, которые я организовывал за рубежом и для иностранных партнёров.',
    eventsRuTitle: 'Мероприятия в России',
    eventsRuLead: 'Отраслевые выставки, форумы и премии.',
    myRole: 'Моя роль',
    viewPost: { linkedin: 'Смотреть пост в LinkedIn', telegram: 'Смотреть пост в Telegram', vk: 'Смотреть пост ВКонтакте', site: 'Подробнее на сайте' },
    openPost: 'Открыть пост',
    postSoon: 'Ссылка на пост скоро появится',
    linkedinTitle: 'Профили компаний в LinkedIn, в которых я работал',
    linkedinLead: 'В задачи входило выстраивание маркетинговой функции с нуля, создание и реализация стратегии продвижения на российском и международных рынках.',
    companyProfile: 'Профиль компании в LinkedIn',
    profileSoon: 'Ссылка скоро появится',
    liIndustry: 'Отрасль',
    liLocation: 'Штаб-квартира',
    liFollowers: 'Подписчики',
    liEmployees: 'Сотрудники',
    clientsTitle: 'Клиенты, которые были привлечены',
    clientsLead: 'Результат выстроенной воронки: от первого клика до встречи и подписанного контракта.',
    mediaTitle: 'Публикации в СМИ',
    readArticle: 'Читать статью',
    brandsTitle: 'Бренды, которые я продвигал',
    sitesTitle: 'Сайты, которые запускал и администрировал',
    sitesLead: 'Запуск сайтов B2B-лидогенерации, E-com «под ключ»: от выбора технического решения, структуры сайта, создания контента, подключения сервисов и настройки автоматизации.',
    openSite: 'Открыть сайт',
    toolsTitle: 'Инструменты',
    toolsLead: 'Сервисы и платформы, с которыми я работаю каждый день.',
    toolGroups: { ads: 'Реклама', seo: 'SEO и аналитика', crm: 'CRM и автоматизация', web: 'Сайты и дизайн', ai: 'Искусственный интеллект' },
    creativesTitle: 'Креативы',
    creativesLead: 'В разделе собраны мои работы, созданные с помощью генеративного искусственного интеллекта: видеоролики, фотографии, визуальные концепции, рекламные креативы, мерч. В работе я использую Figma, Nano Banana от Google и другие нейросетевые инструменты.',
    contactsTitle: 'Обсудим, как вырастить ваш бизнес',
    contactsLead: 'Открыт к предложениям о позиции директора по маркетингу и к проектам по стратегии маркетинга.',
    placeholder: 'Скоро',
    prev: 'Назад',
    next: 'Вперёд',
    rights: 'Сергей Семкин',
  },
  en: {
    skip: 'Skip to content',
    contact: 'Contact',
    menu: 'Menu',
    closeMenu: 'Close menu',
    theme: 'Toggle theme',
    langSwitch: 'Русская версия',
    nav: {
      about: 'About',
      achievements: 'Achievements',
      awards: 'Awards',
      certifications: 'Certificates',
      companies: 'Experience',
      partners: 'Partners',
      eventsInternational: 'International events',
      eventsRussia: 'Events in Russia',
      linkedin: 'Companies on LinkedIn',
      clients: 'Clients',
      media: 'Media',
      brands: 'Brands',
      sites: 'Websites',
      tools: 'Tools',
      creatives: 'Creatives',
      contacts: 'Contacts',
    },
    downloadResume: 'Download CV',
    writeTelegram: 'Message on Telegram',
    about: 'About me',
    achievementsTitle: 'Key achievements',
    achievementsLead: 'Nine cases where marketing delivered measurable business results.',
    whatDone: 'What I did',
    result: 'Result',
    certificatesTitle: 'Achievements and awards',
    certsTitle: 'Verified skills and certificates',
    certsLead: 'Continuous learning in AI, marketing and management.',
    certificatesLead: 'Awards and industry recognition earned by the companies and projects I helped grow.',
    all: 'All',
    open: 'Open',
    download: 'Download',
    fileSoon: 'File coming soon',
    close: 'Close',
    companiesTitle: 'Where I have worked',
    companiesLead: 'I launch and scale businesses across industries: IT, agricultural exports, e-commerce and international brands.',
    partnersTitle: 'Partners',
    partnersLead: 'Partners and organizations I have built cooperation with',
    eventsIntTitle: 'International events',
    eventsIntLead: 'Business missions, trade shows and forums I organized abroad and for international partners.',
    eventsRuTitle: 'Events in Russia',
    eventsRuLead: 'Industry trade shows, forums and awards.',
    myRole: 'My role',
    viewPost: { linkedin: 'View post on LinkedIn', telegram: 'View post on Telegram', vk: 'View post on VK', site: 'Read more' },
    openPost: 'Open post',
    postSoon: 'Post link coming soon',
    linkedinTitle: 'LinkedIn profiles of companies I worked for',
    linkedinLead: 'My remit included building the marketing function from scratch and developing and executing go-to-market strategies for Russian and international markets.',
    companyProfile: 'Company profile on LinkedIn',
    profileSoon: 'Link coming soon',
    liIndustry: 'Industry',
    liLocation: 'Headquarters',
    liFollowers: 'Followers',
    liEmployees: 'Employees',
    clientsTitle: 'Clients I helped bring in',
    clientsLead: 'The result of the funnel I built: from the first click to a meeting and a signed contract.',
    mediaTitle: 'Media coverage',
    readArticle: 'Read article',
    brandsTitle: 'Brands I have promoted',
    sitesTitle: 'Websites I launched and managed',
    sitesLead: 'Turnkey B2B lead generation and e-commerce websites: from choosing the tech stack and site structure to content creation, service integrations and automation setup.',
    openSite: 'Visit website',
    toolsTitle: 'Tools',
    toolsLead: 'Services and platforms I use every day.',
    toolGroups: { ads: 'Advertising', seo: 'SEO and analytics', crm: 'CRM and automation', web: 'Websites and design', ai: 'Artificial intelligence' },
    creativesTitle: 'Creatives',
    creativesLead: 'A selection of my work created with generative AI: videos, photos, visual concepts, ad creatives and merch. I use Figma, Google’s Nano Banana and other neural network tools.',
    contactsTitle: 'Let’s talk about growing your business',
    contactsLead: 'Open to CMO roles and marketing strategy projects.',
    placeholder: 'Soon',
    prev: 'Previous',
    next: 'Next',
    rights: 'Sergey Semkin',
  },
} as const;

export type UI = (typeof ui)['ru'] | (typeof ui)['en'];

export const sectionIds = [
  'about',
  'achievements',
  'companies',
  'linkedin',
  'clients',
  'awards',
  'partners',
  'eventsInternational',
  'eventsRussia',
  'media',
  'certifications',
  'brands',
  'sites',
  'tools',
  'creatives',
  'contacts',
] as const;

/** Короткое меню в шапке на широких экранах; полное — в выпадающем меню. */
export const primaryNav = ['achievements', 'companies', 'certifications', 'eventsInternational', 'media', 'brands', 'creatives'] as const;

export function formatDate(value: string, lang: Lang): string {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  const locale = lang === 'ru' ? 'ru-RU' : 'en-GB';
  if (y && m && d) return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  if (y && m) return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return String(y);
}

export function formatNumber(n: number, lang: Lang): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'ru' ? ' ' : ',');
}

/** Срок работы по строке вида «2018–2024»: «6 лет» / «6 years». */
export function yearsSpan(years: string, lang: Lang): string {
  const [start, end] = years.split(/[–—-]/).map((s) => parseInt(s, 10));
  const n = Math.max(1, (end || new Date().getFullYear()) - start);
  if (lang === 'en') return `${n} ${n === 1 ? 'year' : 'years'}`;
  const m10 = n % 10;
  const m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? 'год' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'года' : 'лет';
  return `${n} ${word}`;
}

/** Нумерованные разделы (без «Обо мне» и «Контактов»): номер и фон считаются по порядку в sectionIds. */
type SectionId = (typeof sectionIds)[number];
const numbered: readonly SectionId[] = sectionIds.filter((id) => id !== 'about' && id !== 'contacts');
export const sectionNo = (id: SectionId) => String(numbered.indexOf(id) + 1).padStart(2, '0');
export const contactsNo = String(numbered.length + 1).padStart(2, '0');
/** Чередование фона: нечётные разделы серые, чётные белые */
export const sectionBg = (id: SectionId) => (numbered.indexOf(id) % 2 === 0 ? 'bg-surface-2/60' : '');
