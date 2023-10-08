import { theme } from "./src/shared/theme/themes";
/// <reference types="nativewind/types" />

declare module "@react-navigation/native" {
  export type ExtendedTheme = typeof theme;
  export function useTheme(): ExtendedTheme;
}
