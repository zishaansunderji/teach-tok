import React from "react";
import { FlatList, View, Dimensions, ActivityIndicator } from "react-native";
import { Data } from "types";
import useQuestionsFeed from "hooks/useQuestionsFeed";
import MemoizedImageBackground from "./components/MemoizedImageBackground";
import QuestionView from "./components/QuestionView";
import Header from "./components/Header";
import { useStopwatch } from "react-timer-hook";

interface HomeScreenProps {}

const Content = ({ data, pause }: { data: Data; pause: () => void }) => {
  return (
    <View>
      <MemoizedImageBackground
        uri={
          data && data.image
            ? data.image
            : "https://cross-platform-rwa.rp.devfactory.com/images/7228%20-%20John%20Browns%20attack%20at%20Harpers%20Ferry.png"
        }
      />
      <QuestionView data={data} pause={pause} />
    </View>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { data, loading, handleEndReached, handleAnswerCleared } =
    useQuestionsFeed();
  const {
    totalSeconds: time,
    pause,
    reset,
    start,
  } = useStopwatch({ autoStart: true });

  return (
    <View>
      <View style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
        <Header time={time} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Content data={item} pause={pause} />}
        keyExtractor={(item, index) => String(item.id + index)}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
        onEndReached={handleEndReached}
        onEndReachedThreshold={2}
        refreshing={loading}
        onScrollEndDrag={() => {
          handleAnswerCleared();
          reset();
          start();
        }}
        ListFooterComponent={loading ? <ActivityIndicator /> : <></>}
      />
    </View>
  );
};

export default HomeScreen;
