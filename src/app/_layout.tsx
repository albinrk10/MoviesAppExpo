import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { cinema } from "@/presentation/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: cinema.background }}
    >
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: cinema.background },
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
