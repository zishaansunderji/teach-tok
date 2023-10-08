import React from "react";
import { Dimensions, ImageBackground } from "react-native";

const MemoizedImageBackground = React.memo(
  function Background({ uri }: { uri: string }) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{ uri }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          backgroundColor: "#1c1e21",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.uri === nextProps.uri,
);

export default MemoizedImageBackground;
