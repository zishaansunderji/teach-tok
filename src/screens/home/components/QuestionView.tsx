import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import useQuestionsFeed from "hooks/useQuestionsFeed";
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "../HomeScreen.style";
import { Animated, Dimensions, FlatList, Image, View } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import QuickActions from "./QuickActions";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Data } from "types";

interface QuestionViewProps {
  data: Data;
  pause: () => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({ data, pause }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const NO_WIDTH_SPACE = "​";

  const { progress, itemPressed, handleAnswerPressed } = useQuestionsFeed();

  const highlight = (string: string) =>
    string.split(" ").map((word, i) => (
      <Text key={i} color={colors.white}>
        <Text
          h2
          style={[styles.highlighted, { padding: 4 }]}
          color={colors.white}
        >
          {word}{" "}
        </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ));

  const checkIfCorrectOption = (
    option: string,
    optionPressed: string,
    correctOption: string,
  ) => {
    if (option === correctOption) {
      return "#1fc773";
    } else if (option === optionPressed) {
      return "#e03938";
    }
    return colors.whiteOverlay;
  };

  return (
    <View
      style={{
        zIndex: 4,
      }}
    >
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%" }}>
          <SafeAreaView style={[styles.container]}>
            <View
              style={[
                styles.contentContainer,
                {
                  maxHeight: Dimensions.get("screen").height * 0.8,
                  alignSelf: "flex-start",
                  justifyContent: "space-evenly",
                },
              ]}
            >
              {/* Question */}
              <View style={{ paddingLeft: 16, width: "70%" }}>
                <Text h2 color={colors.white} style={{ fontWeight: "500" }}>
                  {highlight(data.question || "")}
                </Text>
              </View>
              {/* Options */}
              <View style={{ paddingLeft: 16, alignSelf: "flex-start" }}>
                <FlatList
                  data={data.options || []}
                  keyExtractor={(item, index) => item.id + index}
                  renderItem={({ item }) => {
                    return (
                      <RNBounceable
                        onPress={() => {
                          handleAnswerPressed(item.id);
                          pause();
                        }}
                        key={item.id}
                        disabled={!!itemPressed}
                        style={{
                          padding: 16,
                          backgroundColor: colors.whiteOverlay,
                          // backgroundColor:
                          //   (item.id === data.answer.correct_options?.[0]?.id && itemPressed) || itemPressed === item.id
                          //     ? checkIfCorrectOption(item.id, itemPressed, data.answer.correct_options?.[0]?.id)
                          //     : colors.whiteOverlay,
                          marginBottom: 16,
                          marginTop: 16,
                          maxWidth: Dimensions.get("screen").width * 0.7,
                          borderRadius: 16,
                        }}
                      >
                        {(item.id === data.answer.correct_options?.[0]?.id &&
                          itemPressed) ||
                        itemPressed === item.id ? (
                          <Animated.View
                            style={[
                              {
                                position: "absolute",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 16,
                                backgroundColor: checkIfCorrectOption(
                                  item.id,
                                  itemPressed,
                                  data.answer.correct_options?.[0]?.id,
                                ),
                              },
                              { left: progress.current },
                            ]}
                          ></Animated.View>
                        ) : (
                          <></>
                        )}

                        <Text
                          h4
                          color={colors.white}
                          style={{
                            textShadowColor: "rgba(0, 0, 0, 1)",
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 2,
                            fontWeight: "600",
                          }}
                        >
                          {item.answer}
                        </Text>
                      </RNBounceable>
                    );
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
          {/* Options */}
          <View
            style={{
              position: "absolute",
              top: Dimensions.get("screen").height / 2.5,
              right: 0,
            }}
          >
            <View style={{ alignItems: "flex-end", paddingRight: 16 }}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderColor: colors.white,
                  borderWidth: 2,
                  borderRadius: 40,
                }}
                id="avatar"
                source={{ uri: data.user.avatar }}
              />
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Icon
                  name="square"
                  size={20}
                  type={IconType.Ionicons}
                  color={colors.white}
                  style={{ position: "absolute", bottom: -10, left: -4 }}
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <Icon
                  name="add-circle"
                  size={34}
                  type={IconType.Ionicons}
                  color={colors.calpyse}
                  style={{ position: "absolute", bottom: -20, left: -10 }}
                />
              </View>
            </View>
            <QuickActions
              iconName="heart"
              count={87}
              styles={{ marginTop: 24 }}
            />
            <QuickActions iconName="chatbubbles" count={87} />
            <QuickActions iconName="bookmark" count={203} />
            <QuickActions iconName="trending-up" count={17} />
          </View>
          {/* Playlist */}
          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
            }}
          >
            <View style={{ padding: 16 }}>
              <Text bold color={colors.white}>
                {data.user.name}
              </Text>
              <Text color={colors.white} style={{ marginTop: 4 }}>
                {data.description}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.black,
                width: Dimensions.get("screen").width,
                paddingTop: 4,
                paddingBottom: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Icon
                  name="play-circle"
                  size={24}
                  type={IconType.Ionicons}
                  color={colors.dynamicWhite}
                />
                <Text
                  h4
                  color={colors.white}
                  style={{ textAlign: "left", paddingLeft: 4 }}
                >
                  Playlist • {data.playlist}
                </Text>
              </View>
              <View style={{ paddingRight: 4 }}>
                <Icon
                  name="play"
                  size={18}
                  type={IconType.Ionicons}
                  color={colors.dynamicWhite}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuestionView;
