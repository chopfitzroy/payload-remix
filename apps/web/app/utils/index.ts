import type { Page } from 'cms';

export const findPageBySlug = (slug: string, pages: Page[]) => {
    return pages?.find((page) => page.slug === slug);
};
