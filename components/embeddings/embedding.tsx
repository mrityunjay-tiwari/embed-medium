import {
  getMediumArticleCached
} from "@/app/actions";
import {Bookmark, MessageCircle, Minus} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {PiHandsClappingFill} from "react-icons/pi";
import {PiStarFourFill} from "react-icons/pi";

export async function Embed() {
  const url: string =
    "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99";

  const {
    title,
    authorName,
    publishedDate,
    clapCount,
    commentsCount,
    firstLine,
    heroImage,
    authorAvatar
  } = await getMediumArticleCached(url);

  if (!heroImage || !authorAvatar) {
    return <div>No hero image found for this article.</div>;
  }
  return (
    <Link href={url} target="_blank">
      <div className="max-w-xl md:max-w-3xl border-b border-gray-200 p-4 flex justify-between items-start rounded-sm bg-white">
        
        <div className="flex flex-col gap-2">
         
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src={authorAvatar} 
              alt="author"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="font-medium">{authorName}</span>
          </div>

          <h2 className="text-lg md:text-2xl font-bold leading-snug pt-2">{title}</h2>

          <p className="text-gray-600 text-sm md:text-base line-clamp-2 pr-4">
            {firstLine}
          </p>

          <div className="flex items-center justify-between gap-4 text-sm text-gray-500 mt-2 pr-6">
            <div className="flex gap-4 items-center">
              <span className="text-yellow-500 text-xl">
                <PiStarFourFill />
              </span>
              <span className="text-xs md:text-base">{publishedDate}</span>
              <span className="flex items-center gap-1 text-xs md:text-base">
                <PiHandsClappingFill size={16} /> {clapCount}
              </span>
              <span className="flex items-center text-xs md:text-base gap-1">
                <MessageCircle size={16} /> {commentsCount}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <Minus size={16} className="text-gray-400" />
              <Bookmark size={16} className="text-gray-500" />
              <span className="text-gray-400 text-lg">•••</span>
            </div>
          </div>
        </div>

      
        <div className="my-4 pl-4 border-l-2 sm:my-8 sm:mr-8 sm:pl-8 sm:border-l-2">
          <Image
            src={heroImage} 
            alt="Article Thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded w-full h-auto"
          />
        </div>
      </div>
    </Link>
  );
}

export async function Embed2() {
  const url: string =
    "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99";

  const {title, heroImage} = await getMediumArticleCached(url);

  if (!heroImage) {
    return <div>No hero image found for this article.</div>;
  }
  return (
    <Link href={url} target="_blank">
      <div className="max-w-3xl border-b border-gray-200  justify-between items-start rounded-sm ">
        <div className="relative w-full aspect-video flex border rounded-sm bg-white">
          <Image
            src={heroImage}
            alt={"title"}
            className="w-full h-full object-contain p-2"
            width={400}
            height={300}
          />

          <span className="absolute bottom-3 left-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1 rounded-lg">
            {title}
          </span>
        </div>

        <div className="pb-0.5 pl-4 text-xs text-gray-600 ">
          From medium.com
        </div>
      </div>
    </Link>
  );
}

export async function Embed3() {
  const url =
    "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99";

  const { title, heroImage } = await getMediumArticleCached(url);

  if (!heroImage) {
    return <div>No hero image found...</div>;
  }

  return (
    <Link href={url} target="_blank">
      <div className="group max-w-3xl rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-video w-full">
          <Image
            src={heroImage}
            alt={"title"}
            className="object-cover"
            width={400}
            height={300}
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent">
            <h2 className="text-white text-base font-medium">{title}</h2>
          </div>
        </div>

        <div className="px-4 py-3 text-xs text-gray-500 flex items-center justify-between">
          <span>medium.com</span>
          <span className="group-hover:underline">↗</span>
        </div>
      </div>
    </Link>
  );
}
