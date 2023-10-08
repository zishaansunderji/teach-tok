import React from "react";
import { useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";
import HomeScreen from "@screens/home/HomeScreen";
import SearchScreen from "@screens/search/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (route: any, color: string, size: number) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = "home";
        break;
      case SCREENS.DISCOVER:
        iconName = "compass";
        break;
      case SCREENS.ACTIVITY:
        iconName = "stopwatch";
        break;
      case SCREENS.BOOKMARKS:
        iconName = "bookmark";
        break;
      case SCREENS.PROFILE:
        iconName = "person";
        break;
      default:
        iconName = "home";
        break;
    }
    return (
      <Icon
        name={iconName}
        type={IconType.Ionicons}
        size={size}
        color={color}
      />
    );
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => renderTabIcon(route, color, size),
          tabBarActiveTintColor: palette.white,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: palette.black,
            height: 80,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen name={SCREENS.DISCOVER} component={SearchScreen} />
        <Tab.Screen name={SCREENS.ACTIVITY} component={SearchScreen} />
        <Tab.Screen name={SCREENS.BOOKMARKS} component={SearchScreen} />
        <Tab.Screen name={SCREENS.PROFILE} component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
