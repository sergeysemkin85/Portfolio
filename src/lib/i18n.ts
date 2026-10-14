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
      certificates: 'Сертификаты',
      companies: 'Опыт',
      partners: 'Партнёры',
      eventsInternational: 'Международные ивенты',
      eventsRussia: 'Мероприятия в России',
      linkedin: 'Компании в LinkedIn',
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
    linkedinTitle: 'Компании в LinkedIn',
    linkedinLead: 'Профили компаний, в которых я отвечал за маркетинг.',
    companyProfile: 'Профиль компании в LinkedIn',
    profileSoon: 'Ссылка скоро появится',
    liIndustry: 'Отрасль',
    liLocation: 'Штаб-квартира',
    liFollowers: 'Подписчики',
    liEmployees: 'Сотрудники',
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
    creativesLead: 'Визуалы, рекламные материалы, полиграфия и мерч, созданные под моим руководством.',
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
      certificates: 'Certificates',
      companies: 'Experience',
      partners: 'Partners',
      eventsInternational: 'International events',
      eventsRussia: 'Events in Russia',
      linkedin: 'Companies on LinkedIn',
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
    linkedinTitle: 'Companies on LinkedIn',
    linkedinLead: 'Company profiles where I led marketing.',
    companyProfile: 'Company profile on LinkedIn',
    profileSoon: 'Link coming soon',
    liIndustry: 'Industry',
    liLocation: 'Headquarters',
    liFollowers: 'Followers',
    liEmployees: 'Employees',
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
    creativesLead: 'Visuals, ads, print and merch produced under my lead.',
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
  'certificates',
  'partners',
  'eventsInternational',
  'eventsRussia',
  'linkedin',
  'media',
  'brands',
  'sites',
  'tools',
  'creatives',
  'contacts',
] as const;

/** Короткое меню в шапке на широких экранах; полное — в выпадающем меню. */
export const primaryNav = ['achievements', 'companies', 'certificates', 'eventsInternational', 'media', 'brands', 'creatives'] as const;

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
