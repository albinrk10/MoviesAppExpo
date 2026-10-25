import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  poster: string;
  originalTitle: string;
  title: string;
}

export default function MovieHeader({ poster, originalTitle, title }: Props) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { height: Math.min(height * 0.57, 550) }]}>
      <Image
        source={{ uri: poster }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(12,14,19,0.4)", "transparent", cinema.background]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.navigation, { top: insets.top + 10 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver al catálogo"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/home")
          }
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={21} color={cinema.text} />
        </Pressable>
        <Text style={styles.label}>DETRÁS DE LA HISTORIA</Text>
        <Ionicons name="film-outline" size={20} color={cinema.accent} />
      </View>
      <View style={styles.titles}>
        <Text style={styles.eyebrow}>UNA HISTORIA PARA DESCUBRIR</Text>
        <Text style={styles.title}>{title}</Text>
        {originalTitle !== title && (
          <Text style={styles.original}>{originalTitle}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: cinema.surface },
  navigation: {
    position: "absolute",
    left: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FFFFFF30",
    backgroundColor: "#0C0E1380",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: cinema.text,
    fontSize: 9,
    letterSpacing: 1.6,
    fontWeight: "700",
  },
  titles: { position: "absolute", bottom: 10, left: 24, right: 24 },
  eyebrow: {
    color: cinema.accent,
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: 10,
  },
  title: {
    color: cinema.text,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 39,
  },
  original: { color: cinema.muted, fontSize: 12, marginTop: 8 },
});
