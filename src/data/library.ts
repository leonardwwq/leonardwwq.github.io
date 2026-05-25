/** 思考库：按分类维护阅读材料与个人思考；`featured` 条目优先出现在默认展示的前三条内。 */

import { libraryAssetUrls } from './libraryAssetUrls';

export type LibraryCategoryId = 'user-research' | 'decision' | 'ai';

export type LibraryEntry = {
  id: string;
  categoryId: LibraryCategoryId;
  /** 材料名称（书名、论文题等） */
  title: string;
  author: string;
  year: number | string;
  /** 本条思考最后更新时间，ISO 日期 YYYY-MM-DD */
  updatedAt: string;
  /** 作品外链 */
  link: { href: string; label?: string };
  /** 展开后展示的个人思考，支持多段（按空行分段） */
  thoughts: string;
  /** 精选：排序靠前，便于在分类默认三条中露出 */
  featured?: boolean;
};

export const libraryCategories: { id: LibraryCategoryId; title: string }[] = [
  { id: 'user-research', title: '用户研究' },
  { id: 'decision', title: '决策研究' },
  { id: 'ai', title: '人工智能' },
];

/** 每个分类默认展示条数；其余通过「展开更早」查看 */
export const LIBRARY_DEFAULT_VISIBLE = 3;

export const libraryEntries: LibraryEntry[] = [
  {
    id: 'ur-example-book',
    categoryId: 'user-research',
    title: '示例书名（可替换）',
    author: '作者名',
    year: 2024,
    updatedAt: '2025-05-01',
    link: { href: 'https://example.com/ebook', label: '电子书 / 出版社链接' },
    thoughts:
      '论点一：用你自己的话概括，并标注页码或章节（如有）。\n\n论点二：可引用结论，并写对你工作的启发。',
    featured: true,
  },
  {
    id: 'ur-archive-1',
    categoryId: 'user-research',
    title: '较早条目示例一',
    author: '作者',
    year: 2022,
    updatedAt: '2024-08-01',
    link: { href: 'https://example.com', label: '材料链接' },
    thoughts: '较早的思考会出现在「展开更早」里；默认列表只显示排序后的前三条。',
  },
  {
    id: 'ur-archive-2',
    categoryId: 'user-research',
    title: '较早条目示例二',
    author: '作者',
    year: 2021,
    updatedAt: '2024-01-15',
    link: { href: 'https://example.com', label: '材料链接' },
    thoughts: '需要露出时可设 featured: true，会优先进入默认三条。',
  },
  {
    id: 'ur-archive-3',
    categoryId: 'user-research',
    title: '较早条目示例三（仅在「展开更早」中）',
    author: '作者',
    year: 2020,
    updatedAt: '2023-06-01',
    link: { href: 'https://example.com', label: '材料链接' },
    thoughts:
      '当某分类下条目超过 3 条时，第 4 条及以后会出现在标题右侧的「展开更早」里。',
  },
  {
    id: 'decision-example-paper',
    categoryId: 'decision',
    title: '示例论文标题（可替换）',
    author: '作者 et al.',
    year: 2024,
    updatedAt: '2025-05-10',
    link: { href: 'https://arxiv.org/abs/0000.00000', label: 'arXiv:0000.00000' },
    thoughts: '方法或结论摘要一条。\n\n可迁移到产品决策的 takeaway 一条。',
    featured: true,
  },
  {
    id: 'ai-deep-learning',
    categoryId: 'ai',
    title: 'Deep Learning',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    year: 2016,
    updatedAt: '2025-05-25',
    link: { href: libraryAssetUrls.deepLearningPdf, label: 'PDF · 下载' },
    thoughts: '（占位）核心概念与章节笔记待补充。\n\n（占位）与产品 / 算法相关的 takeaway 待补充。',
    featured: true,
  },
  {
    id: 'ai-calculus-lifesaver',
    categoryId: 'ai',
    title: 'The Calculus Lifesaver',
    author: 'Adrian Banner',
    year: 2007,
    updatedAt: '2025-05-25',
    link: { href: libraryAssetUrls.calculusLifesaverMobi, label: 'MOBI · 下载' },
    thoughts: '（占位）阅读进度与重点公式待补充。\n\n（占位）个人理解与应用场景待补充。',
    featured: true,
  },
];

export function sortLibraryEntries(entries: LibraryEntry[]): LibraryEntry[] {
  return [...entries].sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export function getEntriesForCategory(categoryId: LibraryCategoryId): LibraryEntry[] {
  return sortLibraryEntries(libraryEntries.filter((e) => e.categoryId === categoryId));
}
