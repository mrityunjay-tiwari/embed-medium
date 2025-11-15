import Codeblock from "../codeblocks/codeblock";
import CodeblockNext from "../codeblocks/codeblocknext";
import Example from "../embeddings/embed-style-1";
import Example2 from "../embeddings/embed-style-2";
import Example3 from "../embeddings/embed-style-3";
import {BGGradient} from "./background";
import Footer from "./footer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <BGGradient>
        <div className="pt-10">
          <h1 className="md:text-4xl text-2xl font-bold capitalize text-gray-900">
            WELCOME TO MEDIUM EMBED UI LIBRARY !
          </h1>
          <div>
            This is a collection of components to help you embed Medium posts
            easily into your NextJS applications.
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-semibold mt-10">
              Installation
            </h1>
          </div>
          <div className="mt-5">
            {`During installation of Next.js ensure you have Next.js version 16 or above as here "use cache" is used further`}
            <CodeblockNext />
          </div>
          <div className="mt-10">
            {`It let's you fetch all the information about the article to let you then use them to design the embedding card.`}
            <Codeblock />
            <h1 className="flex font-thin text-xs mt-1 ml-1">{`To study more about this package, visit :  `} <Link href={'https://www.npmjs.com/package/medium-info-api'} target="_blank" className="mx-1"> {`NPM Respository↗`} </Link> <Link href={'https://medium.com/@mrityunjaytiwari1873/how-to-scrape-medium-efficiently-9c18b097a58f'} target="_blank"> Medium Article↗ </Link></h1>
          </div>
          <div>
            <h1 className="md:text-2xl text-xl font-semibold mt-10">
              Embeddings
            </h1>
          </div>
          <div className="mt-5 mb-10">
            <div id="sample1">
              <h1 className="text-lg md:text-xl font-medium mb-4">
                Embed Style 1
              </h1>
              <Example />
            </div>
            <div id="sample2">
              <h1 className="text-lg md:text-xl font-medium mb-4 mt-6">
                Embed Style 2
              </h1>
              <Example2 />
            </div>
            <div id="sample3">
              <h1 className="text-lg md:text-xl font-medium mb-4 mt-6">
                Embed Style 3
              </h1>
              <Example3 />
            </div>
          </div>
          {/* <div className="mb-20">
        <PaginatedView />
      </div> */}
          <Footer />
        </div>
      </BGGradient>
    </>
  );
}
