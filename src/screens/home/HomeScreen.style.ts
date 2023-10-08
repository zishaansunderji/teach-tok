import { ViewStyle, StyleSheet } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  titleBarContainer: ViewStyle;
  highlighted: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
    titleBarContainer: {
      flexDirection: "row",
      width: "90%",
      justifyContent: "space-between",
    },
    highlighted: {
      backgroundColor: colors.blackOverlay,
      borderRadius: 16,
      padding: 16,
    },
  });
};
