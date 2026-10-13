// Находит картинку по пути из JSON внутри src/assets/images.
// Картинки проходят через astro:assets: сжимаются в WebP/AVIF и получают размеры.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true });

export function getImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  const mod = files[`/src/assets/images/${path}`];
  if (!mod) {
    throw new Error(`Картинка не найдена: src/assets/images/${path}. Проверьте путь в JSON и имя файла.`);
  }
  return mod.default;
}

/** Путь к файлу из public/ с учётом base (для GitHub Pages без своего домена). */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
