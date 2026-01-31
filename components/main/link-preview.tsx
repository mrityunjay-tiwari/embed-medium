import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/kibo-ui/glimpse";
import Link from "next/link";

const LinkPreview = async () => {
  return (
    <div className="text-xs mt-1 ml-1 flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-1 text-gray-800">
      To study more about this package, visit:{" "}
      <Glimpse closeDelay={0} openDelay={0}>
        <GlimpseTrigger asChild>
          <Link
            className="font-medium text-primary underline"
            href="https://github.com/haydenbleasel/ultracite"
          >
            NPM Repository ↗,
          </Link>
        </GlimpseTrigger>
        <GlimpseContent className="w-80">
          <GlimpseImage src="https://ik.imagekit.io/mrityunjay/image.png" />
          <GlimpseTitle>npm : medium-info-api</GlimpseTitle>
          <GlimpseDescription>npm description</GlimpseDescription>
        </GlimpseContent>
        <MediumLink />
      </Glimpse>
    </div>
  );
};

export default LinkPreview;

const MediumLink = () => {
  return (
    <div>
      <Glimpse closeDelay={0} openDelay={0}>
        <GlimpseTrigger asChild>
          <Link
            className="font-medium text-primary underline"
            href="https://github.com/haydenbleasel/ultracite"
          >
            Medium Article ↗,
          </Link>
        </GlimpseTrigger>
        <GlimpseContent className="w-80">
          <GlimpseImage src="https://ik.imagekit.io/mrityunjay/image.png" />
          <GlimpseTitle>article title</GlimpseTitle>
          <GlimpseDescription>article description</GlimpseDescription>
        </GlimpseContent>
        <MediumLink />
      </Glimpse>
    </div>
  );
};
