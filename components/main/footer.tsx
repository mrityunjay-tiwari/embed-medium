import {cn} from "@/lib/utils";
import Link from "next/link";
import {Github, Linkedin, Twitter} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";

export default function Footer() {
  return (
    <footer className="pt-6 pb-4 w-full bg-zinc-100/50 border-t  relative flex justify-center items-center flex-col">      
      <div className="flex gap-7 mt-2">
        <Link href={"https://x.com/mrityunjay_18"} target="_blank">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-gray-600 hover:cursor-pointer">
                <Twitter height={18} width={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Twitter</p>
            </TooltipContent>
          </Tooltip>
        </Link>

        <Link href={"https://github.com/mrityunjay-tiwari"} target="_blank">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-gray-600 hover:cursor-pointer">
                <Github height={18} width={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Github</p>
            </TooltipContent>
          </Tooltip>
        </Link>

        <Link href={"https://www.linkedin.com/in/mrityunjay-tiwari-a81275190/"} target="_blank">
          <Tooltip>
            <TooltipTrigger>
              <span className="text-gray-600 hover:cursor-pointer">
                <Linkedin height={18} width={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </div>
      <h1 className={cn(`text-sm text-gray-500 mt-2 font-extralight`)}>
        © Created by Mrityunjay Tiwari
      </h1>
    </footer>
  );
}
