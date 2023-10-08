import { useState, useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { Data } from "types";

const useQuestionsFeed = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [itemPressed, setItemPressed] = useState<string>("");
  const progress = useRef(
    new Animated.Value(Dimensions.get("window").width * 0.7),
  );

  const fetchQuestionsAndAnswers = async () => {
    try {
      setLoading(true);

      // Fetch 5 questions from the API
      const questions = [];
      for (let i = 0; i < 5; i++) {
        const response = await fetch(
          `https://cross-platform.rp.devfactory.com/for_you`,
        );
        const question = await response.json();
        questions.push(question);
      }

      if (questions.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const answers: Data[] = [];
      for await (const question of questions) {
        const answerResponse = await fetch(
          `https://cross-platform.rp.devfactory.com/reveal?id=${question.id}`,
        );
        const answerData = await answerResponse.json();
        answers.push({ ...question, answer: answerData, time: 0 });
      }

      setData([...data, ...answers]);
      setCurrentPage(currentPage + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchQuestionsAndAnswers();
    }
  };

  const handleAnswerPressed = (id: string) => {
    setItemPressed(id);
    Animated.timing(progress.current, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };

  const handleAnswerCleared = () => {
    setItemPressed("");
    progress.current.resetAnimation();
  };

  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, []);

  return {
    // elapsedTime,
    progress,
    itemPressed,
    data,
    loading,
    handleEndReached,
    handleAnswerPressed,
    handleAnswerCleared,
  };
};

export default useQuestionsFeed;
