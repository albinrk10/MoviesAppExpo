import type { Movie } from "@/domain/entities/movie.entity";
import { cinema } from "@/presentation/theme";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MoviePoster from "./MoviePoster";

interface Props {
  title: string;
  subtitle: string;
  movies: Movie[];
  loadNextPage?: () => void;
  loadingMore?: boolean;
}

export default function MovieHorizontalList({
  title,
  subtitle,
  movies,
  loadNextPage,
  loadingMore,
}: Props) {
  return (
    <View>
      <View style={styles.heading}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.count}>
          {movies.length.toString().padStart(2, "0")}
        </Text>
      </View>
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
        renderItem={({ item }) => (
          <MoviePoster
            id={item.id}
            poster={item.poster}
            title={item.title}
            rating={item.rating}
            year={item.releaseDate.getFullYear()}
          />
        )}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aún no hay películas en esta selección.
          </Text>
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ padding: 20 }} color={cinema.accent} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 17,
  },
  subtitle: {
    color: cinema.accent,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1.7,
    marginBottom: 6,
  },
  title: {
    color: cinema.text,
    fontSize: 21,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  count: {
    color: cinema.muted,
    fontSize: 11,
    borderWidth: 1,
    borderColor: cinema.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  list: { paddingHorizontal: 24 },
  empty: { color: cinema.muted, paddingVertical: 24, fontSize: 14 },
});
