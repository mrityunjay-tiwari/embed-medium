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
import {Embed3} from "./embedding";
import {Suspense} from "react";

const files = {
  "/components/medium-embedding.tsx": {
    code: `import { getMediumArticleAuthorAvatar, getMediumArticleCached } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";

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

          {/* Gradient Title Bar */}
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
        <Embed3 />
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

const Example3 = () => (
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
          <ResizablePanelGroup direction="horizontal" className="md:flex! md:flex-row!">
            <ResizablePanel
              className="overflow-y-auto overflow-x-auto md:overflow-x-hidden"
              defaultSize={25}
              maxSize={70}
              minSize={20}
            >
              <SandboxFileExplorer />
            </ResizablePanel>
            <div className="block">

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
            <Embed3 />
          </SandboxTabsContent>
        </Suspense>
      </SandboxTabs>
    </SandboxLayout>
  </SandboxProvider>
);
export default Example3;
