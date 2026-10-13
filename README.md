# Сайт-портфолио Сергея Семкина

Одностраничный двуязычный сайт (RU / EN) на **Astro + TypeScript + Tailwind CSS**.
Сайт статический: нет сервера и базы данных, весь контент лежит в JSON-файлах в `src/data/`.
Чтобы обновить сайт, достаточно поправить JSON и пересобрать проект.

## Быстрый старт

Нужен Node.js 20 или новее.

```bash
npm install        # один раз, установка зависимостей
npm run dev        # локальный сервер с автообновлением: http://localhost:4321
npm run build      # проверка данных и типов + сборка в папку dist/
npm run preview    # просмотр собранной версии
```

Если в JSON есть ошибка (пропущено поле, неверная дата, нет картинки), `npm run build`
остановится и напишет, в каком файле и в какой записи проблема.

## Где что лежит

| Что | Где |
| --- | --- |
| Hero, «Обо мне», контакты, SEO-заголовок | `src/data/site.json` |
| 9 достижений | `src/data/achievements.json` |
| Сертификаты / награды | `src/data/certificates.json`, `src/data/awards.json` |
| Компании (логотипы, таймлайн, карусель LinkedIn) | `src/data/companies.json` |
| Партнёры (бегущая лента) | `src/data/partners.json` |
| Международные ивенты / мероприятия в России | `src/data/events-international.json`, `src/data/events-russia.json` |
| Публикации в СМИ | `src/data/media-sources.json` → скрипт → `src/data/media.json` |
| Бренды | `src/data/brands.json` |
| Инструменты | `src/data/tools.json` |
| Креативы | `src/data/creatives.json` |
| Картинки (логотипы, обложки, фото) | `src/assets/images/...` |
| PDF сертификатов | `public/certificates/` |
| Резюме | `public/resume-semkin.pdf` |
| Подписи кнопок и заголовков секций | `src/lib/i18n.ts` |

**Картинки** кладите в `src/assets/images/` (а не в `public/`): при сборке Astro сам сожмёт их в WebP,
подберёт размеры под экран и включит ленивую загрузку. В JSON путь пишется от этой папки,
например `"logo": "logos/partners/rec.webp"`. Пустая строка `""` означает «картинки пока нет»:
на сайте появится аккуратная заглушка.

**Тексты** на двух языках пишутся так: `{ "ru": "Текст", "en": "Text" }`.
Для мероприятий можно писать просто строку: она выводится одинаково на обеих версиях.

## Как добавить…

### Сертификат

1. Положите PDF в `public/certificates/`, имя файла = id сертификата: `public/certificates/mini-mba.pdf`.
2. Добавьте или проверьте запись в `src/data/certificates.json`:
   ```json
   {
     "id": "mini-mba",
     "title": { "ru": "MINI MBA Professional", "en": "MINI MBA Professional" },
     "org": { "ru": "Universal Business School, Edinburgh", "en": "Universal Business School, Edinburgh" },
     "year": 2022,
     "category": "Management"
   }
   ```
   `category`: `AI`, `Marketing`, `Management`, `Education` или `Language`.
   Если сертификат не PDF, а картинка, укажите путь: `"file": "/certificates/mini-mba.jpg"`.
3. Сделайте превью первой страницы: `npm run previews`.
4. Пока файла нет, карточка показывает «Файл скоро появится».

### Ивент (международный или в России)

Добавьте объект в `src/data/events-international.json` или `src/data/events-russia.json`,
обложку положите в `src/assets/images/events/`:

```json
{
  "id": "pivo-sochi",
  "title": { "ru": "Выставка «Пиво.Сочи»", "en": "Pivo.Sochi trade show" },
  "location": { "ru": "Сочи, Россия", "en": "Sochi, Russia" },
  "date": "2026-03",
  "role": { "ru": "Организация участия компании", "en": "Company participation lead" },
  "description": { "ru": "...", "en": "..." },
  "image": "events/pivo-sochi.jpg",
  "url": "https://t.me/...",
  "embedUrl": "",
  "source": "telegram"
}
```

- `date`: `ГГГГ`, `ГГГГ-ММ` или `ГГГГ-ММ-ДД`, можно оставить пустым.
- `source`: `linkedin`, `telegram`, `vk` или `site`, от него зависят иконка и подпись кнопки.
- `url`: ссылка на пост, открывается в новой вкладке.
- `embedUrl` (необязательно): ссылка для встраивания поста LinkedIn
  (в LinkedIn: «…» у поста → «Встроить пост» → скопировать адрес из `src="…"`).
  Тогда появится кнопка «Открыть пост», и пост откроется в окне на сайте.
- `"placeholder": true` показывает метку «Скоро». Уберите её, когда заполните карточку.

### Публикацию в СМИ

