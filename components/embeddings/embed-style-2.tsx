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
import {Embed2} from "./embedding";
import {Suspense} from "react";

const files = {
  "/components/medium-embedding.tsx": {
    code: `import { getMediumArticleAuthorAvatar, getMediumArticleCached } from "@/app/actions";
import Image from "next/image";

export default async function Embed2() {
  
  const url : string = "https://medium.com/@mrityunjaytiwari1873/types-of-rendering-in-nextjs-csr-v-s-ssr-v-s-ssg-v-s-isr-v-s-ppr-1d13cc0fca99"
  
  const {
    title,
    heroImage,
  } = await getMediumArticleCached(
    url
  );
  

  if (!heroImage) {
    return <div>No hero image found for this article.</div>;
  }
  return (
      <div className="max-w-3xl border-b border-gray-200  justify-between items-start rounded-sm ">
        <div className="relative w-full aspect-video flex border rounded-sm bg-white">
          <Image
            src={"https://miro.medium.com/v2/resize:fit:4800/format:webp/0*ec6-018Q5iZtmf0Z.jpeg"}
            alt={"title"}
            className="w-full h-full object-contain p-2"
            width={400}
            height={300}
          />
  
          {/* Title Tag */}
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-lg">
            Types of Rendering in NextJS
          </span>
        </div>
  
        {/* Footer */}
        <div className="pb-0.5 pl-4 text-xs ">
          From medium.com
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
     
    `,
  },
  "/app/page.tsx": {
    code: `import {Suspense} from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading embed...</div>}>
        <Embed2 />
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
import Example2 from "./components/embeddings/mainembed";`,
  },
};

const Example2 = () => (
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
            Coding
          </SandboxTabsTrigger>
          <SandboxTabsTrigger value="preview">
            <AppWindowIcon size={14} />
            Preview
          </SandboxTabsTrigger>
        </SandboxTabsList>
        <SandboxTabsContent className="overflow-hidden p-3 md:p-6 w-full" value="code">
          <ResizablePanelGroup direction="vertical"
            className="md:!flex md:!flex-row">
            <ResizablePanel
              className="overflow-y-auto"
              defaultSize={25}
              maxSize={40}
              minSize={20}
            >
              <SandboxFileExplorer />
            </ResizablePanel>
            <div className="hidden md:block">

            <ResizableHandle withHandle />
            </div>
            <ResizablePanel className="overflow-y-auto">
              <SandboxCodeEditor />
            </ResizablePanel>
          </ResizablePanelGroup>
        </SandboxTabsContent>
        <Suspense fallback={<div>Loading embed...</div>}>
          <SandboxTabsContent
            value="preview"
            className="p-4 py-10 md:p-6 md:py-20 flex justify-center items-center bg-muted overflow-x-hidden"
          >
            <Embed2 />
          </SandboxTabsContent>
        </Suspense>
      </SandboxTabs>
    </SandboxLayout>
  </SandboxProvider>
);
export default Example2;
