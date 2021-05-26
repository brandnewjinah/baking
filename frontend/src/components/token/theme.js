import { neutral, blue, peach } from "./colors";
import { primaryFont, secondaryFont, tertiaryFont } from "./typography";

export const defaultTheme = {
  primaryColor: blue[400],
  secondaryColor: peach[400],
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
