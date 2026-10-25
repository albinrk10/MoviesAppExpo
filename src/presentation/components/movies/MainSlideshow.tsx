import type { Movie } from "@/domain/entities/movie.entity";
import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function MainSlideshow({ movies }: { movies: Movie[] }) {
  const { width } = useWindowDimensions();
  const [active, setActive] = useState(0);
  const featured = movies.slice(0, 5);
  const cardWidth = Math.min(width - 48, 600);

  return (
    <View>
      <FlatList
        horizontal
        style={{ height: 350 }}
        data={featured}
        keyExtractor={(movie) => movie.id.toString()}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.track}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        onMomentumScrollEnd={(event) =>
          setActive(
            Math.min(
              featured.length - 1,
              Math.round(event.nativeEvent.contentOffset.x / (cardWidth + 12)),
            ),
          )
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ver detalles de ${item.title}`}
            onPress={() => router.push(`/movie/${item.id}`)}
            style={[styles.card, { width: cardWidth }]}
          >
            <Image
              source={{ uri: item.backdrop }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                "rgba(12,14,19,0.05)",
                "rgba(12,14,19,0.45)",
                "rgba(12,14,19,0.98)",
              ]}
              locations={[0, 0.35, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.badge}>
              <View style={styles.live} />
              <Text style={styles.badgeText}>EN CARTELERA</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.meta}>
                <Ionicons name="star" size={13} color={cinema.accent} />
                <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
                <Text style={styles.metaText}>
                  · {item.releaseDate.getFullYear()} · Película
                </Text>
              </View>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description ||
                  "Una nueva historia te espera en la gran pantalla."}
              </Text>
              <View style={styles.button}>
                <Ionicons
                  name="ticket-outline"
                  size={18}
                  color={cinema.background}
                />
                <Text style={styles.buttonText}>Descubrir película</Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={cinema.background}
                />
              </View>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.pagination}>
        {featured.map((movie, index) => (
          <View
            key={movie.id}
            style={[styles.page, active === index && styles.pageActive]}
          />
        ))}
        <Text style={styles.counter}>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(featured.length).padStart(2, "0")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { paddingHorizontal: 24 },
  card: {
    height: 350,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: cinema.surface,
    borderWidth: 1,
    borderColor: cinema.border,
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    margin: 18,
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: "rgba(12,14,19,0.75)",
    borderRadius: 8,
  },
  live: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: cinema.accent,
  },
  badgeText: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: cinema.text,
    fontWeight: "700",
  },
  content: { position: "absolute", bottom: 20, left: 20, right: 20 },
  meta: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 9 },
  rating: { color: cinema.accent, fontSize: 12, fontWeight: "700" },
  metaText: { color: "#D0CFD3", fontSize: 11 },
  title: {
    color: cinema.text,
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  description: {
    color: "#C1C0C4",
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: cinema.accent,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  buttonText: { fontSize: 12, fontWeight: "700", color: cinema.background },
  pagination: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  page: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#383A43" },
  pageActive: { width: 21, backgroundColor: cinema.accent },
  counter: {
    color: cinema.muted,
    fontSize: 9,
    letterSpacing: 1,
    marginLeft: 9,
  },
});
