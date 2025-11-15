"use server";
import { getArticleInfo, getAuthorAvatar } from "medium-info-api";
import { cacheLife } from "next/cache";

export const getMediumArticleCached = (async (url: string) => {
  "use cache";
  cacheLife("days");

  const info = await getArticleInfo(url);
  
  return {
    title: info.title,
    authorName: info.authorName,
    publishedDate: info.publishedDate,
    clapCount: info.clapCount,
    commentsCount: info.commentsCount,
    firstLine: info.firstLine,
    heroImage: info.heroImage,
  };
});

export const getMediumArticleAuthorAvatar = (async (url: string) => {
  "use cache";
  cacheLife("days");

  const info = await getAuthorAvatar(url);

  return {
   authorAvatar : info.authorAvatar
  };
});
