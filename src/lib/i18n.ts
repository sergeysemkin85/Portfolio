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
    certificatesTitle: 'Сертификаты и награды',
    certificatesLead: 'Обучение, которое я прохожу постоянно: AI, маркетинг, менеджмент.',
    all: 'Все',
    open: 'Открыть',
    download: 'Скачать',
    fileSoon: 'Файл скоро появится',
    close: 'Закрыть',
    companiesTitle: 'Компании, где я работал',
    companiesLead: 'От IT-интеграции до агроэкспорта: B2B, e-commerce и международные бренды.',
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
    mediaTitle: 'Публикации в СМИ',
    readArticle: 'Читать статью',
    brandsTitle: 'Бренды, которые я продвигал',
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
    certificatesTitle: 'Certificates and awards',
    certificatesLead: 'Continuous learning in AI, marketing and management.',
    all: 'All',
    open: 'Open',
    download: 'Download',
    fileSoon: 'File coming soon',
    close: 'Close',
    companiesTitle: 'Where I have worked',
    companiesLead: 'From IT integration to agricultural exports: B2B, e-commerce and international brands.',
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
    mediaTitle: 'Media coverage',
    readArticle: 'Read article',
    brandsTitle: 'Brands I have promoted',
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
  'certificates',
  'companies',
  'partners',
  'eventsInternational',
  'eventsRussia',
  'linkedin',
  'media',
  'brands',
  'tools',
  'creatives',
  'contacts',
] as const;

/** Короткое меню в шапке на широких экранах; полное — в выпадающем меню. */
export const primaryNav = ['achievements', 'certificates', 'companies', 'eventsInternational', 'media', 'brands', 'creatives'] as const;

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
