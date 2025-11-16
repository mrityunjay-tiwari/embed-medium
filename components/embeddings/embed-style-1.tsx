import {
  SandboxCodeEditor,
  SandboxFileExplorer,
  SandboxLayout,
  SandboxProvider,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from "@/components/ui/shadcn-io/sandbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {AppWindowIcon, CodeIcon} from "lucide-react";
import {Embed} from "./embedding";
import {Suspense} from "react";

const files = {
  "/components/medium-embedding.tsx": {
    code: `import { getMediumArticleAuthorAvatar, getMediumArticleCached } from "@/app/actions";
import {Bookmark, MessageCircle, Minus} from "lucide-react";
import Image from "next/image";
import {PiHandsClappingFill} from "react-icons/pi";
import {PiStarFourFill} from "react-icons/pi";

export default async function Embed() {
  
  const url : string = "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99"
  
  const {
    title,
    authorName,
    publishedDate,
    clapCount,
    commentsCount,
    firstLine,
    heroImage,
  } = await getMediumArticleCached(
    url
  );
  
  const {
    authorAvatar
  } = await getMediumArticleAuthorAvatar(
    "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99"
  );

  if (!heroImage) {
    return <div>No hero image found for this article.</div>;
  }
  return (
    <div className="max-w-3xl border-b border-gray-200 pb-4 flex justify-between items-start">
      {/* Left content */}
      <div className="flex flex-col gap-2">
        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Image
            src={authorAvatar} // replace with actual author image
            alt="author"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-medium">{authorName}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold leading-snug pt-2">{title}</h2>

        {/* FirstLine */}
        <p className="text-gray-600 text-base line-clamp-2 pr-4">{firstLine}</p>

        {/* Meta info */}
        <div className="flex items-center justify-between gap-4 text-sm text-gray-500 mt-2 pr-6">
          <div className="flex gap-4 items-center">
            <span className="text-yellow-500 text-xl">
              <PiStarFourFill />
            </span>
            <span>{publishedDate}</span>
            <span className="flex items-center gap-1">
              <PiHandsClappingFill size={16} /> {clapCount}
            </span>
            <span className="flex items-center gap-1">
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

      {/* Right side image */}
      <div className=" my-8 mr-8 pl-8 shrink-0 border-l-2">
        <Image
          src={heroImage} // replace with actual image
          alt="Article Thumbnail"
          width={200}
          height={150}
          className="rounded object-cover"
        />
      </div>
    </div>
  );
}
    `,
  },
  "/app/actions.ts": {
    code: `"use server";
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

  console.log("❗FETCHING FROM SOURCE (not cache) for avatar →");

  const info = await getAuthorAvatar(url);
  

  return {
    authorAvatar : info.authorAvatar
  };
});      
    `,
  },
  "/app/page.tsx": {
    code: `import {Suspense} from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading embed...</div>}>
        <Embed />
      </Suspense>
    </div>
  )
}
    `,
  },
  "/next.config.json": {
    code: `import type { NextConfig } from "next";
        
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
};

export default nextConfig;`,
  },
  "App.js": {
    hidden: true,
    code: `import React from "react";
import Example from "./components/embeddings/mainembed";`,
  },
};

// const Example = () => (
//   <SandboxProvider
//     template="react"
//     options={{
//       visibleFiles: [
//         "/app/embed.tsx",
//         "/components/medium-embedding.tsx",
//         "/app/actions.ts",
//         "/app/page.tsx",
//         "/next.config.json",
//       ],
//       activeFile: "/app/page.tsx",
//     }}
//     files={files}
//     className="overflow-auto"
//   >
//     <SandboxLayout>
//       <SandboxTabs defaultValue="preview">
//         <SandboxTabsList>
//           <SandboxTabsTrigger value="code">
//             <CodeIcon size={14} />
//             Code
//           </SandboxTabsTrigger>
//           <SandboxTabsTrigger value="preview">
//             <AppWindowIcon size={14} />
//             Preview
//           </SandboxTabsTrigger>
//         </SandboxTabsList>
//         <SandboxTabsContent className="overflow-hidden p-6" value="code">
//           <ResizablePanelGroup direction="horizontal">
//             <ResizablePanel
//               className="overflow-y-auto"
//               defaultSize={25}
//               maxSize={40}
//               minSize={20}
//             >
//               <SandboxFileExplorer />
//             </ResizablePanel>
//             <ResizableHandle withHandle />
//             <ResizablePanel className="overflow-y-auto">
//               <SandboxCodeEditor />
//             </ResizablePanel>
//           </ResizablePanelGroup>
//         </SandboxTabsContent>
//         <Suspense fallback={<div>Loading embed...</div>}>
//           <SandboxTabsContent
//             value="preview"
//             className="p-6 py-20 flex justify-center items-center bg-muted"
//           >
//             <Embed />
//           </SandboxTabsContent>
//         </Suspense>
//       </SandboxTabs>
//     </SandboxLayout>
//   </SandboxProvider>
// );
const Example = () => (
  <SandboxProvider
    template="react"
    options={{
      visibleFiles: [
        "/app/embed.tsx",
        "/components/medium-embedding.tsx",
        "/app/actions.ts",
        "/app/page.tsx",
        "/next.config.json",
      ],
      activeFile: "/app/page.tsx",
    }}
    files={files}
    className="w-full max-w-full overflow-x-hidden"
  >
    <SandboxLayout className="w-full max-w-full">
      <SandboxTabs defaultValue="preview">
        <SandboxTabsList className="w-full flex justify-center md:justify-start">
          <SandboxTabsTrigger value="code">
            <CodeIcon size={14} />
            Code
          </SandboxTabsTrigger>

          <SandboxTabsTrigger value="preview">
            <AppWindowIcon size={14} />
            Preview
          </SandboxTabsTrigger>
        </SandboxTabsList>

        {/* CODE TAB */}
        <SandboxTabsContent
          className="overflow-hidden p-3 md:p-6 w-full"
          value="code"
        >
          {/* Mobile: vertical stack  | Desktop: horizontal panels */}
          <ResizablePanelGroup
            direction="horizontal"
            className="md:!flex md:!flex-row"
          >
            <ResizablePanel
              className="overflow-y-auto overflow-x-auto md:overflow-x-hidden"
              defaultSize={30}
              maxSize={70}
              minSize={20}
            >
              <SandboxFileExplorer />
            </ResizablePanel>

            {/* Handle only visible on desktop */}
            <div className="block">
              <ResizableHandle withHandle />
            </div>

            <ResizablePanel className="overflow-y-auto">
              <SandboxCodeEditor />
            </ResizablePanel>
          </ResizablePanelGroup>
        </SandboxTabsContent>

        {/* PREVIEW TAB */}
        <Suspense fallback={<div>Loading embed...</div>}>
          <SandboxTabsContent
            value="preview"
            className="p-4 py-10 md:p-6 md:py-20 bg-muted overflow-auto w-full"
          >
            <div className="min-w-[700px] flex justify-center items-center">
              <Embed />
            </div>
          </SandboxTabsContent>
        </Suspense>
      </SandboxTabs>
    </SandboxLayout>
  </SandboxProvider>
);

export default Example;
