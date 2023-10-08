import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import { ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface QuickActionProps {
  iconName: string;
  count: number;
  styles?: ViewStyle;
}

const QuickActions = ({ iconName, count, styles = {} }: QuickActionProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <RNBounceable
      style={[
        {
          marginRight: 16,
          marginTop: 8,
        },
        styles,
      ]}
    >
      <Icon
        name={iconName}
        size={42}
        type={IconType.Ionicons}
        color={colors.white}
        style={{ alignSelf: "flex-end" }}
      />
      <Text
        h5
        color={colors.white}
        style={{ textAlign: "center", paddingLeft: 16 }}
      >
        {count}
      </Text>
    </RNBounceable>
  );
};

export default QuickActions;
