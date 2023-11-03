import { encodeClassName } from "./util/string";

export const homeRoute = () => "/";

export const articleRoute = (slug: string) => `/article/${slug}`;

export const authorRoute = (author: string) =>
  `/author/${encodeClassName(author)}`;

export const seriesRoute = (series: string) =>
  `/series/${encodeClassName(series)}`;

export const tagRoute = (tag: string) => `/tag/${encodeClassName(tag)}`;
