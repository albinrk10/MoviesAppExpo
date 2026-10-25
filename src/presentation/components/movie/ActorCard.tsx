import type { Cast } from "@/domain/entities/cast.entity";
import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export const ActorCard = ({ actor }: { actor: Cast }) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Ionicons name="person-outline" size={26} color={cinema.muted} />
      <Image
        source={{ uri: actor.avatar }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
    </View>
    <Text numberOfLines={2} style={styles.name}>
      {actor.name}
    </Text>
    <Text numberOfLines={2} style={styles.character}>
      {actor.character}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: { width: 88 },
  avatar: {
    height: 106,
    width: 88,
    borderRadius: 14,
    backgroundColor: cinema.surface,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  name: { color: cinema.text, fontSize: 11, fontWeight: "600", lineHeight: 16 },
  character: {
    color: cinema.muted,
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
});
