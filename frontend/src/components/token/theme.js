import { neutral, blue, peach, primaryColor } from "./colors";
import { primaryFont, secondaryFont, tertiaryFont } from "./typography";

export const defaultTheme = {
  heading: primaryFont,
  primaryColor: blue[400],
  secondaryColor: primaryColor.yellow,
  neutralHover: neutral[200],
  disalbed: neutral[300],
};

export const secondaryTheme = {
  heading: secondaryFont,
  body: secondaryFont,
};

export const tertiaryTheme = {
  heading: tertiaryFont,
  body: primaryFont,
};