1. Добавьте ссылку в `src/data/media-sources.json`:
   ```json
   { "id": "rbc-2026", "url": "https://www.rbc.ru/...", "outlet": "РБК", "outletLogo": "logos/media/rbc.webp" }
   ```
2. Запустите `npm run fetch-og`. Скрипт откроет страницу, возьмёт заголовок, анонс, дату и картинку
   (картинка сохранится в `src/assets/images/media/`) и запишет всё в `src/data/media.json`.
3. Если сайт издания не отдал данные, на карточке будет логотип издания. Заголовок можно
   вписать вручную полем `"title"` в `media-sources.json` (ручные поля важнее скачанных).
4. `npm run fetch-og -- --force` перекачает данные по всем ссылкам.

### Бренд

Добавьте объект в `src/data/brands.json`, логотип положите в `src/assets/images/logos/brands/`:

```json
{
  "id": "malt-ru",
  "name": "malt.ru",
  "logo": "logos/brands/malt-ru.png",
  "category": { "ru": "E-commerce, товары для пивоварения", "en": "E-commerce, brewing supplies" },
  "done": { "ru": "Перезапуск магазина, SEO, автоматизация Mindbox", "en": "Store relaunch, SEO, Mindbox automation" },
  "metric": { "ru": "Выручка ×3", "en": "Revenue ×3" }
}
```

### Ссылки на LinkedIn компаний

В `src/data/companies.json` заполните `"linkedinUrl": "https://www.linkedin.com/company/..."`.

## Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run previews` | Превью первой страницы для новых PDF из `public/certificates/` → `public/certificates/previews/` |
| `npm run previews -- --force` | Пересоздать все превью |
| `npm run fetch-og` | Скачать заголовки и картинки новых публикаций из `media-sources.json` |
| `npm run fetch-og -- --force` | Обновить данные по всем публикациям |

## Аналитика

Скопируйте `.env.example` в `.env` и укажите номера счётчиков:

```
PUBLIC_YM_ID=12345678     # Яндекс Метрика
PUBLIC_GA_ID=G-XXXXXXX    # Google Analytics 4
```

Сайт отправляет цели: `download_resume`, `click_linkedin`, `click_telegram`, `read_article`,
`download_certificate`, а также `click_email`, `click_setka`, `cta_contact`, `click_linkedin_company`.
В Метрике создайте цели типа «JavaScript-событие» с такими идентификаторами.

## Деплой

Перед сборкой задайте адрес сайта (нужен для canonical, sitemap и превью в соцсетях):
`SITE_URL=https://ваш-домен.ru` (в `.env` или в настройках хостинга).

### Vercel (рекомендуется)

1. Загрузите проект в репозиторий GitHub.
2. На vercel.com → Add New → Project → выберите репозиторий. Настройки подхватятся из `vercel.json`.
3. Settings → Environment Variables: `SITE_URL`, при необходимости `PUBLIC_YM_ID`, `PUBLIC_GA_ID`.
4. Каждый `git push` в `main` публикует новую версию автоматически.

### GitHub Pages

1. Загрузите проект в репозиторий GitHub (ветка `main`).
2. Settings → Pages → Source: **GitHub Actions**. Workflow уже лежит в `.github/workflows/deploy.yml`.
3. Settings → Secrets and variables → Actions → Variables:
   `SITE_URL` (например `https://semkin.ru`) и `BASE_PATH`:
   `/` для своего домена или `/имя-репозитория`, если сайт открывается по адресу `логин.github.io/имя-репозитория`.

### Любой обычный хостинг (в том числе хостинг reg.ru)

Выполните `npm run build` и загрузите содержимое папки `dist/` в корень сайта по FTP.

## Подключение домена с reg.ru

Личный кабинет reg.ru → «Домены» → ваш домен → «DNS-серверы и управление зоной».
DNS-серверы должны быть reg.ru (`ns1.reg.ru`, `ns2.reg.ru`). Удалите старые записи `A` и `CNAME`
для `@` и `www`, затем добавьте новые.

**Для Vercel**

| Тип | Имя | Значение |
| --- | --- | --- |
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com.` |

Затем в Vercel: Project → Settings → Domains → добавьте `ваш-домен.ru` и `www.ваш-домен.ru`.
Vercel может показать другие значения записей: используйте те, что он показывает.

**Для GitHub Pages**

| Тип | Имя | Значение |
| --- | --- | --- |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `логин.github.io.` |

Затем в репозитории: Settings → Pages → Custom domain → `ваш-домен.ru` → Save,
после проверки включите «Enforce HTTPS». `BASE_PATH` должен быть `/`.

Записи DNS обновляются от нескольких минут до 24 часов. HTTPS-сертификат выпускается автоматически.
После подключения домена пропишите его в `SITE_URL` и пересоберите сайт.
