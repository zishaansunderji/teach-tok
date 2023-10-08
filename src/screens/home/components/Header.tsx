import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import createStyles from "../HomeScreen.style";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Dimensions, View } from "react-native";
import { convertSecondsToTime } from "utils";

interface HeaderProps {
  time: number;
}

const Header = ({ time }: HeaderProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={[
          styles.contentContainer,
          {
            width: Dimensions.get("window").width,
          },
        ]}
      >
        <View style={styles.titleBarContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="stopwatch"
              size={24}
              type={IconType.Ionicons}
              color={colors.dynamicWhite}
            />
            <Text h4 color={colors.dynamicWhite} style={{ paddingLeft: 4 }}>
              {convertSecondsToTime(time)}
            </Text>
          </View>
          <View style={{ marginRight: 38 }}>
            <Text h4 bold color={colors.white}>
              For You
            </Text>
            <View
              style={{
                width: 40,
                backgroundColor: "white",
                height: 4,
                alignSelf: "center",
                marginTop: 4,
              }}
            ></View>
          </View>
          <View>
            <Icon
              name="search"
              size={24}
              type={IconType.Ionicons}
              color={colors.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
