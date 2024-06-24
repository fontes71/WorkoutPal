export const localhost = process.env.EXPO_PUBLIC_LOCALHOST

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  blue: "#1a74e2",
  midBlue: "#3fa0ef",
  lightBlue: "#6bd0ff",
  lightBlack: "#1f2123",
  black: "#101010",
  gray: "#D9D9D9"
};
