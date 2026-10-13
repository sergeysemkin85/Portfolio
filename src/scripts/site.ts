// Клиентские скрипты: появление секций, счётчики, тема, язык, меню,
// карусели, модальные окна (PDF, LinkedIn-embed, просмотр картинок), фильтр сертификатов.
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
}

function initCounters() {
  const items = document.querySelectorAll<HTMLElement>('[data-count]');
  const sep = document.documentElement.lang === 'en' ? ',' : ' ';
  const fmt = (n: number, _target: number) => (String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep));
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    if (el.dataset.animate === 'false') return;
    if (reduceMotion()) {
      el.textContent = fmt(target, target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased), target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 },
  );
  items.forEach((el) => {
    if (!reduceMotion() && el.dataset.animate !== 'false') el.textContent = '0';
    io.observe(el);
  });
}

function initTheme() {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const sync = () => btn.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
    sync();
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      sync();
    });
  });
}

function initLang() {
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
    a.addEventListener('click', () => {
      try {
        localStorage.setItem('lang', a.dataset.langLink!);
      } catch {}
      a.href = a.href.split('#')[0] + location.hash;
    });
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!toggle || !panel) return;
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    document.body.classList.toggle('overflow-hidden', open && window.innerWidth < 1024);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header?.contains(e.target as Node)) setOpen(false);
  });
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Подсветка текущего раздела в меню
  const links = new Map<string, HTMLAnchorElement[]>();
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((a) => {
    const id = a.getAttribute('href')!.slice(1);
    links.set(id, [...(links.get(id) ?? []), a]);
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((as) => as.forEach((a) => a.removeAttribute('aria-current')));
        links.get(e.target.id)?.forEach((a) => a.setAttribute('aria-current', 'true'));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const el = root.querySelector<HTMLElement>('.swiper')!;
    const count = el.querySelectorAll('.swiper-slide').length;
    const maxPerView = Number(root.dataset.perView ?? 3);
    const canLoop = count >= maxPerView * 2;
    new Swiper(el, {
      modules: [Navigation, Pagination, Keyboard, A11y, Autoplay],
      slidesPerView: 1.08,
      spaceBetween: 16,
      watchOverflow: true,
      grabCursor: true,
      loop: canLoop,
      rewind: !canLoop,
      speed: reduceMotion() ? 0 : 500,
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: {
        enabled: true,
        prevSlideMessage: root.dataset.prevLabel,
        nextSlideMessage: root.dataset.nextLabel,
      },
      navigation: { prevEl: root.querySelector<HTMLElement>('[data-prev]'), nextEl: root.querySelector<HTMLElement>('[data-next]') },
      pagination: { el: root.querySelector<HTMLElement>('.carousel-dots'), clickable: true },
      autoplay: reduceMotion() ? false : { delay: 5500, pauseOnMouseEnter: true, disableOnInteraction: false },
      breakpoints: {
        640: { slidesPerView: Math.min(2, maxPerView), spaceBetween: 20 },
        1024: { slidesPerView: Math.min(3, maxPerView), spaceBetween: 24 },
        1280: { slidesPerView: maxPerView, spaceBetween: 24 },
      },
    });
    // Пауза автопрокрутки, когда фокус внутри карусели (клавиатура)
    root.addEventListener('focusin', () => (el as any).swiper?.autoplay?.stop());
    root.addEventListener('focusout', () => !reduceMotion() && (el as any).swiper?.autoplay?.start());
  });
}

function initModals() {
  const dialog = document.querySelector<HTMLDialogElement>('#viewer');
  if (!dialog) return;
  const frame = dialog.querySelector<HTMLElement>('[data-viewer-body]')!;
  const title = dialog.querySelector<HTMLElement>('[data-viewer-title]')!;
  const download = dialog.querySelector<HTMLAnchorElement>('[data-viewer-download]')!;
  let lastFocus: HTMLElement | null = null;

  const open = (opts: { src: string; kind: 'pdf' | 'image' | 'embed'; title: string; download?: boolean; goal?: string }) => {
    lastFocus = document.activeElement as HTMLElement;
    title.textContent = opts.title;
    frame.replaceChildren();
    if (opts.kind === 'image') {
      const img = document.createElement('img');
      img.src = opts.src;
      img.alt = opts.title;
      img.className = 'mx-auto max-h-full w-auto max-w-full object-contain';
      frame.append(img);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = opts.kind === 'pdf' ? `${opts.src}#view=FitH` : opts.src;
      iframe.title = opts.title;
      iframe.loading = 'lazy';
      iframe.className = 'h-full w-full rounded-lg bg-white';
      if (opts.kind === 'embed') {
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
        iframe.className = 'h-full w-full rounded-lg bg-black';
      }
      frame.append(iframe);
    }
    download.hidden = !opts.download;
    if (opts.download) {
      download.href = opts.src;
      download.setAttribute('download', '');
      download.dataset.goal = opts.goal ?? 'download_file';
    }
    dialog.showModal();
  };

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-open-viewer]');
    if (!trigger) return;
    e.preventDefault();
    open({
      src: trigger.dataset.src!,
      kind: (trigger.dataset.kind as 'pdf' | 'image' | 'embed') ?? 'pdf',
      title: trigger.dataset.title ?? '',
      download: trigger.dataset.download === 'true',
      goal: trigger.dataset.downloadGoal,
    });
  });

  const close = () => dialog.close();
  dialog.querySelector('[data-viewer-close]')?.addEventListener('click', close);
  // Клик вне окна закрывает его
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    frame.replaceChildren();
    lastFocus?.focus();
  });
}

function initCertFilter() {
  const root = document.querySelector<HTMLElement>('[data-cert-filter]');
  if (!root) return;
  const buttons = root.querySelectorAll<HTMLButtonElement>('button[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-cert-category]');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter!;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cards.forEach((c) => (c.hidden = f !== 'all' && c.dataset.certCategory !== f));
    }),
  );
}

function initTooltips() {
  // На тач-устройствах подсказка открывается тапом, закрывается тапом вне
  document.querySelectorAll<HTMLElement>('[data-tip]').forEach((el) => {
    el.addEventListener('click', () => {
      const open = el.getAttribute('data-open') === 'true';
      document.querySelectorAll('[data-tip][data-open="true"]').forEach((o) => o.setAttribute('data-open', 'false'));
      el.setAttribute('data-open', String(!open));
    });
  });
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('[data-tip]')) {
      document.querySelectorAll('[data-tip][data-open="true"]').forEach((o) => o.setAttribute('data-open', 'false'));
    }
  });
}

function initVideoFacades() {
  // Плеер YouTube грузится только по клику: страница остаётся быстрой
  document.querySelectorAll<HTMLButtonElement>('[data-video-facade]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = btn.dataset.src!;
      iframe.title = btn.dataset.title ?? '';
      iframe.className = 'absolute inset-0 h-full w-full';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      btn.replaceWith(iframe);
    });
  });
}

export function initSite() {
  initVideoFacades();
  initReveal();
  initCounters();
  initTheme();
  initLang();
  initMenu();
  initCarousels();
  initModals();
  initCertFilter();
  initTooltips();
}
