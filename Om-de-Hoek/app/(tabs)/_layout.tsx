import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2548BC",
        tabBarInactiveTintColor: "#828282",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Magic Button Page!",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable className="mr-4">
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="#100D08"
                    className={pressed ? "opacity-50" : "opacity-100"}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
