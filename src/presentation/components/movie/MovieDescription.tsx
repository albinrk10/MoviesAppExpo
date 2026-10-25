import { Formatter } from "@/config/helpers/formatter";
import type { CompleteMovie } from "@/domain/entities/movie.entity";
import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function MovieDescription({ movie }: { movie: CompleteMovie }) {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <View style={styles.rating}>
            <Ionicons name="star" size={17} color={cinema.accent} />
            <Text style={[styles.value, { color: cinema.accent }]}>
              {movie.rating.toFixed(1)}
              <Text style={styles.outOf}> / 10</Text>
            </Text>
          </View>
          <Text style={styles.statLabel}>VALORACIÓN</Text>
        </View>
        <View style={[styles.stat, styles.divider]}>
          <Text style={styles.value}>
            {movie.duration > 0 ? `${movie.duration} min` : "—"}
          </Text>
          <Text style={styles.statLabel}>DURACIÓN</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.value}>{movie.releaseDate.getFullYear()}</Text>
          <Text style={styles.statLabel}>ESTRENO</Text>
        </View>
      </View>
      <View style={styles.genres}>
        {movie.genres.map((genre) => (
          <View key={genre} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionHeading}>
        <View style={styles.line} />
        <Text style={styles.heading}>La historia</Text>
      </View>
      <Text style={styles.description}>
        {movie.description ||
          "Todavía no hay una sinopsis disponible para esta película."}
      </Text>
      {movie.budget > 0 && (
        <View style={styles.budget}>
          <Ionicons name="videocam-outline" color={cinema.accent} size={21} />
          <View>
            <Text style={styles.budgetLabel}>UNA PRODUCCIÓN DE</Text>
            <Text style={styles.budgetValue}>
              {Formatter.currency(movie.budget)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  stats: {
    flexDirection: "row",
    paddingVertical: 20,
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: cinema.border,
  },
  stat: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  divider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: cinema.border,
  },
  rating: { flexDirection: "row", gap: 6, alignItems: "center" },
  value: { color: cinema.text, fontSize: 17, fontWeight: "700" },
  outOf: { color: cinema.muted, fontSize: 11, fontWeight: "400" },
  statLabel: {
    fontSize: 8,
    letterSpacing: 1.3,
    color: cinema.muted,
    fontWeight: "600",
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 22,
  },
  genre: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: cinema.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cinema.border,
  },
  genreText: { color: "#C9C8CE", fontSize: 11 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 12,
  },
  line: {
    width: 3,
    height: 17,
    backgroundColor: cinema.accent,
    borderRadius: 2,
  },
  heading: {
    fontSize: 20,
    color: cinema.text,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  description: { color: "#B2B2BD", fontSize: 14, lineHeight: 24 },
  budget: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 17,
    borderRadius: 14,
    backgroundColor: cinema.surface,
  },
  budgetLabel: {
    color: cinema.muted,
    fontSize: 8,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  budgetValue: { color: cinema.text, fontSize: 17, fontWeight: "600" },
});
