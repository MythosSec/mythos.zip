import { encodeClassName } from "./util/string";

export const homeRoute = () => "/";

export const articleRoute = (slug: string) => `/article/${slug}`;

export const authorRoute = (author: string) =>
  `/author/${encodeClassName(author)}`;

export const seriesItemRoute = (series: string) =>
  `/series/${encodeClassName(series)}`;

export const seriesRoute = () => `/series`;

export const tagRoute = (tag: string) => `/topic/${encodeClassName(tag)}`;

export const tagsRoute = () => `/topic`;
