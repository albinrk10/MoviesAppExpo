import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cinema } from "../theme";

interface Props {
  loading?: boolean;
  title: string;
  description?: string;
  onRetry?: () => void;
}

export default function ScreenState({
  loading,
  title,
  description,
  onRetry,
}: Props) {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      {loading ? (
        <ActivityIndicator size="large" color={cinema.accent} />
      ) : (
        <View style={styles.icon}>
          <Ionicons name="film-outline" size={30} color={cinema.accent} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {onRetry && (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.button}
        >
          <Ionicons name="refresh" size={17} color={cinema.background} />
          <Text style={styles.buttonText}>Volver a intentar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 280,
    backgroundColor: cinema.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  icon: { padding: 20, borderRadius: 24, backgroundColor: cinema.surface },
  title: {
    color: cinema.text,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: cinema.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 310,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: cinema.accent,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: { fontSize: 14, fontWeight: "700", color: cinema.background },
});
