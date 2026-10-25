import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: number;
  poster: string;
  title?: string;
  rating?: number;
  year?: number;
}

export default function MoviePoster({
  id,
  poster,
  title,
  rating,
  year,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${title ?? "la película"}`}
      onPress={() => router.push(`/movie/${id}`)}
      style={styles.card}
    >
      <View style={styles.imageWrap}>
        <View style={styles.placeholder}>
          <Ionicons name="film-outline" color={cinema.muted} size={27} />
        </View>
        <Image
          source={{ uri: poster }}
          style={styles.image}
          resizeMode="cover"
        />
        {rating !== undefined && rating > 0 && (
          <View style={styles.rating}>
            <Ionicons name="star" size={10} color={cinema.accent} />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      {title && (
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      )}
      {year !== undefined && <Text style={styles.year}>{year} · Película</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 132 },
  imageWrap: {
    height: 184,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: cinema.surface,
    borderWidth: 1,
    borderColor: cinema.border,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },
  rating: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(12,14,19,0.9)",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
  },
  ratingText: { fontSize: 10, fontWeight: "700", color: cinema.text },
  title: {
    color: cinema.text,
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 10,
  },
  year: { color: cinema.muted, fontSize: 10, marginTop: 5 },
});
