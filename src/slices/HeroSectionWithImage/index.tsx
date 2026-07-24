import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroSectionWithImage`.
 */
export type HeroSectionWithImageProps = SliceComponentProps<Content.HeroSectionWithImageSlice>;

/**
 * Component for "HeroSectionWithImage" Slices.
 * Note: Hero heading & image are already rendered in the blog post template header.
 */
const HeroSectionWithImage: FC<HeroSectionWithImageProps> = () => {
  return null;
};

export default HeroSectionWithImage;