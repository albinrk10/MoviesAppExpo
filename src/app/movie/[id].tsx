import MovieCast from "@/presentation/components/movie/MovieCast";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import ScreenState from "@/presentation/components/ScreenState";
import { useMovie } from "@/presentation/hooks/useMovie";
import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movieQuery, castQuery } = useMovie(Number(id));
  const insets = useSafeAreaInsets();

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: cinema.background,
        }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/home")
          }
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={20} color={cinema.text} />
          <Text style={{ color: cinema.text }}>Volver</Text>
        </Pressable>
        <ScreenState
          loading={movieQuery.isLoading}
          title={
            movieQuery.isLoading
              ? "Una historia está por comenzar…"
              : "No pudimos abrir esta película"
          }
          description={
            movieQuery.isError
              ? "Revisa tu conexión y vuelve a intentarlo."
              : undefined
          }
          onRetry={
            movieQuery.isError
              ? () => {
                  void movieQuery.refetch();
                }
              : undefined
          }
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
    >
      <MovieHeader
        poster={movieQuery.data.poster}
        originalTitle={movieQuery.data.originalTitle}
        title={movieQuery.data.title}
      />
      <MovieDescription movie={movieQuery.data} />
      {castQuery.isError ? (
        <ScreenState
          title="El reparto no está disponible"
          onRetry={() => {
            void castQuery.refetch();
          }}
        />
      ) : castQuery.isLoading ? (
        <ScreenState loading title="Cargando el reparto…" />
      ) : (
        <MovieCast cast={castQuery.data ?? []} />
      )}
      <Text style={styles.credit}>EL CINE SE VIVE EN CADA HISTORIA.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: cinema.background },
  back: { flexDirection: "row", alignItems: "center", gap: 8, padding: 24 },
  credit: {
    color: cinema.muted,
    fontSize: 8,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 36,
  },
});
